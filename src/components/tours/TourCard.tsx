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
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group h-full"
    >
      <Link
        to={`/tours/${slug}`}
        className={cn(
          "flex flex-col h-full bg-white rounded-[2.5rem] overflow-hidden shadow-card",
          "hover:shadow-premium transition-all duration-700 transform",
          "hover:-translate-y-4 border border-slate-100 group"
        )}
      >
        {/* Image Container */}
        <div className="relative aspect-[1.1/1] overflow-hidden">
          {/* Main Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-110"
            style={{
              backgroundImage: image
                ? `url(${image})`
                : `url(https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=800)`,
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
          
          {/* Top Badges */}
          <div className="absolute top-6 left-6 flex flex-wrap gap-2">
            {is_featured && (
              <Badge className="bg-accent text-accent-foreground border-0 shadow-lg px-4 py-1.5 font-black uppercase text-[10px] tracking-[0.15em] rounded-full">
                <Star className="h-3 w-3 mr-1.5 fill-current" />
                Featured
              </Badge>
            )}
            {category && (
              <Badge variant="secondary" className="bg-white/20 backdrop-blur-xl text-white border border-white/30 shadow-lg px-4 py-1.5 font-black uppercase text-[10px] tracking-[0.15em] rounded-full">
                {category}
              </Badge>
            )}
          </div>

          {/* Price Tag - Floating Style */}
          <div className="absolute bottom-6 right-6">
            <div className="bg-white text-slate-950 rounded-3xl px-5 py-3 shadow-premium transform group-hover:scale-110 transition-transform duration-700 ease-out">
              <p className="text-[9px] uppercase tracking-[0.2em] font-black text-slate-400 mb-0.5">From</p>
              <p className="text-2xl font-black leading-none">
                ${price?.toFixed(0) || "0"}
              </p>
            </div>
          </div>

          {/* Duration Tag */}
          {duration_hours && (
            <div className="absolute bottom-6 left-6">
              <div className="bg-slate-950/40 backdrop-blur-xl text-white rounded-full px-4 py-2 shadow-lg flex items-center gap-2 border border-white/10">
                <Clock className="h-3.5 w-3.5 text-primary-glow" />
                <span className="text-xs font-black tracking-wider">{duration_hours} HOURS</span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-8 flex flex-col">
          <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.2em] mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            {location || "Zanzibar"}
          </div>
          
          <h3 className="font-display text-2xl font-black text-slate-900 mb-4 group-hover:text-primary transition-colors duration-500 line-clamp-1 tracking-tight">
            {title}
          </h3>
          
          <p className="text-slate-500 text-sm mb-8 line-clamp-2 leading-relaxed font-medium">
            {short_description || "Experience the best of Zanzibar with our professional guides and authentic local experiences."}
          </p>
          
          <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <span className="text-[10px] font-black text-slate-400 ml-1 uppercase tracking-widest">4.9/5 Rating</span>
            </div>
            
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 text-slate-900 group-hover:bg-primary group-hover:text-white transition-all duration-500">
              <ArrowRight className="h-5 w-5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
