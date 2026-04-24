import Link from "next/link";
import { ArrowRight, Heart, ArrowLeft } from "lucide-react";
import { getSiteSettings } from "@/lib/data";

export default async function Hero() {
  const s = await getSiteSettings();

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${s.heroImageUrl}')` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />

      <div className="absolute right-[8%] top-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-white/10 hidden lg:block" />
      <div className="absolute right-[12%] top-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-white/10 hidden lg:block" />
      <div className="absolute right-[10%] bottom-16 w-5 h-5 rounded-full bg-cbi-yellow hidden lg:block" />
      <div className="absolute right-[6%] top-24 w-3 h-3 rounded-full bg-white/40 hidden lg:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 w-full">
        <div className="max-w-2xl">
          <p className="text-cbi-yellow font-semibold text-base italic mb-6 flex items-center gap-3">
            <span className="w-8 h-0.5 bg-cbi-yellow inline-block rounded-full" />
            {s.heroTagline}
          </p>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.08] tracking-tight">
            {s.heroHeading}
          </h1>

          <p className="mt-8 text-slate-200 text-lg leading-relaxed max-w-xl">{s.heroDescription}</p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/#programs"
              className="inline-flex items-center gap-2 px-8 py-4 bg-cbi-yellow text-slate-900 font-bold text-base rounded-full hover:bg-cbi-yellow-dark transition-colors shadow-lg">
              Our Programs <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/donate"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/60 text-white font-bold text-base rounded-full hover:bg-white/10 transition-colors">
              <Heart className="w-4 h-4" /> Donate Now
            </Link>
          </div>

          <div className="mt-14 flex flex-wrap gap-8">
            {[
              { number: s.heroStat1Value, label: s.heroStat1Label },
              { number: s.heroStat2Value, label: s.heroStat2Label },
              { number: s.heroStat3Value, label: s.heroStat3Label },
            ].map((st) => (
              <div key={st.label} className="flex items-center gap-3">
                <div className="text-2xl font-black text-cbi-yellow">{st.number}</div>
                <div className="text-white/60 text-xs font-semibold uppercase tracking-wide leading-tight">{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors hidden lg:flex" aria-label="Previous">
        <ArrowLeft className="w-5 h-5" />
      </button>
      <button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-cbi-yellow text-slate-900 flex items-center justify-center hover:bg-cbi-yellow-dark transition-colors hidden lg:flex" aria-label="Next">
        <ArrowRight className="w-5 h-5" />
      </button>
    </section>
  );
}
