import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, ArrowRight, Send } from "lucide-react";
import { COMPANY, NAVIGATION } from "@/lib/constants";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-display text-3xl md:text-4xl font-bold mb-2">
                Get <span className="text-primary">Exclusive</span> Offers
              </h3>
              <p className="text-white/60">Subscribe to receive special deals and travel inspiration.</p>
            </div>
            <div className="flex w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 lg:w-80 px-6 py-4 bg-white/5 border border-white/10 rounded-l-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-primary/50 transition-colors"
              />
              <button className="px-6 py-4 bg-gradient-to-r from-primary to-primary/80 rounded-r-2xl hover:from-primary/90 hover:to-primary transition-all group">
                <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-glow">
                <span className="text-white font-display font-bold text-xl">G</span>
              </div>
              <div>
                <p className="font-display font-bold text-xl text-white leading-tight">
                  {COMPANY.shortName}
                </p>
                <p className="text-xs text-white/50 uppercase tracking-widest">Tour & Safari</p>
              </div>
            </div>
            <p className="text-white/60 leading-relaxed mb-8">
              {COMPANY.tagline}. Experience the magic of Zanzibar with expertly curated tours and authentic local experiences.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Twitter, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300"
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6 text-white">Quick Links</h4>
            <ul className="space-y-4">
              {NAVIGATION.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="group flex items-center gap-2 text-white/60 hover:text-primary transition-colors duration-300"
                  >
                    <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/terms"
                  className="group flex items-center gap-2 text-white/60 hover:text-primary transition-colors duration-300"
                >
                  <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  <span>Terms & Conditions</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Tours */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6 text-white">Popular Tours</h4>
            <ul className="space-y-4">
              {[
                { name: "Safari Blue", slug: "safari-blue-full-day" },
                { name: "Prison Island", slug: "prison-island-snorkeling" },
                { name: "Mnemba Snorkeling", slug: "mnemba-island-snorkeling" },
                { name: "Stone Town Tour", slug: "stone-town-walking-tour" },
                { name: "Spice Farm", slug: "spice-farm-tour" },
              ].map((tour) => (
                <li key={tour.slug}>
                  <Link
                    to={`/tours/${tour.slug}`}
                    className="group flex items-center gap-2 text-white/60 hover:text-primary transition-colors duration-300"
                  >
                    <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    <span>{tour.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6 text-white">Contact Us</h4>
            <ul className="space-y-5">
              <li>
                <a 
                  href={`tel:${COMPANY.phone}`}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                    <Phone className="h-5 w-5 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Call or WhatsApp</p>
                    <p className="text-white group-hover:text-primary transition-colors">
                      {COMPANY.phone}
                    </p>
                  </div>
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                    <Mail className="h-5 w-5 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Email Us</p>
                    <p className="text-white group-hover:text-primary transition-colors">
                      {COMPANY.email}
                    </p>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Location</p>
                  <p className="text-white">{COMPANY.address}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-white/50">
            <span>Made with</span>
            <span className="text-red-500 animate-pulse">❤️</span>
            <span>in Zanzibar</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
