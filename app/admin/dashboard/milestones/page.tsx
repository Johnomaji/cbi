import { getMilestones } from "@/lib/data";
import MilestoneManager from "./MilestoneManager";

export default async function AdminMilestonesPage() {
  const milestones = await getMilestones();
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Milestones</h1>
        <p className="text-slate-400 text-sm mt-1">Manage the success story timeline shown on the homepage.</p>
      </div>
      <MilestoneManager milestones={milestones} />
    </div>
  );
}
