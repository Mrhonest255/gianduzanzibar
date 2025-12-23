import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Search, CheckCircle, Clock, XCircle, Archive, Phone, Mail, Calendar, Users, MapPin, MessageSquare, ShieldCheck } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { COMPANY } from "@/lib/constants";
import { format } from "date-fns";

interface BookingDetails {
  id: string;
  booking_reference: string;
  tour_title_snapshot: string;
  full_name: string;
  email: string;
  phone: string;
  country: string | null;
  tour_date: string;
  adults: number | null;
  children: number | null;
  status: string | null;
  created_at: string | null;
  message: string | null;
}

const statusConfig = {
  pending: {
    label: "PENDING REVIEW",
    icon: Clock,
    color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    description: "Our team is currently reviewing your booking request. You'll receive a confirmation shortly.",
  },
  approved: {
    label: "CONFIRMED",
    icon: CheckCircle,
    color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    description: "Your adventure is confirmed! We're excited to show you the magic of Zanzibar.",
  },
  rejected: {
    label: "NOT AVAILABLE",
    icon: XCircle,
    color: "bg-red-500/10 text-red-500 border-red-500/20",
    description: "Unfortunately, the requested date is fully booked. Please contact us for alternative dates.",
  },
  archived: {
    label: "COMPLETED",
    icon: Archive,
    color: "bg-slate-500/10 text-slate-500 border-slate-500/20",
    description: "This journey has concluded. We hope you enjoyed every moment with us!",
  },
};

export default function TrackBookingPage() {
  const [bookingRef, setBookingRef] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [searched, setSearched] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bookingRef.trim() || !email.trim()) {
      toast({
        variant: "destructive",
        title: "MISSING INFO",
        description: "Please enter both booking reference and email.",
      });
      return;
    }

    setIsLoading(true);
    setSearched(true);

    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("booking_reference", bookingRef.trim().toUpperCase())
        .eq("email", email.trim().toLowerCase())
        .maybeSingle();

      if (error) throw error;

      setBooking(data);

      if (!data) {
        toast({
          variant: "destructive",
          title: "NOT FOUND",
          description: "No booking found with the provided reference and email.",
        });
      }
    } catch (err) {
      console.error("Search error:", err);
      toast({
        variant: "destructive",
        title: "ERROR",
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Track Your Booking | {COMPANY.name}</title>
        <meta name="description" content="Check the status of your Zanzibar tour booking using your reference number." />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="relative pt-48 pb-24 overflow-hidden bg-slate-950">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&q=80"
              alt="Track Booking"
              className="w-full h-full object-cover opacity-30 animate-ken-burns"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950" />
          </div>
          
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <p className="text-primary-glow font-black text-xs uppercase tracking-[0.3em] mb-6">Booking Status</p>
              <h1 className="font-display text-6xl md:text-9xl font-black text-white mb-10 leading-[0.85] tracking-tighter">
                TRACK YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">JOURNEY</span>
              </h1>
              <p className="text-slate-400 text-xl md:text-2xl font-medium max-w-2xl leading-relaxed">
                Enter your booking reference and email address to check the current status of your reservation.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-slate-50 relative">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              {/* Search Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-morphism p-8 md:p-12 rounded-[3rem] border border-white shadow-premium mb-16"
              >
                <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Booking Reference</label>
                    <div className="relative">
                      <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input
                        placeholder="ZV-XXXXXX"
                        value={bookingRef}
                        onChange={(e) => setBookingRef(e.target.value)}
                        className="h-14 pl-12 rounded-2xl border-slate-200 bg-white/50 focus:bg-white transition-all uppercase font-bold tracking-widest"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-14 pl-12 rounded-2xl border-slate-200 bg-white/50 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="h-14 rounded-2xl bg-slate-950 hover:bg-primary text-white font-black uppercase tracking-[0.2em] text-xs transition-all duration-500 shadow-xl group"
                  >
                    {isLoading ? "SEARCHING..." : (
                      <>
                        TRACK BOOKING
                        <Search className="h-4 w-4 ml-3 group-hover:scale-110 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>

              {/* Results */}
              {searched && booking && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-8"
                >
                  {/* Status Card */}
                  <div className="glass-morphism overflow-hidden rounded-[3.5rem] border border-white shadow-premium">
                    <div className="bg-slate-950 p-10 md:p-16 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -mr-48 -mt-48" />
                      
                      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
                        <div>
                          <p className="text-primary-glow font-black text-[10px] uppercase tracking-[0.3em] mb-4">Current Status</p>
                          <div className="flex items-center gap-4 mb-6">
                            {(() => {
                              const config = statusConfig[booking.status as keyof typeof statusConfig] || statusConfig.pending;
                              const Icon = config.icon;
                              return (
                                <>
                                  <div className={`px-6 py-2 rounded-full border font-black text-[10px] tracking-[0.2em] ${config.color}`}>
                                    {config.label}
                                  </div>
                                  <Icon className="h-6 w-6 text-white/20" />
                                </>
                              );
                            })()}
                          </div>
                          <h2 className="font-display text-4xl md:text-5xl font-black tracking-tight mb-4">
                            {booking.tour_title_snapshot}
                          </h2>
                          <p className="text-slate-400 text-lg font-medium max-w-xl">
                            {(statusConfig[booking.status as keyof typeof statusConfig] || statusConfig.pending).description}
                          </p>
                        </div>
                        
                        <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/10 text-center min-w-[240px]">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Reference Number</p>
                          <p className="text-3xl font-display font-black text-primary-glow tracking-widest">{booking.booking_reference}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-slate-400 mb-2">
                          <Calendar className="h-4 w-4" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Tour Date</span>
                        </div>
                        <p className="text-xl font-bold text-slate-900">
                          {format(new Date(booking.tour_date), "MMMM dd, yyyy")}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-slate-400 mb-2">
                          <Users className="h-4 w-4" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Travelers</span>
                        </div>
                        <p className="text-xl font-bold text-slate-900">
                          {booking.adults} Adults {booking.children ? `, ${booking.children} Children` : ""}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-slate-400 mb-2">
                          <MapPin className="h-4 w-4" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Guest Name</span>
                        </div>
                        <p className="text-xl font-bold text-slate-900">{booking.full_name}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-slate-400 mb-2">
                          <Clock className="h-4 w-4" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Booked On</span>
                        </div>
                        <p className="text-xl font-bold text-slate-900">
                          {booking.created_at ? format(new Date(booking.created_at), "MMM dd, yyyy") : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Help Card */}
                  <div className="glass-morphism p-10 rounded-[3rem] border border-white flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                        <MessageSquare className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display text-2xl font-black text-slate-900 tracking-tight">NEED ASSISTANCE?</h3>
                        <p className="text-slate-500 font-medium">Our team is available 24/7 to help with your booking.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button asChild variant="outline" className="h-14 px-8 rounded-2xl border-slate-200 font-black uppercase tracking-widest text-[10px]">
                        <a href={`mailto:${COMPANY.email}`}>EMAIL US</a>
                      </Button>
                      <Button asChild className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-[10px] shadow-lg">
                        <a href={`https://wa.me/${COMPANY.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">WHATSAPP</a>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {searched && !booking && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20 glass-morphism rounded-[3rem] border border-white"
                >
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-8">
                    <XCircle className="h-10 w-10 text-slate-300" />
                  </div>
                  <h3 className="font-display text-3xl font-black text-slate-900 mb-4 tracking-tight">NO BOOKING FOUND</h3>
                  <p className="text-slate-500 text-lg font-medium max-w-md mx-auto mb-10">
                    We couldn't find a booking with those details. Please double-check your reference number and email.
                  </p>
                  <Button 
                    onClick={() => setSearched(false)}
                    variant="outline" 
                    className="h-14 px-10 rounded-2xl border-slate-200 font-black uppercase tracking-widest text-[10px]"
                  >
                    TRY AGAIN
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

