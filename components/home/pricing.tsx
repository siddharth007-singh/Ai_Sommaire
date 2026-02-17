import { PricingTable } from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

const Pricing = () => {
  return (
    <main className="relative min-h-screen bg-linear-to-br from-slate-50 to-white py-20">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-r from-rose-500/10 via-purple-500/10 to-blue-500/10 blur-3xl" />

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 gap-4">
          <Badge className="bg-rose-100 text-rose-700 px-4 py-1.5 rounded-full flex items-center gap-2">
            <Sparkles className="h-4 w-4 animate-pulse" />
            Simple & Transparent Pricing
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Choose the plan that fits your workflow
          </h1>

          <p className="max-w-2xl text-muted-foreground text-base sm:text-lg">
            Start free. Upgrade when you’re ready. No hidden charges. Cancel anytime.
          </p>
        </div>

        {/* Pricing Grid Wrapper */}
        <div className="relative mx-auto max-w-5xl rounded-2xl border bg-white/70 backdrop-blur-md shadow-xl p-6 sm:p-10">
          <PricingTable />
        </div>

        {/* Trust Footer */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-xl border bg-white shadow-sm">
            🔒 <p className="font-semibold mt-2">Secure Payments</p>
            <p className="text-sm text-muted-foreground">
              Your data and payments are fully encrypted.
            </p>
          </div>

          <div className="p-6 rounded-xl border bg-white shadow-sm">
            ⚡ <p className="font-semibold mt-2">Instant Access</p>
            <p className="text-sm text-muted-foreground">
              Upgrade and unlock Pro features immediately.
            </p>
          </div>

          <div className="p-6 rounded-xl border bg-white shadow-sm">
            💬 <p className="font-semibold mt-2">24/7 Support</p>
            <p className="text-sm text-muted-foreground">
              We’re here to help whenever you need.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Pricing;
