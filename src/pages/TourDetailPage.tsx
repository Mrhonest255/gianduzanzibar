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

      // Send email notification to admin
      const totalGuests = data.adults + data.children;
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a; border-bottom: 2px solid #16a34a; padding-bottom: 10px;">
            🎉 New Booking Received!
          </h2>
          <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <p style="margin: 0; font-size: 18px;"><strong>Booking Reference:</strong> ${booking.booking_reference}</p>
          </div>
          <h3 style="color: #334155;">Tour Details</h3>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 10px 0;">
            <p><strong>Tour:</strong> ${tour.title}</p>
            <p><strong>Date:</strong> ${data.tour_date}</p>
            <p><strong>Guests:</strong> ${data.adults} Adults${data.children > 0 ? `, ${data.children} Children` : ''} (${totalGuests} total)</p>
          </div>
          <h3 style="color: #334155;">Customer Information</h3>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 10px 0;">
            <p><strong>Name:</strong> ${data.full_name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Country:</strong> ${data.country}</p>
          </div>
          ${data.message ? `
          <h3 style="color: #334155;">Special Requests</h3>
          <div style="background: #fff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <p style="white-space: pre-wrap; margin: 0;">${data.message}</p>
          </div>
          ` : ''}
          <p style="color: #64748b; font-size: 12px; margin-top: 20px;">
            This booking was made through the Zanzibar Vibe Tours website.
          </p>
        </div>
      `;

      await supabase.functions.invoke('send-email', {
        body: {
          subject: `New Booking: ${tour.title} - ${booking.booking_reference}`,
          html: emailHtml,
          reply_to: data.email,
          from_email: data.email,
        },
      });

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
        <div className="pt-32 pb-16">
          <div className="container">
            <Skeleton className="h-10 w-40 mb-12 rounded-full" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8 space-y-8">
                <Skeleton className="aspect-[16/9] rounded-[2.5rem]" />
                <Skeleton className="h-16 w-3/4 rounded-2xl" />
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full rounded-full" />
                  <Skeleton className="h-4 w-full rounded-full" />
                  <Skeleton className="h-4 w-2/3 rounded-full" />
                </div>
              </div>
              <div className="lg:col-span-4">
                <Skeleton className="h-[600px] rounded-[2.5rem]" />
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
        <div className="pt-32 pb-16">
          <div className="container text-center py-32 glass-morphism rounded-[3rem] max-w-3xl mx-auto border border-slate-100">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <X className="h-12 w-12 text-slate-300" />
            </div>
            <h1 className="font-display text-4xl font-black text-slate-900 mb-6 tracking-tight">
              TOUR NOT FOUND
            </h1>
            <p className="text-slate-500 text-xl mb-10 font-medium">
              The adventure you're looking for has vanished into the horizon.
            </p>
            <Button asChild size="lg" className="rounded-full px-10 h-14 bg-primary hover:bg-primary/90 text-white font-bold shadow-xl">
              <Link to="/tours">Explore Other Adventures</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Helmet>
        <title>{tour.title} | {COMPANY.name}</title>
        <meta name="description" content={tour.short_description || ""} />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="relative pt-48 pb-24 overflow-hidden bg-slate-950">
          <div className="absolute inset-0 z-0">
            <img
              src={tour.image || "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&q=80"}
              alt={tour.title}
              className="w-full h-full object-cover opacity-50 animate-ken-burns"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950" />
          </div>
          
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link
                to="/tours"
                className="inline-flex items-center gap-2 text-white/70 hover:text-primary-glow transition-colors mb-10 font-black text-xs uppercase tracking-[0.2em]"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to Collection
              </Link>
              
              <div className="flex flex-wrap gap-3 mb-8">
                <Badge className="bg-primary text-white border-0 px-5 py-2 rounded-full font-black uppercase text-[10px] tracking-[0.2em] shadow-glow">
                  {tour.category || "Adventure"}
                </Badge>
                {tour.is_featured && (
                  <Badge className="bg-accent text-accent-foreground border-0 px-5 py-2 rounded-full font-black uppercase text-[10px] tracking-[0.2em] shadow-lg">
                    <Star className="h-3 w-3 mr-1.5 fill-current" />
                    Featured
                  </Badge>
                )}
              </div>
              
              <h1 className="font-display text-5xl md:text-8xl font-black text-white mb-10 leading-[0.9] tracking-tighter max-w-5xl">
                {tour.title}
              </h1>
              
              <div className="flex flex-wrap gap-8 text-white/90">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <MapPin className="h-5 w-5 text-primary-glow" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/50">Location</p>
                    <p className="font-bold">{tour.location || "Zanzibar"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <Clock className="h-5 w-5 text-primary-glow" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/50">Duration</p>
                    <p className="font-bold">{tour.duration_hours} Hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <Star className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/50">Rating</p>
                    <p className="font-bold">4.9/5.0</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-24 bg-slate-50">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Main Content */}
              <div className="lg:col-span-8 space-y-16">
                {/* Gallery/Main Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative rounded-[3rem] overflow-hidden shadow-premium border border-white"
                >
                  <img
                    src={tour.image || "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&q=80"}
                    alt={tour.title}
                    className="w-full aspect-video object-cover"
                  />
                </motion.div>

                {/* Description */}
                <div className="glass-morphism rounded-[3rem] p-10 md:p-16 border border-white">
                  <h2 className="font-display text-4xl font-black text-slate-900 mb-8 tracking-tight">THE EXPERIENCE</h2>
                  <div className="prose prose-lg max-w-none text-slate-600 font-medium leading-relaxed">
                    {tour.description?.split('\n').map((paragraph, i) => (
                      <p key={i} className="mb-6 last:mb-0">{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                {tour.highlights && tour.highlights.length > 0 && (
                  <div className="glass-morphism rounded-[3rem] p-10 md:p-16 border border-white">
                    <h2 className="font-display text-4xl font-black text-slate-900 mb-10 tracking-tight">HIGHLIGHTS</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {tour.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-start gap-4 group">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            <Check className="h-4 w-4" />
                          </div>
                          <p className="text-slate-700 font-bold leading-tight pt-1">{highlight}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Inclusions/Exclusions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="glass-morphism rounded-[3rem] p-10 border border-white">
                    <h3 className="font-display text-2xl font-black text-slate-900 mb-8 tracking-tight flex items-center gap-3">
                      <div className="w-2 h-8 bg-primary rounded-full" />
                      INCLUDED
                    </h3>
                    <ul className="space-y-4">
                      {tour.inclusions?.map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                          <Check className="h-4 w-4 text-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="glass-morphism rounded-[3rem] p-10 border border-white">
                    <h3 className="font-display text-2xl font-black text-slate-900 mb-8 tracking-tight flex items-center gap-3">
                      <div className="w-2 h-8 bg-slate-300 rounded-full" />
                      NOT INCLUDED
                    </h3>
                    <ul className="space-y-4">
                      {tour.exclusions?.map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-400 font-medium">
                          <X className="h-4 w-4 text-slate-300" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Sidebar / Booking Form */}
              <div className="lg:col-span-4">
                <div className="sticky top-32 space-y-8">
                  {/* Price Card */}
                  <Card className="rounded-[3rem] overflow-hidden border-0 shadow-premium bg-slate-900 text-white">
                    <CardHeader className="p-10 pb-0">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-glow mb-2">Starting From</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-6xl font-black tracking-tighter">${tour.price}</span>
                        <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Per Person</span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-10">
                      <div className="space-y-6 mb-10">
                        <div className="flex items-center justify-between py-4 border-b border-white/10">
                          <span className="text-slate-400 font-bold text-sm uppercase tracking-widest">Group Size</span>
                          <span className="font-black">Up to 12 People</span>
                        </div>
                        <div className="flex items-center justify-between py-4 border-b border-white/10">
                          <span className="text-slate-400 font-bold text-sm uppercase tracking-widest">Language</span>
                          <span className="font-black">English, Swahili</span>
                        </div>
                        <div className="flex items-center justify-between py-4 border-b border-white/10">
                          <span className="text-slate-400 font-bold text-sm uppercase tracking-widest">Availability</span>
                          <span className="font-black text-primary-glow">Daily</span>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-lg shadow-glow transition-all duration-300"
                        onClick={() => document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })}
                      >
                        BOOK THIS ADVENTURE
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Booking Form Card */}
                  <Card id="booking-form" className="rounded-[3rem] overflow-hidden border-0 shadow-premium bg-white">
                    <CardHeader className="p-10">
                      <CardTitle className="font-display text-3xl font-black text-slate-900 tracking-tight">RESERVE NOW</CardTitle>
                      <CardDescription className="text-slate-500 font-medium">Secure your spot today. No upfront payment required.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-10 pt-0">
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Full Name</Label>
                          <Input 
                            {...register("full_name")} 
                            placeholder="John Doe" 
                            className="h-14 rounded-xl bg-slate-50 border-slate-100 focus:ring-primary/20"
                          />
                          {errors.full_name && <p className="text-xs text-red-500 font-bold ml-2">{errors.full_name.message}</p>}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Email</Label>
                            <Input 
                              {...register("email")} 
                              type="email" 
                              placeholder="john@example.com" 
                              className="h-14 rounded-xl bg-slate-50 border-slate-100 focus:ring-primary/20"
                            />
                            {errors.email && <p className="text-xs text-red-500 font-bold ml-2">{errors.email.message}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Phone</Label>
                            <Input 
                              {...register("phone")} 
                              placeholder="+1 234 567 890" 
                              className="h-14 rounded-xl bg-slate-50 border-slate-100 focus:ring-primary/20"
                            />
                            {errors.phone && <p className="text-xs text-red-500 font-bold ml-2">{errors.phone.message}</p>}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Preferred Date</Label>
                          <Input 
                            {...register("tour_date")} 
                            type="date" 
                            className="h-14 rounded-xl bg-slate-50 border-slate-100 focus:ring-primary/20"
                          />
                          {errors.tour_date && <p className="text-xs text-red-500 font-bold ml-2">{errors.tour_date.message}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Adults</Label>
                            <Input 
                              {...register("adults")} 
                              type="number" 
                              className="h-14 rounded-xl bg-slate-50 border-slate-100 focus:ring-primary/20"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Children</Label>
                            <Input 
                              {...register("children")} 
                              type="number" 
                              className="h-14 rounded-xl bg-slate-50 border-slate-100 focus:ring-primary/20"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Message (Optional)</Label>
                          <Textarea 
                            {...register("message")} 
                            placeholder="Any special requirements?" 
                            className="rounded-xl bg-slate-50 border-slate-100 focus:ring-primary/20 min-h-[100px]"
                          />
                        </div>

                        <Button 
                          type="submit" 
                          className="w-full h-16 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-lg transition-all duration-300"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "SUBMITTING..." : "CONFIRM BOOKING"}
                        </Button>
                        
                        <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">
                          By booking, you agree to our terms and conditions.
                        </p>
                      </form>
                    </CardContent>
                  </Card>

                  {/* WhatsApp CTA */}
                  <div className="glass-morphism rounded-[2.5rem] p-8 border border-white text-center">
                    <p className="text-slate-500 font-bold text-sm mb-4 uppercase tracking-widest">Need instant help?</p>
                    <a 
                      href={COMPANY.whatsappLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 text-primary font-black text-xl hover:scale-105 transition-transform"
                    >
                      <Phone className="h-6 w-6" />
                      CHAT ON WHATSAPP
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

