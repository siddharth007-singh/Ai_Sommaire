"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Check, FileText, Download } from "lucide-react";
import Link from "next/link";

type Props = {
  id: string;
  summary: string;
  title?: string | null;
  fileUrl: string;
};

const SummaryClient = ({ id, summary, title, fileUrl }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownload = () => {
    const blob = new Blob([summary], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${title || "summary"}.txt`;
    document.body.appendChild(a);
    a.click();

    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              📄 {title || "Summary Details"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              AI-generated summary for your uploaded document
            </p>
          </div>

          <Badge variant="secondary" className="w-fit">
            ID: {id}
          </Badge>
        </div>

        {/* Summary Card */}
        <Card className="shadow-lg border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Generated Summary
            </CardTitle>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-600" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <div className="prose prose-slate max-w-none whitespace-pre-line text-sm leading-relaxed">
              {summary}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="flex flex-wrap gap-3">
          <Link href={""} target="">
            <Button>📥 Chat Using Our AI</Button>
          </Link>

          <Link href="/dashboard">
            <Button variant="ghost">⬅️ Back to summaries</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SummaryClient;
