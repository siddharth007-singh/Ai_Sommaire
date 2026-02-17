import { getMySummary } from '@/app/actions/upload-action'
import SummaryCards from '@/components/common/summaries-card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Plus, FileText } from 'lucide-react'
import Link from 'next/link'

const DashboardPage = async () => {
  const res = await getMySummary();
const summaries = res.success ? res.data : [];

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              📄 Your Summaries
            </h1>
            <p className="text-muted-foreground mt-2">
              Turn your PDFs into concise, actionable insights with AI ✨
            </p>
          </div>

          <Button
            asChild
            className="bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:scale-105 transition"
          >
            <Link href="/upload" className="flex items-center text-white">
              <Plus className="w-5 h-5 mr-2" /> New Summary
            </Link>
          </Button>
        </div>

        {/* Empty State */}
        {summaries.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-24 border-2 border-dashed rounded-xl bg-white">
            <FileText className="w-12 h-12 text-rose-400 mb-4" />
            <h2 className="text-xl font-semibold">No summaries yet</h2>
            <p className="text-muted-foreground mt-1">
              Upload your first PDF to get started 🚀
            </p>
            <Button asChild className="mt-6">
              <Link href="/upload">Upload PDF</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Upgrade Banner */}
            {summaries.length >= 5 && (
              <div className="mb-6">
                <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 text-rose-800">
                  <p className="text-sm">
                    You’ve reached the limit of 5 uploads on the Basic plan.{" "}
                    <Link
                      href="/pricing"
                      className="underline font-medium inline-flex items-center"
                    >
                      Upgrade to Pro <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </p>
                </div>
              </div>
            )}

            {/* Cards Grid */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {summaries.map((summary) => (
                <SummaryCards key={summary.id} summary={summary} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default DashboardPage;
