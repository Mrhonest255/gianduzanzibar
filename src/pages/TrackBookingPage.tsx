import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Search, CheckCircle, Clock, XCircle, Archive, Phone, Mail, Calendar, Users, MapPin } from "lucide-react";
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
    label: "Pending",
    icon: Clock,
    color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    description: "Your booking is being reviewed by our team.",
  },
  approved: {
    label: "Confirmed",
    icon: CheckCircle,
    color: "bg-forest-green/10 text-forest-green",
    description: "Your booking has been confirmed! We'll see you soon.",
  },
  rejected: {
    label: "Not Available",
    icon: XCircle,
    color: "bg-destructive/10 text-destructive",
    description: "Unfortunately, the requested date is not available. Please contact us for alternatives.",
  },
  archived: {
    label: "Completed",
    icon: Archive,
    color: "bg-muted text-muted-foreground",
    description: "This tour has been completed. Thank you for traveling with us!",
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
        title: "Missing Information",
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
          title: "Booking Not Found",
          description: "No booking found with the provided reference and email.",
        });
      }
    } catch (err) {
      console.error("Search error:", err);
      toast({
        variant: "destructive",
        title: "Search Failed",
        description: "An error occurred while searching. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const status = booking?.status as keyof typeof statusConfig || "pending";
  const StatusIcon = statusConfig[status]?.icon || Clock;

  return (
    <>
      <Helmet>
        <title>Track Your Booking | {COMPANY.name}</title>
        <meta name="description" content="Track your tour booking status with Giandu Zanzibar. Enter your booking reference to check confirmation status." />
      </Helmet>
      <Layout>
        <div className="pt-24 pb-16 bg-background min-h-screen">
          <div className="container max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-ocean-light text-primary text-sm font-medium mb-4">
                Booking Status
              </span>
              <h1 className="font-display text-4xl font-bold text-foreground mb-4">
                Track Your Booking
              </h1>
              <p className="text-muted-foreground text-lg">
                Enter your booking reference and email to check your booking status.
              </p>
            </motion.div>

            {/* Search Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-primary" />
                    Find Your Booking
                  </CardTitle>
                  <CardDescription>
                    Your booking reference was provided in your confirmation email.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSearch} className="space-y-4">
                    <div>
                      <label htmlFor="bookingRef" className="block text-sm font-medium text-foreground mb-1.5">
                        Booking Reference *
                      </label>
                      <Input
                        id="bookingRef"
                        placeholder="e.g., GDZ-20241223-abc12345"
                        value={bookingRef}
                        onChange={(e) => setBookingRef(e.target.value)}
                        className="uppercase"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Searching..." : "Track Booking"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Booking Result */}
            {searched && booking && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                <Card className="shadow-medium overflow-hidden">
                  {/* Status Header */}
                  <div className={`p-6 ${statusConfig[status]?.color || "bg-muted"}`}>
                    <div className="flex items-center gap-3">
                      <StatusIcon className="h-8 w-8" />
                      <div>
                        <h2 className="text-xl font-bold">
                          {statusConfig[status]?.label || "Unknown"}
                        </h2>
                        <p className="text-sm opacity-90">
                          {statusConfig[status]?.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-6">
                    {/* Booking Reference */}
                    <div className="text-center py-4 bg-ocean-light rounded-xl">
                      <p className="text-sm text-muted-foreground mb-1">Booking Reference</p>
                      <p className="text-2xl font-bold text-primary font-mono">
                        {booking.booking_reference}
                      </p>
                    </div>

                    {/* Tour Details */}
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Tour Details</h3>
                      <div className="bg-card rounded-lg p-4 border border-border space-y-3">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium text-foreground">{booking.tour_title_snapshot}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-primary" />
                          <p className="text-muted-foreground">
                            {format(new Date(booking.tour_date), "EEEE, MMMM d, yyyy")}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Users className="h-5 w-5 text-primary" />
                          <p className="text-muted-foreground">
                            {booking.adults || 1} Adult{(booking.adults || 1) > 1 ? "s" : ""}
                            {booking.children ? `, ${booking.children} Child${booking.children > 1 ? "ren" : ""}` : ""}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Guest Details */}
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Guest Details</h3>
                      <div className="bg-card rounded-lg p-4 border border-border space-y-2">
                        <p className="text-foreground font-medium">{booking.full_name}</p>
                        <p className="text-muted-foreground text-sm">{booking.email}</p>
                        <p className="text-muted-foreground text-sm">{booking.phone}</p>
                        {booking.country && (
                          <p className="text-muted-foreground text-sm">{booking.country}</p>
                        )}
                      </div>
                    </div>

                    {/* Special Requests */}
                    {booking.message && (
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Special Requests</h3>
                        <div className="bg-sand-light rounded-lg p-4">
                          <p className="text-muted-foreground text-sm">{booking.message}</p>
                        </div>
                      </div>
                    )}

                    {/* Booked On */}
                    {booking.created_at && (
                      <div className="text-center text-sm text-muted-foreground pt-4 border-t border-border">
                        Booked on {format(new Date(booking.created_at), "MMMM d, yyyy 'at' h:mm a")}
                      </div>
                    )}

                    {/* Contact CTA */}
                    <div className="bg-ocean-light rounded-xl p-4 text-center">
                      <p className="text-sm text-muted-foreground mb-3">
                        Have questions about your booking?
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2 justify-center">
                        <Button asChild variant="outline" size="sm">
                          <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer">
                            <Phone className="h-4 w-4 mr-2" />
                            WhatsApp
                          </a>
                        </Button>
                        <Button asChild variant="outline" size="sm">
                          <a href={`mailto:${COMPANY.email}?subject=Booking ${booking.booking_reference}`}>
                            <Mail className="h-4 w-4 mr-2" />
                            Email Us
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Not Found State */}
            {searched && !booking && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                <Card className="shadow-medium">
                  <CardContent className="py-12 text-center">
                    <XCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Booking Not Found
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      We couldn't find a booking matching the provided reference and email.
                      Please check your details and try again.
                    </p>
                    <Button asChild variant="outline">
                      <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer">
                        <Phone className="h-4 w-4 mr-2" />
                        Contact Support
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}
