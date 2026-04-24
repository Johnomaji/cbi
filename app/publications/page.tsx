import PageLayout from "@/app/components/PageLayout";
import { getPublications } from "@/lib/data";
import { FileText, Download, Calendar, BookMarked } from "lucide-react";

export const metadata = { title: "Publications | Care Best Initiative" };

const typeCls: Record<string, string> = {
  "Annual Report":    "bg-blue-100 text-blue-700",
  "Assessment Report":"bg-amber-100 text-amber-700",
  "Situation Report": "bg-red-100 text-red-700",
  "Learning Brief":   "bg-green-100 text-green-700",
  "Strategic Document":"bg-purple-100 text-purple-700",
};

export default async function PublicationsPage() {
  const publications = (await getPublications()).filter((p) => p.published);
  return (
    <PageLayout>
      <div className="bg-cbi-blue-dark relative overflow-hidden py-20">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-cbi-yellow/10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-cbi-yellow font-semibold text-sm flex items-center gap-2 mb-3">
            <span className="w-6 h-0.5 bg-cbi-yellow inline-block" /> Knowledge &amp; Evidence
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">Publications</h1>
          <p className="mt-4 text-blue-200 max-w-2xl leading-relaxed">Reports, assessments, and strategic documents from Care Best Initiative.</p>
        </div>
      </div>
      <div className="py-16 bg-bg transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {publications.map((pub) => (
            <div key={pub.id} className="bg-surface border border-border rounded-2xl p-6 hover:shadow-md transition-all flex gap-5 items-start">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(29,78,216,.1)" }}>
                <FileText className="w-6 h-6 text-cbi-blue" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 items-center mb-2">
                  <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${typeCls[pub.type] ?? "bg-slate-100 text-slate-600"}`}>
                    <BookMarked className="w-3 h-3" />{pub.type}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-fg3">
                    <Calendar className="w-3 h-3" />{new Date(pub.date).toLocaleDateString("en-GB",{month:"long",year:"numeric"})}
                  </span>
                </div>
                <h3 className="font-bold text-fg text-base mb-1">{pub.title}</h3>
                <p className="text-fg2 text-sm leading-relaxed">{pub.description}</p>
              </div>
              <a href={pub.fileUrl} className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-cbi-blue text-white rounded-full text-sm font-semibold hover:bg-cbi-blue-dark transition-colors">
                <Download className="w-4 h-4" /> Download
              </a>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
