import { getGallery } from "@/lib/data";
import GalleryManager from "./GalleryManager";

export default async function AdminGalleryPage() {
  const items = await getGallery();
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Gallery</h1>
        <p className="text-slate-400 text-sm mt-1">Manage photo gallery items and captions.</p>
      </div>
      <GalleryManager items={items} />
    </div>
  );
}
