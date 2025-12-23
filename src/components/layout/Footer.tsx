import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { COMPANY, NAVIGATION } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-ocean flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-lg">G</span>
              </div>
              <div>
                <p className="font-display font-semibold text-lg text-background leading-tight">
                  {COMPANY.shortName}
                </p>
                <p className="text-xs text-background/60">Tour & Safari</p>
              </div>
            </div>
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              {COMPANY.tagline}. Experience the magic of Zanzibar with our expertly curated tours and authentic local experiences.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors duration-300"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors duration-300"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors duration-300"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {NAVIGATION.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-background/70 hover:text-primary transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/terms"
                  className="text-background/70 hover:text-primary transition-colors duration-300"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-background/70 hover:text-primary transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Tours */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Popular Tours</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/tours/safari-blue-full-day"
                  className="text-background/70 hover:text-primary transition-colors duration-300"
                >
                  Safari Blue
                </Link>
              </li>
              <li>
                <Link
                  to="/tours/prison-island-snorkeling"
                  className="text-background/70 hover:text-primary transition-colors duration-300"
                >
                  Prison Island
                </Link>
              </li>
              <li>
                <Link
                  to="/tours/mnemba-island-snorkeling"
                  className="text-background/70 hover:text-primary transition-colors duration-300"
                >
                  Mnemba Snorkeling
                </Link>
              </li>
              <li>
                <Link
                  to="/tours/stone-town-walking-tour"
                  className="text-background/70 hover:text-primary transition-colors duration-300"
                >
                  Stone Town Tour
                </Link>
              </li>
              <li>
                <Link
                  to="/tours/spice-farm-tour"
                  className="text-background/70 hover:text-primary transition-colors duration-300"
                >
                  Spice Farm
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-background/60">Call or WhatsApp</p>
                  <a
                    href={`tel:${COMPANY.phone}`}
                    className="text-background hover:text-primary transition-colors duration-300"
                  >
                    {COMPANY.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-background/60">Email Us</p>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="text-background hover:text-primary transition-colors duration-300"
                  >
                    {COMPANY.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-background/60">Location</p>
                  <p className="text-background">{COMPANY.address}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/60">
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <p className="text-sm text-background/60">
            Made with ❤️ in Zanzibar
          </p>
        </div>
      </div>
    </footer>
  );
}
