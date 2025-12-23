import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Tour {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  location: string | null;
  duration_hours: number | null;
  price: number | null;
  currency: string | null;
  short_description: string | null;
  long_description: string | null;
  itinerary: string | null;
  includes: string | null;
  excludes: string | null;
  pickup_info: string | null;
  what_to_bring: string | null;
  is_featured: boolean | null;
  is_active: boolean | null;
  created_at: string | null;
  updated_at: string | null;
  image?: string | null;
}

export interface TourImage {
  id: string;
  tour_id: string;
  path: string;
  alt_text: string | null;
  sort_order: number | null;
  created_at: string | null;
}

export function useTours(options?: { featured?: boolean; limit?: number }) {
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchTours() {
      try {
        let query = supabase
          .from("tours")
          .select("*")
          .eq("is_active", true)
          .order("is_featured", { ascending: false })
          .order("created_at", { ascending: false });

        if (options?.featured) {
          query = query.eq("is_featured", true);
        }

        if (options?.limit) {
          query = query.limit(options.limit);
        }

        const { data: toursData, error: toursError } = await query;
        if (toursError) throw toursError;

        // Fetch first image for each tour
        const toursWithImages = await Promise.all(
          (toursData || []).map(async (tour) => {
            const { data: imageData } = await supabase
              .from("tour_images")
              .select("path")
              .eq("tour_id", tour.id)
              .order("sort_order", { ascending: true })
              .limit(1)
              .maybeSingle();
            
            return { ...tour, image: imageData?.path || null };
          })
        );

        setTours(toursWithImages);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTours();
  }, [options?.featured, options?.limit]);

  return { tours, isLoading, error };
}

export function useTour(slug: string) {
  const [tour, setTour] = useState<Tour | null>(null);
  const [images, setImages] = useState<TourImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchTour() {
      try {
        const { data: tourData, error: tourError } = await supabase
          .from("tours")
          .select("*")
          .eq("slug", slug)
          .eq("is_active", true)
          .maybeSingle();

        if (tourError) throw tourError;
        setTour(tourData);

        if (tourData) {
          const { data: imagesData, error: imagesError } = await supabase
            .from("tour_images")
            .select("*")
            .eq("tour_id", tourData.id)
            .order("sort_order", { ascending: true });

          if (imagesError) throw imagesError;
          setImages(imagesData || []);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }

    if (slug) {
      fetchTour();
    }
  }, [slug]);

  return { tour, images, isLoading, error };
}
