import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { COMPANY } from "@/lib/constants";

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us | {COMPANY.name}</title>
        <meta name="description" content="Learn about Giandu Di Zanzibar Tour and Safari - your trusted local tour operator in Zanzibar since 2014." />
      </Helmet>
      <Layout>
        <section className="pt-32 pb-24 bg-gradient-hero">
          <div className="container max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">About Giandu Zanzibar</h1>
              <p className="text-muted-foreground text-lg">Your trusted local partner for authentic Zanzibar experiences</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="prose prose-lg max-w-none">
              <div className="bg-card rounded-2xl p-8 shadow-card space-y-6 text-muted-foreground">
                <p>Founded in Stone Town, <strong className="text-foreground">Giandu Di Zanzibar Tour and Safari</strong> has been sharing the magic of the Spice Island with travelers from around the world. Our team of local experts brings together deep cultural knowledge, a passion for hospitality, and a commitment to sustainable tourism.</p>
                <p>We believe every visitor should experience the real Zanzibar – from the aromatic spice farms and ancient Stone Town alleys to the pristine coral reefs and secluded beaches. Our tours are designed to create meaningful connections between travelers and local communities.</p>
                <p>Whether you're seeking adventure, relaxation, or cultural immersion, we're here to make your Zanzibar dreams a reality. Contact us today and let's start planning your perfect island getaway.</p>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
}
