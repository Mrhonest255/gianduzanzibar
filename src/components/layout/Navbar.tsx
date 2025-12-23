import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Globe } from "lucide-react";
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-soft py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-ocean flex items-center justify-center shadow-soft group-hover:shadow-medium transition-shadow duration-300">
            <span className="text-primary-foreground font-display font-bold text-lg">G</span>
          </div>
          <div className="hidden sm:block">
            <p className={cn(
              "font-display font-semibold text-lg leading-tight transition-colors duration-300",
              isScrolled ? "text-foreground" : "text-foreground"
            )}>
              {COMPANY.shortName}
            </p>
            <p className={cn(
              "text-xs transition-colors duration-300",
              isScrolled ? "text-muted-foreground" : "text-muted-foreground"
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
                "relative font-medium transition-colors duration-300 link-underline",
                location.pathname === item.href
                  ? "text-primary"
                  : isScrolled
                  ? "text-foreground hover:text-primary"
                  : "text-foreground hover:text-primary"
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
        <div className="flex items-center gap-3">
          {/* Language Toggle (UI only) */}
          <Button
            variant="ghost"
            size="sm"
            className="hidden lg:flex gap-1.5 text-muted-foreground"
          >
            <Globe className="h-4 w-4" />
            <span className="text-sm">EN</span>
          </Button>

          {/* Phone CTA */}
          <Button
            asChild
            variant={isScrolled ? "default" : "hero"}
            size="sm"
            className="hidden sm:flex"
          >
            <a href={`tel:${COMPANY.phone}`}>
              <Phone className="h-4 w-4" />
              <span className="hidden lg:inline">{COMPANY.phone}</span>
              <span className="lg:hidden">Call</span>
            </a>
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-t border-border"
          >
            <nav className="container py-6 flex flex-col gap-4">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "py-2 text-lg font-medium transition-colors",
                    location.pathname === item.href
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <hr className="border-border" />
              <Button asChild variant="hero" className="w-full">
                <a href={`tel:${COMPANY.phone}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  {COMPANY.phone}
                </a>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
