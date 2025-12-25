import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { 
  Mountain, MapPin, Clock, Users, CheckCircle, MessageCircle, 
  Calendar, DollarSign, ChevronRight, Plane, Star
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { COMPANY } from "@/lib/constants";

const mainlandTours = [
  {
    id: "ngorongoro",
    title: "Ngorongoro Crater Day Trip",
    shortDescription: "A one-day safari to Ngorongoro Crater, home to a vast number of wildlife, including the Big Five.",
    longDescription: "Experience the world's largest intact volcanic caldera, home to approximately 25,000 large animals including the Big Five. The crater floor offers incredible game viewing opportunities with lions, elephants, rhinos, buffalo, and leopards. Enjoy stunning views and unforgettable wildlife encounters.",
    price: 325,
    currency: "$",
    duration: "Full Day",
    location: "Ngorongoro, Tanzania",
    category: "Safari",
    images: [
      "https://www.andbeyond.com/wp-content/uploads/sites/5/ngorongoro-crater-floor-teaming-with-game.jpg",
      "https://abundadiscoveriesuganda.com/wp-content/uploads/2025/01/Ngorongoro-National-Park-Tanzania-by-Licious-Adventure-%E2%80%94-YouPic.jpg",
      "https://www.discoverafrica.com/wp-content/uploads/2019/06/iStock-536747875.jpg",
      "https://www.africanmeccasafaris.com/wp-content/uploads/gibbsfarm2.jpg",
      "https://www.ngorongorocratertanzania.org/wp-content/uploads/2020/02/asas-1.jpg",
      "https://www.ngorongorocratertanzania.org/wp-content/uploads/2019/04/Ngorongoro-Facts-750x450.jpg",
    ],
    includes: [
      "Hotel pickup and drop-off",
      "Flight tickets (round trip)",
      "Park entrance fees",
      "Safari jeep with pop-up roof",
      "Professional safari guide",
      "Lunch box",
      "Bottled water",
    ],
    highlights: ["Big Five wildlife", "Volcanic crater views", "Maasai culture", "Bird watching"],
  },
  {
    id: "mikumi",
    title: "Mikumi National Park 1 Day Trip from Zanzibar",
    shortDescription: "A one-day safari to Mikumi National Park, known for its elephants, lions, and zebras. Travel from Zanzibar by flight.",
    longDescription: "Fly from Zanzibar to experience the wild beauty of Mikumi National Park, Tanzania's fourth-largest park. Known as 'Little Serengeti', it offers excellent game viewing with elephants, lions, zebras, wildebeests, and giraffes roaming the savanna.",
    price: 420,
    currency: "€",
    duration: "Full Day",
    location: "Mikumi, Tanzania",
    category: "Safari",
    images: [
      "https://www.ngorongorocratertanzania.org/wp-content/uploads/2023/03/1-Day-Trip-Mikumi-National-Park-1.jpg",
      "https://www.focuseastafricatours.com/wp-content/uploads/Mikumi-National-Park-1.jpg",
      "https://www.leopard-tours.com/wp-content/uploads/2015/12/Mikumi-National-Park-4-1024x680.jpg",
      "https://enosaexpeditions.com/images/2022/05/19/mikumi.jpg",
    ],
    includes: [
      "Transport from hotel to airport (go and return)",
      "Flight tickets (go and return)",
      "Lunch",
      "Jeep for Safari",
      "Tour guide",
      "Park entrance fees",
    ],
    highlights: ["Flight from Zanzibar", "Big game viewing", "Savanna landscapes", "Professional guide"],
  },
  {
    id: "materuni",
    title: "Materuni Waterfalls and Coffee Tour",
    shortDescription: "A tour to the scenic Materuni Waterfalls combined with a coffee experience near Mount Kilimanjaro.",
    longDescription: "Discover the stunning Materuni Waterfalls, cascading 80 meters through lush tropical forest. Learn about traditional coffee production from local Chagga farmers, roast your own beans, and enjoy the most authentic cup of coffee with Kilimanjaro views.",
    price: 60,
    currency: "$",
    duration: "Half Day",
    location: "Kilimanjaro, Tanzania",
    category: "Cultural",
    images: [
      "https://www.tanzaniatourism.com/images/uploads/Materuni_Waterfalls_15.jpg",
      "https://tanzania-specialist.com/wp-content/uploads/2023/11/kuringe-waterfall-2.jpg",
      "https://www.tanzaniatourism.com/images/uploads/Materuni_Waterfalls_01.jpg",
      "https://wildlifesafaritanzania.com/wp-content/uploads/2022/10/image-1.jpg",
    ],
    includes: [
      "Hotel pickup and drop-off",
      "English-speaking guide",
      "Coffee tour experience",
      "Waterfall swimming",
      "Lunch with local family",
    ],
    highlights: ["80m waterfall", "Coffee roasting", "Chagga culture", "Kilimanjaro views"],
  },
  {
    id: "chemka",
    title: "Chemka Hot Springs Day Trip",
    shortDescription: "A one-day tour to Chemka Hot Springs, a perfect place for swimming and relaxation.",
    longDescription: "Escape to the crystal-clear turquoise waters of Chemka Hot Springs, a hidden paradise surrounded by palm trees. The natural geothermal springs maintain a perfect temperature year-round, ideal for swimming and relaxation in a serene tropical setting.",
    price: 65,
    currency: "$",
    duration: "Half Day",
    location: "Moshi, Tanzania",
    category: "Nature",
    images: [
      "https://www.lilistravelplans.com/wp-content/uploads/2017/06/P1460044-Edit-2.jpg",
      "https://www.tanzaniatourism.com/images/uploads/Rundugai_Hotsprings_Kilimanjaro.jpg",
      "https://cdn.tripspoint.com/uploads/photos/712/chemka-hot-springs-tour_mo3dv.jpeg",
      "https://www.tanzaniaadventures.co.tz/pics/Guide-to-Chemka-Hot-Springs.jpg",
      "https://www.tanzaniatourism.com/images/uploads/Rundugai_Hotsprings_Tour.jpg",
    ],
    includes: [
      "Hotel pickup and drop-off",
      "Swimming time",
      "English-speaking guide",
      "Entrance fees",
      "Light refreshments",
    ],
    highlights: ["Crystal clear water", "Natural hot springs", "Tropical setting", "Swimming & relaxation"],
  },
  {
    id: "kilimanjaro-hike",
    title: "Kilimanjaro Day Hike via Marangu Route",
    shortDescription: "A one-day hike on Mount Kilimanjaro via the Marangu Route, ideal for those who want to experience Africa's highest mountain.",
    longDescription: "Experience Africa's highest mountain without a full climb! This day hike takes you through the lush montane forest of Kilimanjaro, offering spectacular views and encounters with unique flora and fauna. Perfect introduction to the mountain.",
    price: 160,
    currency: "$",
    duration: "Full Day",
    location: "Kilimanjaro, Tanzania",
    category: "Adventure",
    images: [
      "https://www.andbeyond.com/wp-content/uploads/sites/5/hike-shireau-plateau-kilimanjaro.jpg",
      "https://vivaafricatours.com/wp-content/uploads/2014/12/DSC02977-e1420118663215.jpg",
      "https://arushatrips.com/wp-content/uploads/2019/10/Kilimanjaro-day-hike-2.png",
      "https://www.shah-tours.com/wp-content/uploads/2024/02/Kilimanjaro-One-day-forest-hike-1000x630_c.jpg",
      "https://www.tranquilkilimanjaro.com/wp-content/uploads/shira-plateau-kilimanjaro-day-hike.jpg",
    ],
    includes: [
      "Hotel pickup and drop-off",
      "Park entrance fees",
      "Professional mountain guide",
      "Packed lunch",
      "Bottled water",
    ],
    highlights: ["Africa's highest peak", "Montane forest", "Unique flora", "Stunning views"],
  },
  {
    id: "tarangire",
    title: "Tarangire National Park Day Trip",
    shortDescription: "A one-day safari in Tarangire National Park, famous for its large elephant herds and iconic baobab trees.",
    longDescription: "Explore Tarangire National Park, famous for the largest elephant herds in Tanzania. The park's dramatic landscape is dotted with ancient baobab trees and offers excellent wildlife viewing including lions, leopards, and over 500 bird species.",
    price: 180,
    currency: "$",
    duration: "Full Day",
    location: "Tarangire, Tanzania",
    category: "Safari",
    images: [
      "https://www.andbeyond.com/wp-content/uploads/sites/5/boabab-tarangire-national-park.jpg",
      "https://imgix.brilliant-africa.com/tarangire-national-park-elephant.jpg?auto=format,enhance,compress&fit=crop&crop=entropy,faces,focalpoint&w=580&h=480&q=40",
      "https://www.serengetiparktanzania.com/wp-content/uploads/2019/07/Tarangire-National-Park-750x450.jpg",
      "https://africa-safari.com/wp-content/uploads/PARK-TARANGIRE-NATIONAL-PARK.jpg",
      "https://www.tarangirenationalparks.com/wp-content/uploads/2020/08/Game-Drive-in-Tarangire-National-Park.jpg",
      "https://www.tanzania-safaris.com/destinations/Tarangire-national-parks.jpg",
      "https://african-view.com/wp-content/uploads/2024/03/elephants-tarangire.jpg",
    ],
    includes: [
      "Hotel pickup and drop-off",
      "Park entrance fees",
      "Safari jeep with guide",
      "Lunch box",
      "Bottled water",
    ],
    highlights: ["Elephant herds", "Baobab trees", "Bird watching", "Lion sightings"],
  },
  {
    id: "manyara",
    title: "Lake Manyara National Park Day Trip",
    shortDescription: "A day trip to Lake Manyara National Park, known for its tree-climbing lions and flocks of flamingos.",
    longDescription: "Discover Lake Manyara National Park, a gem of the Great Rift Valley famous for tree-climbing lions and flocks of pink flamingos. The park offers diverse ecosystems from groundwater forests to grassy floodplains.",
    price: 180,
    currency: "$",
    duration: "Full Day",
    location: "Manyara, Tanzania",
    category: "Safari",
    images: [
      "https://www.andbeyond.com/wp-content/uploads/sites/5/boabab-tarangire-national-park.jpg",
      "https://imgix.brilliant-africa.com/tarangire-national-park-elephant.jpg?auto=format,enhance,compress&fit=crop&crop=entropy,faces,focalpoint&w=580&h=480&q=40",
    ],
    includes: [
      "Hotel pickup and drop-off",
      "Park entrance fees",
      "Safari jeep with guide",
      "Lunch box",
      "Bottled water",
    ],
    highlights: ["Tree-climbing lions", "Flamingos", "Great Rift Valley", "Diverse wildlife"],
  },
  {
    id: "arusha",
    title: "Arusha National Park Day Trip",
    shortDescription: "A safari in Arusha National Park, home to giraffes, black-and-white colobus monkeys, and breathtaking landscapes.",
    longDescription: "Explore Arusha National Park with its diverse landscapes including Mount Meru, Momella Lakes, and Ngurdoto Crater. Home to giraffes, buffalos, colobus monkeys, and hundreds of bird species.",
    price: 165,
    currency: "$",
    duration: "Full Day",
    location: "Arusha, Tanzania",
    category: "Safari",
    images: [
      "https://www.safari.co.za/images/arusha-national-park-01-590x390.jpg",
      "https://activewonderssafaris.com/wp-content/uploads/2023/08/arusha-national-park.jpeg",
      "https://www.lakemanyaranationalparks.com/wp-content/uploads/2021/02/Arusha-National-Park-750x450.jpg",
      "https://www.exploretanzania.nl/wp-content/uploads/2018/10/arusha_-np-1920x1280.jpg",
    ],
    includes: [
      "Hotel pickup and drop-off",
      "Park entrance fees",
      "Safari jeep with guide",
      "Lunch box",
      "Bottled water",
    ],
    highlights: ["Mount Meru views", "Colobus monkeys", "Momella Lakes", "Ngurdoto Crater"],
  },
  {
    id: "serengeti",
    title: "Serengeti Safari Experience",
    shortDescription: "Experience the world-famous Serengeti National Park, home to the Great Migration and incredible wildlife.",
    longDescription: "Witness the iconic Serengeti, home to the Great Migration and the highest concentration of wildlife on Earth. See vast herds of wildebeest, zebras, and the predators that follow them across endless golden plains.",
    price: 450,
    currency: "$",
    duration: "2-3 Days",
    location: "Serengeti, Tanzania",
    category: "Safari",
    images: [
      "https://www.safariventures.com/wp-content/uploads/Untitled-design-1-1.png",
      "https://www.greatadventuresafaris.com/wp-content/uploads/Safaro-tours-to-serengeti-national-park.jpg",
      "https://www.achieveglobalsafaris.com/wp-content/uploads/2021/01/4-Days-Serengeti-Wildlife-Safari.jpg",
    ],
    includes: [
      "Hotel pickup and drop-off",
      "All park entrance fees",
      "Safari jeep with guide",
      "Accommodation",
      "All meals",
      "Bottled water",
    ],
    highlights: ["Great Migration", "Big Five", "Endless plains", "Professional guides"],
  },
];

export default function MainlandSafarisPage() {
  const [selectedTour, setSelectedTour] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<Record<string, number>>({});

  const handleBookNow = (tourTitle: string, price: number, currency: string) => {
    const message = encodeURIComponent(
      `Hello! I would like to book:\n\n${tourTitle}\nPrice: ${currency}${price} per person\n\nPlease provide availability and confirm the booking.`
    );
    window.open(`${COMPANY.whatsappLink}?text=${message}`, "_blank");
  };

  const getActiveImage = (tourId: string, images: string[]) => {
    return images[activeImageIndex[tourId] || 0] || images[0];
  };

  return (
    <>
      <Helmet>
        <title>Mainland Tanzania Safaris | {COMPANY.name}</title>
        <meta
          name="description"
          content="Book mainland Tanzania safaris from Zanzibar. Ngorongoro Crater, Serengeti, Mikumi, Tarangire, Kilimanjaro day hikes. Best prices, professional guides."
        />
        <meta name="keywords" content="Tanzania safari, Serengeti tour, Ngorongoro safari, Mikumi day trip, Kilimanjaro hike, Tanzania wildlife, mainland safari from Zanzibar" />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="relative pt-48 pb-24 overflow-hidden bg-slate-950">
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-cover bg-center animate-ken-burns"
              style={{
                backgroundImage: `url(https://www.safariventures.com/wp-content/uploads/Untitled-design-1-1.png)`,
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
                <Mountain className="h-4 w-4" />
                <span className="text-sm font-semibold">Mainland Adventures</span>
              </div>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
                Tanzania <span className="text-primary">Safari</span> Tours
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Experience the best of mainland Tanzania. From the Serengeti plains to the Ngorongoro Crater, discover Africa's most iconic wildlife destinations.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tours Grid */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {mainlandTours.map((tour, index) => (
                <motion.div
                  key={tour.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    {/* Image Gallery */}
                    <div className="relative h-64">
                      <img
                        src={getActiveImage(tour.id, tour.images)}
                        alt={tour.title}
                        className="w-full h-full object-cover transition-opacity duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-primary text-white text-lg px-4 py-1">
                          {tour.currency}{tour.price}
                        </Badge>
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary">{tour.category}</Badge>
                      </div>
                      {/* Image thumbnails */}
                      {tour.images.length > 1 && (
                        <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto pb-2">
                          {tour.images.slice(0, 5).map((img, i) => (
                            <button
                              key={i}
                              onClick={() => setActiveImageIndex({ ...activeImageIndex, [tour.id]: i })}
                              className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                                (activeImageIndex[tour.id] || 0) === i 
                                  ? "border-primary" 
                                  : "border-white/50 hover:border-white"
                              }`}
                            >
                              <img src={img} alt="" className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <CardTitle className="text-xl">{tour.title}</CardTitle>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {tour.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {tour.duration}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{tour.shortDescription}</p>
                      
                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2">
                        {tour.highlights.map((highlight, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            <Star className="h-3 w-3 mr-1 text-yellow-500" />
                            {highlight}
                          </Badge>
                        ))}
                      </div>

                      {/* Expandable details */}
                      {selectedTour === tour.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-t pt-4 space-y-3"
                        >
                          <p className="text-sm">{tour.longDescription}</p>
                          <div>
                            <p className="font-semibold text-sm mb-2">Price includes:</p>
                            <ul className="grid grid-cols-1 gap-1">
                              {tour.includes.map((item, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}

                      <div className="flex gap-2 pt-2">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => setSelectedTour(selectedTour === tour.id ? null : tour.id)}
                        >
                          {selectedTour === tour.id ? "Show Less" : "View Details"}
                          <ChevronRight className={`h-4 w-4 ml-1 transition-transform ${selectedTour === tour.id ? "rotate-90" : ""}`} />
                        </Button>
                        <Button
                          className="flex-1"
                          onClick={() => handleBookNow(tour.title, tour.price, tour.currency)}
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Book Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Flight Info Banner */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 p-8 bg-gradient-to-r from-primary/10 to-forest-green/10 rounded-2xl border border-primary/20"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="p-4 bg-primary/20 rounded-full">
                  <Plane className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-display text-2xl font-bold mb-2">Flying from Zanzibar</h3>
                  <p className="text-muted-foreground">
                    Most mainland safaris include round-trip flights from Zanzibar. Start your adventure in the morning and return the same day or extend your trip.
                  </p>
                </div>
                <Button size="lg" asChild>
                  <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Inquire Now
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
}
