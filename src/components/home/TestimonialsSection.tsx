import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

export function TestimonialsSection() {
  return (
    <section className="py-32 bg-slate-950 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-[120px]" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-primary" />
            <span className="text-primary-glow font-black text-xs uppercase tracking-[0.3em]">
              Guest Stories
            </span>
            <div className="w-8 h-[2px] bg-primary" />
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
            VOICES OF THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-glow">ISLAND</span>
          </h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Real stories from real travelers. Discover why our guests leave with more than just photos.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="glass-dark rounded-[2.5rem] p-12 relative group hover:border-primary/30 transition-all duration-500"
            >
              {/* Quote Icon */}
              <div className="absolute top-10 right-10 text-primary/20 group-hover:text-primary/40 transition-colors duration-500">
                <Quote className="h-16 w-16" />
              </div>

              {/* Rating */}
              <div className="flex gap-1.5 mb-8">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-accent fill-accent" />
                ))}
              </div>

              {/* Text */}
              <p className="text-slate-200 leading-relaxed mb-10 text-xl font-medium italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-5 pt-8 border-t border-white/10">
                <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden border-2 border-primary/20">
                  <img src={`https://i.pravatar.cc/150?u=${testimonial.name}`} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-black text-white text-lg tracking-tight">{testimonial.name}</p>
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">{testimonial.location}</p>
                </div>
                <div className="hidden sm:block text-right">
                  <p className="text-xs text-primary-glow font-black uppercase tracking-[0.2em]">{testimonial.tour}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
