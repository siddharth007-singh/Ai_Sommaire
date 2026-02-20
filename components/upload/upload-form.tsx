"use client"

import UploadFormInput from './upload-form-input'
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { toast } from 'sonner';
import { generatePdfSummary, getMyCredits, storePdfSummary } from '@/app/actions/upload-action';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';

const UploadForm = () => {
  const [loading, setLoading] = useState(false);
  const [credits, setCredits] = useState<number | null>(null);
  const [plan, setPlan] = useState<"FREE" | "BASIC" | "PRO" | null>(null);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    (async () => {
      const data = await getMyCredits();
      if (data) {
        setCredits(data.credits);
        setPlan(data.plan);
      }
    })();
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  const handleUpload = async (file: File) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await generatePdfSummary(formData);

      toast.success("PDF processed successfully!");

      // Save to DB
      await storePdfSummary({
        originalFileUrl: res.fileUrl,
        summaryText: res.summary,
        title: file.name.replace(".pdf", ""),
        fileName: file.name,
      });

      // Trigger n8n webhook
      await axios.post("/api/n8n-trigger", {
        email: user?.primaryEmailAddress?.emailAddress,
        user_name: user?.fullName,
        pdf_url: res.fileUrl,
        summary: res.summary,
      });

      toast.success("Summary saved & Email sent 🚀");

      if (plan !== "PRO" && credits !== null) {
        setCredits((prev) => (prev ? prev - 1 : 0));
      }

    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.includes("No credits")) {
          toast.error("Your credits are over. Upgrade to Pro 🚀");
        } else {
          toast.error(error.message || "Something went wrong. Try again!");
        }
      } else {
        toast.error("Something went wrong. Try again!");
      }
    } finally {
      setLoading(false);
    }

  };



  return (
    <div className="space-y-4">
      {/* Credits Badge */}
      {credits !== null && (
        <div className="text-sm text-muted-foreground text-center">
          🎟️ Credits left:{" "}
          <span className="font-semibold text-rose-600">{credits}</span>
        </div>
      )}

      {/* Banner + Upload UI */}
      {plan !== "PRO" && credits === 0 ? (
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-rose-700 text-center">
          ⚠️ Your free credits are over.
          <Link href="/pricing" className="ml-2 underline font-semibold">
            Upgrade to Pro 🚀
          </Link>
        </div>
      ) : (
        <UploadFormInput loading={loading} onSubmit={handleUpload} />
      )}
    </div>
  )
}

export default UploadForm