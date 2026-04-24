"use server";

import { revalidatePath } from "next/cache";
import {
  getAnnouncements, saveAnnouncements,
  getPosts, savePosts,
  getEvents, saveEvents,
  getTeam, saveTeam,
  getStats, saveStats,
  getGallery, saveGallery,
  getPublications, savePublications,
  getPrograms, savePrograms,
  getMilestones, saveMilestones,
  getTestimonials, saveTestimonials,
  getPartners, savePartners,
  getCareers, saveCareers,
  getSiteSettings, saveSiteSettings,
  type Announcement, type Post, type Event, type TeamMember,
  type StatItem, type GalleryItem, type Publication,
  type Program, type Milestone, type Testimonial, type Partner,
  type CareerOpening, type SiteSettings,
} from "./data";
import { isAuthenticated } from "./auth";

async function checkAuth() {
  if (!(await isAuthenticated())) throw new Error("Unauthorized");
}
function newId(): string { return Date.now().toString(); }

// ── Announcements ──────────────────────────────────────────────
export async function upsertAnnouncement(data: Omit<Announcement, "id"> & { id?: string }) {
  await checkAuth();
  const items = await getAnnouncements();
  if (data.id) { const i = items.findIndex((a) => a.id === data.id); if (i !== -1) items[i] = data as Announcement; }
  else items.unshift({ ...data, id: newId() });
  await saveAnnouncements(items);
  revalidatePath("/"); revalidatePath("/admin/dashboard/announcements");
}
export async function deleteAnnouncement(id: string) {
  await checkAuth();
  await saveAnnouncements((await getAnnouncements()).filter((a) => a.id !== id));
  revalidatePath("/"); revalidatePath("/admin/dashboard/announcements");
}

// ── Blog Posts ─────────────────────────────────────────────────
export async function upsertPost(data: Omit<Post, "id"> & { id?: string }) {
  await checkAuth();
  const items = await getPosts();
  if (data.id) { const i = items.findIndex((p) => p.id === data.id); if (i !== -1) items[i] = data as Post; }
  else items.unshift({ ...data, id: newId() });
  await savePosts(items);
  revalidatePath("/blog"); revalidatePath("/admin/dashboard/blog");
}
export async function deletePost(id: string) {
  await checkAuth();
  await savePosts((await getPosts()).filter((p) => p.id !== id));
  revalidatePath("/blog"); revalidatePath("/admin/dashboard/blog");
}

// ── Events ────────────────────────────────────────────────────
export async function upsertEvent(data: Omit<Event, "id"> & { id?: string }) {
  await checkAuth();
  const items = await getEvents();
  if (data.id) { const i = items.findIndex((e) => e.id === data.id); if (i !== -1) items[i] = data as Event; }
  else items.unshift({ ...data, id: newId() });
  await saveEvents(items);
  revalidatePath("/events"); revalidatePath("/admin/dashboard/events");
}
export async function deleteEvent(id: string) {
  await checkAuth();
  await saveEvents((await getEvents()).filter((e) => e.id !== id));
  revalidatePath("/events"); revalidatePath("/admin/dashboard/events");
}

// ── Team ──────────────────────────────────────────────────────
export async function upsertTeamMember(data: Omit<TeamMember, "id"> & { id?: string }) {
  await checkAuth();
  const items = await getTeam();
  if (data.id) { const i = items.findIndex((m) => m.id === data.id); if (i !== -1) items[i] = data as TeamMember; }
  else items.push({ ...data, id: newId() });
  await saveTeam(items);
  revalidatePath("/team"); revalidatePath("/"); revalidatePath("/admin/dashboard/team");
}
export async function deleteTeamMember(id: string) {
  await checkAuth();
  await saveTeam((await getTeam()).filter((m) => m.id !== id));
  revalidatePath("/team"); revalidatePath("/"); revalidatePath("/admin/dashboard/team");
}

// ── Stats ─────────────────────────────────────────────────────
export async function upsertStat(data: Omit<StatItem, "id"> & { id?: string }) {
  await checkAuth();
  const current = await getStats();
  if (data.id) { const i = current.items.findIndex((s) => s.id === data.id); if (i !== -1) current.items[i] = data as StatItem; }
  else current.items.push({ ...data, id: newId() });
  await saveStats(current);
  revalidatePath("/"); revalidatePath("/admin/dashboard/stats");
}
export async function updateStat(data: StatItem) {
  await checkAuth();
  const current = await getStats();
  const i = current.items.findIndex((s) => s.id === data.id);
  if (i !== -1) current.items[i] = data;
  await saveStats(current);
  revalidatePath("/"); revalidatePath("/admin/dashboard/stats");
}
export async function deleteStat(id: string) {
  await checkAuth();
  const current = await getStats();
  current.items = current.items.filter((s) => s.id !== id);
  await saveStats(current);
  revalidatePath("/"); revalidatePath("/admin/dashboard/stats");
}

// ── Gallery ───────────────────────────────────────────────────
export async function upsertGalleryItem(data: Omit<GalleryItem, "id"> & { id?: string }) {
  await checkAuth();
  const items = await getGallery();
  if (data.id) { const i = items.findIndex((g) => g.id === data.id); if (i !== -1) items[i] = data as GalleryItem; }
  else items.unshift({ ...data, id: newId() });
  await saveGallery(items);
  revalidatePath("/gallery"); revalidatePath("/admin/dashboard/gallery");
}
export async function deleteGalleryItem(id: string) {
  await checkAuth();
  await saveGallery((await getGallery()).filter((g) => g.id !== id));
  revalidatePath("/gallery"); revalidatePath("/admin/dashboard/gallery");
}

// ── Publications ──────────────────────────────────────────────
export async function upsertPublication(data: Omit<Publication, "id"> & { id?: string }) {
  await checkAuth();
  const items = await getPublications();
  if (data.id) { const i = items.findIndex((p) => p.id === data.id); if (i !== -1) items[i] = data as Publication; }
  else items.unshift({ ...data, id: newId() });
  await savePublications(items);
  revalidatePath("/publications"); revalidatePath("/admin/dashboard/publications");
}
export async function deletePublication(id: string) {
  await checkAuth();
  await savePublications((await getPublications()).filter((p) => p.id !== id));
  revalidatePath("/publications"); revalidatePath("/admin/dashboard/publications");
}

// ── Programs ──────────────────────────────────────────────────
export async function upsertProgram(data: Omit<Program, "id"> & { id?: string }) {
  await checkAuth();
  const items = await getPrograms();
  if (data.id) { const i = items.findIndex((p) => p.id === data.id); if (i !== -1) items[i] = data as Program; }
  else items.push({ ...data, id: newId() });
  await savePrograms(items);
  revalidatePath("/"); revalidatePath("/admin/dashboard/programs");
}
export async function deleteProgram(id: string) {
  await checkAuth();
  await savePrograms((await getPrograms()).filter((p) => p.id !== id));
  revalidatePath("/"); revalidatePath("/admin/dashboard/programs");
}

// ── Milestones ────────────────────────────────────────────────
export async function upsertMilestone(data: Omit<Milestone, "id"> & { id?: string }) {
  await checkAuth();
  const items = await getMilestones();
  if (data.id) { const i = items.findIndex((m) => m.id === data.id); if (i !== -1) items[i] = data as Milestone; }
  else items.push({ ...data, id: newId() });
  await saveMilestones(items);
  revalidatePath("/"); revalidatePath("/admin/dashboard/milestones");
}
export async function deleteMilestone(id: string) {
  await checkAuth();
  await saveMilestones((await getMilestones()).filter((m) => m.id !== id));
  revalidatePath("/"); revalidatePath("/admin/dashboard/milestones");
}

// ── Testimonials ──────────────────────────────────────────────
export async function upsertTestimonial(data: Omit<Testimonial, "id"> & { id?: string }) {
  await checkAuth();
  const items = await getTestimonials();
  if (data.id) { const i = items.findIndex((t) => t.id === data.id); if (i !== -1) items[i] = data as Testimonial; }
  else items.push({ ...data, id: newId() });
  await saveTestimonials(items);
  revalidatePath("/"); revalidatePath("/admin/dashboard/testimonials");
}
export async function deleteTestimonial(id: string) {
  await checkAuth();
  await saveTestimonials((await getTestimonials()).filter((t) => t.id !== id));
  revalidatePath("/"); revalidatePath("/admin/dashboard/testimonials");
}

// ── Partners ──────────────────────────────────────────────────
export async function upsertPartner(data: Omit<Partner, "id"> & { id?: string }) {
  await checkAuth();
  const items = await getPartners();
  if (data.id) { const i = items.findIndex((p) => p.id === data.id); if (i !== -1) items[i] = data as Partner; }
  else items.push({ ...data, id: newId() });
  await savePartners(items);
  revalidatePath("/"); revalidatePath("/admin/dashboard/partners");
}
export async function deletePartner(id: string) {
  await checkAuth();
  await savePartners((await getPartners()).filter((p) => p.id !== id));
  revalidatePath("/"); revalidatePath("/admin/dashboard/partners");
}

// ── Careers ───────────────────────────────────────────────────
export async function upsertCareer(data: Omit<CareerOpening, "id"> & { id?: string }) {
  await checkAuth();
  const items = await getCareers();
  if (data.id) { const i = items.findIndex((c) => c.id === data.id); if (i !== -1) items[i] = data as CareerOpening; }
  else items.unshift({ ...data, id: newId() });
  await saveCareers(items);
  revalidatePath("/careers"); revalidatePath("/admin/dashboard/careers");
}
export async function deleteCareer(id: string) {
  await checkAuth();
  await saveCareers((await getCareers()).filter((c) => c.id !== id));
  revalidatePath("/careers"); revalidatePath("/admin/dashboard/careers");
}

// ── Site Settings ─────────────────────────────────────────────
export async function updateSiteSettings(data: SiteSettings) {
  await checkAuth();
  await saveSiteSettings(data);
  revalidatePath("/"); revalidatePath("/contact"); revalidatePath("/admin/dashboard/settings");
}
