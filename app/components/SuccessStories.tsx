import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getMilestones } from "@/lib/data";

export default async function SuccessStories() {
  const milestones = (await getMilestones()).sort((a, b) => a.order - b.order);

  return (
    <section id="activities" className="py-24 bg-muted transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <span className="text-cbi-yellow font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              <span className="w-6 h-0.5 bg-cbi-yellow" /> Our Journey
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-fg">
              Stories of Impact<br />&amp; Milestones
            </h2>
          </div>
          <Link href="/about#history"
            className="flex-shrink-0 inline-flex items-center gap-2 text-cbi-yellow font-bold text-sm hover:gap-3 transition-all">
            Read Our Full Story <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {milestones.map((m, i) => (
            <div key={m.id} className="bg-surface p-8 group hover:bg-bg transition-colors relative">
              <div className="inline-block px-3 py-1 rounded-full bg-cbi-yellow text-slate-900 text-xs font-black mb-5">{m.year}</div>
              <h3 className="font-bold text-fg text-base mb-3 leading-tight">{m.title}</h3>
              <p className="text-fg2 text-sm leading-relaxed">{m.desc}</p>
              {i < milestones.length - 1 && (
                <div className="absolute top-12 -right-3 w-6 h-px bg-cbi-yellow/30 hidden lg:block z-10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
