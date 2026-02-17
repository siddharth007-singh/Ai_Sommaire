
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, FileText } from "lucide-react";
import SummaryClient from "./summary-client";
import { getSingleSummary } from "@/app/actions/upload-action";

type Props = {
  params: {
    id: string;
  };
};

const SummariesIndividualPage = async ({ params }: Props) => {
  const { id } = await params;

  const res = await getSingleSummary(id);

  if (!res.success || !res.data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        ❌ Summary not found or unauthorized
      </div>
    );
  }

  return (
    <SummaryClient
      id={res.data.id}
      summary={res.data.summaryText}
      title={res.data.title}
      fileUrl={res.data.originalFileUrl}
    />
  )
};

export default SummariesIndividualPage;
