import Image from "next/image";

const logos = [
  { src: "/UNICPF-Logo.jpeg",                                                   alt: "UNICEF" },
  { src: "/wf6555s74a-wfp-logo-storybook.png",                                  alt: "WFP" },
  { src: "/UNFPA-logo.jpg",                                                      alt: "UNFPA" },
  { src: "/IOM.jpg",                                                             alt: "IOM" },
  { src: "/usaid-logo-png.jpg",                                                  alt: "USAID" },
  { src: "/FCDO-logo-600x600-1.png",                                             alt: "FCDO" },
  { src: "/united-nations-cerf-central-emergency-response-fund-vector-logo.png", alt: "UN CERF" },
  { src: "/drc-logo.jpg",                                                        alt: "DRC" },
  { src: "/caritas-vector-logo.png",                                             alt: "Caritas" },
  { src: "/CAFOD.png",                                                           alt: "CAFOD" },
  { src: "/17.-nhf.png",                                                         alt: "NHF" },
  { src: "/Sterling-One-Foundation.jpg",                                         alt: "Sterling One Foundation" },
  { src: "/AHI-Logo.png",                                                        alt: "AHI" },
  { src: "/JDF-Logo.png",                                                        alt: "JDF" },
  { src: "/RAAI-Logo.jpg.jpeg",                                                  alt: "RAAI" },
  { src: "/seal-1-922x1024.jpg.jpeg",                                            alt: "Partner" },
  { src: "/images-1.png",                                                        alt: "Partner" },
  { src: "/idd_wblhIS_1774447979092.jpeg",                                       alt: "Partner" },
];

const doubled = [...logos, ...logos];

export default function Partners() {
  return (
    <section className="py-14 bg-white border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <p className="text-center text-slate-400 text-xs font-semibold uppercase tracking-widest">
          Trusted by leading humanitarian organizations
        </p>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex animate-logo-scroll whitespace-nowrap">
          {doubled.map((logo, i) => (
            <div
              key={i}
              className="inline-flex items-center justify-center flex-shrink-0 mx-8 h-14 w-28"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={112}
                height={56}
                className="max-h-14 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
