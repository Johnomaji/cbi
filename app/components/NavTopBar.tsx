import { Mail, Phone } from "lucide-react";
import { FaFacebook, FaXTwitter, FaLinkedin, FaInstagram } from "react-icons/fa6";
import { getSiteSettings } from "@/lib/data";

export default async function NavTopBar() {
  const s = await getSiteSettings();

  const socials = [
    { href: s.facebookUrl,  Icon: FaFacebook,  label: "Facebook" },
    { href: s.twitterUrl,   Icon: FaXTwitter,  label: "Twitter" },
    { href: s.linkedinUrl,  Icon: FaLinkedin,  label: "LinkedIn" },
    { href: s.instagramUrl, Icon: FaInstagram, label: "Instagram" },
  ].filter((s) => s.href);

  return (
    <div className="bg-cbi-blue-dark text-white text-xs py-2 px-4 hidden md:flex justify-between items-center">
      <div className="flex items-center gap-5 text-blue-200">
        <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" />{s.email}</span>
        <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" />{s.phone}</span>
      </div>
      <div className="flex gap-3 items-center">
        {socials.map(({ href, Icon, label }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
            className="text-blue-300 hover:text-white transition-colors">
            <Icon className="w-3.5 h-3.5" />
          </a>
        ))}
      </div>
    </div>
  );
}
