import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play, Star, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
      {/* Background Image with Ken Burns Effect */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center animate-ken-burns"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=2000&q=80)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float animation-delay-300" />

      {/* Content */}
      <div className="container relative z-10 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-white/70 text-sm font-medium">Rated 5.0 by 1000+ travelers</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-8 leading-[0.9] tracking-tight"
            >
              DISCOVER
              <br />
              <span className="text-gradient">ZANZIBAR</span>
              <br />
              <span className="text-white/90">PARADISE</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-white/70 mb-10 max-w-lg leading-relaxed font-medium"
            >
              Experience the magic of the Spice Island with expertly curated tours. 
              From ancient Stone Town to pristine beaches, discover hidden gems with local experts.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <Button 
                asChild 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-14 text-base font-bold shadow-glow btn-premium group"
              >
                <Link to="/tours">
                  Explore All Tours
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg"
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 rounded-full px-8 h-14 text-base font-bold backdrop-blur-sm"
              >
                <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer">
                  <Play className="h-5 w-5 mr-2 fill-white" />
                  Book via WhatsApp
                </a>
              </Button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center gap-8 mt-14 pt-10 border-t border-white/10"
            >
              <div>
                <p className="text-4xl font-extrabold text-white">50+</p>
                <p className="text-white/50 text-sm font-medium">Tour Options</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <p className="text-4xl font-extrabold text-white">10+</p>
                <p className="text-white/50 text-sm font-medium">Years Experience</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <p className="text-4xl font-extrabold text-white">24/7</p>
                <p className="text-white/50 text-sm font-medium">Support</p>
              </div>
            </motion.div>
          </div>

          {/* Right - Featured Tour Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main Card */}
              <div className="glass-morphism rounded-3xl p-2 shadow-premium">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                  <img
                    src="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80"
                    alt="Zanzibar Beach"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                  
                  {/* Card Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-primary/90 text-white text-xs font-bold rounded-full">POPULAR</span>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">Beach</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Prison Island & Nakupenda</h3>
                    <div className="flex items-center gap-4 text-white/70 text-sm mb-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> Stone Town
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" /> Full Day
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-white/50 text-sm">From</span>
                        <p className="text-3xl font-bold text-white">$75</p>
                      </div>
                      <Button asChild size="sm" className="rounded-full bg-white text-slate-900 hover:bg-white/90 font-bold">
                        <Link to="/tours/prison-island-nakupenda">Book Now</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-accent text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-pulse-glow">
                🔥 Best Seller
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/40 text-xs font-medium uppercase tracking-widest">Scroll to Explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
