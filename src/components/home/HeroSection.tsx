import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background with Ken Burns effect */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center animate-ken-burns opacity-60"
          style={{
            backgroundImage: `url(https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=1920)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-slate-950/40" />
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-32 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary-glow text-xs font-bold uppercase tracking-[0.2em] shadow-glow">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              The Ultimate Zanzibar Experience
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-display text-5xl sm:text-7xl md:text-9xl font-black text-white mb-8 leading-[0.9] tracking-tighter"
          >
            UNVEIL THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-glow to-accent">
              VIBE
            </span> OF ZANZIBAR
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-2xl text-slate-200 mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Beyond the turquoise waters lies a world of spice, history, and soul. Join the island's most exclusive tour collective.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <Button asChild size="xl" className="group rounded-full px-10 text-lg h-16 shadow-glow hover:scale-105 transition-all duration-300 bg-primary hover:bg-primary/90">
              <Link to="/tours">
                Start Your Journey
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl" className="rounded-full px-10 text-lg h-16 glass-dark text-white hover:bg-white/10 border-white/20 shadow-xl hover:scale-105 transition-all duration-300">
              <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer">
                <Phone className="h-5 w-5 mr-2" />
                Chat with Experts
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 max-w-6xl mx-auto"
        >
          {[
            { value: "15k+", label: "Happy Explorers", icon: "🌴" },
            { value: "45+", label: "Curated Tours", icon: "🗺️" },
            { value: "12+", label: "Years of Magic", icon: "✨" },
            { value: "4.9", label: "Guest Rating", icon: "⭐" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="group relative p-6 rounded-3xl glass-dark overflow-hidden hover:border-primary/50 transition-colors duration-500"
            >
              <div className="absolute -right-4 -bottom-4 text-6xl opacity-10 group-hover:scale-125 transition-transform duration-500">
                {stat.icon}
              </div>
              <p className="text-3xl md:text-4xl font-black text-white mb-1 tracking-tight">
                {stat.value}
              </p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
