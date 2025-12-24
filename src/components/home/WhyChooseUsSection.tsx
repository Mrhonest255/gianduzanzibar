import { motion } from "framer-motion";
import { MapPin, Users, Star, Shield, Headphones, Leaf, Sparkles } from "lucide-react";
import { WHY_CHOOSE_US } from "@/lib/constants";

const iconMap = {
  MapPin,
  Users,
  Star,
  Shield,
  Headphones,
  Leaf,
};

export function WhyChooseUsSection() {
  return (
    <section className="py-32 bg-slate-950 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.02\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />
      </div>

      <div className="container relative z-10">
        {/* Ultra-Modern Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-primary text-sm font-medium mb-8"
          >
            <Sparkles className="h-4 w-4" />
            <span className="tracking-widest uppercase">Kwa Nini Sisi</span>
          </motion.div>
          
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Excellence in Every
            <span className="block mt-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          
          <p className="text-white/60 text-xl max-w-2xl mx-auto leading-relaxed">
            We're not just tour operators – we're your local friends in Zanzibar, 
            dedicated to crafting extraordinary memories.
          </p>
        </motion.div>

        {/* Premium Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {WHY_CHOOSE_US.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative"
              >
                {/* Card with Glassmorphism */}
                <div className="relative h-full p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-accent/0 group-hover:from-primary/10 group-hover:to-accent/5 transition-all duration-500" />
                  
                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-glow group-hover:shadow-premium transition-all duration-500 group-hover:scale-110">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    {/* Floating Number */}
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-slate-800 border border-white/20 flex items-center justify-center text-xs font-bold text-primary">
                      0{index + 1}
                    </span>
                  </div>
                  
                  <h3 className="relative font-display text-2xl font-semibold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="relative text-white/60 leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                    {feature.description}
                  </p>
                  
                  {/* Bottom Line Accent */}
                  <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-accent w-0 group-hover:w-full transition-all duration-500" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "500+", label: "Happy Travelers" },
            { value: "50+", label: "Unique Tours" },
            { value: "5.0", label: "Average Rating" },
            { value: "24/7", label: "Support" },
          ].map((stat, i) => (
            <div key={i} className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <p className="font-display text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                {stat.value}
              </p>
              <p className="text-white/60 text-sm uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
