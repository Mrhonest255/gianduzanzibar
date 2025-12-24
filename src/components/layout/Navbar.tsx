import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY, NAVIGATION } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
          : "py-5"
      )}
    >
      <div className={cn(
        "container transition-all duration-500",
        isScrolled ? "max-w-6xl" : "max-w-7xl"
      )}>
        <div className={cn(
          "flex items-center justify-between px-6 py-3 transition-all duration-500 rounded-2xl",
          isScrolled 
            ? "glass-morphism shadow-premium" 
            : "bg-transparent"
        )}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-display font-bold text-xl">G</span>
            </div>
            <div className="hidden sm:block">
              <p className={cn(
                "font-display font-bold text-lg leading-tight transition-colors duration-300",
                isScrolled ? "text-foreground" : "text-white"
              )}>
                {COMPANY.shortName}
              </p>
              <p className={cn(
                "text-[10px] font-semibold tracking-widest uppercase transition-colors duration-300",
                isScrolled ? "text-primary" : "text-primary"
              )}>
                Tour & Safari
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {NAVIGATION.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "relative px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300",
                  location.pathname === item.href
                    ? "text-primary bg-primary/10"
                    : isScrolled
                    ? "text-foreground hover:text-primary hover:bg-primary/5"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* WhatsApp CTA */}
            <Button
              asChild
              size="sm"
              className={cn(
                "hidden sm:flex rounded-full px-5 h-10 font-bold gap-2 btn-premium",
                isScrolled 
                  ? "bg-primary hover:bg-primary/90 text-white shadow-glow" 
                  : "bg-white text-slate-900 hover:bg-white/90"
              )}
            >
              <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                <span className="hidden lg:inline">WhatsApp</span>
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
            
            <nav className="flex-1 overflow-y-auto p-6 flex flex-col gap-2">
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
                      "block py-4 px-4 text-2xl font-bold rounded-xl transition-colors",
                      location.pathname === item.href
                        ? "text-primary bg-primary/10"
                        : "text-foreground hover:text-primary hover:bg-slate-50"
                    )}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
            
            <div className="p-6 bg-slate-50 border-t space-y-4">
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
              <Button asChild className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-lg">
                <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
