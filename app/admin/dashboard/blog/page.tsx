import { getPosts } from "@/lib/data";
import BlogManager from "./BlogManager";

export default async function AdminBlogPage() {
  const posts = await getPosts();
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
        <p className="text-slate-400 text-sm mt-1">Create and manage blog posts.</p>
      </div>
      <BlogManager posts={posts} />
    </div>
  );
}
