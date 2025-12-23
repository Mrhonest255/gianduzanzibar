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
          ? "py-3"
          : "py-6"
      )}
    >
      <div className={cn(
        "container transition-all duration-500",
        isScrolled ? "max-w-6xl" : "max-w-7xl"
      )}>
        <div className={cn(
          "flex items-center justify-between px-6 py-3 transition-all duration-500",
          isScrolled 
            ? "glass-morphism rounded-full" 
            : "bg-transparent"
        )}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-display font-bold text-xl sm:text-2xl">G</span>
            </div>
            <div className="hidden sm:block">
              <p className={cn(
                "font-display font-bold text-lg sm:text-xl leading-tight transition-colors duration-300",
                isScrolled ? "text-foreground" : "text-white"
              )}>
                {COMPANY.shortName}
              </p>
              <p className={cn(
                "text-[10px] font-medium tracking-widest uppercase transition-colors duration-300",
                isScrolled ? "text-primary" : "text-primary-glow"
              )}>
                Tour & Safari
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAVIGATION.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "relative font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:text-primary",
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
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
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
              size="sm"
              className={cn(
                "hidden sm:flex rounded-full px-6 font-bold h-10",
                !isScrolled && "bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20"
              )}
            >
              <a href={`tel:${COMPANY.phone}`}>
                <Phone className="h-3.5 w-3.5 mr-2" />
                <span>{COMPANY.phone}</span>
              </a>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "md:hidden rounded-full h-10 w-10",
                isScrolled ? "text-foreground" : "text-white"
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 md:hidden bg-white flex flex-col"
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
            <nav className="flex-1 overflow-y-auto p-8 flex flex-col gap-8">
              {NAVIGATION.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    className={cn(
                      "text-4xl font-display font-bold transition-colors",
                      location.pathname === item.href
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    )}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="p-8 bg-slate-50 border-t">
              <div className="space-y-4">
                <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-3 text-foreground font-bold">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  {COMPANY.phone}
                </a>
                <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 text-foreground font-bold">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  {COMPANY.email}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
