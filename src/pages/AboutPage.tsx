import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { COMPANY } from "@/lib/constants";
import { Users, Award, MapPin, Heart, Star, Shield, Globe, Compass } from "lucide-react";

export default function AboutPage() {
  const values = [
    { icon: Heart, title: "Passion", desc: "We live and breathe Zanzibar, sharing our love for the island with every guest." },
    { icon: Shield, title: "Trust", desc: "Transparent pricing, reliable service, and honest recommendations." },
    { icon: Globe, title: "Sustainability", desc: "Supporting local communities and protecting our natural heritage." },
    { icon: Compass, title: "Adventure", desc: "Crafting unique experiences that create lasting memories." },
  ];

  const stats = [
    { value: "10+", label: "Years Experience" },
    { value: "500+", label: "Happy Travelers" },
    { value: "50+", label: "Unique Tours" },
    { value: "5.0", label: "Average Rating" },
  ];

  return (
    <>
      <Helmet>
        <title>About Us | {COMPANY.name}</title>
        <meta name="description" content="Learn about Giandu Di Zanzibar Tour and Safari - your trusted local tour operator in Zanzibar. Experience authentic adventures with local experts." />
      </Helmet>
      <Layout>
        {/* Premium Hero Section */}
        <section className="relative pt-48 pb-32 overflow-hidden bg-slate-950">
          {/* Background with Ken Burns */}
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-cover bg-center animate-ken-burns scale-110"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1920&q=80)`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950" />
          </div>

          {/* Floating Elements */}
          <motion.div
            animate={{ y: [-20, 20, -20] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-32 left-10 w-64 h-64 rounded-full bg-primary/20 blur-3xl"
          />
          <motion.div
            animate={{ y: [20, -20, 20] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-accent/20 blur-3xl"
          />

          <div className="container relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 40 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              {/* Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-primary text-sm font-medium mb-8"
              >
                <Users className="h-4 w-4" />
                <span className="tracking-widest uppercase">Our Story</span>
              </motion.div>

              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                About
                <span className="block mt-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Giandu Tours
                </span>
              </h1>
              
              <p className="text-white/70 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
                Your trusted local partner for authentic Zanzibar experiences since 2014
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-slate-900 border-b border-white/10">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <p className="font-display text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </p>
                  <p className="text-white/60 text-sm uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24 bg-slate-950 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          </div>

          <div className="container relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
                  <img
                    src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=800&q=80"
                    alt="Zanzibar local guide"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                </div>
                
                {/* Floating Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="absolute -bottom-6 -right-6 px-6 py-4 rounded-2xl bg-primary text-white shadow-glow"
                >
                  <div className="flex items-center gap-2">
                    <Award className="h-6 w-6" />
                    <span className="font-display font-bold text-lg">Local Experts</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
                  Our <span className="text-primary">Story</span>
                </h2>
                
                <div className="space-y-6 text-white/70 text-lg leading-relaxed">
                  <p>
                    Founded in Stone Town, <strong className="text-white">Giandu Tours and Safari</strong> has been sharing the magic of the Spice Island with travelers from around the world for over a decade.
                  </p>
                  <p>
                    Our team of local experts brings together deep cultural knowledge, a passion for hospitality, and a commitment to sustainable tourism that benefits our communities.
                  </p>
                  <p>
                    We believe every visitor should experience the real Zanzibar – from the aromatic spice farms and ancient Stone Town alleys to the pristine coral reefs and secluded beaches.
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-slate-950" />
                    ))}
                  </div>
                  <div>
                    <p className="text-white font-semibold">Our Expert Team</p>
                    <p className="text-white/50 text-sm">Local guides who love what they do</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-slate-900">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Our <span className="text-primary">Values</span>
              </h2>
              <p className="text-white/60 text-xl max-w-2xl mx-auto">
                What drives us to deliver exceptional experiences every day
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-6 shadow-glow group-hover:shadow-premium transition-all duration-500">
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {value.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
