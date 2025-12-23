import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TourCard } from "@/components/tours/TourCard";
import { useTours } from "@/hooks/useTours";
import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedToursSection() {
  const { tours, isLoading, error } = useTours({ featured: true, limit: 6 });

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-[120px]" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="container relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-primary" />
              <span className="text-primary font-black text-xs uppercase tracking-[0.3em]">
                Handpicked Adventures
              </span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-[1.1]">
              CURATED <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-glow">EXPERIENCES</span>
            </h2>
            <p className="text-slate-500 text-xl leading-relaxed font-medium max-w-2xl">
              Beyond the ordinary. Discover our most exclusive adventures, meticulously designed for the discerning traveler.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Button asChild size="lg" className="rounded-full px-10 h-14 bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-xl group">
              <Link to="/tours">
                Explore All Tours
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Tours Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-[2.5rem] overflow-hidden shadow-card border border-slate-50">
                <Skeleton className="aspect-[1.1/1]" />
                <div className="p-8 space-y-4">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="pt-6 border-t border-slate-50 flex justify-between">
                    <Skeleton className="h-10 w-24 rounded-full" />
                    <Skeleton className="h-10 w-10 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 glass-morphism rounded-[2.5rem] max-w-2xl mx-auto">
            <p className="text-slate-500 font-bold">Unable to load tours. Please try again later.</p>
          </div>
        ) : tours.length === 0 ? (
          <div className="text-center py-20 glass-morphism rounded-[2.5rem] max-w-2xl mx-auto">
            <p className="text-slate-500 font-bold">No featured tours available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {tours.map((tour, index) => (
              <TourCard
                key={tour.id}
                {...tour}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
