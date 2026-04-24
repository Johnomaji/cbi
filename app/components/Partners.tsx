import { getPartners } from "@/lib/data";

export default async function Partners() {
  const partners = (await getPartners()).sort((a, b) => a.order - b.order);
  if (partners.length === 0) return null;

  return (
    <section className="py-14 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-slate-400 text-xs font-semibold uppercase tracking-widest mb-8">
          Trusted by leading humanitarian organizations
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {partners.map((p) => (
            <div key={p.id}
              className="px-6 py-3 border border-slate-200 rounded-full text-slate-500 font-semibold text-sm hover:border-cbi-blue hover:text-cbi-blue transition-colors bg-white shadow-sm">
              {p.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
