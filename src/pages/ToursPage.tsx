import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { TourCard } from "@/components/tours/TourCard";
import { useTours } from "@/hooks/useTours";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { TOUR_CATEGORIES, COMPANY } from "@/lib/constants";

export default function ToursPage() {
  const { tours, isLoading, error } = useTours();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const filteredTours = useMemo(() => {
    let result = [...tours];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (tour) =>
          tour.title.toLowerCase().includes(query) ||
          tour.short_description?.toLowerCase().includes(query) ||
          tour.location?.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (categoryFilter !== "all") {
      result = result.filter((tour) => tour.category === categoryFilter);
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-high":
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "duration":
        result.sort((a, b) => (a.duration_hours || 0) - (b.duration_hours || 0));
        break;
      case "newest":
        result.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
        break;
    }

    return result;
  }, [tours, searchQuery, categoryFilter, sortBy]);

  return (
    <>
      <Helmet>
        <title>Best Zanzibar Tours & Safari Experiences 2025 | {COMPANY.name}</title>
        <meta
          name="description"
          content="Book the best Zanzibar tours and safari experiences. Explore Stone Town, Prison Island, Safari Blue, Spice Farm tours, Jozani Forest, Mnemba Island snorkeling & more. Expert local guides, best prices guaranteed."
        />
        <meta name="keywords" content="Zanzibar tours, Zanzibar safari, Stone Town tour, Prison Island tour, Safari Blue Zanzibar, Spice Farm tour, Jozani Forest, Mnemba Island, Nakupenda sandbank, Zanzibar excursions, Tanzania tours, best Zanzibar tours 2025, cheap Zanzibar tours, private tours Zanzibar" />
        <meta property="og:title" content="Best Zanzibar Tours & Safari Experiences | Giandu Tours" />
        <meta property="og:description" content="Discover paradise with authentic Zanzibar tours. Stone Town heritage, tropical beaches, spice plantations, and marine adventures. Book with local experts today!" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://giandutours.com/tours" />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-gradient-hero">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                Explore Zanzibar Tours
              </h1>
              <p className="text-muted-foreground text-lg">
                Discover the best experiences the Spice Island has to offer. From cultural heritage to underwater adventures.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-card border-b border-border sticky top-16 z-30">
          <div className="container">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1 w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tours..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                {/* Category Filter */}
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full md:w-[160px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {TOUR_CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-[160px]">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Tours Grid */}
        <section className="py-16 bg-background">
          <div className="container">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-card rounded-2xl overflow-hidden">
                    <Skeleton className="aspect-[4/3]" />
                    <div className="p-5 space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Unable to load tours. Please try again later.</p>
              </div>
            ) : filteredTours.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">No tours found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setCategoryFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <p className="text-muted-foreground mb-8">
                  Showing {filteredTours.length} tour{filteredTours.length !== 1 ? "s" : ""}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredTours.map((tour, index) => (
                    <TourCard key={tour.id} {...tour} index={index} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
}
