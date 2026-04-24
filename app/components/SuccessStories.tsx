import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getMilestones } from "@/lib/data";

const accentColors = [
  "from-cbi-yellow to-amber-400",
  "from-cbi-blue to-cbi-blue-dark",
  "from-emerald-400 to-emerald-600",
  "from-cbi-yellow to-cbi-blue",
  "from-violet-400 to-violet-600",
  "from-rose-400 to-rose-600",
  "from-cyan-400 to-cyan-600",
];

export default async function SuccessStories() {
  const milestones = (await getMilestones()).sort((a, b) => a.order - b.order);

  return (
    <section id="activities" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
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

        {/* Cards — 1 col → 2 col → 3 col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {milestones.map((m, i) => (
            <div key={m.id}
              className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">

              {/* Gradient top strip */}
              <div className={`h-1.5 bg-gradient-to-r ${accentColors[i % accentColors.length]}`} />

              <div className="p-6 flex flex-col flex-1 relative">
                {/* Watermark year */}
                <span className="absolute bottom-3 right-4 text-7xl font-black text-slate-50 select-none leading-none pointer-events-none">
                  {m.year}
                </span>

                {/* Year badge + title row */}
                <div className="flex flex-wrap items-center gap-2.5 mb-4">
                  <span className="px-3 py-1 rounded-full bg-cbi-blue-dark text-cbi-yellow text-xs font-black">
                    {m.year}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {m.title}
                  </span>
                </div>

                {/* Description */}
                <p className="relative text-slate-600 text-sm leading-relaxed flex-1">
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
