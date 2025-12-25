import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Car, Plane, MapPin, Clock, Users, CheckCircle, MessageCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { COMPANY } from "@/lib/constants";

const transfers = [
  {
    id: 1,
    title: "Airport to North/South/East Hotels",
    description: "Comfortable transfer from Zanzibar Airport to hotels in the North, South, or East coast areas. Air-conditioned vehicles with professional drivers.",
    price: 42,
    currency: "€",
    unit: "per trip",
    capacity: "1-4 people",
    duration: "45-90 min",
    includes: [
      "Airport pickup/drop-off",
      "Air-conditioned vehicle",
      "Professional driver",
      "Luggage assistance",
      "24/7 availability",
    ],
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Airport to Stone Town Hotels",
    description: "Quick and affordable transfer from Zanzibar Airport to Stone Town hotels. Perfect for travelers staying in the historic heart of Zanzibar.",
    price: 22,
    currency: "€",
    unit: "per trip",
    capacity: "1-4 people",
    duration: "15-25 min",
    includes: [
      "Airport pickup/drop-off",
      "Air-conditioned vehicle",
      "Professional driver",
      "Luggage assistance",
      "Drop at hotel entrance",
    ],
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Hotel to Hotel Transfer",
    description: "Convenient transfers between hotels anywhere in Zanzibar. Ideal when changing accommodations during your stay.",
    price: 35,
    currency: "€",
    unit: "per trip",
    capacity: "1-4 people",
    duration: "Varies",
    includes: [
      "Hotel pickup",
      "Air-conditioned vehicle",
      "Professional driver",
      "Luggage assistance",
      "Drop at new hotel",
    ],
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
  },
];

export default function TransfersPage() {
  const handleBookNow = (transferTitle: string) => {
    const message = encodeURIComponent(
      `Hello! I would like to book a transfer:\n\n${transferTitle}\n\nPlease provide availability and confirm the booking.`
    );
    window.open(`${COMPANY.whatsappLink}?text=${message}`, "_blank");
  };

  return (
    <>
      <Helmet>
        <title>Airport Transfers in Zanzibar | {COMPANY.name}</title>
        <meta
          name="description"
          content="Book reliable airport transfers in Zanzibar. From €22 to Stone Town, €42 to North/South hotels. Comfortable air-conditioned vehicles, professional drivers."
        />
        <meta name="keywords" content="Zanzibar airport transfer, Zanzibar taxi, airport pickup Zanzibar, Stone Town transfer, hotel transfer Zanzibar" />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="relative pt-48 pb-24 overflow-hidden bg-slate-950">
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1920&q=80)`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950" />
          </div>

          <div className="container relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-6">
                <Car className="h-4 w-4" />
                <span className="text-sm font-semibold">Reliable Transfers</span>
              </div>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
                Airport & Hotel <span className="text-primary">Transfers</span>
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Comfortable and reliable transportation across Zanzibar. Book your airport pickup or hotel transfer with professional drivers.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Transfers Grid */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {transfers.map((transfer, index) => (
                <motion.div
                  key={transfer.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-48">
                      <img
                        src={transfer.image}
                        alt={transfer.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full font-bold">
                        {transfer.currency}{transfer.price}
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{transfer.title}</CardTitle>
                      <p className="text-muted-foreground text-sm">{transfer.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          {transfer.capacity}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {transfer.duration}
                        </div>
                      </div>
                      <div className="border-t pt-4">
                        <p className="text-sm font-semibold mb-2">Includes:</p>
                        <ul className="space-y-1">
                          {transfer.includes.map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="h-3 w-3 text-primary" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button
                        className="w-full mt-4"
                        onClick={() => handleBookNow(transfer.title)}
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Book Now
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 p-8 bg-primary/5 rounded-2xl border border-primary/20"
            >
              <div className="text-center mb-8">
                <h2 className="font-display text-3xl font-bold mb-4">Why Choose Our Transfers?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  We provide the most reliable and comfortable transfer service in Zanzibar
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { icon: Clock, title: "24/7 Service", desc: "Available anytime, any day" },
                  { icon: Users, title: "Meet & Greet", desc: "Driver waiting with your name" },
                  { icon: Car, title: "Modern Vehicles", desc: "Clean, air-conditioned cars" },
                  { icon: MapPin, title: "Island-Wide", desc: "All destinations covered" },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
}
