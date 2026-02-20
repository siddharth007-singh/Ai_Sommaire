"use server";

import cloudinary from "@/lib/cloudinary";
import type { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { generatePdfSummaryWithLangChain } from "@/lib/langchain";
import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";


type StorePdfSummaryInput = {
  originalFileUrl: string;
  summaryText: string;
  title?: string;
  fileName?: string;
};

export async function ensureUserInDb() {
  const { userId } = await auth();
  const clerkUser = await currentUser();

  if (!userId || !clerkUser) {
    return null;
  }

  let user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        id: userId,
        email: clerkUser.emailAddresses[0].emailAddress,
        fullName: clerkUser.fullName ?? "",
        status: "ACTIVE",
        credits: 4,
        plan: "FREE",
      },
    });

    console.log("✅ New user created in DB:", user.id);
  } else {
    console.log("ℹ️ User already exists in DB:", user.id);
  }

  return user;
}

export async function generatePdfSummary(formData: FormData) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { credits: true, plan: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.plan !== "PRO" && user.credits <= 0) {
    throw new Error("No credits left. Please upgrade to Pro.");
  }

  const file = formData.get("file") as File | null;
  if (!file) throw new Error("No file uploaded");

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // ✅ Properly typed Cloudinary upload
  const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { resource_type: "raw" },
      (error?: UploadApiErrorResponse, result?: UploadApiResponse) => {
        if (error) reject(error);
        else if (result) resolve(result);
        else reject(new Error("Cloudinary upload failed"));
      }
    ).end(buffer);
  });

  const fileUrl = uploadResult.secure_url;

  const pdfText = await generatePdfSummaryWithLangChain(fileUrl);
  const summary = await generateSummaryFromGemini(pdfText);

  return {
    success: true,
    summary,
    fileUrl,
  };
}

export async function storePdfSummary({ originalFileUrl, summaryText, title, fileName }: StorePdfSummaryInput) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User not Found"
      }
    }


    const user = await prisma.user.findFirst({ where: { id: userId } });

    if (!user) {
      return {
        success: false,
        message: "User not found in database",
      };
    }

    const pdfSummary = await prisma.pdfSummary.create({
      data: {
        userId,
        originalFileUrl,
        summaryText,
        title,
        fileName,
        status: "COMPLETED",
      }
    })

    // ✅ Deduct credits only for non-PRO users
    if (user.plan !== "PRO") {
      await prisma.user.update({
        where: { id: userId },
        data: {
          credits: { decrement: 1 },
        },
      });
    }

    return {
      success: true,
      message: "PDF summary saved successfully",
      data: pdfSummary,
    };

  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Error while saving Pdf summary',
    }
  }
}

export async function getMySummary() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "Unauthorized",
        data: [],
      };
    }

    const summaries = await prisma.pdfSummary.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        fileName: true,
        originalFileUrl: true,
        summaryText: true,
        status: true,
        createdAt: true,
      },
    });

    return {
      success: true,
      data: summaries,
    }
  } catch (error) {
    console.error("❌ Error fetching summaries:", error);
    return {
      success: false,
      message: "Failed to fetch summaries",
      data: [],
    };
  }
}

export async function getSingleSummary(summaryId: string) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "Unauthorized",
        data: null,
      };
    }

    const summary = await prisma.pdfSummary.findFirst({
      where: {
        id: summaryId,
        userId: userId,
      },
      select: {
        id: true,
        summaryText: true,
        originalFileUrl: true,
        title: true,
        fileName: true,
        createdAt: true,
        status: true,
      },
    });

    if (!summary) {
      return {
        success: false,
        message: "Summary not found",
        data: null,
      };
    }

    return {
      success: true,
      data: summary,
    };
  } catch (error) {
    console.error("❌ Error fetching single summary:", error);
    return {
      success: false,
      message: "Failed to fetch summary",
      data: null,
    };
  }
}

export async function deleteSummary(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await prisma.pdfSummary.delete({
    where: { id },
  });

  return { success: true };
}

export async function getMyCredits(): Promise<{
  credits: number | null;
  plan: "FREE" | "BASIC" | "PRO" | null;
} | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { credits: true, plan: true },
  });

  if (!user) return null;

  return {
    credits: user.credits,
    plan: user.plan as "FREE" | "BASIC" | "PRO",
  };
}
