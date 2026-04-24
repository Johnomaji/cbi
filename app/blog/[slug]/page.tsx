import PageLayout from "@/app/components/PageLayout";
import { getPosts } from "@/lib/data";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft, ArrowRight, BookOpen, Tag } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const posts = await getPosts();
  const post = posts.find((p) => p.slug === slug && p.published);
  return { title: post ? `${post.title} | Care Best Initiative` : "Blog Post" };
}

const categoryPill: Record<string, string> = {
  Impact:    "bg-blue-100 text-blue-700",
  Programs:  "bg-green-100 text-green-700",
  Stories:   "bg-indigo-100 text-indigo-700",
  Health:    "bg-teal-100 text-teal-700",
  Education: "bg-sky-100 text-sky-700",
  WASH:      "bg-cyan-100 text-cyan-700",
};

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const allPosts = await getPosts();
  const published = allPosts
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const post = published.find((p) => p.slug === slug);
  if (!post) notFound();

  const idx = published.indexOf(post);
  const prev = published[idx + 1];
  const next = published[idx - 1];
  const related = published.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3);

  return (
    <PageLayout>

      {/* ── Hero ── */}
      <div className="bg-cbi-blue-dark relative overflow-hidden py-20">
        <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-cbi-yellow/10" />
        <div className="absolute bottom-0 left-10 w-48 h-48 rounded-full bg-white/5" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-300 hover:text-white text-sm font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-5 ${categoryPill[post.category] ?? "bg-slate-100 text-slate-700"}`}>
            {post.category}
          </span>

          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-5">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-5 text-blue-300 text-sm">
            <span className="flex items-center gap-2"><User className="w-4 h-4" />{post.author}</span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white">

        {/* ── Article body ── */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

          {/* Lead / excerpt */}
          <div className="bg-blue-50 border-l-4 border-cbi-blue rounded-r-xl p-6 mb-10">
            <p className="text-slate-700 font-medium leading-relaxed text-base">{post.excerpt}</p>
          </div>

          {/* Body paragraphs */}
          <div className="space-y-6">
            {post.content.split("\n\n").map((para, i) => (
              <p key={i} className="text-slate-600 leading-relaxed text-base">{para}</p>
            ))}
          </div>

          {/* Tags + share row */}
          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-slate-400" />
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${categoryPill[post.category] ?? "bg-slate-100 text-slate-700"}`}>
                {post.category}
              </span>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-cbi-blue transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> All Stories
            </Link>
          </div>

          {/* Prev / Next */}
          {(prev || next) && (
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prev ? (
                <Link
                  href={`/blog/${prev.slug}`}
                  className="group flex items-start gap-4 p-5 bg-slate-50 rounded-xl hover:bg-blue-50 hover:shadow-md transition-all border border-slate-100"
                >
                  <ArrowLeft className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5 group-hover:text-cbi-blue transition-colors" />
                  <div className="min-w-0">
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-1">Previous</div>
                    <div className="font-bold text-slate-800 text-sm line-clamp-2 group-hover:text-cbi-blue transition-colors">{prev.title}</div>
                  </div>
                </Link>
              ) : <div />}
              {next ? (
                <Link
                  href={`/blog/${next.slug}`}
                  className="group flex items-start gap-4 p-5 bg-slate-50 rounded-xl hover:bg-blue-50 hover:shadow-md transition-all border border-slate-100 sm:flex-row-reverse text-right"
                >
                  <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5 group-hover:text-cbi-blue transition-colors" />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-1">Next</div>
                    <div className="font-bold text-slate-800 text-sm line-clamp-2 group-hover:text-cbi-blue transition-colors">{next.title}</div>
                  </div>
                </Link>
              ) : <div />}
            </div>
          )}
        </div>

        {/* ── Related posts ── */}
        {related.length > 0 && (
          <div className="border-t border-slate-100 bg-slate-50 py-14">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-8">
                <h2 className="text-lg font-black text-slate-900 whitespace-nowrap">More in {post.category}</h2>
                <div className="flex-1 h-px bg-slate-200" />
              </div>
              <div className="grid sm:grid-cols-3 gap-5">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    href={`/blog/${r.slug}`}
                    className="group bg-white rounded-xl border border-slate-100 hover:shadow-lg hover:border-blue-100 transition-all overflow-hidden flex flex-col"
                  >
                    <div className="h-28 bg-cbi-blue-dark flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-cbi-blue opacity-30" />
                      <BookOpen className="relative z-10 w-8 h-8 text-white/30" />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-bold text-slate-800 text-sm leading-snug line-clamp-3 group-hover:text-cbi-blue transition-colors">{r.title}</h3>
                      <span className="text-xs text-slate-400 mt-auto pt-3 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(r.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── CTA ── */}
        <div className="bg-cbi-blue-dark py-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-cbi-yellow/10 -translate-y-1/2 translate-x-1/4" />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-cbi-yellow font-semibold text-xs uppercase tracking-widest mb-3">Make a Difference</p>
            <h3 className="text-2xl font-black text-white mb-3">Inspired by This Story?</h3>
            <p className="text-blue-300 mb-8 max-w-md mx-auto">Your support helps CBI deliver lifesaving care to communities across Nigeria.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 bg-cbi-yellow text-slate-900 font-bold px-8 py-3.5 rounded-full hover:bg-cbi-yellow-dark transition-colors"
              >
                Donate Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-bold px-8 py-3.5 rounded-full hover:border-white/60 transition-colors"
              >
                More Stories
              </Link>
            </div>
          </div>
        </div>

      </div>
    </PageLayout>
  );
}
