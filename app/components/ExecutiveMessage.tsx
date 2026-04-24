import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import Link from "next/link";
import { getSiteSettings } from "@/lib/data";

const checkItems = [
  "Helped fund 3,265 projects across communities",
  "We give every child the gift of education",
  "We help companies develop corporate social responsibility",
  "Community-led, evidence-based programs",
];

export default async function ExecutiveMessage() {
  const s = await getSiteSettings();

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div className="relative h-[520px] order-2 lg:order-1">
            <div className="absolute top-0 left-0 w-52 h-52 rounded-3xl bg-blue-50" />
            <div className="absolute top-6 left-6 w-[60%] h-[72%] overflow-hidden rounded-2xl shadow-xl">
              <div className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${s.aboutImageUrl1}')` }} />
            </div>
            <div className="absolute bottom-0 right-0 w-[54%] h-[58%] overflow-hidden rounded-2xl shadow-xl border-4 border-white">
              <div className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${s.aboutImageUrl2}')` }} />
            </div>
            <div className="absolute bottom-12 left-0 bg-cbi-blue-dark text-white px-6 py-4 rounded-2xl shadow-2xl z-20">
              <div className="text-3xl font-black text-cbi-yellow">{s.aboutBeneficiaryCount}</div>
              <div className="text-xs font-semibold uppercase tracking-wide text-blue-200 mt-0.5">Beneficiaries Reached</div>
            </div>
            <div className="absolute -bottom-6 -left-6 text-cbi-yellow opacity-30">
              <svg width="80" height="30" viewBox="0 0 80 30" fill="none">
                <path d="M2 15 C20 5, 30 25, 50 15 S70 5, 78 15" stroke="#eab308" strokeWidth="3" strokeLinecap="round" fill="none"/>
              </svg>
            </div>
            <div className="absolute bottom-14 right-12 z-30 w-14 h-14 rounded-full bg-cbi-yellow text-slate-900 flex items-center justify-center shadow-lg cursor-pointer hover:bg-cbi-yellow-dark transition-colors">
              <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-2">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-300 rotate-[-90deg] whitespace-nowrap">
                we give donations to communities
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-cbi-yellow font-semibold text-sm italic flex items-center gap-2 mb-4">
              <span className="w-6 h-0.5 bg-cbi-yellow inline-block rounded-full" />
              About Care Best Initiative
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1]">
              Helping Each Other<br />Can Make{" "}
              <span className="text-cbi-blue italic relative">
                Nigeria
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 120 8" fill="none">
                  <path d="M2 5 C30 2, 80 2, 118 5" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </span>{" "}Better
            </h2>

            <p className="mt-6 text-slate-500 leading-relaxed text-base">{s.aboutBody}</p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl">
                <div className="w-10 h-10 rounded-full bg-cbi-yellow/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-cbi-yellow-dark" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Start Helping</p>
                  <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">Raising awareness about our mission and cause.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-cbi-blue" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Make Donations</p>
                  <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">Supporting our charity mission and communities.</p>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2.5">
              {checkItems.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-cbi-blue flex-shrink-0" />
                  <span className="text-slate-600 text-sm">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link href="/about"
                className="inline-flex items-center gap-2 px-8 py-4 bg-cbi-blue text-white font-bold text-base rounded-full hover:bg-cbi-blue-dark transition-colors shadow-md">
                More About Us <ArrowRight className="w-4 h-4" />
              </Link>
              <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 text-slate-700 hover:text-cbi-blue transition-colors">
                <div className="w-11 h-11 rounded-full border-2 border-cbi-blue/20 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-cbi-blue" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Call Us</div>
                  <div className="text-sm font-bold">{s.aboutPhone}</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
