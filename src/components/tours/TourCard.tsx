import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, MapPin, Star, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TourCardProps {
  id: string;
  title: string;
  slug: string;
  category?: string | null;
  location?: string | null;
  duration_hours?: number | null;
  price?: number | null;
  currency?: string | null;
  short_description?: string | null;
  is_featured?: boolean | null;
  image?: string | null;
  index?: number;
}

export function TourCard({
  title,
  slug,
  category,
  location,
  duration_hours,
  price,
  currency = "USD",
  short_description,
  is_featured,
  image,
  index = 0,
}: TourCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
      className="group h-full"
    >
      <Link
        to={`/tours/${slug}`}
        className={cn(
          "flex flex-col h-full bg-card rounded-3xl overflow-hidden shadow-card",
          "hover:shadow-2xl transition-all duration-500 transform",
          "hover:-translate-y-3 border border-border/50 group"
        )}
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {/* Main Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
            style={{
              backgroundImage: image
                ? `url(${image})`
                : `url(https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=800)`,
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
          
          {/* Top Badges */}
          <div className="absolute top-5 left-5 flex flex-wrap gap-2">
            {is_featured && (
              <Badge className="bg-primary text-white border-0 shadow-lg px-3 py-1 font-bold uppercase text-[10px] tracking-widest">
                <Star className="h-3 w-3 mr-1 fill-white" />
                Featured
              </Badge>
            )}
            {category && (
              <Badge variant="secondary" className="bg-white/90 backdrop-blur-md text-foreground border-0 shadow-lg px-3 py-1 font-bold uppercase text-[10px] tracking-widest">
                {category}
              </Badge>
            )}
          </div>

          {/* Price Tag */}
          <div className="absolute bottom-5 right-5">
            <div className="bg-primary text-white rounded-2xl px-4 py-2 shadow-glow transform group-hover:scale-110 transition-transform duration-500">
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-80">From</p>
              <p className="text-2xl font-black">
                ${price?.toFixed(0) || "0"}
              </p>
            </div>
          </div>

          {/* Duration Tag */}
          {duration_hours && (
            <div className="absolute bottom-5 left-5">
              <div className="bg-black/40 backdrop-blur-md text-white rounded-full px-4 py-1.5 shadow-lg flex items-center gap-2 border border-white/20">
                <Clock className="h-4 w-4 text-primary-glow" />
                <span className="text-sm font-bold">{duration_hours}h</span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-3">
            <MapPin className="h-3.5 w-3.5" />
            {location || "Zanzibar"}
          </div>
          
          <h3 className="font-display text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-1">
            {title}
          </h3>
          
          <p className="text-muted-foreground text-sm mb-6 line-clamp-2 leading-relaxed">
            {short_description || "Experience the best of Zanzibar with our professional guides and authentic local experiences."}
          </p>
          
          <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
              ))}
              <span className="text-xs font-bold text-muted-foreground ml-1">(4.9)</span>
            </div>
            
            <div className="flex items-center text-primary font-bold text-sm group-hover:translate-x-1 transition-transform duration-300">
              Details
              <ArrowRight className="h-4 w-4 ml-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
