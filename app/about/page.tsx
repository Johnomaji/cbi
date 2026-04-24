import PageLayout from "@/app/components/PageLayout";
import { getMilestones } from "@/lib/data";
import Link from "next/link";
import { Target, Eye, Heart, Star, Users, Shield, ArrowRight } from "lucide-react";

export const metadata = { title: "About Us | Care Best Initiative" };

const values = [
  { icon: Heart,  title: "Service in Love",  description: "Our services are motivated by genuine interest and empathy." },
  { icon: Star,   title: "Equity",           description: "We strive for fairness and equality in all our endeavours, ensuring everyone has access to opportunities and resources." },
  { icon: Shield, title: "Excellence",       description: "We maintain the highest standards of conduct, competence, and integrity in all our interactions and operations." },
  { icon: Users,  title: "Teamwork",         description: "We collaborate seamlessly, leveraging diverse skills and perspectives to achieve common goals." },
  { icon: Eye,    title: "Transparency",     description: "We uphold openness and honesty in our actions, fostering trust and accountability within our organization and with stakeholders." },
];


export default async function AboutPage() {
  const milestones = await getMilestones();
  const sortedMilestones = [...milestones].sort((a, b) => a.order - b.order);

  return (
    <PageLayout>
      <div className="bg-cbi-blue-dark relative overflow-hidden py-20">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-cbi-yellow/10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-cbi-yellow font-semibold text-sm flex items-center gap-2 mb-3">
            <span className="w-6 h-0.5 bg-cbi-yellow inline-block" /> Who We Are
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">About Care Best Initiative</h1>
          <p className="mt-4 text-blue-200 max-w-2xl leading-relaxed">
            A National NGO delivering integrated humanitarian programs since 2019 across Nigeria.
          </p>
        </div>
      </div>

      <section id="history" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section heading + stats row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-14">
            <div className="lg:max-w-lg">
              <span className="text-cbi-yellow font-semibold text-sm uppercase tracking-widest">Our History</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                Founded in 2019,<br />Rooted in Purpose
              </h2>
              <p className="mt-4 text-slate-500 leading-relaxed">
                From a small team of seven tackling GBV in Northeast Nigeria, CBI has grown into a
                national organisation reaching over 150,000 people across 10 states.
              </p>
            </div>
            <div className="bg-gradient-to-br from-cbi-blue to-cbi-blue-dark rounded-2xl p-8 text-white flex-shrink-0 lg:w-64">
              <div className="grid grid-cols-2 gap-5">
                {[
                  { num: "2019",   label: "Founded" },
                  { num: "10+",   label: "States" },
                  { num: "150K+", label: "Beneficiaries" },
                  { num: "35+",   label: "Partners" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-2xl font-black text-cbi-yellow">{s.num}</div>
                    <div className="text-blue-200 text-xs mt-1 font-medium">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Vertical timeline ── */}
          <div className="relative">
            {/* Spine — gradient from yellow down to dark blue */}
            <div className="absolute left-[21px] sm:left-[25px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-cbi-yellow via-cbi-blue to-cbi-blue-dark" />

            <div className="space-y-6">
              {sortedMilestones.map((m, i) => (
                <div key={m.id} className="relative flex gap-5 sm:gap-8">

                  {/* Dot — sits centred on the spine */}
                  <div className="relative z-10 flex-shrink-0 w-11 flex items-start justify-center pt-5">
                    <div className={`w-5 h-5 rounded-full border-[3px] border-white shadow-md ${
                      i === 0
                        ? "bg-cbi-yellow"
                        : i % 2 === 0
                        ? "bg-cbi-blue"
                        : "bg-cbi-blue-dark"
                    }`} />
                  </div>

                  {/* Card */}
                  <div className="flex-1 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-5 sm:p-6 mb-0">
                    <div className="flex flex-wrap items-center gap-2.5 mb-3">
                      <span className="px-3 py-1 rounded-full bg-cbi-yellow text-slate-900 text-xs font-black">
                        {m.year}
                      </span>
                      <h3 className="font-black text-slate-900 text-base leading-snug">{m.title}</h3>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="identity" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-cbi-yellow font-semibold text-sm uppercase tracking-widest">Identity</span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">Mission, Vision &amp; Values</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-14">
            <div className="bg-cbi-blue rounded-2xl p-8 text-white">
              <Target className="w-8 h-8 mb-4 text-cbi-yellow" />
              <h3 className="text-xl font-bold mb-3">Our Mission</h3>
              <p className="text-blue-100 leading-relaxed">To deliver integrated, impact-driven humanitarian programs that address urgent needs while strengthening long-term community resilience across Nigeria&apos;s most vulnerable regions.</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-8">
              <Eye className="w-8 h-8 mb-4 text-cbi-blue" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed">A Nigeria where every individual, regardless of circumstance, has access to lifesaving care, education, clean water, and the opportunity to build a dignified life.</p>
            </div>
          </div>

          <div className="text-center mb-8">
            <span className="text-cbi-yellow font-semibold text-sm uppercase tracking-widest">Core Values</span>
            <h3 className="mt-2 text-2xl font-black text-slate-900">Values That Inspire, Actions That Impact</h3>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-cbi-blue" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{v.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-cbi-blue to-cbi-blue-dark rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-cbi-yellow/10 pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />
            <div className="relative">
              <span className="text-cbi-yellow font-semibold text-sm uppercase tracking-widest">Our People</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-black text-white leading-tight">
                Meet the Team Behind the Mission
              </h2>
              <p className="mt-4 text-blue-200 max-w-xl mx-auto leading-relaxed">
                Dedicated professionals driving positive change across Nigeria&apos;s most vulnerable communities.
              </p>
              <Link
                href="/team"
                className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-cbi-yellow text-slate-900 font-black text-base rounded-full hover:bg-cbi-yellow-dark transition-colors shadow-lg"
              >
                View Full Team <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
