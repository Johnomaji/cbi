import { getTeam } from "@/lib/data";
import TeamManager from "./TeamManager";

export default async function AdminTeamPage() {
  const team = await getTeam();
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Team Members</h1>
        <p className="text-slate-400 text-sm mt-1">Add and manage team profiles.</p>
      </div>
      <TeamManager team={team} />
    </div>
  );
}
