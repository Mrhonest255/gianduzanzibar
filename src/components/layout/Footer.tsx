import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { COMPANY, NAVIGATION } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white pt-32 pb-12 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand */}
          <div className="space-y-10">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-500">
                <span className="text-white font-display font-bold text-2xl">G</span>
              </div>
              <div>
                <p className="font-display font-black text-2xl text-white leading-tight tracking-tighter">
                  {COMPANY.shortName}
                </p>
                <p className="text-[10px] font-black tracking-[0.3em] uppercase text-primary-glow">Tour & Safari</p>
              </div>
            </Link>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              {COMPANY.tagline}. Experience the magic of Zanzibar with our expertly curated tours and authentic local experiences.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: "#" },
                { icon: Instagram, href: "https://instagram.com/gianduzanzibar" },
                { icon: Twitter, href: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-500 border border-white/10 group"
                >
                  <social.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-black text-xl text-white mb-10 tracking-tight">EXPLORE</h4>
            <ul className="space-y-5">
              {NAVIGATION.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-slate-400 hover:text-primary-glow transition-all duration-300 flex items-center gap-3 group font-bold text-sm uppercase tracking-widest"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tours */}
          <div>
            <h4 className="font-display font-black text-xl text-white mb-10 tracking-tight">POPULAR</h4>
            <ul className="space-y-5">
              {[
                { name: "Safari Blue", slug: "safari-blue-full-day" },
                { name: "Nakupenda Sandbank", slug: "nakupenda-sandbank" },
                { name: "Mnemba Snorkeling", slug: "mnemba-island-snorkeling" },
                { name: "Stone Town Tour", slug: "stone-town-private-walking" },
                { name: "Jozani Forest", slug: "jozani-forest-tour" },
              ].map((tour) => (
                <li key={tour.slug}>
                  <Link
                    to={`/tours/${tour.slug}`}
                    className="text-slate-400 hover:text-primary-glow transition-all duration-300 flex items-center gap-3 group font-bold text-sm uppercase tracking-widest"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform" />
                    {tour.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-black text-xl text-white mb-10 tracking-tight">CONTACT</h4>
            <ul className="space-y-8">
              <li className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">Call or WhatsApp</p>
                  <a
                    href={`tel:${COMPANY.phone}`}
                    className="text-white hover:text-primary-glow transition-colors duration-300 font-black text-lg tracking-tight"
                  >
                    {COMPANY.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">Email Us</p>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="text-white hover:text-primary-glow transition-colors duration-300 font-black text-lg tracking-tight"
                  >
                    {COMPANY.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">Location</p>
                  <p className="text-white font-black text-lg tracking-tight">{COMPANY.address}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-10">
            <Link to="/terms" className="text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">Terms</Link>
            <Link to="/privacy" className="text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">Privacy</Link>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Made with ❤️ in Zanzibar
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
