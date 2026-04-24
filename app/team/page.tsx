import PageLayout from "@/app/components/PageLayout";
import { getTeam } from "@/lib/data";
import Link from "next/link";
import { Mail, ArrowRight, Users } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import Image from "next/image";

export const metadata = { title: "Our Team | Care Best Initiative" };

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

function MemberCard({ member, index, large = false }: {
  member: { id: string; name: string; title: string; initials: string; email: string; bio?: string };
  index: number;
  large?: boolean;
}) {
  const g = gradients[index % gradients.length];
  const imgSrc = getImagePath(member.name);

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col">
      <Link href={`/team/${member.id}`} className="absolute inset-0 z-0" aria-label={`View ${member.name}'s profile`} />

      {/* ── Image zone (65% of card) ── */}
      <div
        className={`relative overflow-hidden flex-shrink-0 ${large ? "h-72" : "h-56"}`}
        style={{ background: `linear-gradient(160deg, ${g.from} 0%, ${g.to} 100%)` }}
      >
        {/* Gradient fallback decor */}
        <span className="absolute text-[10rem] font-black text-white/10 select-none leading-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          {member.initials[0]}
        </span>
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border border-white/10" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5" />

        {/* Photo */}
        <Image
          src={imgSrc}
          alt={member.name}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 400px"
        />

        {/* Heart icon */}
        <button className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-white/40 transition-colors">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>

        {/* Bottom gradient scrim so name is readable if we ever overlay it */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* ── Footer strip ── */}
      <div className="p-5 flex flex-col flex-1 text-center">
        <h2 className={`font-black text-slate-900 leading-tight ${large ? "text-xl" : "text-base"}`}>{member.name}</h2>
        <p className="text-cbi-blue text-xs font-semibold mt-1">{member.title}</p>

        {large && (
          <p className="text-slate-500 text-sm leading-relaxed mt-2 line-clamp-2 flex-1">
            {member.bio || "Dedicated to delivering lifesaving humanitarian programs across Nigeria."}
          </p>
        )}

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
}

export default async function TeamPage() {
  const members = (await getTeam()).sort((a, b) => a.order - b.order);
  const leadership = members.slice(0, 3);
  const staff = members.slice(3);

  return (
    <PageLayout>

      {/* ── Hero ── */}
      <div className="bg-cbi-blue-dark py-24 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-cbi-yellow/10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-cbi-yellow font-semibold text-sm italic flex items-center justify-center gap-2 mb-4">
            <Users className="w-4 h-4" /> Meet Our Team
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
            The People Behind <span className="text-cbi-yellow italic">Every Impact</span>
          </h1>
          <p className="mt-5 text-blue-200 max-w-xl mx-auto leading-relaxed">
            {members.length} dedicated professionals delivering lifesaving programs across Nigeria&apos;s most vulnerable communities.
          </p>
          <div className="mt-10 flex justify-center gap-10">
            {[
              { num: members.length, label: "Team Members" },
              { num: 10,   label: "States Covered" },
              { num: 2019, label: "Year Founded" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-black text-cbi-yellow">{s.num}</div>
                <div className="text-blue-300 text-xs font-semibold uppercase tracking-wide mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-50">

        {/* ── Leadership ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-3 mb-10">
            <p className="text-cbi-yellow font-semibold text-sm italic whitespace-nowrap">Leadership</p>
            <div className="flex-1 h-px bg-slate-200" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {leadership.map((member, i) => (
              <MemberCard key={member.id} member={member} index={i} large />
            ))}
          </div>
        </div>

        {/* ── Staff ── */}
        {staff.length > 0 && (
          <div className="border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="flex items-center gap-3 mb-10">
                <p className="text-cbi-yellow font-semibold text-sm italic whitespace-nowrap">Staff Members</p>
                <div className="flex-1 h-px bg-slate-200" />
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {staff.map((member, i) => (
                  <MemberCard key={member.id} member={member} index={i + 3} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Join CTA ── */}
        <div className="bg-cbi-blue-dark py-16 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-cbi-yellow/10 pointer-events-none" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-cbi-yellow font-semibold text-sm italic mb-2">Join Our Team</p>
              <h3 className="text-2xl font-black text-white">Want to Make a <span className="text-cbi-yellow italic">Difference</span>?</h3>
              <p className="text-blue-300 text-sm mt-2">We&apos;re always looking for passionate people to join our mission.</p>
            </div>
            <Link href="/careers"
              className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-cbi-yellow text-slate-900 font-bold rounded-full hover:bg-cbi-yellow-dark transition-colors shadow-lg whitespace-nowrap">
              View Open Roles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
