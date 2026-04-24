"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, ChevronRight } from "lucide-react";
import type { Milestone } from "@/lib/data";

const accentColors = [
  "from-cbi-yellow to-amber-400",
  "from-cbi-blue to-cbi-blue-dark",
  "from-emerald-400 to-emerald-600",
  "from-cbi-yellow to-cbi-blue",
  "from-violet-400 to-violet-600",
  "from-rose-400 to-rose-600",
  "from-cyan-400 to-cyan-600",
];

function Card({ m, i }: { m: Milestone; i: number }) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
      <div className={`h-1.5 bg-gradient-to-r ${accentColors[i % accentColors.length]}`} />
      <div className="p-6 flex flex-col flex-1 relative">
        <span className="absolute bottom-3 right-4 text-7xl font-black text-slate-50 select-none leading-none pointer-events-none">
          {m.year}
        </span>
        <div className="flex flex-wrap items-center gap-2.5 mb-4">
          <span className="px-3 py-1 rounded-full bg-cbi-blue-dark text-cbi-yellow text-xs font-black">
            {m.year}
          </span>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {m.title}
          </span>
        </div>
        <p className="relative text-slate-600 text-sm leading-relaxed flex-1">{m.desc}</p>
      </div>
    </div>
  );
}

export default function SuccessStoriesClient({ milestones }: { milestones: Milestone[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function goTo(i: number) {
    const el = scrollRef.current;
    if (!el) return;
    const cardW = el.clientWidth * 0.8;
    const gap   = el.clientWidth * 0.04;
    el.scrollTo({ left: i * (cardW + gap), behavior: "smooth" });
    setActive(i);
  }

  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;
    const cardW = el.clientWidth * 0.8;
    const gap   = el.clientWidth * 0.04;
    setActive(Math.round(el.scrollLeft / (cardW + gap)));
  }

  return (
    <section id="activities" className="py-24 bg-slate-50">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <span className="text-cbi-yellow font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              <span className="w-6 h-0.5 bg-cbi-yellow inline-block rounded-full" /> Since 2019
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-slate-900">Our Journey</h2>
            <p className="mt-2 text-slate-500 text-sm max-w-md leading-relaxed">
              A legacy of impact and change — from our founding in 2019 to our continued efforts today.
            </p>
          </div>
          <Link href="/about#history"
            className="flex-shrink-0 inline-flex items-center gap-2 text-cbi-yellow font-bold text-sm hover:gap-3 transition-all">
            Read Our Full Story <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ── Mobile carousel ── */}
      <div className="sm:hidden">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory"
          style={{
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
            gap: "4vw",
            paddingLeft: "10vw",
            paddingRight: "10vw",
          } as React.CSSProperties}
        >
          {milestones.map((m, i) => (
            <div
              key={m.id}
              className="snap-center flex-shrink-0"
              style={{ flex: "0 0 80vw" }}
            >
              <Card m={m} i={i} />
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-6 px-4">
          <button
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Previous"
            className="w-9 h-9 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 disabled:opacity-30 hover:border-cbi-blue hover:text-cbi-blue transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-1.5">
            {milestones.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-5 bg-cbi-yellow" : "w-1.5 bg-slate-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => goTo(active + 1)}
            disabled={active === milestones.length - 1}
            aria-label="Next"
            className="w-9 h-9 rounded-full bg-cbi-yellow flex items-center justify-center text-slate-900 disabled:opacity-30 hover:bg-cbi-yellow-dark transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Desktop grid ── */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {milestones.map((m, i) => (
          <Card key={m.id} m={m} i={i} />
        ))}
      </div>
    </section>
  );
}
