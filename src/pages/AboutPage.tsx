import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { COMPANY } from "@/lib/constants";
import { Check, Star, Users, Shield, Globe, Heart } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { label: "Years Experience", value: "10+", icon: Star },
    { label: "Happy Travelers", value: "5k+", icon: Users },
    { label: "Local Guides", value: "15+", icon: Globe },
    { label: "Safety Rating", value: "100%", icon: Shield },
  ];

  return (
    <>
      <Helmet>
        <title>About Us | {COMPANY.name}</title>
        <meta name="description" content="Learn about Zanzibar Vibe Tours - your trusted local tour operator in Zanzibar since 2014." />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="relative pt-48 pb-24 overflow-hidden bg-slate-950">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80"
              alt="About Zanzibar Vibe Tours"
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
              <p className="text-primary-glow font-black text-xs uppercase tracking-[0.3em] mb-6">Our Story</p>
              <h1 className="font-display text-6xl md:text-9xl font-black text-white mb-10 leading-[0.85] tracking-tighter">
                BEYOND THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">HORIZON</span>
              </h1>
              <p className="text-slate-400 text-xl md:text-2xl font-medium max-w-2xl leading-relaxed">
                We don't just show you Zanzibar; we help you feel its soul. Since 2014, we've been crafting authentic island experiences that stay with you forever.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-slate-950 relative z-20 -mt-12">
          <div className="container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-morphism p-8 rounded-[2rem] border border-white/10 text-center group hover:border-primary/50 transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors duration-500">
                    <stat.icon className="h-6 w-6 text-primary group-hover:text-white" />
                  </div>
                  <p className="text-3xl font-display font-black text-white mb-1">{stat.value}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-24 bg-slate-50">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative rounded-[3.5rem] overflow-hidden shadow-premium border-8 border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&q=80" 
                    alt="Zanzibar Culture" 
                    className="w-full aspect-[4/5] object-cover"
                  />
                </div>
                <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-[3rem] overflow-hidden border-8 border-white shadow-premium hidden md:block">
                  <img 
                    src="https://images.unsplash.com/photo-1537726235470-8504e3bdb299?auto=format&fit=crop&q=80" 
                    alt="Zanzibar Beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-10"
              >
                <div className="space-y-6">
                  <h2 className="font-display text-5xl font-black text-slate-900 tracking-tight leading-none">
                    AUTHENTICITY IS OUR <span className="text-primary">COMPASS</span>
                  </h2>
                  <div className="w-20 h-2 bg-primary rounded-full" />
                </div>

                <div className="prose prose-lg text-slate-600 font-medium leading-relaxed space-y-6">
                  <p>
                    Founded in the heart of Stone Town, <strong className="text-slate-900">Zanzibar Vibe Tours</strong> was born from a simple vision: to provide travelers with more than just a tour, but a deep, meaningful connection to our island's rich heritage and natural beauty.
                  </p>
                  <p>
                    Our team of local experts brings together decades of cultural knowledge, a passion for hospitality, and an unwavering commitment to sustainable tourism. We believe that every visitor should experience the "real" Zanzibar—from the aromatic spice farms and ancient Stone Town alleys to the pristine coral reefs and secluded beaches.
                  </p>
                  <p>
                    We don't just follow paths; we create them. Our itineraries are carefully curated to avoid the crowds and immerse you in the local vibe, ensuring that your journey supports the communities we call home.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                  {[
                    "100% Local Guides",
                    "Sustainable Practices",
                    "Custom Itineraries",
                    "Private Experiences",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="font-bold text-slate-900 text-sm uppercase tracking-wider">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 bg-slate-950 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          </div>
          
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-12">
              <div className="w-20 h-20 rounded-3xl bg-primary/20 flex items-center justify-center mx-auto border border-primary/30">
                <Heart className="h-10 w-10 text-primary fill-primary" />
              </div>
              <h2 className="font-display text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
                OUR MISSION IS TO MAKE YOU <span className="text-primary-glow italic">FALL IN LOVE</span> WITH ZANZIBAR
              </h2>
              <p className="text-slate-400 text-xl md:text-2xl font-medium leading-relaxed">
                We strive to be the most trusted and innovative tour operator in East Africa, setting the standard for luxury, authenticity, and responsible travel.
              </p>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

