import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";

export function CTASection() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background with parallax-like effect */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=1920&auto=format&fit=crop)`,
          }}
        />
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto glass-dark rounded-[3rem] p-12 md:p-24 text-center border border-white/10 shadow-premium"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-block px-6 py-2 rounded-full bg-primary/20 text-primary-glow text-xs font-black uppercase tracking-[0.3em] mb-8 border border-primary/30">
              Start Your Story
            </span>
            <h2 className="font-display text-5xl md:text-7xl font-black text-white mb-8 tracking-tight leading-[1.1]">
              READY TO <span className="text-primary">VIBE</span> WITH US?
            </h2>
            <p className="text-slate-300 text-xl md:text-2xl mb-12 leading-relaxed font-medium max-w-3xl mx-auto">
              Your dream Zanzibar escape is just a message away. Let's craft an itinerary that speaks to your soul.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button asChild size="xl" className="group rounded-full px-12 h-16 bg-primary hover:bg-primary/90 text-white font-black text-lg shadow-glow transition-all duration-300 hover:scale-105">
                <Link to="/tours">
                  Explore Adventures
                  <ArrowRight className="h-6 w-6 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl" className="rounded-full px-12 h-16 glass-morphism text-slate-900 hover:bg-white border-white/50 font-black text-lg transition-all duration-300 hover:scale-105">
                <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer">
                  <Phone className="h-6 w-6 mr-2" />
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
