"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown, Heart } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "Our History", href: "/about#history" },
      { label: "Our Team", href: "/team" },
      { label: "Organization Identity", href: "/about#identity" },
    ],
  },
  {
    label: "Get Involved",
    href: "#",
    children: [
      { label: "Our Programs", href: "/#programs" },
      { label: "Careers", href: "/careers" },
      { label: "Volunteer", href: "/donate" },
      { label: "Partnerships", href: "/donate" },
    ],
  },
  {
    label: "Media",
    href: "/blog",
    children: [
      { label: "News & Stories", href: "/blog" },
      { label: "Gallery", href: "/gallery" },
      { label: "Events", href: "/events" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-100">

      {/* ── Main nav ── */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 bg-cbi-blue rounded-full flex items-center justify-center">
              <span className="text-white font-black text-xs">CBI</span>
            </div>
            <div>
              <div className="font-black text-slate-900 text-base leading-tight">Care Best Initiative</div>
              <div className="text-xs text-slate-400 leading-tight">Delivering Lifesaving Care</div>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/" className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-cbi-blue transition-colors rounded-full hover:bg-blue-50">
              Home
            </Link>
            {navItems.map((item) => (
              <div key={item.label} className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}>
                <Link href={item.href}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-slate-700 hover:text-cbi-blue transition-colors rounded-full hover:bg-blue-50">
                  {item.label}
                  {item.children && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>
                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 w-52 bg-white border border-slate-100 shadow-xl rounded-2xl py-2 z-50 mt-1">
                    {item.children.map((child) => (
                      <Link key={child.label} href={child.href}
                        className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-cbi-blue transition-colors first:rounded-t-xl last:rounded-b-xl">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right: theme + donate */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link href="/donate"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-cbi-yellow text-slate-900 rounded-full text-sm font-bold hover:bg-cbi-yellow-dark transition-colors shadow-sm">
              <Heart className="w-3.5 h-3.5" /> Donate Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button className="p-2 rounded-full text-slate-700 hover:bg-slate-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-100 py-3 space-y-1 bg-white">
            <Link href="/" className="block px-4 py-2.5 text-slate-700 font-semibold text-sm rounded-xl hover:bg-blue-50 hover:text-cbi-blue mx-2"
              onClick={() => setMobileOpen(false)}>Home</Link>
            {navItems.map((item) => (
              <div key={item.label}>
                <button className="w-full flex items-center justify-between px-4 py-2.5 text-slate-700 font-semibold text-sm mx-0"
                  onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}>
                  {item.label}
                  {item.children && <ChevronDown className="w-4 h-4" />}
                </button>
                {item.children && openDropdown === item.label && (
                  <div className="pl-4 py-1 space-y-0.5 bg-blue-50 rounded-xl mx-2 mb-1">
                    {item.children.map((child) => (
                      <Link key={child.label} href={child.href}
                        className="block px-4 py-2 text-sm text-slate-600 hover:text-cbi-blue"
                        onClick={() => setMobileOpen(false)}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="px-2 pt-2">
              <Link href="/donate"
                className="flex items-center justify-center gap-2 px-5 py-3 bg-cbi-yellow text-slate-900 rounded-full text-sm font-bold w-full"
                onClick={() => setMobileOpen(false)}>
                <Heart className="w-4 h-4" /> Donate Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
