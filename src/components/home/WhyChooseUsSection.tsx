import { motion } from "framer-motion";
import { MapPin, Users, Star, Shield, Headphones, Leaf } from "lucide-react";
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
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }} />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-primary" />
            <span className="text-primary font-black text-xs uppercase tracking-[0.3em]">
              Our Excellence
            </span>
            <div className="w-8 h-[2px] bg-primary" />
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight">
            THE <span className="text-primary">GIANDU</span> DIFFERENCE
          </h2>
          <p className="text-slate-500 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            We don't just show you Zanzibar; we immerse you in its soul. Discover why we are the island's highest-rated collective.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_US.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative bg-white rounded-[2.5rem] p-10 shadow-card hover:shadow-premium transition-all duration-700 hover:-translate-y-3 border border-slate-100 overflow-hidden"
              >
                {/* Hover background effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full translate-x-16 -translate-y-16 group-hover:scale-[5] transition-transform duration-1000 ease-out" />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mb-8 shadow-xl group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-display text-2xl font-black text-slate-900 mb-4 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
