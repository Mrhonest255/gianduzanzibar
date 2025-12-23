import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { COMPANY, NAVIGATION } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-foreground text-background pt-24 pb-12 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-display font-bold text-2xl">G</span>
              </div>
              <div>
                <p className="font-display font-bold text-xl text-white leading-tight">
                  {COMPANY.shortName}
                </p>
                <p className="text-xs font-bold tracking-widest uppercase text-primary">Tour & Safari</p>
              </div>
            </Link>
            <p className="text-background/60 text-lg leading-relaxed">
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
                  className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 border border-white/10"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-xl text-white mb-8">Quick Links</h4>
            <ul className="space-y-4">
              {NAVIGATION.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-background/60 hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
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
            <h4 className="font-display font-bold text-xl text-white mb-8">Popular Tours</h4>
            <ul className="space-y-4">
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
                    className="text-background/60 hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
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
            <h4 className="font-display font-bold text-xl text-white mb-8">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Call or WhatsApp</p>
                  <a
                    href={`tel:${COMPANY.phone}`}
                    className="text-white hover:text-primary transition-colors duration-300 font-bold"
                  >
                    {COMPANY.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Email Us</p>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="text-white hover:text-primary transition-colors duration-300 font-bold"
                  >
                    {COMPANY.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Location</p>
                  <p className="text-white font-bold">{COMPANY.address}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-sm text-background/40">
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link to="/terms" className="text-sm text-background/40 hover:text-white transition-colors">Terms</Link>
            <Link to="/privacy" className="text-sm text-background/40 hover:text-white transition-colors">Privacy</Link>
            <p className="text-sm text-background/40">
              Made with ❤️ in Zanzibar
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
