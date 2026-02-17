import { PlayCircle } from "lucide-react";

export default function DemoSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <PlayCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />

        <h3 className="text-2xl sm:text-3xl font-semibold max-w-3xl mx-auto">
          See how Sommaire transforms a real Next.js course PDF into a clean, readable summary
        </h3>

        <div className="mt-10 aspect-video rounded-2xl border bg-white shadow-lg flex items-center justify-center text-muted-foreground">
          🎥 Demo Video Placeholder
        </div>
      </div>
    </section>
  );
}
