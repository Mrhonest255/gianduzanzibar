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
          "flex flex-col h-full bg-card rounded-2xl overflow-hidden shadow-card",
          "hover:shadow-medium transition-all duration-500 transform",
          "hover:-translate-y-2 border border-border/50"
        )}
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {/* Main Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{
              backgroundImage: image
                ? `url(${image})`
                : `url(https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=800)`,
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
          
          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {is_featured && (
              <Badge className="bg-accent text-accent-foreground border-0 shadow-md">
                <Star className="h-3 w-3 mr-1" fill="currentColor" />
                Featured
              </Badge>
            )}
            {category && (
              <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm border-0 shadow-md">
                {category}
              </Badge>
            )}
          </div>

          {/* Price Tag */}
          <div className="absolute bottom-4 right-4">
            <div className="bg-card/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-medium">
              <p className="text-xs text-muted-foreground font-medium">From</p>
              <p className="text-2xl font-bold text-primary">
                ${price?.toFixed(0) || "0"}
              </p>
            </div>
          </div>

          {/* Duration Tag */}
          {duration_hours && (
            <div className="absolute bottom-4 left-4">
              <div className="bg-card/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-md flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-primary" />
                <span className="text-sm font-medium text-foreground">{duration_hours}h</span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {title}
          </h3>
          
          {location && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
              <MapPin className="h-4 w-4 text-primary shrink-0" />
              <span className="truncate">{location}</span>
            </div>
          )}
          
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
            {short_description}
          </p>

          <Button 
            variant="outline" 
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 mt-auto"
          >
            View Details
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </Link>
    </motion.div>
  );
}
