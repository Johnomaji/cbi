import Link from "next/link";
import { ArrowRight, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cbi-blue-dark flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-cbi-yellow/10 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-4 h-4 rounded-full bg-cbi-yellow hidden lg:block" />
      <div className="absolute bottom-1/3 left-1/4 w-3 h-3 rounded-full bg-white/30 hidden lg:block" />

      <div className="relative text-center max-w-lg">
        {/* 404 number */}
        <div className="text-[10rem] font-black leading-none text-white/10 select-none mb-0">
          404
        </div>

        <div className="-mt-8 relative z-10">
          <p className="text-cbi-yellow font-semibold text-sm italic mb-4 flex items-center justify-center gap-2">
            <Search className="w-4 h-4" /> Page Not Found
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
            Oops! This Page<br />
            <span className="text-cbi-yellow italic">Doesn&apos;t Exist</span>
          </h1>
          <p className="text-blue-200 leading-relaxed mb-8 max-w-sm mx-auto">
            The page you&apos;re looking for may have been moved, deleted, or never existed.
            Let&apos;s get you back on track.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-cbi-yellow text-slate-900 font-bold rounded-full hover:bg-cbi-yellow-dark transition-colors shadow-lg">
              <Home className="w-4 h-4" /> Back to Home
            </Link>
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-colors">
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
            {[
              { label: "About Us", href: "/about" },
              { label: "Blog",     href: "/blog" },
              { label: "Events",   href: "/events" },
              { label: "Donate",   href: "/donate" },
            ].map((link) => (
              <Link key={link.label} href={link.href}
                className="text-blue-300 hover:text-white transition-colors font-medium">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
