import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Compass, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
      </div>

      <div className="container relative z-10 max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-32 h-32 rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center mx-auto mb-12 shadow-2xl">
            <Compass className="h-16 w-16 text-primary animate-spin-slow" />
          </div>

          <h1 className="font-display text-8xl md:text-9xl font-black text-white mb-6 tracking-tighter">
            404
          </h1>
          
          <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-8 tracking-tight uppercase">
            LOST IN THE <span className="text-primary-glow">VIBE?</span>
          </h2>
          
          <p className="text-slate-400 text-xl font-medium mb-12 leading-relaxed">
            The page you're looking for has drifted away into the Indian Ocean. Let's get you back to the mainland.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button asChild className="h-16 px-10 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl group">
              <Link to="/">
                <Home className="h-4 w-4 mr-3" />
                Back to Home
              </Link>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.history.back()}
              className="h-16 px-10 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-[0.2em] text-xs backdrop-blur-md"
            >
              <ArrowLeft className="h-4 w-4 mr-3" />
              Go Back
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;

