import { getCareers } from "@/lib/data";
import CareerManager from "./CareerManager";

export default async function AdminCareersPage() {
  const careers = await getCareers();
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Career Openings</h1>
        <p className="text-slate-400 text-sm mt-1">Manage job and volunteer openings displayed on the careers page.</p>
      </div>
      <CareerManager careers={careers} />
    </div>
  );
}
