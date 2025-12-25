export const COMPANY = {
  name: "Giandu Tours and Safari",
  shortName: "Giandu Tours",
  phone: "+255620636827",
  whatsappLink: "https://wa.me/255620636827",
  email: "info@zanzibartravelhelper.com",
  address: "Stone Town, Zanzibar, Tanzania",
  tagline: "Discover Paradise with Every Journey",
} as const;

export const NAVIGATION = [
  { name: "Home", href: "/" },
  { name: "Tours", href: "/tours" },
  { name: "Safari Tanzania", href: "/safari-tanzania" },
  { name: "Transfers", href: "/transfers" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Track Booking", href: "/track-booking" },
] as const;

export const TOUR_CATEGORIES = [
  { value: "all", label: "All Tours" },
  { value: "Cultural", label: "Cultural" },
  { value: "Nature", label: "Nature" },
  { value: "Adventure", label: "Adventure" },
  { value: "Beach", label: "Beach" },
  { value: "Safari", label: "Safari" },
] as const;

export const WHY_CHOOSE_US = [
  {
    title: "Local Expertise",
    description: "Born and raised in Zanzibar, we know every hidden gem and secret spot on the island.",
    icon: "MapPin",
  },
  {
    title: "Personalized Service",
    description: "Small groups and flexible itineraries tailored to your preferences and pace.",
    icon: "Users",
  },
  {
    title: "Best Value",
    description: "Competitive prices without compromising on quality or experiences.",
    icon: "Star",
  },
  {
    title: "Safety First",
    description: "Licensed guides, insured vehicles, and strict safety protocols for peace of mind.",
    icon: "Shield",
  },
  {
    title: "24/7 Support",
    description: "We're always available to assist you before, during, and after your adventure.",
    icon: "Headphones",
  },
  {
    title: "Sustainable Tourism",
    description: "We support local communities and protect the natural beauty of Zanzibar.",
    icon: "Leaf",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    location: "United States",
    rating: 5,
    text: "The Safari Blue tour was absolutely magical! Our guide Mohammed was incredibly knowledgeable and made sure everyone had an amazing time. The seafood BBQ on the beach was unforgettable.",
    tour: "Safari Blue Full Day",
  },
  {
    name: "Marco Rossi",
    location: "Italy",
    rating: 5,
    text: "We booked the Stone Town walking tour and the Spice Farm tour. Both exceeded our expectations. The attention to detail and personal touches made us feel like VIP guests.",
    tour: "Stone Town & Spice Farm",
  },
  {
    name: "Emma Chen",
    location: "Australia",
    rating: 5,
    text: "Mnemba Island snorkeling was a dream come true. We saw dolphins, turtles, and the most colorful fish. Giandu Zanzibar organized everything perfectly from pickup to drop-off.",
    tour: "Mnemba Island Snorkeling",
  },
  {
    name: "David Mueller",
    location: "Germany",
    rating: 5,
    text: "Professional, friendly, and truly passionate about sharing Zanzibar's beauty. The Jozani Forest tour with the red colobus monkeys was a highlight of our entire trip to Africa.",
    tour: "Jozani Forest Tour",
  },
] as const;

export const FAQ = [
  {
    question: "What is the best time to visit Zanzibar?",
    answer: "Zanzibar enjoys a tropical climate year-round. The best time to visit is during the dry seasons: June to October and December to February. These months offer sunny skies and calm seas, perfect for beach activities and tours.",
  },
  {
    question: "How do I book a tour?",
    answer: "You can book directly through our website by selecting your desired tour and filling out the booking form. Alternatively, you can contact us via WhatsApp or email, and our team will assist you with your reservation.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept cash (USD, EUR, TZS), credit/debit cards, and mobile payments. Payment is required to confirm your booking, though we offer flexible payment options for larger groups.",
  },
  {
    question: "Are your tours suitable for children?",
    answer: "Most of our tours are family-friendly. We can adjust activities based on the ages of your children. Please let us know when booking so we can recommend the most suitable options and make necessary arrangements.",
  },
  {
    question: "What should I bring on a tour?",
    answer: "We recommend comfortable clothing, sunscreen, sunglasses, a hat, and closed-toe shoes for walking tours. For water activities, bring a swimsuit, towel, and waterproof bag for electronics. Each tour page has specific recommendations.",
  },
  {
    question: "Do you offer private tours?",
    answer: "Yes! All our tours can be arranged as private experiences for couples, families, or groups. Private tours offer flexible timing and personalized itineraries. Contact us for special pricing.",
  },
  {
    question: "What is your cancellation policy?",
    answer: "Free cancellation up to 48 hours before the tour. Cancellations within 24-48 hours receive a 50% refund. Unfortunately, we cannot offer refunds for cancellations less than 24 hours before the tour or no-shows.",
  },
  {
    question: "Do you provide hotel pickup?",
    answer: "Yes, most tours include complimentary hotel pickup and drop-off for accommodations in Stone Town and surrounding areas. For hotels in other parts of the island, we can arrange transfers for an additional fee.",
  },
] as const;
