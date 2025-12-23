import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Globe, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY, NAVIGATION } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/90 backdrop-blur-lg shadow-lg py-3"
          : "bg-transparent py-6"
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
            <span className="text-white font-display font-bold text-2xl">G</span>
          </div>
          <div className="hidden sm:block">
            <p className={cn(
              "font-display font-bold text-xl leading-tight transition-colors duration-300",
              isScrolled ? "text-foreground" : "text-white"
            )}>
              {COMPANY.shortName}
            </p>
            <p className={cn(
              "text-xs font-medium tracking-widest uppercase transition-colors duration-300",
              isScrolled ? "text-primary" : "text-primary-glow"
            )}>
              Tour & Safari
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {NAVIGATION.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "relative font-semibold text-sm uppercase tracking-wider transition-all duration-300 hover:text-primary",
                location.pathname === item.href
                  ? "text-primary"
                  : isScrolled
                  ? "text-foreground"
                  : "text-white"
              )}
            >
              {item.name}
              {location.pathname === item.href && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-primary rounded-full"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Phone CTA */}
          <Button
            asChild
            variant={isScrolled ? "default" : "outline"}
            size="lg"
            className={cn(
              "hidden sm:flex rounded-full px-6 font-bold",
              !isScrolled && "bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20"
            )}
          >
            <a href={`tel:${COMPANY.phone}`}>
              <Phone className="h-4 w-4 mr-2" />
              <span>{COMPANY.phone}</span>
            </a>
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "md:hidden rounded-full",
              isScrolled ? "text-foreground" : "text-white"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 md:hidden bg-background flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <span className="text-white font-display font-bold text-xl">G</span>
                </div>
                <span className="font-display font-bold text-lg">{COMPANY.shortName}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex-1 overflow-y-auto p-8 flex flex-col gap-6">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "text-3xl font-display font-bold transition-colors",
                    location.pathname === item.href
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="p-8 border-t bg-muted/30">
              <p className="text-sm text-muted-foreground mb-4 uppercase tracking-widest font-bold">Contact Us</p>
              <div className="space-y-4">
                <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-3 text-xl font-bold">
                  <Phone className="h-5 w-5 text-primary" />
                  {COMPANY.phone}
                </a>
                <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 text-lg text-muted-foreground">
                  <Mail className="h-5 w-5 text-primary" />
                  {COMPANY.email}
                </a>
              </div>
              <Button asChild className="w-full mt-8 rounded-full h-14 text-lg font-bold">
                <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer">
                  Book on WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
