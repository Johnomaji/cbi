"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteTeamMember } from "@/lib/actions";
import { Pencil, Trash2, Users, Plus, Mail } from "lucide-react";
import type { TeamMember } from "@/lib/data";
import TeamForm from "./TeamForm";

export default function TeamManager({ team }: { team: TeamMember[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const sorted = [...team].sort((a, b) => a.order - b.order);

  async function handleDelete(id: string) {
    await deleteTeamMember(id);
    router.refresh();
  }

  function handleDone() {
    setEditing(null);
    router.refresh();
  }

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3">
        <div className="bg-slate-800 rounded-2xl border border-slate-700">
          <div className="p-5 border-b border-slate-700 flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-400" />
            <h2 className="font-semibold text-white">Team</h2>
            <span className="ml-auto text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full">
              {team.length} members
            </span>
          </div>
          <div className="divide-y divide-slate-700">
            {sorted.length === 0 && <p className="p-8 text-center text-slate-600 text-sm">No team members yet.</p>}
            {sorted.map((member) => (
              <div key={member.id} className={`p-5 flex gap-3 items-center transition-colors ${editing?.id === member.id ? "bg-slate-700/50" : ""}`}>
                <div className="w-9 h-9 rounded-full bg-cbi-blue flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {member.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{member.name}</p>
                  <p className="text-xs text-slate-500">{member.title}</p>
                  <p className="text-xs text-blue-400 flex items-center gap-1 mt-0.5">
                    <Mail className="w-3 h-3" />{member.email}
                  </p>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button onClick={() => setEditing(editing?.id === member.id ? null : member)}
                    className={`p-1.5 rounded-lg transition-colors ${editing?.id === member.id ? "text-cbi-yellow bg-amber-950" : "text-slate-400 hover:text-cbi-yellow hover:bg-amber-950"}`}>
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(member.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
          <h2 className="font-semibold text-white mb-5 flex items-center gap-2">
            {editing ? <Pencil className="w-4 h-4 text-cbi-yellow" /> : <Plus className="w-4 h-4 text-amber-400" />}
            {editing ? `Editing: ${editing.name}` : "Add Member"}
          </h2>
          <TeamForm nextOrder={team.length + 1} initial={editing} onDone={handleDone} />
        </div>
      </div>
    </div>
  );
}
