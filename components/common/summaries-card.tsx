import React from 'react'
import { Card } from '../ui/card'
import DeleteCardBtn from './DeleteCardBtn'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

type Summary = {
  id: string;
  title: string | null;
  fileName: string | null;
  createdAt: Date;
  summaryText: string;
  originalFileUrl: string;
};

type Props = {
  summary: Summary;
};

const SummaryCards = ({ summary }: Props) => {
  const displayTitle =
    summary.title?.trim() ||
    summary.fileName?.replace(".pdf", "") ||
    "Untitled Summary";

  return (
    <div>
      <Card className="relative h-full bg-white/80 backdrop-blur hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
        <div className="absolute top-2 right-2 z-10">
          <DeleteCardBtn id={summary.id} />
        </div>

        <Link href={`/summaries/${summary.id}`} className="block p-4 sm:p-6 space-y-2">
          {/* Title */}
          <h3 className="text-base font-semibold text-gray-900 xl:text-lg w-4/5 truncate">
            {displayTitle}
          </h3>

          {/* Time */}
          <p className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(summary.createdAt), { addSuffix: true })}
          </p>

          {/* Summary Preview */}
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
            {summary.summaryText}
          </p>
        </Link>
      </Card>
    </div>
  )
}

export default SummaryCards
