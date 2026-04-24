import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "../components/AdminSidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const auth = await isAuthenticated();
  if (!auth) redirect("/admin");

  return (
    <div className="flex min-h-screen bg-slate-900">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
