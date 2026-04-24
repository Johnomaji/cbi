import PageLayout from "@/app/components/PageLayout";
import { getGallery } from "@/lib/data";
import GalleryGrid from "./GalleryGrid";

export const metadata = { title: "Gallery | Care Best Initiative" };

export default async function GalleryPage() {
  const items = await getGallery();

  return (
    <PageLayout>
      <div className="bg-cbi-blue-dark relative overflow-hidden py-20">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-cbi-yellow/10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-cbi-yellow font-semibold text-sm flex items-center gap-2 mb-3">
            <span className="w-6 h-0.5 bg-cbi-yellow inline-block" /> Visual Impact
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">Photo Gallery</h1>
          <p className="mt-4 text-blue-200 max-w-2xl leading-relaxed">
            Images from the field — documenting the lives we touch and the communities we serve.
          </p>
        </div>
      </div>
      <GalleryGrid items={items} />
    </PageLayout>
  );
}
