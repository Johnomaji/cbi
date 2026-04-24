import PageLayout from "@/app/components/PageLayout";
import { getTeam } from "@/lib/data";
import Team from "@/app/components/Team";
import { Target, Eye, Heart, CheckCircle, Mail } from "lucide-react";

export const metadata = { title: "About Us | Care Best Initiative" };

const values = [
  { icon: Heart, title: "Compassion", description: "We act with empathy and dignity toward every community member we serve." },
  { icon: CheckCircle, title: "Accountability", description: "We are transparent and responsible to our beneficiaries, partners, and donors." },
  { icon: Target, title: "Impact", description: "We focus on measurable, lasting change that transforms lives and communities." },
  { icon: Eye, title: "Integrity", description: "We uphold the highest ethical standards in all our operations and relationships." },
];

export default async function AboutPage() {
  const team = await getTeam();

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

      <section id="history" className="py-16 bg-bg transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-cbi-yellow font-semibold text-sm uppercase tracking-widest">Our History</span>
              <h2 className="mt-3 text-3xl font-bold text-fg">Founded in 2019, Rooted in Purpose</h2>
              <div className="mt-6 space-y-4 text-fg2 text-base leading-relaxed">
                <p>Care Best Initiative (CBI) was founded in 2019 by Rejoice Mark and a team of humanitarian professionals who recognized the growing gap between the scale of need and the reach of existing NGO programs in Nigeria&apos;s conflict-affected regions.</p>
                <p>Starting with a small team in Abuja, CBI launched its first field operations in Borno and Adamawa states in 2020, providing emergency nutrition and primary healthcare to over 5,000 beneficiaries in the first year alone.</p>
                <p>Today, CBI operates across 10 states in Nigeria&apos;s North-East and North-West, with programs covering education in emergency, health, nutrition, WASH, protection/GBV, and food security and livelihoods.</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-cbi-blue to-cbi-blue-dark rounded-2xl p-10 text-white">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { num: "2019", label: "Year Founded" },
                  { num: "10+", label: "States Covered" },
                  { num: "50K+", label: "Beneficiaries" },
                  { num: "35+", label: "Partners" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-3xl font-bold text-yellow-300">{s.num}</div>
                    <div className="text-blue-200 text-sm mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="identity" className="py-16 bg-muted transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-cbi-yellow font-semibold text-sm uppercase tracking-widest">Identity</span>
            <h2 className="mt-3 text-3xl font-bold text-fg">Mission, Vision & Values</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-cbi-blue rounded-2xl p-8 text-white">
              <Target className="w-8 h-8 mb-4 text-yellow-300" />
              <h3 className="text-xl font-bold mb-3">Our Mission</h3>
              <p className="text-blue-100 leading-relaxed">To deliver integrated, impact-driven humanitarian programs that address urgent needs while strengthening long-term community resilience across Nigeria&apos;s most vulnerable regions.</p>
            </div>
            <div className="bg-surface border border-border rounded-2xl p-8">
              <Eye className="w-8 h-8 mb-4 text-cbi-blue" />
              <h3 className="text-xl font-bold text-fg mb-3">Our Vision</h3>
              <p className="text-fg2 leading-relaxed">A Nigeria where every individual, regardless of circumstance, has access to lifesaving care, education, clean water, and the opportunity to build a dignified life.</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="bg-surface border border-border rounded-2xl p-5">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-cbi-blue" />
                  </div>
                  <h4 className="font-bold text-fg mb-2">{v.title}</h4>
                  <p className="text-fg2 text-sm leading-relaxed">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Team members={team} />
    </PageLayout>
  );
}
