import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Phone, ArrowRight, Calendar, MessageSquare } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";

export default function BookingSuccessPage() {
  const [searchParams] = useSearchParams();
  const bookingRef = searchParams.get("ref");

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center py-32 bg-slate-50 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container max-w-2xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-morphism p-10 md:p-16 rounded-[3.5rem] border border-white shadow-premium text-center"
          >
            <div className="w-24 h-24 rounded-[2rem] bg-primary/10 flex items-center justify-center mx-auto mb-10 shadow-inner">
              <CheckCircle className="h-12 w-12 text-primary" />
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              BOOKING <span className="text-primary">SUBMITTED!</span>
            </h1>
            
            <p className="text-slate-500 text-lg font-medium mb-10 leading-relaxed">
              Thank you for choosing {COMPANY.shortName}. We've received your request and our team is already working on your adventure. You'll receive a confirmation within 24 hours.
            </p>
            
            {bookingRef && (
              <div className="bg-slate-950 rounded-[2rem] p-8 mb-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-primary/20 transition-colors" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">Your Reference</p>
                <p className="text-3xl font-display font-black text-white tracking-widest">{bookingRef}</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Button asChild className="h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl group">
                <Link to="/tours">
                  Browse More Tours
                  <ArrowRight className="h-4 w-4 ml-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-16 rounded-2xl border-slate-200 hover:bg-slate-50 text-slate-900 font-black uppercase tracking-[0.2em] text-xs">
                <a href={`https://wa.me/${COMPANY.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="h-4 w-4 mr-3" />
                  WhatsApp Us
                </a>
              </Button>
            </div>

            <div className="mt-12 pt-12 border-t border-slate-100 flex items-center justify-center gap-8">
              <div className="flex items-center gap-3 text-slate-400">
                <Calendar className="h-4 w-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">24/7 Support</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Phone className="h-4 w-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Instant Help</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

