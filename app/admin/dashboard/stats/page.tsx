import { getStats } from "@/lib/data";
import { BarChart3 } from "lucide-react";
import StatsEditor from "./StatsEditor";

export default async function AdminStatsPage() {
  const stats = await getStats();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Impact Statistics</h1>
        <p className="text-slate-400 text-sm mt-1">
          Update the numbers displayed in the impact section on the homepage.
        </p>
      </div>

      <div className="bg-slate-800 rounded-2xl border border-slate-700">
        <div className="p-5 border-b border-slate-700 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-slate-400" />
          <h2 className="font-semibold text-white">Statistics</h2>
        </div>
        <StatsEditor items={stats.items} />
      </div>
    </div>
  );
}
