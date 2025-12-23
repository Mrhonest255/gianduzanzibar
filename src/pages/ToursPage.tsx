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
        <section className="relative pt-64 pb-32 overflow-hidden bg-slate-950">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&q=80"
              alt="Zanzibar Coast"
              className="w-full h-full object-cover opacity-40 animate-ken-burns"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950" />
          </div>
          
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center max-w-4xl mx-auto"
            >
              <span className="inline-flex items-center gap-2 px-5 py-2 mb-8 text-[10px] font-black tracking-[0.3em] uppercase bg-primary/20 backdrop-blur-md border border-primary/30 text-primary-glow rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Curated Adventures
              </span>
              <h1 className="font-display text-6xl md:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tighter">
                EXPLORE THE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-glow italic">ISLAND VIBE</span>
              </h1>
              <p className="text-slate-300 text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
                From hidden sandbanks to ancient spice markets, discover the soul of Zanzibar through our exclusive collection.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="relative z-20 -mt-16 pb-32">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-morphism rounded-[2.5rem] p-8 md:p-10 shadow-premium border border-white/20"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                {/* Search */}
                <div className="lg:col-span-5 space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Search Experiences</label>
                  <div className="relative group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <Input
                      placeholder="Where do you want to go?"
                      className="pl-14 h-16 rounded-2xl bg-slate-50 border-slate-100 focus:ring-primary/20 focus:border-primary text-lg font-medium transition-all"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="lg:col-span-3 space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Category</label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="h-16 rounded-2xl bg-slate-50 border-slate-100 focus:ring-primary/20 text-lg font-medium">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-slate-100 shadow-premium">
                      <SelectItem value="all" className="font-medium">All Categories</SelectItem>
                      {TOUR_CATEGORIES.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value} className="font-medium">
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort */}
                <div className="lg:col-span-3 space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="h-16 rounded-2xl bg-slate-50 border-slate-100 focus:ring-primary/20 text-lg font-medium">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-slate-100 shadow-premium">
                      <SelectItem value="featured" className="font-medium">Featured First</SelectItem>
                      <SelectItem value="price-low" className="font-medium">Price: Low to High</SelectItem>
                      <SelectItem value="price-high" className="font-medium">Price: High to Low</SelectItem>
                      <SelectItem value="duration" className="font-medium">Duration</SelectItem>
                      <SelectItem value="newest" className="font-medium">Newest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Reset/Filter Icon */}
                <div className="lg:col-span-1">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-16 w-full rounded-2xl bg-slate-50 border-slate-100 hover:bg-slate-100 text-slate-900 transition-all"
                    onClick={() => {
                      setSearchQuery("");
                      setCategoryFilter("all");
                      setSortBy("featured");
                    }}
                  >
                    <SlidersHorizontal className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Results Info */}
            <div className="mt-16 mb-10 flex items-center justify-between px-4">
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                Showing <span className="text-slate-900">{filteredTours.length}</span> Experiences
              </p>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="text-primary font-black text-xs uppercase tracking-widest hover:underline"
                >
                  Clear Search
                </button>
              )}
            </div>

            {/* Tours Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-[2.5rem] overflow-hidden shadow-card border border-slate-50">
                    <Skeleton className="aspect-[1.1/1]" />
                    <div className="p-8 space-y-4">
                      <Skeleton className="h-8 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                      <div className="pt-6 border-t border-slate-50 flex justify-between">
                        <Skeleton className="h-10 w-24 rounded-full" />
                        <Skeleton className="h-10 w-10 rounded-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-32 glass-morphism rounded-[3rem] max-w-2xl mx-auto border border-slate-100">
                <p className="text-slate-500 font-bold text-xl">Unable to load tours. Please try again later.</p>
              </div>
            ) : filteredTours.length === 0 ? (
              <div className="text-center py-32 glass-morphism rounded-[3rem] max-w-2xl mx-auto border border-slate-100">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-10 w-10 text-slate-300" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">No experiences found</h3>
                <p className="text-slate-500 font-medium">Try adjusting your filters or search query.</p>
                <Button 
                  variant="link" 
                  className="mt-6 text-primary font-black uppercase tracking-widest"
                  onClick={() => {
                    setSearchQuery("");
                    setCategoryFilter("all");
                  }}
                >
                  Reset All Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredTours.map((tour, index) => (
                  <TourCard
                    key={tour.id}
                    {...tour}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
}
