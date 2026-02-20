import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";

type ClerkWebhookEvent = {
  type: string;
  data: {
    user_id?: string;
    user?: {
      id?: string;
    };
    email_addresses?: {
      email_address: string;
    }[];
  };
};

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const headers = Object.fromEntries(req.headers);

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);

  let evt: ClerkWebhookEvent;

  try {
    evt = wh.verify(payload, headers) as ClerkWebhookEvent;
    console.log("🔥 Clerk Webhook Received:", evt.type);
  } catch (err) {
    console.error("❌ Webhook verification failed", err);
    return NextResponse.json({ error: "Invalid webhook" }, { status: 400 });
  }

  const eventType = evt.type;
  const data = evt.data;

  const clerkUserId = data.user_id || data.user?.id;

  if (!clerkUserId) {
    console.log("⚠️ No userId in webhook");
    return NextResponse.json({ ok: true });
  }

  // ✅ Upgrade to PRO
  if (
    eventType === "subscription.created" ||
    eventType === "subscription.updated" ||
    eventType === "user.subscription.created" ||
    eventType === "user.subscription.updated"
  ) {
    await prisma.user.update({
      where: { id: clerkUserId },
      data: {
        plan: "PRO",
        credits: -1,
      },
    });

    console.log("✅ User upgraded to PRO:", clerkUserId);
  }

  // ❌ Downgrade to FREE
  if (
    eventType === "subscription.deleted" ||
    eventType === "subscription.pastDue" ||
    eventType === "user.subscription.deleted"
  ) {
    await prisma.user.update({
      where: { id: clerkUserId },
      data: {
        plan: "FREE",
        credits: 4,
      },
    });

    console.log("⚠️ User downgraded to FREE:", clerkUserId);
  }

  return NextResponse.json({ received: true });
}