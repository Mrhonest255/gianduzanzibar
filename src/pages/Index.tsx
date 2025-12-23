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
        <title>{COMPANY.name} | Tours & Safari in Zanzibar</title>
        <meta
          name="description"
          content="Discover paradise with Giandu Di Zanzibar Tour and Safari. Book authentic Zanzibar tours including Stone Town, Safari Blue, Spice Farm, and more. Expert local guides, best prices."
        />
        <meta name="keywords" content="Zanzibar tours, safari, Stone Town, Spice Farm, Prison Island, Mnemba Island, Safari Blue, Jozani Forest, Tanzania" />
        <link rel="canonical" href="https://gianduzanzibar.com" />
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
