import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TourCard } from "@/components/tours/TourCard";
import { useTours } from "@/hooks/useTours";
import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedToursSection() {
  const { tours, isLoading, error } = useTours({ featured: true, limit: 6 });

  return (
    <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      
      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Most Popular Experiences</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            Featured <span className="text-gradient">Adventures</span>
          </h2>
          <p className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Discover our most loved tours, handpicked by travelers from around the world. 
            Each experience offers authentic Zanzibar magic you'll never forget.
          </p>
        </motion.div>

        {/* Tours Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-card">
                <Skeleton className="aspect-[4/3]" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-slate-500 text-lg">Unable to load tours. Please try again later.</p>
          </div>
        ) : tours.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-500 text-lg">No featured tours available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour, index) => (
              <TourCard
                key={tour.id}
                {...tour}
                index={index}
              />
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button 
            asChild 
            size="lg"
            className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-10 h-14 text-base font-bold shadow-premium btn-premium group"
          >
            <Link to="/tours">
              View All Tours
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
