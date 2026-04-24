import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, Users } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import type { TeamMember } from "@/lib/data";

const gradients = [
  { from: "#1d4ed8", to: "#1e3a8a" },
  { from: "#4338ca", to: "#3730a3" },
  { from: "#0f766e", to: "#115e59" },
];

function getImagePath(name: string) {
  return `/${name.split(" ")[0].toLowerCase()}.jpg`;
}

export default function TeamPreview({ members }: { members: TeamMember[] }) {
  const sorted = [...members].sort((a, b) => a.order - b.order).slice(0, 3);

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-cbi-yellow font-semibold text-sm italic flex items-center justify-center gap-2 mb-3">
            <Users className="w-4 h-4" /> Meet Our Volunteer Members
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            The Faces Behind <span className="text-cbi-blue italic">Our Mission</span>
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto leading-relaxed">
            Dedicated professionals driving humanitarian impact across Nigeria&apos;s most vulnerable communities.
          </p>
        </div>

        {/* Team cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {sorted.map((member, i) => {
            const g = gradients[i % gradients.length];
            return (
              <div key={member.id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden text-center relative">

                {/* Photo zone */}
                <div
                  className="relative h-52 overflow-hidden flex-shrink-0"
                  style={{ background: `linear-gradient(160deg, ${g.from} 0%, ${g.to} 100%)` }}
                >
                  <span className="absolute text-[6rem] font-black text-white/10 select-none leading-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    {member.initials[0]}
                  </span>
                  <Image
                    src={getImagePath(member.name)}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <div className="px-6 pb-7 pt-5">
                  <h3 className="font-black text-slate-900 text-lg">{member.name}</h3>
                  <p className="text-cbi-blue text-sm font-semibold mt-1">{member.title}</p>

                  <p className="text-slate-500 text-sm leading-relaxed mt-3 line-clamp-3">
                    {member.bio || "Dedicated to delivering lifesaving humanitarian programs across Nigeria's most vulnerable communities."}
                  </p>

                  {/* Social icons */}
                  <div className="mt-5 flex items-center justify-center gap-3">
                    <a href={`mailto:${member.email}`} aria-label="Email"
                      className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-cbi-blue hover:text-cbi-blue transition-colors">
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                    <a href="#" aria-label="LinkedIn"
                      className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-blue-600 hover:text-blue-600 transition-colors">
                      <FaLinkedin className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Yellow follow button */}
                  <Link href={`/team/${member.id}`}
                    className="mt-5 inline-flex items-center gap-2 px-6 py-2.5 bg-cbi-yellow text-slate-900 text-sm font-bold rounded-full hover:bg-cbi-yellow-dark transition-colors w-full justify-center">
                    View Profile <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-14 text-center">
          <p className="text-slate-500 text-sm mb-5">
            We are a team of <span className="text-slate-900 font-bold">{members.length} dedicated professionals</span> across Nigeria.
          </p>
          <Link href="/team"
            className="inline-flex items-center gap-2 px-8 py-4 bg-cbi-blue text-white font-bold rounded-full hover:bg-cbi-blue-dark transition-colors shadow-md">
            Meet the Full Team <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
