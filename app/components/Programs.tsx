import { ArrowRight, BookOpen, Heart, Droplets, ShieldCheck, Wheat, Apple, HandHeart, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { getPrograms } from "@/lib/data";

const iconMap: Record<string, LucideIcon> = {
  BookOpen, Heart, Droplets, ShieldCheck, Wheat, Apple, HandHeart,
};
const colorMap: Record<string, { color: string; bg: string }> = {
  BookOpen:   { color: "text-blue-600",   bg: "bg-blue-50" },
  Heart:      { color: "text-rose-500",   bg: "bg-rose-50" },
  Apple:      { color: "text-amber-500",  bg: "bg-amber-50" },
  Droplets:   { color: "text-cyan-600",   bg: "bg-cyan-50" },
  ShieldCheck:{ color: "text-purple-600", bg: "bg-purple-50" },
  Wheat:      { color: "text-green-600",  bg: "bg-green-50" },
};

export default async function Programs() {
  const all = (await getPrograms())
    .filter((p) => p.published)
    .sort((a, b) => a.order - b.order);

  const causes = all.slice(0, 3);
  const blobShapes = [
    "rounded-[60%_40%_30%_70%/60%_30%_70%_40%]",
    "rounded-[40%_60%_70%_30%/40%_50%_60%_50%]",
    "rounded-[70%_30%_50%_50%/50%_40%_60%_50%]",
  ];

  return (
    <section id="programs">
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-cbi-yellow font-semibold text-sm italic flex items-center justify-center gap-2 mb-3">
              <HandHeart className="w-4 h-4" /> Our Core Programs
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Programs That Make a <span className="text-cbi-blue italic">Difference</span>
            </h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto leading-relaxed">
              Join our monthly giving program to provide consistent support to communities in need.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-6">
            {causes.map((cause, idx) => {
              const Icon = iconMap[cause.icon] ?? HandHeart;
              const { color, bg } = colorMap[cause.icon] ?? { color: "text-cbi-blue", bg: "bg-blue-50" };
              return (
                <div key={cause.id} className="flex flex-col items-center text-center group">
                  <div className={`relative w-52 h-52 ${bg} ${blobShapes[idx % 3]} flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300 shadow-sm`}>
                    <div className={`w-20 h-20 ${bg} rounded-full flex items-center justify-center`}>
                      <Icon className={`w-9 h-9 ${color}`} />
                    </div>
                    <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-cbi-yellow/50" />
                    <div className="absolute bottom-6 left-4 w-2 h-2 rounded-full bg-cbi-blue/30" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-3">{cause.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-xs">{cause.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-cbi-yellow font-semibold text-sm italic flex items-center gap-2 mb-2">
                <span className="w-6 h-0.5 bg-cbi-yellow inline-block rounded-full" /> What We Do
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                Give Support For<br />Our Core Programs
              </h2>
            </div>
            <Link href="/#programs"
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-cbi-blue text-white font-bold text-sm rounded-full hover:bg-cbi-blue-dark transition-colors">
              View All Programs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {all.map((p) => {
              const Icon = iconMap[p.icon] ?? HandHeart;
              const { color, bg } = colorMap[p.icon] ?? { color: "text-cbi-blue", bg: "bg-blue-50" };
              return (
                <div key={p.id} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group border border-slate-100">
                  <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center mb-5`}>
                    <Icon className={`w-7 h-7 ${color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{p.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{p.description}</p>
                  <span className={`inline-flex items-center gap-1.5 text-sm font-bold ${color} group-hover:gap-3 transition-all`}>
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
