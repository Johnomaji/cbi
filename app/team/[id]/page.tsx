import PageLayout from "@/app/components/PageLayout";
import { getTeam } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowLeft, ArrowRight, Briefcase, MapPin, Building2 } from "lucide-react";
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";

export async function generateStaticParams() {
  const members = await getTeam();
  return members.map((m) => ({ id: m.id }));
}

export async function generateMetadata(props: PageProps<"/team/[id]">) {
  const { id } = await props.params;
  const members = await getTeam();
  const member = members.find((m) => m.id === id);
  return { title: member ? `${member.name} | Care Best Initiative` : "Team Member" };
}

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

export default async function TeamMemberPage(props: PageProps<"/team/[id]">) {
  const { id } = await props.params;
  const members = await getTeam();
  const sorted = [...members].sort((a, b) => a.order - b.order);
  const member = sorted.find((m) => m.id === id);
  if (!member) notFound();

  const index = sorted.indexOf(member);
  const g = gradients[index % gradients.length];
  const prev = sorted[index - 1];
  const next = sorted[index + 1];
  const imgSrc = getImagePath(member.name);

  return (
    <PageLayout>

      {/* ── Top nav bar ── */}
      <div className="bg-cbi-blue-dark py-6 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-cbi-yellow/10 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/team"
            className="inline-flex items-center gap-2 text-blue-300 hover:text-white text-sm font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Team
          </Link>
          <p className="text-cbi-yellow font-semibold text-xs italic">Team Member</p>
        </div>
      </div>

      <div className="bg-slate-50 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">

          {/* ── Main profile card ── */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
            <div className="flex flex-col md:flex-row">

              {/* ── Left: large image panel ── */}
              <div
                className="md:w-2/5 min-h-[420px] md:min-h-[560px] relative flex-shrink-0"
                style={{ background: `linear-gradient(160deg, ${g.from} 0%, ${g.to} 100%)` }}
              >
                {/* Gradient fallback decor */}
                <span className="absolute text-[11rem] font-black text-white/5 select-none leading-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
                  {member.initials[0]}
                </span>
                <div className="absolute top-8 right-8 w-36 h-36 rounded-full border border-white/10 z-0" />
                <div className="absolute bottom-10 left-8 w-28 h-28 rounded-full bg-white/5 z-0" />

                {/* Photo — fills the entire panel */}
                <Image
                  src={imgSrc}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 480px"
                  priority
                />

                {/* Bottom scrim for the name overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/70 to-transparent z-10" />

                {/* Name + role overlaid on photo at the bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h1 className="text-2xl font-black text-white leading-tight">{member.name}</h1>
                  <p className="mt-1 text-white/80 font-semibold text-sm">{member.title}</p>
                  <p className="mt-1 text-white/50 text-xs flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Care Best Initiative · Nigeria
                  </p>
                  {/* Social icons on photo */}
                  <div className="mt-4 flex items-center gap-2">
                    <a href={`mailto:${member.email}`} aria-label="Email"
                      className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                    <a href="#" aria-label="LinkedIn"
                      className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                      <FaLinkedin className="w-3.5 h-3.5" />
                    </a>
                    <a href="#" aria-label="Twitter"
                      className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                      <FaXTwitter className="w-3.5 h-3.5" />
                    </a>
                    <a href={`mailto:${member.email}`}
                      className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 bg-cbi-yellow text-slate-900 font-bold text-xs rounded-full hover:bg-cbi-yellow-dark transition-colors">
                      <Mail className="w-3 h-3" /> Send Email
                    </a>
                  </div>
                </div>
              </div>

              {/* ── Right: bio + details ── */}
              <div className="flex-1 p-8 lg:p-12 flex flex-col">

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-cbi-blue text-xs font-bold rounded-full">
                    <Briefcase className="w-3 h-3" /> {member.title}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full">
                    <Building2 className="w-3 h-3" /> Care Best Initiative
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full">
                    <MapPin className="w-3 h-3" /> Nigeria
                  </span>
                </div>

                {/* Bio */}
                <h2 className="font-black text-slate-900 text-base mb-4 flex items-center gap-3">
                  About
                  <span className="flex-1 h-px bg-slate-100" />
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed text-base flex-1">
                  {(member.bio || "Dedicated to delivering integrated humanitarian programs across Nigeria's most vulnerable communities, bringing expertise and passion to every aspect of Care Best Initiative's work.")
                    .split("\n\n")
                    .map((para, i) => <p key={i}>{para}</p>)}
                </div>

                {/* Contact */}
                <div className="mt-10 pt-6 border-t border-slate-100">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Contact</h3>
                  <div className="space-y-3">
                    <a href={`mailto:${member.email}`}
                      className="flex items-center gap-3 text-sm text-slate-600 hover:text-cbi-blue transition-colors group">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                        <Mail className="w-3.5 h-3.5 text-cbi-blue" />
                      </div>
                      <span className="truncate font-medium">{member.email}</span>
                    </a>
                    <a href="#"
                      className="flex items-center gap-3 text-sm text-slate-600 hover:text-blue-700 transition-colors group">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                        <FaLinkedin className="w-3.5 h-3.5 text-blue-700" />
                      </div>
                      <span className="font-medium">LinkedIn Profile</span>
                    </a>
                    <a href="#"
                      className="flex items-center gap-3 text-sm text-slate-600 hover:text-slate-900 transition-colors group">
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0 group-hover:bg-slate-100 transition-colors">
                        <FaXTwitter className="w-3.5 h-3.5 text-slate-600" />
                      </div>
                      <span className="font-medium">Twitter / X</span>
                    </a>
                  </div>
                </div>

                {/* Org info */}
                <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-3 gap-4">
                  {[
                    { label: "Organization", value: "Care Best Initiative" },
                    { label: "Location",     value: "Nigeria" },
                    { label: "Est.",         value: "2019" },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-xs text-slate-400 font-medium">{item.label}</p>
                      <p className="text-slate-800 font-bold text-sm mt-0.5">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Prev / Next ── */}
          {(prev || next) && (
            <div className="mt-8 grid grid-cols-2 gap-4">
              {prev ? (
                <Link href={`/team/${prev.id}`}
                  className="group flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-100 transition-all">
                  <ArrowLeft className="w-4 h-4 text-slate-400 flex-shrink-0 group-hover:text-cbi-blue transition-colors" />
                  <div className="min-w-0">
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-1">Previous</div>
                    <div className="font-black text-slate-800 text-sm truncate group-hover:text-cbi-blue transition-colors">{prev.name}</div>
                    <div className="text-xs text-slate-400 truncate">{prev.title}</div>
                  </div>
                </Link>
              ) : <div />}
              {next ? (
                <Link href={`/team/${next.id}`}
                  className="group flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-100 transition-all flex-row-reverse text-right">
                  <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0 group-hover:text-cbi-blue transition-colors" />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-1">Next</div>
                    <div className="font-black text-slate-800 text-sm truncate group-hover:text-cbi-blue transition-colors">{next.name}</div>
                    <div className="text-xs text-slate-400 truncate">{next.title}</div>
                  </div>
                </Link>
              ) : <div />}
            </div>
          )}
        </div>

        {/* ── CTA ── */}
        <div className="bg-cbi-blue-dark mt-16 py-14 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-cbi-yellow/10 pointer-events-none" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-cbi-yellow font-semibold text-sm italic mb-2">Our Team</p>
              <h3 className="text-xl font-black text-white">Explore More Team Members</h3>
              <p className="text-blue-300 text-sm mt-1">Meet all the people making impact across Nigeria.</p>
            </div>
            <Link href="/team"
              className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-cbi-yellow text-slate-900 font-bold rounded-full hover:bg-cbi-yellow-dark transition-colors whitespace-nowrap">
              View Full Team <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
