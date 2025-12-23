import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";

export function CTASection() {
  return (
    <section className="py-24 bg-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=1920&auto=format&fit=crop)`,
          }}
        />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-background mb-6">
            Ready for Your Zanzibar Adventure?
          </h2>
          <p className="text-background/70 text-lg mb-10 leading-relaxed">
            Let us help you plan the perfect trip. Whether you're looking for adventure, relaxation, 
            or cultural immersion, we have the experience to make it happen.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="xl" className="bg-primary hover:bg-primary/90">
              <Link to="/tours">
                Browse All Tours
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl" className="border-background/30 text-background hover:bg-background/10">
              <a href={`tel:${COMPANY.phone}`}>
                <Phone className="h-5 w-5 mr-2" />
                Call Us Now
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
