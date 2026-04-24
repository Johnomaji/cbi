import { getPrograms } from "@/lib/data";
import ProgramManager from "./ProgramManager";

export default async function AdminProgramsPage() {
  const programs = await getPrograms();
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Programs</h1>
        <p className="text-slate-400 text-sm mt-1">Manage the programs displayed on the homepage and about page.</p>
      </div>
      <ProgramManager programs={programs} />
    </div>
  );
}
