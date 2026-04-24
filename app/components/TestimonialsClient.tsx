"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Testimonial } from "@/lib/data";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-cbi-yellow fill-cbi-yellow" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function Card({ t, i }: { t: Testimonial; i: number }) {
  return (
    <div className={`rounded-2xl p-7 shadow-sm flex flex-col h-full ${i === 0 ? "bg-cbi-yellow" : "bg-white border border-slate-100"}`}>
      <Stars count={t.stars} />
      <p className={`mt-4 text-sm leading-relaxed flex-1 ${i === 0 ? "text-slate-800" : "text-slate-600"}`}>
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3 mt-6 pt-5 border-t border-black/10">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ${i === 0 ? "bg-cbi-blue-dark" : "bg-cbi-blue"}`}>
          {t.initials}
        </div>
        <div>
          <div className="font-bold text-sm text-slate-900">{t.name}</div>
          <div className={`text-xs mt-0.5 ${i === 0 ? "text-slate-700" : "text-slate-400"}`}>{t.role}</div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsClient({ testimonials }: { testimonials: Testimonial[] }) {
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
    <section id="testimonials" className="py-24 bg-slate-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-cbi-yellow font-semibold text-sm italic flex items-center justify-center gap-2 mb-3">
            <span className="w-6 h-0.5 bg-cbi-yellow inline-block rounded-full" /> Voices From the Field
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            What <span className="text-cbi-blue italic">Communities</span> Are Saying
          </h2>
          <p className="mt-4 text-slate-500 max-w-md mx-auto text-sm leading-relaxed">
            Real stories from communities we serve — the most powerful measure of our impact.
          </p>
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
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className="snap-center flex-shrink-0"
              style={{ flex: "0 0 80vw" }}
            >
              <Card t={t} i={i} />
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

          <div className="flex items-center gap-1.5">
            {testimonials.map((_, i) => (
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
            disabled={active === testimonials.length - 1}
            aria-label="Next"
            className="w-9 h-9 rounded-full bg-cbi-yellow flex items-center justify-center text-slate-900 disabled:opacity-30 hover:bg-cbi-yellow-dark transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Desktop grid ── */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {testimonials.map((t, i) => (
          <Card key={t.id} t={t} i={i} />
        ))}
      </div>
    </section>
  );
}
