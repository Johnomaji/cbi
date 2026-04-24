import PageLayout from "@/app/components/PageLayout";
import Image from "next/image";
import {
  Heart, Mail, Users, Globe, BookOpen, Droplets,
  Shield, Sprout, CheckCircle, ArrowRight, Landmark,
} from "lucide-react";
import CopyButton from "./CopyButton";

export const metadata = { title: "Donate | Care Best Initiative" };

const PAYSTACK_LINK = "https://paystack.com/pay/cbidonation";

const bankAccounts = [
  {
    currency: "NGN",
    flag: "🇳🇬",
    bank: "GT Bank",
    logo: "/gtb-logo.png",
    name: "Care Best Initiative",
    number: "0685297101",
    accent: "bg-green-50 border-green-200",
    badge: "bg-green-100 text-green-800",
  },
  {
    currency: "USD",
    flag: "🇺🇸",
    bank: "GT Bank",
    logo: "/gtb-logo.png",
    name: "Care Best Initiative",
    number: "0809185741",
    accent: "bg-blue-50 border-blue-200",
    badge: "bg-blue-100 text-blue-800",
  },
  {
    currency: "EUR",
    flag: "🇪🇺",
    bank: "First Bank",
    logo: "/firstbank-logo.png",
    name: "Care Best Initiative",
    number: "2042788322",
    accent: "bg-yellow-50 border-yellow-200",
    badge: "bg-yellow-100 text-yellow-800",
  },
  {
    currency: "GBP",
    flag: "🇬🇧",
    bank: "First Bank",
    logo: "/firstbank-logo.png",
    name: "Care Best Initiative",
    number: "2042788614",
    accent: "bg-purple-50 border-purple-200",
    badge: "bg-purple-100 text-purple-800",
  },
];

const impact = [
  { icon: Droplets, color: "text-cyan-500 bg-cyan-50",     title: "Clean Water & Sanitation",  desc: "Providing WASH facilities to households lacking safe water and sanitation." },
  { icon: BookOpen, color: "text-blue-500 bg-blue-50",     title: "Education in Emergency",     desc: "Keeping children in school during crises through temporary learning spaces." },
  { icon: Heart,    color: "text-rose-500 bg-rose-50",     title: "Healthcare & Nutrition",     desc: "Delivering primary healthcare and nutrition programs to under-5 children." },
  { icon: Shield,   color: "text-purple-500 bg-purple-50", title: "Protection & GBV",           desc: "Supporting survivors of gender-based violence with holistic services." },
  { icon: Sprout,   color: "text-green-500 bg-green-50",   title: "Food & Livelihoods",         desc: "Restoring food security and income-generation for affected households." },
  { icon: Globe,    color: "text-indigo-500 bg-indigo-50", title: "10 States Coverage",         desc: "Operating across North-East and North-West Nigeria reaching 50K+ beneficiaries." },
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
      {/* ── Hero ── */}
      <div className="bg-cbi-blue-dark py-20 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-cbi-yellow/10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cbi-yellow text-slate-900 text-sm font-bold rounded-full mb-6 uppercase tracking-wide">
            <Heart className="w-4 h-4" /> Support Our Cause
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-5">
            Help Us Make a <span className="text-cbi-yellow italic">Difference</span>
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
            Help us make a difference in the lives of those in need by supporting our mission. Every
            donation directly funds lifesaving programs in nutrition, health, education, clean water,
            and protection across Nigeria.
          </p>
        </div>
      </div>

      {/* ── Donation methods ── */}
      <div className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-cbi-yellow font-semibold text-sm italic flex items-center justify-center gap-2 mb-3">
              <span className="w-6 h-0.5 bg-cbi-yellow inline-block rounded-full" /> Choose a Method
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">How to Donate</h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto leading-relaxed">
              Choose the option that works best for you — bank transfer in your currency or instant online payment via Paystack.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-10 items-start">

            {/* ── Bank Transfer ── */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-cbi-blue rounded-xl flex items-center justify-center">
                  <Landmark className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Donate via Bank Transfer</h3>
                  <p className="text-slate-500 text-sm">Support us directly to our bank accounts</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {bankAccounts.map((acc) => (
                  <div key={acc.currency} className={`rounded-2xl border p-5 ${acc.accent}`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-black ${acc.badge}`}>
                        {acc.flag} {acc.currency}
                      </span>
                      <Image src={acc.logo} alt={acc.bank} width={80} height={28} className="h-7 w-auto object-contain" />
                    </div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-0.5">Account Name</p>
                    <p className="text-sm font-bold text-slate-900 mb-3">{acc.name}</p>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-0.5">Account Number</p>
                    <div className="flex items-center justify-between gap-2 bg-white/70 rounded-lg px-3 py-2">
                      <span className="font-black text-slate-900 tracking-widest text-sm">{acc.number}</span>
                      <CopyButton text={acc.number} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Confirmation CTA */}
              <div className="mt-6 bg-cbi-blue-dark rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-cbi-yellow/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-cbi-yellow" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-semibold leading-snug">
                    After making your transfer, send a confirmation email to:
                  </p>
                  <a
                    href="mailto:donations@cbi.ngo"
                    className="text-cbi-yellow font-black text-sm hover:underline"
                  >
                    donations@cbi.ngo
                  </a>
                  <p className="text-blue-300 text-xs mt-0.5">Include your name and amount so we can acknowledge your support.</p>
                </div>
              </div>
            </div>

            {/* ── Paystack ── */}
            <div className="lg:col-span-2">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-7 text-center sticky top-28">
                <div className="w-16 h-16 bg-cbi-blue rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-md">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">Donate via Paystack</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  Donate with ease through our secure online platform powered by Paystack. Fast, safe, and instant.
                </p>

                <div className="space-y-3 text-left mb-7">
                  {[
                    "Secure & encrypted payment",
                    "Cards, bank transfer & USSD",
                    "Instant donation receipt",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-slate-600">{item}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={PAYSTACK_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-cbi-yellow text-slate-900 font-black text-base rounded-full hover:bg-cbi-yellow-dark transition-colors shadow-lg"
                >
                  <Heart className="w-5 h-5" /> Donate Now via Paystack
                </a>

                <p className="text-slate-400 text-xs mt-4">
                  Powered by Paystack — Nigeria&apos;s trusted payment gateway
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Why Give ── */}
      <div className="bg-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-cbi-yellow font-semibold text-sm uppercase tracking-widest">Accountability</span>
            <h2 className="mt-3 text-3xl font-black text-slate-900">Why Give to CBI?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyUs.map((item) => (
              <div key={item} className="flex items-start gap-3 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-600 text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Where Your Gift Goes ── */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-cbi-yellow font-semibold text-sm uppercase tracking-widest">Your Impact</span>
            <h2 className="mt-3 text-3xl font-black text-slate-900">Where Your Gift Goes</h2>
            <p className="mt-4 text-slate-500 max-w-2xl mx-auto">Every naira, dollar, euro, or pound reaches the people who need it most through these six core program areas.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {impact.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Other ways ── */}
      <div className="bg-slate-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-slate-900 text-center mb-10">Other Ways to Support CBI</h2>
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
                href: "mailto:donations@cbi.ngo?subject=Fundraising for CBI",
                icon: Globe,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-cbi-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{item.desc}</p>
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

      {/* ── Contact CTA ── */}
      <div className="py-16 bg-cbi-blue-dark relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-cbi-yellow/10 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-black text-white mb-4">Questions About Your Donation?</h2>
          <p className="text-blue-200 mb-8 leading-relaxed">Our team is happy to assist with any questions about your gift or how it is put to use.</p>
          <a
            href="mailto:donations@cbi.ngo"
            className="inline-flex items-center gap-2 px-8 py-4 bg-cbi-yellow text-slate-900 rounded-full font-bold text-base hover:bg-cbi-yellow-dark transition-colors shadow-lg"
          >
            <Mail className="w-5 h-5" /> donations@cbi.ngo
          </a>
        </div>
      </div>
    </PageLayout>
  );
}
