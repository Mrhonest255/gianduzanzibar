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
    <section className="py-24 bg-background">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-ocean-light text-primary text-sm font-medium mb-4">
            Popular Experiences
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Tours
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our most loved adventures, handpicked by travelers from around the world. 
            Each tour offers authentic Zanzibar experiences you'll never forget.
          </p>
        </motion.div>

        {/* Tours Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden">
                <Skeleton className="aspect-[4/3]" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Unable to load tours. Please try again later.</p>
          </div>
        ) : tours.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No featured tours available at the moment.</p>
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
          className="text-center mt-12"
        >
          <Button asChild variant="default" size="lg">
            <Link to="/tours">
              View All Tours
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
