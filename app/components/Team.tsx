import Image from "next/image";
import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import type { TeamMember } from "@/lib/data";

const gradients = [
  { from: "#1d4ed8", to: "#1e3a8a" },
  { from: "#4338ca", to: "#3730a3" },
  { from: "#0f766e", to: "#115e59" },
  { from: "#7c3aed", to: "#6d28d9" },
  { from: "#0369a1", to: "#075985" },
  { from: "#15803d", to: "#14532d" },
  { from: "#be185d", to: "#9d174d" },
  { from: "#0e7490", to: "#164e63" },
  { from: "#b45309", to: "#92400e" },
];

function getImagePath(name: string) {
  return `/${name.split(" ")[0].toLowerCase()}.jpg`;
}

export default function Team({ members }: { members: TeamMember[] }) {
  const sorted = [...members].sort((a, b) => a.order - b.order);

  return (
    <section id="team" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-cbi-yellow font-semibold text-sm flex items-center justify-center gap-2 mb-3">
            <span className="w-6 h-0.5 bg-cbi-yellow inline-block" /> Our People
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Meet the Team</h2>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-base leading-relaxed">
            Dedicated professionals committed to driving positive change across Nigeria&apos;s most vulnerable communities.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sorted.map((member, index) => {
            const g = gradients[index % gradients.length];
            const imgSrc = getImagePath(member.name);
            return (
              <div key={member.id} className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col">
                <Link href={`/team/${member.id}`} className="absolute inset-0 z-0" aria-label={`View ${member.name}'s profile`} />

                {/* Image zone */}
                <div
                  className="relative h-52 flex-shrink-0 overflow-hidden"
                  style={{ background: `linear-gradient(160deg, ${g.from} 0%, ${g.to} 100%)` }}
                >
                  <span className="absolute text-[8rem] font-black text-white/10 select-none leading-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    {member.initials[0]}
                  </span>
                  <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full border border-white/10" />
                  <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/5" />
                  <Image
                    src={imgSrc}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                {/* Content strip */}
                <div className="p-5 flex flex-col flex-1 text-center">
                  <h3 className="font-black text-slate-900 text-base leading-tight">{member.name}</h3>
                  <p className="text-cbi-blue text-xs font-semibold mt-1">{member.title}</p>

                  <div className="relative z-10 mt-4 flex items-center justify-center gap-2">
                    <a href={`mailto:${member.email}`} aria-label="Email"
                      className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-cbi-blue hover:text-cbi-blue transition-colors">
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                    <a href="#" aria-label="LinkedIn"
                      className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-blue-600 hover:text-blue-600 transition-colors">
                      <FaLinkedin className="w-3.5 h-3.5" />
                    </a>
                    <span className="ml-2 inline-flex items-center gap-1.5 px-4 py-1.5 bg-cbi-yellow text-slate-900 text-xs font-bold rounded-full group-hover:bg-cbi-yellow-dark transition-colors whitespace-nowrap">
                      View Profile <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
