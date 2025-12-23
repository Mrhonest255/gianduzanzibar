import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Clock,
  MapPin,
  Calendar,
  Users,
  Check,
  X,
  ChevronLeft,
  Star,
  Phone,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { useTour } from "@/hooks/useTours";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { COMPANY } from "@/lib/constants";

const bookingSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address").max(255),
  phone: z.string().min(8, "Please enter a valid phone number").max(20),
  country: z.string().min(2, "Please enter your country").max(100),
  tour_date: z.string().min(1, "Please select a date"),
  adults: z.coerce.number().min(1, "At least 1 adult required").max(50),
  children: z.coerce.number().min(0).max(50),
  message: z.string().max(1000).optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function TourDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { tour, images, isLoading, error } = useTour(slug || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      adults: 1,
      children: 0,
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    if (!tour) return;

    setIsSubmitting(true);
    try {
      const { data: booking, error } = await supabase
        .from("bookings")
        .insert({
          tour_id: tour.id,
          tour_title_snapshot: tour.title,
          full_name: data.full_name,
          email: data.email,
          phone: data.phone,
          country: data.country,
          tour_date: data.tour_date,
          adults: data.adults,
          children: data.children,
          message: data.message || null,
        })
        .select("booking_reference")
        .single();

      if (error) throw error;

      toast({
        title: "Booking Submitted!",
        description: `Your booking reference is ${booking.booking_reference}`,
      });

      navigate(`/booking/success?ref=${booking.booking_reference}`);
      reset();
    } catch (err) {
      console.error("Booking error:", err);
      toast({
        variant: "destructive",
        title: "Booking Failed",
        description: "Something went wrong. Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="pt-24 pb-16">
          <div className="container">
            <Skeleton className="h-8 w-32 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Skeleton className="aspect-video rounded-2xl" />
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <div>
                <Skeleton className="h-96 rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !tour) {
    return (
      <Layout>
        <div className="pt-24 pb-16">
          <div className="container text-center py-20">
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">
              Tour Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The tour you're looking for doesn't exist or is no longer available.
            </p>
            <Button asChild>
              <Link to="/tours">Browse All Tours</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const mainImage =
    images[0]?.path ||
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&auto=format&fit=crop";

  // Get minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <>
      <Helmet>
        <title>{tour.title} | {COMPANY.name}</title>
        <meta name="description" content={tour.short_description || ""} />
      </Helmet>
      <Layout>
        <div className="pt-24 pb-16 bg-background">
          <div className="container">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <Button variant="ghost" asChild className="gap-2">
                <Link to="/tours">
                  <ChevronLeft className="h-4 w-4" />
                  Back to Tours
                </Link>
              </Button>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-2 space-y-8"
              >
                {/* Hero Image */}
                <div className="relative aspect-video rounded-2xl overflow-hidden">
                  <img
                    src={mainImage}
                    alt={tour.title}
                    className="w-full h-full object-cover"
                  />
                  {tour.is_featured && (
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium">
                        <Star className="h-4 w-4" fill="currentColor" />
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Title & Meta */}
                <div>
                  <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {tour.title}
                  </h1>
                  <div className="flex flex-wrap gap-4 text-muted-foreground">
                    {tour.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span>{tour.location}</span>
                      </div>
                    )}
                    {tour.duration_hours && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" />
                        <span>{tour.duration_hours} hours</span>
                      </div>
                    )}
                    {tour.category && (
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-ocean-light text-primary text-sm">
                          {tour.category}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                    Overview
                  </h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {tour.long_description}
                  </p>
                </div>

                {/* Itinerary */}
                {tour.itinerary && (
                  <div>
                    <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                      Itinerary
                    </h2>
                    <div className="bg-ocean-light rounded-xl p-6">
                      <p className="text-foreground whitespace-pre-line">
                        {tour.itinerary}
                      </p>
                    </div>
                  </div>
                )}

                {/* Includes / Excludes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tour.includes && (
                    <div className="bg-card rounded-xl p-6 shadow-card">
                      <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Check className="h-5 w-5 text-forest-green" />
                        What's Included
                      </h3>
                      <ul className="space-y-2">
                        {tour.includes.split(",").map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-muted-foreground">
                            <Check className="h-4 w-4 text-forest-green mt-0.5 shrink-0" />
                            <span>{item.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {tour.excludes && (
                    <div className="bg-card rounded-xl p-6 shadow-card">
                      <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <X className="h-5 w-5 text-destructive" />
                        Not Included
                      </h3>
                      <ul className="space-y-2">
                        {tour.excludes.split(",").map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-muted-foreground">
                            <X className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                            <span>{item.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Pickup Info */}
                {tour.pickup_info && (
                  <div className="bg-sand-light rounded-xl p-6">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      Pickup Information
                    </h3>
                    <p className="text-muted-foreground">{tour.pickup_info}</p>
                  </div>
                )}

                {/* What to Bring */}
                {tour.what_to_bring && (
                  <div className="bg-card rounded-xl p-6 shadow-card">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      What to Bring
                    </h3>
                    <p className="text-muted-foreground">{tour.what_to_bring}</p>
                  </div>
                )}
              </motion.div>

              {/* Booking Sidebar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-1"
              >
                <div className="sticky top-24">
                  <Card className="shadow-medium">
                    <CardHeader>
                      <CardTitle className="font-display text-2xl">
                        Book This Tour
                      </CardTitle>
                      <CardDescription>
                        Secure your spot on this amazing adventure
                      </CardDescription>
                      <div className="pt-4 border-t border-border mt-4">
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">From</p>
                            <p className="text-3xl font-bold text-primary">
                              ${tour.price?.toFixed(0)}
                            </p>
                          </div>
                          <p className="text-muted-foreground">per person</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                          <Label htmlFor="full_name">Full Name *</Label>
                          <Input
                            id="full_name"
                            placeholder="John Doe"
                            {...register("full_name")}
                          />
                          {errors.full_name && (
                            <p className="text-destructive text-sm mt-1">
                              {errors.full_name.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            {...register("email")}
                          />
                          {errors.email && (
                            <p className="text-destructive text-sm mt-1">
                              {errors.email.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="phone">Phone *</Label>
                          <Input
                            id="phone"
                            placeholder="+1 234 567 8900"
                            {...register("phone")}
                          />
                          {errors.phone && (
                            <p className="text-destructive text-sm mt-1">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="country">Country *</Label>
                          <Input
                            id="country"
                            placeholder="United States"
                            {...register("country")}
                          />
                          {errors.country && (
                            <p className="text-destructive text-sm mt-1">
                              {errors.country.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="tour_date">Preferred Date *</Label>
                          <Input
                            id="tour_date"
                            type="date"
                            min={minDate}
                            {...register("tour_date")}
                          />
                          {errors.tour_date && (
                            <p className="text-destructive text-sm mt-1">
                              {errors.tour_date.message}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="adults">Adults *</Label>
                            <Input
                              id="adults"
                              type="number"
                              min={1}
                              max={50}
                              {...register("adults")}
                            />
                            {errors.adults && (
                              <p className="text-destructive text-sm mt-1">
                                {errors.adults.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="children">Children</Label>
                            <Input
                              id="children"
                              type="number"
                              min={0}
                              max={50}
                              {...register("children")}
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="message">Special Requests</Label>
                          <Textarea
                            id="message"
                            placeholder="Any dietary requirements, accessibility needs, or special requests..."
                            rows={3}
                            {...register("message")}
                          />
                        </div>

                        <Button
                          type="submit"
                          variant="hero"
                          size="lg"
                          className="w-full"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : "Book Now"}
                        </Button>

                        <p className="text-xs text-muted-foreground text-center">
                          We'll confirm your booking within 24 hours
                        </p>
                      </form>

                      {/* Alternative Contact */}
                      <div className="mt-6 pt-6 border-t border-border">
                        <p className="text-sm text-muted-foreground text-center mb-3">
                          Prefer to book by phone?
                        </p>
                        <Button asChild variant="outline" className="w-full">
                          <a href={`tel:${COMPANY.phone}`}>
                            <Phone className="h-4 w-4 mr-2" />
                            {COMPANY.phone}
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
