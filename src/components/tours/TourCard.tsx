import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, MapPin, Star, ArrowUpRight } from "lucide-react";
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group h-full"
    >
      <Link
        to={`/tours/${slug}`}
        className={cn(
          "relative flex flex-col h-full bg-white rounded-3xl overflow-hidden",
          "shadow-card hover:shadow-premium transition-all duration-700",
          "hover:-translate-y-3 border border-slate-100"
        )}
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {/* Main Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[0.8s] ease-out group-hover:scale-110"
            style={{
              backgroundImage: image
                ? `url(${image})`
                : `url(https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80)`,
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
          
          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {is_featured && (
              <Badge className="bg-amber-500 text-white border-0 shadow-lg px-3 py-1.5 font-bold text-xs rounded-full">
                <Star className="h-3 w-3 mr-1.5 fill-current" />
                Featured
              </Badge>
            )}
            {category && (
              <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-slate-800 border-0 shadow-lg px-3 py-1.5 font-semibold text-xs rounded-full">
                {category}
              </Badge>
            )}
          </div>

          {/* Price Tag - Bottom Right */}
          <div className="absolute bottom-4 right-4">
            <div className="bg-white rounded-2xl px-4 py-3 shadow-premium group-hover:scale-105 transition-transform duration-500">
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">From</p>
              <p className="text-2xl font-extrabold text-slate-900">
                ${price?.toFixed(0) || "0"}
              </p>
            </div>
          </div>

          {/* Duration Tag - Bottom Left */}
          {duration_hours && (
            <div className="absolute bottom-4 left-4">
              <div className="bg-slate-950/60 backdrop-blur-sm text-white rounded-full px-3 py-2 shadow-lg flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-primary" />
                <span className="text-sm font-bold">{duration_hours}h</span>
              </div>
            </div>
          )}

          {/* Hover Arrow */}
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 shadow-lg">
            <ArrowUpRight className="h-5 w-5 text-slate-900" />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-6">
          {/* Location */}
          {location && (
            <div className="flex items-center gap-1.5 mb-3">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">{location}</span>
            </div>
          )}
          
          {/* Title */}
          <h3 className="font-display text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight">
            {title}
          </h3>
          
          {/* Description */}
          <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed flex-1">
            {short_description || "Experience the best of Zanzibar with our professional guides."}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-1.5">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img 
                      src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                      alt="Traveler" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                ))}
              </div>
              <span className="text-xs font-semibold text-slate-400">4.9 ★</span>
            </div>
            
            <span className="text-sm font-bold text-primary group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-1">
              View Details
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
