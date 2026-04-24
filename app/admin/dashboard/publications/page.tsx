import { getPublications } from "@/lib/data";
import PublicationManager from "./PublicationManager";

export default async function AdminPublicationsPage() {
  const publications = await getPublications();
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Publications</h1>
        <p className="text-slate-400 text-sm mt-1">Manage reports, briefs, and research documents.</p>
      </div>
      <PublicationManager publications={publications} />
    </div>
  );
}
