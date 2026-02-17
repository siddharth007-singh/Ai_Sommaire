"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Glow BG */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-rose-500/20 via-purple-500/10 to-blue-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 py-24 sm:py-28 text-center flex flex-col items-center gap-6">
        <Badge className="px-4 py-1.5 text-sm rounded-full bg-rose-100 text-rose-700 flex items-center gap-2">
          <Sparkles className="w-4 h-4 animate-pulse" />
          Powered by AI
        </Badge>

        <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold leading-tight bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
          Transform PDFs into <br className="hidden sm:block" /> concise summaries
        </h1>

        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-muted-foreground">
          Upload any PDF. Get clean AI summaries and chat with your document in seconds.
        </p>

        <Button size="lg" className="mt-4">
          <Link href="/upload" className="flex items-center gap-2">
            Try Sommaire
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
