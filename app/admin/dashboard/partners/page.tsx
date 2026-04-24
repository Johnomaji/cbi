import { getPartners } from "@/lib/data";
import PartnerManager from "./PartnerManager";

export default async function AdminPartnersPage() {
  const partners = await getPartners();
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Partners</h1>
        <p className="text-slate-400 text-sm mt-1">Manage partner organisations displayed on the homepage.</p>
      </div>
      <PartnerManager partners={partners} />
    </div>
  );
}
