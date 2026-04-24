import { promises as fs } from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

async function readJSON<T>(filename: string): Promise<T> {
  const file = await fs.readFile(path.join(dataDir, filename), "utf-8");
  return JSON.parse(file) as T;
}

async function writeJSON(filename: string, data: unknown): Promise<void> {
  await fs.writeFile(path.join(dataDir, filename), JSON.stringify(data, null, 2), "utf-8");
}

export interface Announcement {
  id: string; text: string; link: string; linkText: string; active: boolean;
}
export interface Post {
  id: string; slug: string; title: string; excerpt: string; content: string;
  category: string; author: string; date: string; image: string; published: boolean;
}
export interface Event {
  id: string; title: string; description: string; date: string; time: string;
  location: string; type: string; published: boolean;
}
export interface GalleryItem {
  id: string; title: string; caption: string; category: string; date: string; imageUrl: string;
}
export interface Publication {
  id: string; title: string; description: string; type: string; date: string;
  fileUrl: string; published: boolean;
}
export interface StatItem {
  id: string; value: number; suffix: string; label: string; icon: string;
}
export interface TeamMember {
  id: string; name: string; title: string; initials: string; email: string; bio: string; order: number;
}
export interface Program {
  id: string; title: string; description: string; icon: string; order: number; published: boolean;
}
export interface Milestone {
  id: string; year: string; title: string; desc: string; order: number;
}
export interface Testimonial {
  id: string; quote: string; name: string; role: string; initials: string; stars: number;
}
export interface Partner {
  id: string; name: string; logoUrl: string; order: number;
}
export interface CareerOpening {
  id: string; title: string; department: string; location: string; type: string; deadline: string; published: boolean;
}
export interface SiteSettings {
  phone: string;
  email: string;
  address: string;
  facebookUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  heroTagline: string;
  heroHeading: string;
  heroDescription: string;
  heroImageUrl: string;
  heroStat1Value: string; heroStat1Label: string;
  heroStat2Value: string; heroStat2Label: string;
  heroStat3Value: string; heroStat3Label: string;
  aboutBody: string;
  aboutPhone: string;
  aboutImageUrl1: string;
  aboutImageUrl2: string;
  aboutBeneficiaryCount: string;
}

export const getAnnouncements  = () => readJSON<Announcement[]>("announcements.json");
export const saveAnnouncements = (d: Announcement[]) => writeJSON("announcements.json", d);
export const getPosts          = () => readJSON<Post[]>("posts.json");
export const savePosts         = (d: Post[]) => writeJSON("posts.json", d);
export const getEvents         = () => readJSON<Event[]>("events.json");
export const saveEvents        = (d: Event[]) => writeJSON("events.json", d);
export const getGallery        = () => readJSON<GalleryItem[]>("gallery.json");
export const saveGallery       = (d: GalleryItem[]) => writeJSON("gallery.json", d);
export const getPublications   = () => readJSON<Publication[]>("publications.json");
export const savePublications  = (d: Publication[]) => writeJSON("publications.json", d);
export const getStats          = () => readJSON<{ items: StatItem[] }>("stats.json");
export const saveStats         = (d: { items: StatItem[] }) => writeJSON("stats.json", d);
export const getTeam           = () => readJSON<TeamMember[]>("team.json");
export const saveTeam          = (d: TeamMember[]) => writeJSON("team.json", d);
export const getPrograms       = () => readJSON<Program[]>("programs.json");
export const savePrograms      = (d: Program[]) => writeJSON("programs.json", d);
export const getMilestones     = () => readJSON<Milestone[]>("milestones.json");
export const saveMilestones    = (d: Milestone[]) => writeJSON("milestones.json", d);
export const getTestimonials   = () => readJSON<Testimonial[]>("testimonials.json");
export const saveTestimonials  = (d: Testimonial[]) => writeJSON("testimonials.json", d);
export const getPartners       = () => readJSON<Partner[]>("partners.json");
export const savePartners      = (d: Partner[]) => writeJSON("partners.json", d);
export const getCareers        = () => readJSON<CareerOpening[]>("careers.json");
export const saveCareers       = (d: CareerOpening[]) => writeJSON("careers.json", d);
export const getSiteSettings   = () => readJSON<SiteSettings>("siteSettings.json");
export const saveSiteSettings  = (d: SiteSettings) => writeJSON("siteSettings.json", d);
