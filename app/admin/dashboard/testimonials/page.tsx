import { getTestimonials } from "@/lib/data";
import TestimonialManager from "./TestimonialManager";

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials();
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Testimonials</h1>
        <p className="text-slate-400 text-sm mt-1">Manage community testimonials shown on the homepage.</p>
      </div>
      <TestimonialManager testimonials={testimonials} />
    </div>
  );
}
