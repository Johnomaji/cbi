import Link from "next/link";
import { Mail, MapPin, ArrowRight } from "lucide-react";
import { FaFacebook, FaXTwitter, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa6";
import { getSiteSettings } from "@/lib/data";

export default async function Footer() {
  const s = await getSiteSettings();

  const socials = [
    { href: s.facebookUrl,  Icon: FaFacebook,  label: "Facebook",  hover: "hover:bg-cbi-blue" },
    { href: s.twitterUrl,   Icon: FaXTwitter,  label: "Twitter",   hover: "hover:bg-cbi-blue" },
    { href: s.linkedinUrl,  Icon: FaLinkedin,  label: "LinkedIn",  hover: "hover:bg-blue-700" },
    { href: s.instagramUrl, Icon: FaInstagram, label: "Instagram", hover: "hover:bg-pink-600" },
    { href: s.youtubeUrl,   Icon: FaYoutube,   label: "YouTube",   hover: "hover:bg-red-600" },
  ].filter((s) => s.href);

  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 bg-cbi-blue rounded-full flex items-center justify-center">
                <span className="text-white font-bold">CBI</span>
              </div>
              <div>
                <div className="text-white font-bold">Care Best Initiative</div>
                <div className="text-slate-500 text-xs">Delivering Lifesaving Care</div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-5">A National NGO established in 2019, delivering integrated humanitarian programs across Nigeria&apos;s North-East and North-West regions.</p>
            <div className="flex gap-3">
              {socials.map(({ href, Icon, label, hover }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className={`w-8 h-8 bg-slate-800 ${hover} rounded-full flex items-center justify-center transition-colors`}>
                  <Icon className="w-3.5 h-3.5 text-white" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">About Us</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "History",               href: "/about#history" },
                { label: "Our Team",              href: "/team" },
                { label: "Organization Identity", href: "/about#identity" },
                { label: "Careers",               href: "/careers" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-white transition-colors flex items-center gap-1.5">
                    <ArrowRight className="w-3 h-3" /> {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Blog",         href: "/blog" },
                { label: "Gallery",      href: "/gallery" },
                { label: "Publications", href: "/publications" },
                { label: "Events",       href: "/events" },
                { label: "Donate",       href: "/donate" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-white transition-colors flex items-center gap-1.5">
                    <ArrowRight className="w-3 h-3" /> {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2.5">
                <Mail className="w-4 h-4 text-cbi-blue mt-0.5 flex-shrink-0" />
                <a href={`mailto:${s.email}`} className="hover:text-white transition-colors">{s.email}</a>
              </li>
              <li className="flex gap-2.5">
                <MapPin className="w-4 h-4 text-cbi-blue mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{s.address}</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-3 text-sm">Newsletter</h4>
              <div className="flex gap-2">
                <input type="email" placeholder="Your email"
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cbi-blue" />
                <button className="px-3 py-2 bg-cbi-blue text-white rounded-lg text-sm hover:bg-cbi-blue-dark transition-colors font-medium">Join</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-600">
          <span>© {new Date().getFullYear()} Care Best Initiative. All rights reserved.</span>
          <span>Registered National NGO · Nigeria</span>
        </div>
      </div>
    </footer>
  );
}
