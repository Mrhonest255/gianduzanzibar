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
        <title>Tours & Experiences | {COMPANY.name}</title>
        <meta
          name="description"
          content="Explore our collection of Zanzibar tours and experiences. From cultural heritage tours to underwater adventures, find your perfect island experience."
        />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="relative pt-48 pb-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&q=80"
              alt="Zanzibar Coast"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
          </div>
          
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-primary text-white rounded-full">
                Our Collection
              </span>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Unforgettable <span className="text-primary italic">Experiences</span>
              </h1>
              <p className="text-white/80 text-xl font-light leading-relaxed">
                Discover the best experiences the Spice Island has to offer. From cultural heritage to underwater adventures.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-12 bg-white border-b border-slate-100 sticky top-20 z-30 shadow-sm">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="relative w-full lg:max-w-md group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Search tours, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 bg-slate-50 border-slate-200 focus:bg-white focus:ring-primary/20 transition-all rounded-2xl text-lg"
                />
              </div>

              <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
                <div className="flex items-center gap-2 text-slate-500 mr-2">
                  <Filter className="h-4 w-4" />
                  <span className="text-sm font-medium uppercase tracking-wider">Filter By:</span>
                </div>
                
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px] h-12 rounded-xl border-slate-200 bg-slate-50">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {TOUR_CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px] h-12 rounded-xl border-slate-200 bg-slate-50">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured First</SelectItem>
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
        <section className="py-24 bg-slate-50 min-h-[600px]">
          <div className="container">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-[4/3] w-full rounded-3xl" />
                    <Skeleton className="h-8 w-3/4 rounded-lg" />
                    <Skeleton className="h-20 w-full rounded-lg" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
                <p className="text-red-500 text-lg font-medium mb-4">Failed to load tours</p>
                <Button onClick={() => window.location.reload()} variant="outline" className="rounded-xl">
                  Try Again
                </Button>
              </div>
            ) : filteredTours.length === 0 ? (
              <div className="text-center py-32 bg-white rounded-[40px] border border-dashed border-slate-300">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-10 w-10 text-slate-400" />
                </div>
                <h3 className="text-2xl font-display font-bold text-slate-900 mb-2">No tours found</h3>
                <p className="text-slate-500 mb-8">Try adjusting your search or filters to find what you're looking for.</p>
                <Button 
                  onClick={() => {
                    setSearchQuery("");
                    setCategoryFilter("all");
                  }}
                  variant="link"
                  className="text-primary font-bold text-lg"
                >
                  Clear all filters
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-12">
                  <p className="text-slate-500 font-medium">
                    Showing <span className="text-slate-900 font-bold">{filteredTours.length}</span> tours
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {filteredTours.map((tour, index) => (
                    <motion.div
                      key={tour.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <TourCard tour={tour} />
                    </motion.div>
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
