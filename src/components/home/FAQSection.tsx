import { motion } from "framer-motion";
import { HelpCircle, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function FAQSection() {
  return (
    <section className="py-32 bg-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-primary text-sm font-medium mb-8"
          >
            <HelpCircle className="h-4 w-4" />
            <span className="tracking-widest uppercase">FAQ</span>
          </motion.div>
          
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            Common
            <span className="block mt-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          
          <p className="text-white/60 text-xl max-w-2xl mx-auto">
            Everything you need to know about booking tours with us. 
            Can't find an answer? Contact us directly!
          </p>
        </motion.div>

        {/* Premium FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {FAQ.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl px-6 border border-white/10 hover:border-primary/30 transition-all duration-300"
                >
                  <AccordionTrigger className="text-left font-display text-lg font-semibold text-white hover:text-primary py-6 [&[data-state=open]]:text-primary">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/60 pb-6 leading-relaxed text-lg">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-white/50 mb-4">Still have questions?</p>
          <Button 
            asChild
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary px-8 py-6 rounded-2xl text-lg shadow-glow hover:shadow-premium transition-all group"
          >
            <Link to="/contact">
              <MessageCircle className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Contact Us
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
