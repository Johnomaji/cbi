import PageLayout from "@/app/components/PageLayout";
import { getCareers } from "@/lib/data";
import { Mail, MapPin, Clock, ChevronRight, Users, Star, Heart, Globe, BookOpen, Shield } from "lucide-react";

export const metadata = { title: "Careers | Care Best Initiative" };

const benefits = [
  { icon: Heart,     title: "Purposeful Work",       desc: "Every role directly contributes to lifesaving programs for vulnerable communities." },
  { icon: Star,      title: "Professional Growth",   desc: "Access to trainings, workshops, and capacity development opportunities." },
  { icon: Users,     title: "Collaborative Culture", desc: "Work with passionate colleagues and international humanitarian partners." },
  { icon: Globe,     title: "Field Experience",      desc: "Opportunities to work directly in communities across Nigeria." },
  { icon: BookOpen,  title: "Learning Environment",  desc: "Continuous learning through MEAL systems, peer exchange, and mentoring." },
  { icon: Shield,    title: "Safe Workplace",        desc: "Committed to staff welfare, security, and a respectful work environment." },
];

const departments = [
  { name: "Programs & Implementation",    desc: "WASH, Health, Nutrition, Education, Protection, Livelihoods" },
  { name: "Monitoring, Evaluation & Learning", desc: "MEAL systems, data collection, reporting and accountability" },
  { name: "Finance & Administration",     desc: "Financial management, donor compliance, procurement" },
  { name: "Logistics & Supply Chain",     desc: "Fleet management, warehousing, distribution" },
  { name: "Human Resources",             desc: "Talent management, staff welfare, organizational development" },
  { name: "Information & Communications", desc: "Digital systems, communications, visibility" },
];

export default async function CareersPage() {
  const openings = (await getCareers()).filter((c) => c.published);

  return (
    <PageLayout>
      <div className="bg-cbi-blue-dark py-20 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-cbi-yellow/10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-cbi-yellow font-semibold text-sm flex items-center gap-2 mb-3">
            <span className="w-6 h-0.5 bg-cbi-yellow inline-block" /> Join Our Team
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
            Build a Career With <span className="text-cbi-yellow italic">Purpose</span>
          </h1>
          <p className="mt-4 text-blue-200 max-w-2xl text-lg leading-relaxed">
            Care Best Initiative is always looking for talented, committed individuals who share our passion
            for humanitarian action and community resilience across Nigeria.
          </p>
        </div>
      </div>

      <div className="bg-bg transition-colors">
        <div className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-cbi-yellow font-semibold text-sm uppercase tracking-widest">Opportunities</span>
                <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-fg">Current Openings</h2>
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                {openings.length} {openings.length === 1 ? "Opening" : "Openings"}
              </span>
            </div>

            {openings.length === 0 ? (
              <div className="bg-surface border border-border rounded-2xl p-12 text-center">
                <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Users className="w-8 h-8 text-fg3" />
                </div>
                <h3 className="font-bold text-fg text-xl mb-3">No Open Positions Right Now</h3>
                <p className="text-fg2 max-w-md mx-auto leading-relaxed mb-6">
                  We don&apos;t have any active postings at the moment, but we&apos;re always interested in hearing
                  from talented individuals. Send us your CV and we&apos;ll be in touch when a suitable role opens up.
                </p>
                <a href="mailto:careers@cbi.ngo?subject=Spontaneous Application to CBI"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-cbi-blue text-white rounded-full font-semibold hover:bg-cbi-blue-dark transition-colors">
                  <Mail className="w-4 h-4" /> Submit Your CV
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {openings.map((job) => (
                  <div key={job.id} className="bg-surface border border-border rounded-2xl p-6 flex flex-wrap gap-4 items-center justify-between hover:shadow-md transition-all">
                    <div>
                      <h3 className="font-bold text-fg text-lg">{job.title}</h3>
                      <div className="flex flex-wrap gap-3 mt-2 text-sm text-fg3">
                        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{job.department}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{job.type}</span>
                        <span className="flex items-center gap-1 text-cbi-yellow font-medium">Deadline: {job.deadline}</span>
                      </div>
                    </div>
                    <a href={`mailto:careers@cbi.ngo?subject=Application for ${job.title}`}
                      className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-cbi-blue text-white rounded-full font-semibold text-sm hover:bg-cbi-blue-dark transition-colors">
                      Apply Now <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-muted transition-colors py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-cbi-yellow font-semibold text-sm uppercase tracking-widest">Why CBI</span>
              <h2 className="mt-3 text-3xl font-bold text-fg">Life at Care Best Initiative</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((b) => {
                const Icon = b.icon;
                return (
                  <div key={b.title} className="bg-surface border border-border rounded-2xl p-6 hover:shadow-md transition-all">
                    <div className="w-12 h-12 bg-cbi-blue/10 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-cbi-blue" />
                    </div>
                    <h3 className="font-bold text-fg mb-2">{b.title}</h3>
                    <p className="text-fg2 text-sm leading-relaxed">{b.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-cbi-yellow font-semibold text-sm uppercase tracking-widest">Structure</span>
              <h2 className="mt-3 text-3xl font-bold text-fg">Our Departments</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {departments.map((dept) => (
                <div key={dept.name} className="bg-surface border border-border rounded-2xl p-5 hover:border-cbi-blue/30 hover:shadow-sm transition-all">
                  <div className="w-2 h-2 bg-cbi-blue rounded-full mb-3" />
                  <h3 className="font-bold text-fg text-sm">{dept.name}</h3>
                  <p className="text-fg3 text-xs mt-1 leading-relaxed">{dept.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-cbi-blue-dark py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">How to Apply</h2>
            <p className="text-blue-200 mb-8 leading-relaxed">
              Send your CV, cover letter, and any relevant certifications to our HR team. Clearly state the position in the subject line.
            </p>
            <a href="mailto:careers@cbi.ngo?subject=Job Application – [Position Title]"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-cbi-blue-dark rounded-full font-bold hover:bg-blue-50 transition-colors">
              <Mail className="w-4 h-4" /> careers@cbi.ngo
            </a>
            <p className="text-blue-300 text-sm mt-5">We are an equal opportunity employer.</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
