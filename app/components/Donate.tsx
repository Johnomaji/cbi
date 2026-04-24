import { Heart, Users, ArrowRight, CheckCircle2, MapPin, Globe } from "lucide-react";
import Link from "next/link";

const tiers = [
  { amount: "$25",  label: "Feed a family for a week" },
  { amount: "$50",  label: "School supplies for 5 children" },
  { amount: "$100", label: "Clean water for a household" },
  { amount: "$250", label: "Health kit for 10 beneficiaries" },
];

const reasons = [
  "100% of donations go to field programs",
  "Transparent impact reporting",
  "Trusted by 35+ partner organizations",
  "Active in 10 states across Nigeria",
];

export default function Donate() {
  return (
    <section id="donate" className="bg-cbi-blue-dark relative overflow-hidden py-24">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-cbi-yellow/10 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      {/* Background photo overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('/IMG_9253-scaled.jpg')" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: CTA */}
          <div>
            <p className="text-cbi-yellow font-semibold text-sm italic flex items-center gap-2 mb-4">
              <span className="w-6 h-0.5 bg-cbi-yellow inline-block rounded-full" />
              Donate &amp; Support
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
              Your Donation Makes a<br />
              Real <span className="text-cbi-yellow italic">Difference</span>
            </h2>
            <p className="mt-5 text-blue-200 text-base leading-relaxed max-w-md">
              Every donation to Care Best Initiative goes directly to lifesaving programs —
              nutrition, healthcare, clean water, and education for Nigeria&apos;s most vulnerable communities.
            </p>

            {/* Reasons */}
            <div className="mt-6 space-y-2.5">
              {reasons.map((r) => (
                <div key={r} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-cbi-yellow flex-shrink-0" />
                  <span className="text-blue-100 text-sm">{r}</span>
                </div>
              ))}
            </div>

            {/* Donation tiers */}
            <div className="mt-8 flex flex-wrap gap-3">
              {tiers.map((t) => (
                <Link key={t.amount}
                  href="/donate"
                  className="border border-white/20 px-5 py-3 text-white hover:border-cbi-yellow hover:bg-cbi-yellow/10 transition-all rounded-xl cursor-pointer group">
                  <div className="font-black text-lg text-cbi-yellow">{t.amount}</div>
                  <div className="text-blue-300 text-xs mt-0.5 group-hover:text-white transition-colors">{t.label}</div>
                </Link>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/donate"
                className="inline-flex items-center gap-2 px-8 py-4 bg-cbi-yellow text-slate-900 font-bold text-base rounded-full hover:bg-cbi-yellow-dark transition-colors shadow-lg">
                <Heart className="w-5 h-5" /> Donate Now
              </Link>
              <Link href="/donate"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/40 text-white font-bold text-base rounded-full hover:bg-white/10 transition-colors">
                <Users className="w-5 h-5" /> Partner With Us
              </Link>
            </div>
          </div>

          {/* Right: Stats */}
          <div className="grid grid-cols-1 gap-5">
            {([
              { num: "50K+", label: "Beneficiaries reached across Nigeria", Icon: Users },
              { num: "10",   label: "States covered with active programs",  Icon: MapPin },
              { num: "35+",  label: "Partner organizations worldwide",      Icon: Globe },
            ] as const).map((s) => (
              <div key={s.label}
                className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-6 flex items-center gap-6 border border-white/10 hover:bg-white/15 transition-colors">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <s.Icon className="w-5 h-5 text-cbi-yellow" />
                </div>
                <div>
                  <div className="text-3xl font-black text-cbi-yellow">{s.num}</div>
                  <div className="text-blue-200 text-sm mt-0.5">{s.label}</div>
                </div>
                <ArrowRight className="w-5 h-5 text-white/30 ml-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
