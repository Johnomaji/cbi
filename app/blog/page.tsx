import PageLayout from "@/app/components/PageLayout";
import { getPosts } from "@/lib/data";
import Link from "next/link";
import { Calendar, User, ArrowRight, BookOpen, ArrowUpRight } from "lucide-react";

export const metadata = { title: "Blog | Care Best Initiative" };

const categoryPill: Record<string, string> = {
  Impact:    "bg-blue-100 text-blue-700",
  Programs:  "bg-green-100 text-green-700",
  Stories:   "bg-indigo-100 text-indigo-700",
  Health:    "bg-teal-100 text-teal-700",
  Education: "bg-sky-100 text-sky-700",
  WASH:      "bg-cyan-100 text-cyan-700",
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default async function BlogPage() {
  const posts = (await getPosts())
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const [featured, ...rest] = posts;

  return (
    <PageLayout>

      {/* ── Hero ── */}
      <div className="bg-cbi-blue-dark relative overflow-hidden py-24">
        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10 bg-cbi-yellow" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 bg-cbi-blue-light translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-cbi-yellow font-semibold text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-6 h-0.5 bg-cbi-yellow inline-block" /> Our Stories
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight max-w-2xl">
            News, Stories &amp; <span className="text-cbi-yellow italic">Impact</span> Updates
          </h1>
          <p className="mt-5 text-blue-200 max-w-xl leading-relaxed text-base">
            Read the latest from our field teams, program updates, and stories of lives changed across Nigeria.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {Array.from(new Set(posts.map(p => p.category))).map(cat => (
              <span key={cat} className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/20">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          {/* ── Featured ── */}
          {featured && (
            <div className="mb-14">
              <div className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white border border-slate-100">
                <Link href={`/blog/${featured.slug}`} className="absolute inset-0 z-0" aria-label={featured.title} />

                <div className="grid lg:grid-cols-2">
                  {/* Image / illustration zone */}
                  <div className="bg-cbi-blue-dark min-h-64 lg:min-h-full flex flex-col justify-end p-10 relative overflow-hidden">
                    {/* Decorative */}
                    <div className="absolute top-6 right-6 w-32 h-32 rounded-full border-2 border-white/10" />
                    <div className="absolute top-12 right-12 w-20 h-20 rounded-full border-2 border-white/10" />
                    <BookOpen className="absolute bottom-8 right-8 w-24 h-24 text-white/5" />

                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 w-fit ${categoryPill[featured.category] ?? "bg-slate-100 text-slate-700"}`}>
                      {featured.category}
                    </span>
                    <p className="text-white/60 text-sm font-medium">Featured Story</p>
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <h2 className="text-2xl lg:text-3xl font-black text-slate-900 leading-snug mb-4">
                      {featured.title}
                    </h2>
                    <p className="text-slate-500 leading-relaxed mb-6 line-clamp-4">{featured.excerpt}</p>
                    <div className="flex items-center gap-5 text-sm text-slate-400 mb-8">
                      <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{featured.author}</span>
                      <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{formatDate(featured.date)}</span>
                    </div>
                    <div className="relative z-10">
                      <span className="inline-flex items-center gap-2 bg-cbi-yellow text-slate-900 font-bold text-sm px-7 py-3 rounded-full group-hover:bg-cbi-yellow-dark transition-colors">
                        Read Full Story <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Section heading ── */}
          {rest.length > 0 && (
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-xl font-black text-slate-900 whitespace-nowrap">Latest Articles</h2>
              <div className="flex-1 h-px bg-slate-100" />
            </div>
          )}

          {/* ── Cards grid ── */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {rest.map((post) => (
              <div key={post.id} className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col">
                <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-0" aria-label={post.title} />

                {/* Top colour band + icon */}
                <div className="bg-cbi-blue-dark h-44 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-cbi-blue opacity-40" />
                  <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-white/5" />
                  <div className="absolute top-4 left-4 w-16 h-16 rounded-full bg-cbi-yellow/10" />
                  <BookOpen className="relative z-10 w-12 h-12 text-white/30" />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold mb-3 w-fit ${categoryPill[post.category] ?? "bg-slate-100 text-slate-700"}`}>
                    {post.category}
                  </span>
                  <h3 className="font-black text-slate-900 text-base leading-snug mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 flex-1 mb-5">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" />{post.author}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(post.date)}</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 flex-shrink-0 text-slate-300 group-hover:text-cbi-blue group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-24 rounded-2xl bg-slate-50 border border-slate-100">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-700 font-bold text-lg">No posts published yet</p>
              <p className="text-slate-400 text-sm mt-2">Check back soon for stories from the field.</p>
            </div>
          )}
        </div>
      </div>

      {/* ── CTA banner ── */}
      <div className="bg-cbi-blue-dark py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-cbi-yellow/10 -translate-y-1/2 translate-x-1/4" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center gap-8 justify-between">
          <div>
            <p className="text-cbi-yellow font-semibold text-xs uppercase tracking-widest mb-2">Stay Connected</p>
            <h3 className="text-2xl font-black text-white">Want More Stories Like These?</h3>
            <p className="text-blue-300 text-sm mt-2 max-w-md">Subscribe to get field updates and impact reports from CBI delivered to your inbox.</p>
          </div>
          <Link
            href="mailto:info@cbi.ngo?subject=Subscribe to CBI Newsletter"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-cbi-yellow text-slate-900 font-bold px-8 py-3.5 rounded-full hover:bg-cbi-yellow-dark transition-colors whitespace-nowrap"
          >
            Subscribe <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </PageLayout>
  );
}
