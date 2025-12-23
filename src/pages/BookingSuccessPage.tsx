import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Phone, ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";

export default function BookingSuccessPage() {
  const [searchParams] = useSearchParams();
  const bookingRef = searchParams.get("ref");

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-24">
        <div className="container max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-20 h-20 rounded-full bg-forest-green/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-forest-green" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">
              Booking Submitted!
            </h1>
            <p className="text-muted-foreground mb-6">
              Thank you for choosing Giandu Zanzibar. We've received your booking request and will confirm within 24 hours.
            </p>
            {bookingRef && (
              <div className="bg-ocean-light rounded-xl p-4 mb-8">
                <p className="text-sm text-muted-foreground">Your Booking Reference</p>
                <p className="text-2xl font-bold text-primary">{bookingRef}</p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero">
                <Link to="/tours">
                  Browse More Tours
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <a href={`tel:${COMPANY.phone}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call Us
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
