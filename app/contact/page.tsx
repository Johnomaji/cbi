import PageLayout from "@/app/components/PageLayout";
import { getSiteSettings } from "@/lib/data";
import { Mail, Phone, MapPin, ArrowRight, MessageSquare, Clock } from "lucide-react";

const offices = [
  { name: "CBI Head Office",     location: "Abuja",     address: "No. 139, Aero Gardens Estate, Kyami, Airport Road, Abuja",                                              email: "admin@cbi.ngo",    phone: "+234(0)9153493317", isHQ: true  },
  { name: "Borno State Office",  location: "Maiduguri", address: "Behind UN House, Pompomari By-pass, Maiduguri",                                                         email: "borno@cbi.ngo",    phone: "+234(0)9154692357", isHQ: false },
  { name: "Adamawa State Office",location: "Yola",      address: "No. 6, Opposite Dunamis Church, Bature, Yola North",                                                    email: "adamawa@cbi.ngo",  phone: "+234(0)9154692360", isHQ: false },
  { name: "Yobe State Office",   location: "Damaturu",  address: "Muhammad Buhari Way, Don-Etiebet Extension, Behind Mai Riga's House, Damaturu",                        email: "yobe@cbi.ngo",     phone: "+234(0)9154692355", isHQ: false },
  { name: "Bauchi State Office", location: "Bauchi",    address: "No.12 Dass Park, Behind Larema Hotel, Opp. Christ Embassy Church, New GRA, Bauchi",                   email: "bauchi@cbi.ngo",   phone: "+234(0)9154692348", isHQ: false },
  { name: "Zamfara State Office",location: "Gusau",     address: "White House, Behind Governor's House, GRA, Gusau",                                                     email: "zamfara@cbi.ngo",  phone: "+234(0)9153493300", isHQ: false },
  { name: "Sokoto State Office", location: "Sokoto",    address: "No. 31, Alero Road, Opposite Magistrate Court, Runji Sambo",                                           email: "sokoto@cbi.ngo",   phone: "+234(0)9153493344", isHQ: false },
];
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

      {/* Offices grid */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-cbi-yellow font-semibold text-sm uppercase tracking-widest">Presence</span>
            <h2 className="mt-3 text-3xl font-black text-slate-900">Our Offices</h2>
            <p className="mt-4 text-slate-500 max-w-lg mx-auto leading-relaxed">
              We operate from seven locations across Nigeria — reach out to the office nearest to you.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {offices.map((office) => (
              <div
                key={office.name}
                className={`rounded-2xl border p-6 flex flex-col gap-3 shadow-sm hover:shadow-md transition-all duration-300 ${
                  office.isHQ ? "bg-cbi-blue border-cbi-blue" : "bg-white border-slate-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                    office.isHQ ? "bg-cbi-yellow/20" : "bg-blue-50"
                  }`}>
                    <MapPin className={`w-4 h-4 ${office.isHQ ? "text-cbi-yellow" : "text-cbi-blue"}`} />
                  </div>
                  <div>
                    <h3 className={`font-black text-sm leading-tight ${office.isHQ ? "text-white" : "text-slate-900"}`}>{office.name}</h3>
                    <p className={`text-xs font-semibold ${office.isHQ ? "text-cbi-yellow" : "text-cbi-blue"}`}>{office.location}</p>
                  </div>
                </div>
                <p className={`text-xs leading-relaxed ${office.isHQ ? "text-blue-200" : "text-slate-500"}`}>{office.address}</p>
                <div className={`space-y-1.5 pt-2 border-t ${office.isHQ ? "border-white/20" : "border-slate-100"}`}>
                  <a href={`mailto:${office.email}`} className={`flex items-center gap-2 text-xs font-semibold hover:underline ${office.isHQ ? "text-cbi-yellow" : "text-cbi-blue"}`}>
                    <Mail className="w-3 h-3 flex-shrink-0" />{office.email}
                  </a>
                  <a href={`tel:${office.phone.replace(/[^+\d]/g, "")}`} className={`flex items-center gap-2 text-xs ${office.isHQ ? "text-blue-200" : "text-slate-500"}`}>
                    <Phone className="w-3 h-3 flex-shrink-0" />{office.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map / Location CTA */}
      <div className="bg-cbi-blue-dark py-12 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-cbi-yellow/10 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-cbi-yellow font-semibold text-sm italic mb-1">Head Office</p>
            <h3 className="text-xl font-black text-white">Visit Our Main Office</h3>
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
