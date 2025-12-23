import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { COMPANY } from "@/lib/constants";

const contactSchema = z.object({
  full_name: z.string().min(2).max(100),
  email: z.string().email().max(255),
  phone: z.string().max(20).optional(),
  subject: z.string().max(200).optional(),
  message: z.string().min(10).max(2000),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("messages").insert({ full_name: data.full_name, email: data.email, phone: data.phone || null, subject: data.subject || null, message: data.message });
      if (error) throw error;
      toast({ title: "Message Sent!", description: "We'll get back to you soon." });
      reset();
    } catch {
      toast({ variant: "destructive", title: "Error", description: "Failed to send message. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet><title>Contact Us | {COMPANY.name}</title></Helmet>
      <Layout>
        <section className="pt-32 pb-24 bg-gradient-hero">
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Contact Us</h1>
              <p className="text-muted-foreground text-lg">We'd love to hear from you</p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="flex items-start gap-4"><Phone className="h-6 w-6 text-primary" /><div><p className="font-semibold">Phone / WhatsApp</p><a href={`tel:${COMPANY.phone}`} className="text-muted-foreground hover:text-primary">{COMPANY.phone}</a></div></div>
                <div className="flex items-start gap-4"><Mail className="h-6 w-6 text-primary" /><div><p className="font-semibold">Email</p><a href={`mailto:${COMPANY.email}`} className="text-muted-foreground hover:text-primary">{COMPANY.email}</a></div></div>
                <div className="flex items-start gap-4"><MapPin className="h-6 w-6 text-primary" /><div><p className="font-semibold">Location</p><p className="text-muted-foreground">{COMPANY.address}</p></div></div>
              </motion.div>
              <motion.form initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} onSubmit={handleSubmit(onSubmit)} className="bg-card rounded-2xl p-6 shadow-card space-y-4">
                <div><Label>Name *</Label><Input {...register("full_name")} />{errors.full_name && <p className="text-destructive text-sm">{errors.full_name.message}</p>}</div>
                <div><Label>Email *</Label><Input type="email" {...register("email")} /></div>
                <div><Label>Phone</Label><Input {...register("phone")} /></div>
                <div><Label>Subject</Label><Input {...register("subject")} /></div>
                <div><Label>Message *</Label><Textarea rows={4} {...register("message")} /></div>
                <Button type="submit" variant="hero" className="w-full" disabled={isSubmitting}><Send className="h-4 w-4 mr-2" />{isSubmitting ? "Sending..." : "Send Message"}</Button>
              </motion.form>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
