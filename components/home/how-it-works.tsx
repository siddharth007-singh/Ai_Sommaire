import { Card } from "@/components/ui/card";
import { Upload, Brain, MessageSquareText, Download } from "lucide-react";

const steps = [
  { title: "Upload PDF", desc: "Upload any document", icon: Upload },
  { title: "AI Reads", desc: "AI understands your content", icon: Brain },
  { title: "Get Summary", desc: "Instant concise summary", icon: MessageSquareText },
  { title: "Save & Chat", desc: "Store and chat anytime", icon: Download },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-rose-500/10 to-purple-500/10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">⚡ How Sommaire Works</h2>
          <p className="mt-3 text-muted-foreground">
            Simple 4-step AI powered workflow
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <Card
                key={i}
                className="relative p-6 text-center backdrop-blur-xl bg-white/70 border shadow-md hover:shadow-xl transition hover:-translate-y-1"
              >
                <div className="mx-auto mb-4 w-14 h-14 rounded-2xl flex items-center justify-center bg-linear-to-br from-rose-500 to-rose-700 text-white">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-lg">{step.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{step.desc}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
