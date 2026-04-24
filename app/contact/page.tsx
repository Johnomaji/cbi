import PageLayout from "@/app/components/PageLayout";
import { getSiteSettings } from "@/lib/data";
import { Mail, Phone, MapPin, ArrowRight, MessageSquare, Clock } from "lucide-react";
import { FaFacebook, FaXTwitter, FaLinkedin, FaInstagram } from "react-icons/fa6";

export const metadata = { title: "Contact Us | Care Best Initiative" };

export default async function ContactPage() {
  const s = await getSiteSettings();

  const socials = [
    { href: s.facebookUrl,  Icon: FaFacebook,  label: "Facebook",  color: "hover:bg-blue-600" },
    { href: s.twitterUrl,   Icon: FaXTwitter,  label: "Twitter",   color: "hover:bg-slate-800" },
    { href: s.linkedinUrl,  Icon: FaLinkedin,  label: "LinkedIn",  color: "hover:bg-blue-700" },
    { href: s.instagramUrl, Icon: FaInstagram, label: "Instagram", color: "hover:bg-pink-600" },
  ].filter((s) => s.href);

  return (
    <PageLayout>
      {/* Hero */}
      <div className="bg-cbi-blue-dark py-20 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-cbi-yellow/10 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-cbi-yellow font-semibold text-sm italic flex items-center gap-2 mb-3">
            <MessageSquare className="w-4 h-4" /> Get in Touch
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
            Contact <span className="text-cbi-yellow italic">Us</span>
          </h1>
          <p className="mt-4 text-blue-200 max-w-xl leading-relaxed">
            Have a question, partnership proposal, or want to support our work? We&apos;d love to hear from you.
          </p>
        </div>
      </div>

      <div className="bg-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">

            {/* Contact info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-black text-slate-900 mb-6">Contact Information</h2>
                <div className="space-y-5">
                  <a href={`mailto:${s.email}`}
                    className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all group">
                    <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-cbi-blue group-hover:text-white transition-colors">
                      <Mail className="w-5 h-5 text-cbi-blue group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Email</p>
                      <p className="font-bold text-slate-900 text-sm">{s.email}</p>
                    </div>
                  </a>

                  <a href={`tel:${s.phone.replace(/\s/g, "")}`}
                    className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all group">
                    <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-cbi-blue transition-colors">
                      <Phone className="w-5 h-5 text-cbi-blue group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Phone</p>
                      <p className="font-bold text-slate-900 text-sm">{s.phone}</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-cbi-blue" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Address</p>
                      <p className="font-bold text-slate-900 text-sm leading-relaxed">{s.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-cbi-blue" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Office Hours</p>
                      <p className="font-bold text-slate-900 text-sm">Monday – Friday</p>
                      <p className="text-slate-500 text-xs mt-0.5">8:00 AM – 5:00 PM WAT</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social links */}
              {socials.length > 0 && (
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Follow Us</h3>
                  <div className="flex gap-3">
                    {socials.map(({ href, Icon, label, color }) => (
                      <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                        className={`w-10 h-10 bg-white border border-slate-200 ${color} rounded-full flex items-center justify-center text-slate-500 hover:text-white transition-colors shadow-sm`}>
                        <Icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Contact form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <h2 className="text-xl font-black text-slate-900 mb-2">Send Us a Message</h2>
                <p className="text-slate-500 text-sm mb-7">Fill in the form below and we&apos;ll get back to you within 2 business days.</p>

                <form action={`mailto:${s.email}`} method="get" className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Full Name *</label>
                      <input type="text" name="name" required placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-cbi-blue focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Email Address *</label>
                      <input type="email" name="email" required placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-cbi-blue focus:border-transparent" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Subject *</label>
                    <select name="subject"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-cbi-blue focus:border-transparent">
                      <option value="">Select a subject</option>
                      <option>General Enquiry</option>
                      <option>Partnership / Collaboration</option>
                      <option>Donation / Funding</option>
                      <option>Volunteer Opportunity</option>
                      <option>Media / Press</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Message *</label>
                    <textarea name="body" rows={6} required placeholder="Write your message here..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-cbi-blue focus:border-transparent resize-none" />
                  </div>

                  <button type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-cbi-blue text-white font-bold rounded-full hover:bg-cbi-blue-dark transition-colors shadow-md">
                    Send Message <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-center text-xs text-slate-400">This will open your email client. Alternatively, email us directly at {s.email}</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map / Location CTA */}
      <div className="bg-cbi-blue-dark py-12 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-cbi-yellow/10 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-cbi-yellow font-semibold text-sm italic mb-1">Our Location</p>
            <h3 className="text-xl font-black text-white">Visit Our Office</h3>
            <p className="text-blue-300 text-sm mt-1">{s.address}</p>
          </div>
          <a href={`https://maps.google.com/?q=${encodeURIComponent(s.address)}`} target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-cbi-yellow text-slate-900 font-bold rounded-full hover:bg-cbi-yellow-dark transition-colors whitespace-nowrap">
            <MapPin className="w-4 h-4" /> View on Maps
          </a>
        </div>
      </div>
    </PageLayout>
  );
}
