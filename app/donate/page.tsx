import PageLayout from "@/app/components/PageLayout";
import Link from "next/link";
import {
  Heart, Users, Globe, BookOpen, Droplets, Shield, Sprout,
  CheckCircle, ArrowRight, Mail, Phone,
} from "lucide-react";

export const metadata = { title: "Donate | Care Best Initiative" };

const amounts = [
  { value: "$25", label: "Feeds a family for a week", color: "border-green-400 hover:bg-green-50 hover:text-green-700" },
  { value: "$50", label: "School supplies for 5 children", color: "border-blue-400 hover:bg-blue-50 hover:text-blue-700" },
  { value: "$100", label: "Clean water for a household", color: "border-purple-400 hover:bg-purple-50 hover:text-purple-700" },
  { value: "$250", label: "Health kit for 10 beneficiaries", color: "border-orange-400 hover:bg-orange-50 hover:text-orange-700" },
  { value: "$500", label: "Fund a community program", color: "border-rose-400 hover:bg-rose-50 hover:text-rose-700" },
  { value: "Custom", label: "Any amount makes a difference", color: "border-slate-400 hover:bg-slate-50 hover:text-slate-700" },
];

const impact = [
  { icon: Droplets, color: "text-cyan-500 bg-cyan-50", title: "Clean Water & Sanitation", desc: "Providing WASH facilities to households lacking safe water and sanitation." },
  { icon: BookOpen, color: "text-blue-500 bg-blue-50", title: "Education in Emergency", desc: "Keeping children in school during crises through temporary learning spaces." },
  { icon: Heart, color: "text-rose-500 bg-rose-50", title: "Healthcare & Nutrition", desc: "Delivering primary healthcare and nutrition programs to under-5 children." },
  { icon: Shield, color: "text-purple-500 bg-purple-50", title: "Protection & GBV", desc: "Supporting survivors of gender-based violence with holistic services." },
  { icon: Sprout, color: "text-green-500 bg-green-50", title: "Food & Livelihoods", desc: "Restoring food security and income-generation for affected households." },
  { icon: Globe, color: "text-indigo-500 bg-indigo-50", title: "10 States Coverage", desc: "Operating across North-East and North-West Nigeria reaching 50K+ beneficiaries." },
];

const whyUs = [
  "100% of program funds go directly to beneficiaries",
  "Transparent financial reporting to all donors",
  "Registered National NGO with full accountability",
  "Partnerships with UN agencies and international NGOs",
  "Community-led approaches for lasting impact",
  "Quarterly donor impact reports and updates",
];

export default function DonatePage() {
  return (
    <PageLayout>
      {/* Hero */}
      <div className="bg-cbi-blue-dark py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cbi-yellow text-slate-900 text-sm font-semibold rounded-full mb-6 uppercase tracking-wide">
            <Heart className="w-4 h-4" />
            Make a Difference Today
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
            Your Generosity <span className="text-yellow-300">Saves Lives</span>
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
            Every donation to Care Best Initiative directly funds lifesaving programs in nutrition, health,
            education, clean water, and protection for Nigeria&apos;s most vulnerable communities.
          </p>
        </div>
      </div>

      <div className="bg-bg transition-colors">
        {/* Donation amount selector */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-surface border border-border rounded-3xl p-8 sm:p-12 shadow-sm">
            <h2 className="text-2xl font-bold text-fg mb-2 text-center">Choose Your Impact</h2>
            <p className="text-fg2 text-center mb-8">Select an amount to see what your gift achieves</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
              {amounts.map((a) => (
                <a
                  key={a.value}
                  href={`mailto:donate@cbi.ngo?subject=Donation of ${a.value} to CBI&body=I would like to make a donation of ${a.value} to Care Best Initiative. Please send me instructions for how to complete this.`}
                  className={`flex flex-col items-center justify-center p-5 rounded-2xl border-2 text-fg font-semibold transition-all text-center cursor-pointer ${a.color}`}
                >
                  <span className="text-2xl font-bold">{a.value}</span>
                  <span className="text-xs mt-1.5 opacity-80 font-normal">{a.label}</span>
                </a>
              ))}
            </div>

            <div className="text-center space-y-4">
              <a
                href="mailto:donate@cbi.ngo?subject=Donation to CBI&body=I would like to make a donation to Care Best Initiative. Please send me bank transfer details or other payment instructions."
                className="inline-flex items-center gap-2 px-10 py-4 bg-cbi-yellow text-slate-900 rounded-full font-bold text-lg hover:bg-cbi-yellow-dark transition-colors shadow-lg"
              >
                <Heart className="w-5 h-5" />
                Donate Now — Contact Us
              </a>
              <p className="text-fg3 text-sm">We will respond within 24 hours with payment options</p>
            </div>
          </div>
        </div>

        {/* Why donate to CBI */}
        <div className="bg-muted transition-colors py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-cbi-yellow font-semibold text-sm uppercase tracking-widest">Accountability</span>
              <h2 className="mt-3 text-3xl font-bold text-fg">Why Give to CBI?</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {whyUs.map((item) => (
                <div key={item} className="flex items-start gap-3 bg-surface border border-border rounded-2xl p-5">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-fg2 text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Impact areas */}
        <div className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-cbi-yellow font-semibold text-sm uppercase tracking-widest">Your Impact</span>
              <h2 className="mt-3 text-3xl font-bold text-fg">Where Your Gift Goes</h2>
              <p className="mt-4 text-fg2 max-w-2xl mx-auto">Every dollar reaches the people who need it most through these six core program areas.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {impact.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="bg-surface border border-border rounded-2xl p-6 hover:shadow-md transition-all">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-fg mb-2">{item.title}</h3>
                    <p className="text-fg2 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Other ways to help */}
        <div className="bg-muted transition-colors py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-fg text-center mb-10">Other Ways to Support CBI</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  title: "Corporate Partnership",
                  desc: "Partner with CBI for CSR programs, joint projects, and co-funding opportunities.",
                  cta: "Partner With Us",
                  href: "mailto:partnerships@cbi.ngo?subject=Corporate Partnership Inquiry",
                  icon: Users,
                },
                {
                  title: "Volunteer",
                  desc: "Share your skills and expertise by volunteering with our programs in Nigeria.",
                  cta: "Apply to Volunteer",
                  href: "/careers",
                  icon: Heart,
                },
                {
                  title: "Fundraise for Us",
                  desc: "Organize your own fundraising event or campaign and donate the proceeds to CBI.",
                  cta: "Get Started",
                  href: "mailto:info@cbi.ngo?subject=Fundraising for CBI",
                  icon: Globe,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="bg-surface border border-border rounded-2xl p-6 text-center hover:shadow-md transition-all">
                    <div className="w-12 h-12 bg-cbi-blue rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-fg mb-2">{item.title}</h3>
                    <p className="text-fg2 text-sm leading-relaxed mb-5">{item.desc}</p>
                    <a
                      href={item.href}
                      className="inline-flex items-center gap-1.5 text-cbi-blue font-semibold text-sm hover:gap-2.5 transition-all"
                    >
                      {item.cta} <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="py-16 bg-cbi-blue-dark">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Have Questions About Donating?</h2>
            <p className="text-blue-200 mb-8">Our team is happy to answer any questions about your donation or how your gift is used.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:donate@cbi.ngo"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-cbi-blue-dark rounded-full font-semibold hover:bg-blue-50 transition-colors"
              >
                <Mail className="w-4 h-4" /> donate@cbi.ngo
              </a>
              <a
                href="mailto:info@cbi.ngo"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/50 text-white rounded-full font-semibold hover:bg-white/10 transition-colors"
              >
                <Phone className="w-4 h-4" /> info@cbi.ngo
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
