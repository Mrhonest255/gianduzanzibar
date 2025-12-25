import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedToursSection } from "@/components/home/FeaturedToursSection";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { CTASection } from "@/components/home/CTASection";
import { COMPANY } from "@/lib/constants";

export default function Index() {
  return (
    <>
      <Helmet>
        <title>Giandu Tours and Safari | Best Zanzibar Tours & Excursions 2025</title>
        <meta
          name="description"
          content="Book the best Zanzibar tours with Giandu Tours and Safari. Experience Stone Town, Prison Island, Safari Blue, Spice Farm, Jozani Forest & more. Local expert guides, best prices guaranteed. WhatsApp booking available!"
        />
        <meta name="keywords" content="Zanzibar tours, Zanzibar safari, best Zanzibar tours 2025, Stone Town tour, Prison Island Zanzibar, Safari Blue tour, Spice Farm Zanzibar, Jozani Forest tour, Mnemba Island snorkeling, Nakupenda sandbank, Zanzibar day trips, Tanzania tours, cheap Zanzibar tours, private Zanzibar tours, Zanzibar excursions, Zanzibar travel, book Zanzibar tour" />
        <meta property="og:title" content="Giandu Tours and Safari - Best Zanzibar Tours & Experiences" />
        <meta property="og:description" content="Discover paradise with authentic Zanzibar tours. Stone Town heritage, tropical beaches, spice plantations, and marine adventures. Book with local experts!" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80" />
        <meta property="og:url" content="https://giandutours.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Giandu Tours - Best Zanzibar Tours" />
        <meta name="twitter:description" content="Book authentic Zanzibar tours with local experts. Best prices guaranteed!" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="author" content="Giandu Tours and Safari" />
        <meta name="geo.region" content="TZ-ZN" />
        <meta name="geo.placename" content="Zanzibar, Tanzania" />
        <link rel="canonical" href="https://giandutours.com" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            "name": "Giandu Tours and Safari",
            "description": "Best Zanzibar tours and safari experiences with local expert guides",
            "url": "https://giandutours.com",
            "telephone": "+255620636827",
            "email": "info@giandutoursandsafari.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Stone Town",
              "addressLocality": "Zanzibar",
              "addressCountry": "TZ"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "-6.1659",
              "longitude": "39.1893"
            },
            "priceRange": "$30-$200",
            "openingHours": "Mo-Su 08:00-20:00",
            "sameAs": [
              "https://wa.me/255620636827"
            ]
          })}
        </script>
      </Helmet>
      <Layout>
        <HeroSection />
        <FeaturedToursSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </Layout>
    </>
  );
}
