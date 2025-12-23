import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, MapPin, Send, MessageSquare, Clock, Globe } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { COMPANY } from "@/lib/constants";

const contactSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address").max(255),
  phone: z.string().max(20).optional(),
  subject: z.string().max(200).optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Save to database
      const { error } = await supabase.from("messages").insert({
        full_name: data.full_name,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject || null,
        message: data.message,
      });
      if (error) throw error;

      // Send email notification
      try {
        await supabase.functions.invoke("send-email", {
          body: {
            type: "contact",
            data: {
              full_name: data.full_name,
              email: data.email,
              phone: data.phone,
              subject: data.subject,
              message: data.message,
            },
          },
        });
      } catch (emailError) {
        console.error("Email notification failed:", emailError);
        // Don't fail the whole submission if email fails
      }

      toast({
        title: "MESSAGE SENT",
        description: "We've received your message and will get back to you shortly.",
      });
      reset();
    } catch (err) {
      console.error("Contact error:", err);
      toast({
        variant: "destructive",
        title: "ERROR",
        description: "Failed to send message. Please try again or contact us via WhatsApp.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | {COMPANY.name}</title>
        <meta name="description" content="Get in touch with Zanzibar Vibe Tours for bookings, inquiries, or custom safari planning." />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="relative pt-48 pb-24 overflow-hidden bg-slate-950">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1537726235470-8504e3bdb299?auto=format&fit=crop&q=80"
              alt="Contact Zanzibar Vibe Tours"
              className="w-full h-full object-cover opacity-40 animate-ken-burns"
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
              <p className="text-primary-glow font-black text-xs uppercase tracking-[0.3em] mb-6">Get In Touch</p>
              <h1 className="font-display text-6xl md:text-9xl font-black text-white mb-10 leading-[0.85] tracking-tighter">
                LET'S START YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">ADVENTURE</span>
              </h1>
              <p className="text-slate-400 text-xl md:text-2xl font-medium max-w-2xl leading-relaxed">
                Have questions about our tours or want to plan a custom itinerary? Our local experts are ready to help you craft the perfect Zanzibar experience.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-24 bg-slate-50 relative">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Contact Info */}
              <div className="lg:col-span-5 space-y-12">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <h2 className="font-display text-4xl font-black text-slate-900 tracking-tight">CONNECT WITH US</h2>
                  
                  <div className="grid gap-6">
                    <div className="glass-morphism p-8 rounded-[2.5rem] border border-white flex items-start gap-6 group hover:shadow-premium transition-all duration-500">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Call or WhatsApp</p>
                        <a href={`tel:${COMPANY.phone}`} className="text-xl font-bold text-slate-900 hover:text-primary transition-colors">
                          {COMPANY.phone}
                        </a>
                      </div>
                    </div>

                    <div className="glass-morphism p-8 rounded-[2.5rem] border border-white flex items-start gap-6 group hover:shadow-premium transition-all duration-500">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Email Us</p>
                        <a href={`mailto:${COMPANY.email}`} className="text-xl font-bold text-slate-900 hover:text-primary transition-colors">
                          {COMPANY.email}
                        </a>
                      </div>
                    </div>

                    <div className="glass-morphism p-8 rounded-[2.5rem] border border-white flex items-start gap-6 group hover:shadow-premium transition-all duration-500">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Our Office</p>
                        <p className="text-xl font-bold text-slate-900">
                          {COMPANY.address}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8">
                    <h3 className="font-display text-xl font-black text-slate-900 mb-6 tracking-tight">OPERATING HOURS</h3>
                    <div className="flex items-center gap-4 text-slate-600 font-medium">
                      <Clock className="h-5 w-5 text-primary" />
                      <p>Monday — Sunday: 08:00 AM - 08:00 PM (EAT)</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass-morphism p-10 md:p-16 rounded-[3.5rem] border border-white shadow-premium relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-10">
                      <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-glow">
                        <MessageSquare className="h-6 w-6 text-white" />
                      </div>
                      <h2 className="font-display text-3xl font-black text-slate-900 tracking-tight">SEND A MESSAGE</h2>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Full Name *</Label>
                          <Input 
                            {...register("full_name")} 
                            placeholder="John Doe"
                            className="h-14 rounded-2xl border-slate-200 bg-white/50 focus:bg-white transition-all"
                          />
                          {errors.full_name && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-1">{errors.full_name.message}</p>}
                        </div>
                        <div className="space-y-3">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email Address *</Label>
                          <Input 
                            type="email" 
                            {...register("email")} 
                            placeholder="john@example.com"
                            className="h-14 rounded-2xl border-slate-200 bg-white/50 focus:bg-white transition-all"
                          />
                          {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-1">{errors.email.message}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Phone Number</Label>
                          <Input 
                            {...register("phone")} 
                            placeholder="+1 234 567 890"
                            className="h-14 rounded-2xl border-slate-200 bg-white/50 focus:bg-white transition-all"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Subject</Label>
                          <Input 
                            {...register("subject")} 
                            placeholder="Tour Inquiry"
                            className="h-14 rounded-2xl border-slate-200 bg-white/50 focus:bg-white transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Your Message *</Label>
                        <Textarea 
                          rows={6} 
                          {...register("message")} 
                          placeholder="Tell us about your dream Zanzibar trip..."
                          className="rounded-[2rem] border-slate-200 bg-white/50 focus:bg-white transition-all resize-none p-6"
                        />
                        {errors.message && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider mt-1">{errors.message.message}</p>}
                      </div>

                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full h-16 rounded-2xl bg-slate-950 hover:bg-primary text-white font-black uppercase tracking-[0.2em] text-xs transition-all duration-500 shadow-xl group"
                      >
                        {isSubmitting ? (
                          "SENDING..."
                        ) : (
                          <>
                            SEND MESSAGE
                            <Send className="h-4 w-4 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </form>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="h-[500px] w-full bg-slate-200 relative overflow-hidden">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d39.1893!3d-6.1659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185cd0e1f59d183b%3A0x2d3c9d179810e60!2sStone%20Town%2C%20Zanzibar!5e0!3m2!1sen!2stz!4v1645454545454!5m2!1sen!2stz" 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'grayscale(1) contrast(1.2) opacity(0.8)' }} 
            allowFullScreen 
            loading="lazy"
          />
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.1)]" />
        </section>
      </Layout>
    </>
  );
}

