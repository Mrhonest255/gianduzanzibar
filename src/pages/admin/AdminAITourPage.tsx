import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Wand2,
  ArrowLeft,
  Save,
  RefreshCw,
  Image as ImageIcon,
  Target,
  TrendingUp,
  Search,
  Loader2,
  Check,
  Copy,
  Eye,
  Edit3,
  Zap,
  Star,
  X,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { TOUR_CATEGORIES } from "@/lib/constants";
import {
  generateTourFromDescription,
  generateMultipleTourImages,
  optimizeTourForSEO,
  generateSalesContent,
  improveTourContent,
  enhanceExistingTour,
  generateTourVariation,
  generateRelatedTours,
  type GeneratedTour,
} from "@/lib/gemini";

type GenerationStep = "idle" | "generating" | "images" | "seo" | "sales" | "complete";

export default function AdminAITourPage() {
  const navigate = useNavigate();
  const { id: tourId } = useParams<{ id: string }>();
  const { toast } = useToast();

  const [tourDescription, setTourDescription] = useState("");
  const [generationStep, setGenerationStep] = useState<GenerationStep>("idle");
  const [generatedTour, setGeneratedTour] = useState<GeneratedTour | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [salesContent, setSalesContent] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [isEditMode, setIsEditMode] = useState(false);
  const [existingTourId, setExistingTourId] = useState<string | null>(null);
  const [isLoadingExisting, setIsLoadingExisting] = useState(false);

  // Editable tour state
  const [editableTour, setEditableTour] = useState<Partial<GeneratedTour>>({});

  // Load existing tour if ID is provided
  useEffect(() => {
    if (tourId) {
      loadExistingTour(tourId);
    }
  }, [tourId]);

  const loadExistingTour = async (id: string) => {
    setIsLoadingExisting(true);
    try {
      const { data: tour, error } = await supabase
        .from("tours")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      // Load existing images
      const { data: images } = await supabase
        .from("tour_images")
        .select("path")
        .eq("tour_id", id)
        .order("sort_order");

      if (tour) {
        const tourData: Partial<GeneratedTour> = {
          title: tour.title || "",
          slug: tour.slug || "",
          category: tour.category || "",
          location: tour.location || "",
          duration_hours: tour.duration_hours || 0,
          price: tour.price || 0,
          currency: tour.currency || "USD",
          short_description: tour.short_description || "",
          long_description: tour.long_description || "",
          itinerary: tour.itinerary || "",
          includes: tour.includes || "",
          excludes: tour.excludes || "",
          pickup_info: tour.pickup_info || "",
          what_to_bring: tour.what_to_bring || "",
          is_featured: tour.is_featured || false,
          is_active: tour.is_active ?? true,
        };
        setEditableTour(tourData);
        setGeneratedTour(tourData as GeneratedTour);
        setGenerationStep("complete");
        setIsEditMode(true);
        setExistingTourId(id);
        setTourDescription(`Editing: ${tour.title}`);
        
        if (images && images.length > 0) {
          setGeneratedImages(images.map(img => img.path));
        }
      }

      toast({
        title: "Tour Loaded",
        description: "You can now enhance this tour with AI.",
      });
    } catch (error: any) {
      console.error("Error loading tour:", error);
      toast({
        variant: "destructive",
        title: "Load Failed",
        description: error.message || "Failed to load tour.",
      });
      navigate("/admin/tours");
    } finally {
      setIsLoadingExisting(false);
    }
  };

  const handleGenerate = async () => {
    if (!tourDescription.trim()) {
      toast({
        variant: "destructive",
        title: "Description Required",
        description: "Please enter a description of the tour you want to create.",
      });
      return;
    }

    try {
      // Step 1: Generate tour content
      setGenerationStep("generating");
      const tour = await generateTourFromDescription(tourDescription);
      setGeneratedTour(tour);
      setEditableTour(tour);

      // Step 2: Generate images
      setGenerationStep("images");
      if (tour.image_prompts && tour.image_prompts.length > 0) {
        const images = await generateMultipleTourImages(tour.image_prompts.slice(0, 5));
        setGeneratedImages(images);
      }

      // Step 3: Generate additional sales content
      setGenerationStep("sales");
      const sales = await generateSalesContent(tour);
      setSalesContent(sales);

      setGenerationStep("complete");
      toast({
        title: "Tour Generated!",
        description: "Your AI-powered tour has been created. Review and save when ready.",
      });
    } catch (error: any) {
      console.error("Generation error:", error);
      setGenerationStep("idle");
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: error.message || "Failed to generate tour. Please try again.",
      });
    }
  };

  const handleOptimizeSEO = async () => {
    if (!editableTour) return;

    try {
      const optimized = await optimizeTourForSEO(editableTour);
      setEditableTour({
        ...editableTour,
        seo_title: optimized.seo_title,
        seo_description: optimized.seo_description,
        seo_keywords: optimized.seo_keywords,
        title: optimized.optimized_title,
        short_description: optimized.optimized_description,
      });
      toast({
        title: "SEO Optimized!",
        description: "Tour content has been optimized for search engines.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Optimization Failed",
        description: "Failed to optimize SEO. Please try again.",
      });
    }
  };

  const handleImproveField = async (field: "title" | "description" | "itinerary" | "includes") => {
    if (!editableTour) return;

    const fieldMap = {
      title: "title",
      description: "long_description",
      itinerary: "itinerary",
      includes: "includes",
    };

    const currentValue = editableTour[fieldMap[field] as keyof GeneratedTour] as string;
    if (!currentValue) return;

    try {
      const improved = await improveTourContent(currentValue, field);
      setEditableTour({
        ...editableTour,
        [fieldMap[field]]: improved,
      });
      toast({
        title: "Content Improved!",
        description: `${field.charAt(0).toUpperCase() + field.slice(1)} has been enhanced.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Improvement Failed",
        description: "Failed to improve content. Please try again.",
      });
    }
  };

  const handleSaveTour = async () => {
    if (!editableTour) return;

    setIsSaving(true);

    try {
      const tourData = {
        title: editableTour.title,
        slug: editableTour.slug,
        category: editableTour.category,
        location: editableTour.location,
        duration_hours: editableTour.duration_hours,
        price: editableTour.price,
        currency: editableTour.currency || "USD",
        short_description: editableTour.short_description,
        long_description: editableTour.long_description,
        itinerary: editableTour.itinerary,
        includes: editableTour.includes,
        excludes: editableTour.excludes,
        pickup_info: editableTour.pickup_info,
        what_to_bring: editableTour.what_to_bring,
        is_featured: editableTour.is_featured || false,
        is_active: editableTour.is_active ?? true,
      };

      let savedTourId = existingTourId;

      if (existingTourId) {
        // Update existing tour
        const { error: tourError } = await supabase
          .from("tours")
          .update(tourData)
          .eq("id", existingTourId);

        if (tourError) throw tourError;
      } else {
        // Insert new tour
        const { data: newTour, error: tourError } = await supabase
          .from("tours")
          .insert(tourData)
          .select("id")
          .single();

        if (tourError) throw tourError;
        savedTourId = newTour?.id;
      }

      // Handle images for new tours
      if (!existingTourId && generatedImages.length > 0 && savedTourId) {
        const imageInserts = generatedImages.map((url, index) => ({
          tour_id: savedTourId,
          path: url,
          alt_text: editableTour.image_prompts?.[index] || `${editableTour.title} image ${index + 1}`,
          sort_order: index,
        }));

        const { error: imageError } = await supabase
          .from("tour_images")
          .insert(imageInserts);

        if (imageError) {
          console.error("Image insert error:", imageError);
        }
      }

      toast({
        title: existingTourId ? "Tour Updated!" : "Tour Created!",
        description: `${editableTour.title} has been saved successfully.`,
      });

      navigate("/admin/tours");
    } catch (error: any) {
      console.error("Save error:", error);
      toast({
        variant: "destructive",
        title: "Save Failed",
        description: error.message || "Failed to save tour. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // AI Enhancement for existing tours
  const handleAIEnhance = async (enhanceType: "full" | "seo" | "sales" | "description" | "itinerary") => {
    if (!editableTour) return;

    try {
      toast({
        title: "Enhancing with AI...",
        description: `Applying ${enhanceType} enhancement...`,
      });

      const enhanced = await enhanceExistingTour(editableTour, enhanceType);
      setEditableTour(enhanced);
      setGeneratedTour(enhanced);

      toast({
        title: "Enhancement Complete!",
        description: `Tour has been enhanced for ${enhanceType}.`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Enhancement Failed",
        description: error.message || "Failed to enhance tour.",
      });
    }
  };

  // Generate tour variations
  const handleGenerateVariation = async (audience: "families" | "couples" | "adventurers" | "luxury" | "budget") => {
    if (!editableTour) return;

    try {
      toast({
        title: "Creating Variation...",
        description: `Generating ${audience} version...`,
      });

      const variation = await generateTourVariation(editableTour, audience);
      setEditableTour(variation);
      setGeneratedTour(variation);
      setExistingTourId(null); // This is a new tour now

      toast({
        title: "Variation Created!",
        description: `${audience} version is ready. Save as a new tour.`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: error.message || "Failed to generate variation.",
      });
    }
  };

  const handleReset = () => {
    setGenerationStep("idle");
    setGeneratedTour(null);
    setEditableTour({});
    setGeneratedImages([]);
    setSalesContent(null);
    setTourDescription("");
  };

  // Remove image from the list
  const handleRemoveImage = (index: number) => {
    setGeneratedImages(generatedImages.filter((_, i) => i !== index));
    toast({
      title: "Image Removed",
      description: "The image has been removed from the list.",
    });
  };

  // Add image URL manually
  const handleAddImageUrl = () => {
    const url = prompt("Enter image URL:");
    if (url && url.startsWith("http")) {
      setGeneratedImages([...generatedImages, url]);
      toast({
        title: "Image Added",
        description: "The image has been added to the list.",
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "Content copied to clipboard." });
  };

  const getStepProgress = () => {
    const steps = ["generating", "images", "sales", "complete"];
    const currentIndex = steps.indexOf(generationStep);
    return ((currentIndex + 1) / steps.length) * 100;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 p-6"
    >
      {/* Loading state for existing tour */}
      {isLoadingExisting && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-3 text-muted-foreground">Loading tour...</span>
        </div>
      )}

      {/* Header */}
      {!isLoadingExisting && (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/admin/tours")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-yellow-500" />
              {existingTourId ? "AI Tour Editor" : "AI Tour Creator"}
            </h1>
            <p className="text-muted-foreground">
              {existingTourId 
                ? "Enhance and optimize your existing tour with AI"
                : "Generate complete, SEO-optimized tours with AI"}
            </p>
          </div>
        </div>
        {generationStep === "complete" && (
          <div className="flex gap-2">
            {!existingTourId && (
              <Button variant="outline" onClick={handleReset}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Start Over
              </Button>
            )}
            <Button onClick={handleSaveTour} disabled={isSaving}>
              {isSaving ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {existingTourId ? "Update Tour" : "Save Tour"}
            </Button>
          </div>
        )}
      </div>
      )}

      {/* Generation Progress */}
      {!isLoadingExisting && generationStep !== "idle" && generationStep !== "complete" && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {generationStep === "generating" && "Generating tour content..."}
                  {generationStep === "images" && "Creating tour images..."}
                  {generationStep === "seo" && "Optimizing for search engines..."}
                  {generationStep === "sales" && "Creating sales content..."}
                </span>
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${getStepProgress()}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Input Section */}
      {!isLoadingExisting && generationStep === "idle" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5" />
              Describe Your Tour
            </CardTitle>
            <CardDescription>
              Simply describe the tour you want to create, and AI will generate
              everything for you - content, images, SEO, and sales copy.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Tour Description</Label>
              <Textarea
                placeholder="E.g., A downtown walking tour of Stone Town exploring the historic streets, spice markets, and local culture. Should be about 4 hours, suitable for families..."
                value={tourDescription}
                onChange={(e) => setTourDescription(e.target.value)}
                rows={5}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Be descriptive! Include location, duration, target audience, and any special
                features you want.
              </p>
            </div>

            {/* Quick Templates */}
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Quick Templates</Label>
              <div className="flex flex-wrap gap-2">
                {[
                  "Spice Tour",
                  "Stone Town Walking Tour",
                  "Prison Island Day Trip",
                  "Sunset Dhow Cruise",
                  "Safari Day Trip",
                  "Beach Resort Experience",
                  "Dolphin Watching Tour",
                  "Jozani Forest Adventure",
                ].map((template) => (
                  <Button
                    key={template}
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setTourDescription(
                        `Create a ${template} in Zanzibar with authentic local experiences, suitable for international tourists and families.`
                      )
                    }
                  >
                    {template}
                  </Button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Complete Tour with AI
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Generated Tour Content */}
      {!isLoadingExisting && generationStep === "complete" && editableTour && (
        <div className="space-y-4">
          {/* AI Enhancement Tools - only show when editing existing tour */}
          {existingTourId && (
            <Card className="border-purple-500/30 bg-gradient-to-r from-purple-500/5 to-yellow-500/5">
              <CardContent className="pt-4 pb-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-medium text-muted-foreground">AI Enhancement:</span>
                  <Button variant="outline" size="sm" onClick={() => handleAIEnhance("full")}>
                    <Wand2 className="h-4 w-4 mr-2 text-purple-500" />
                    Full Enhancement
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleAIEnhance("seo")}>
                    <Search className="h-4 w-4 mr-2 text-blue-500" />
                    SEO Optimize
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleAIEnhance("sales")}>
                    <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                    Sales Boost
                  </Button>
                  <div className="h-4 w-px bg-border mx-2" />
                  <span className="text-sm font-medium text-muted-foreground">Create Variation:</span>
                  <Button variant="outline" size="sm" onClick={() => handleGenerateVariation("families")}>
                    Families
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleGenerateVariation("couples")}>
                    Couples
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleGenerateVariation("luxury")}>
                    Luxury
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleGenerateVariation("budget")}>
                    Budget
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Core tour details</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditMode(!isEditMode)}
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  {isEditMode ? "Done Editing" : "Edit"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <div className="flex gap-2">
                      <Input
                        value={editableTour.title || ""}
                        onChange={(e) =>
                          setEditableTour({ ...editableTour, title: e.target.value })
                        }
                        disabled={!isEditMode}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleImproveField("title")}
                        title="Improve with AI"
                      >
                        <Zap className="h-4 w-4 text-yellow-500" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Slug</Label>
                    <Input
                      value={editableTour.slug || ""}
                      onChange={(e) =>
                        setEditableTour({ ...editableTour, slug: e.target.value })
                      }
                      disabled={!isEditMode}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select
                      value={editableTour.category || ""}
                      onValueChange={(value) =>
                        setEditableTour({ ...editableTour, category: value })
                      }
                      disabled={!isEditMode}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {TOUR_CATEGORIES.filter((c) => c.value !== "all").map(
                          (category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      value={editableTour.location || ""}
                      onChange={(e) =>
                        setEditableTour({ ...editableTour, location: e.target.value })
                      }
                      disabled={!isEditMode}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Duration (hours)</Label>
                    <Input
                      type="number"
                      value={editableTour.duration_hours || ""}
                      onChange={(e) =>
                        setEditableTour({
                          ...editableTour,
                          duration_hours: parseInt(e.target.value) || 0,
                        })
                      }
                      disabled={!isEditMode}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Price (USD)</Label>
                    <Input
                      type="number"
                      value={editableTour.price || ""}
                      onChange={(e) =>
                        setEditableTour({
                          ...editableTour,
                          price: parseFloat(e.target.value) || 0,
                        })
                      }
                      disabled={!isEditMode}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={editableTour.is_featured || false}
                      onCheckedChange={(checked) =>
                        setEditableTour({ ...editableTour, is_featured: checked })
                      }
                    />
                    <Label>Featured Tour</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={editableTour.is_active ?? true}
                      onCheckedChange={(checked) =>
                        setEditableTour({ ...editableTour, is_active: checked })
                      }
                    />
                    <Label>Active</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tour Content</CardTitle>
                <CardDescription>Descriptions and details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Short Description</Label>
                    <span className="text-xs text-muted-foreground">
                      {(editableTour.short_description || "").length}/200
                    </span>
                  </div>
                  <Textarea
                    value={editableTour.short_description || ""}
                    onChange={(e) =>
                      setEditableTour({
                        ...editableTour,
                        short_description: e.target.value,
                      })
                    }
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Long Description</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleImproveField("description")}
                    >
                      <Zap className="h-4 w-4 mr-2 text-yellow-500" />
                      Enhance with AI
                    </Button>
                  </div>
                  <Textarea
                    value={editableTour.long_description || ""}
                    onChange={(e) =>
                      setEditableTour({
                        ...editableTour,
                        long_description: e.target.value,
                      })
                    }
                    rows={10}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Itinerary</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleImproveField("itinerary")}
                    >
                      <Zap className="h-4 w-4 mr-2 text-yellow-500" />
                      Enhance with AI
                    </Button>
                  </div>
                  <Textarea
                    value={editableTour.itinerary || ""}
                    onChange={(e) =>
                      setEditableTour({ ...editableTour, itinerary: e.target.value })
                    }
                    rows={8}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>What's Included</Label>
                    <Textarea
                      value={editableTour.includes || ""}
                      onChange={(e) =>
                        setEditableTour({ ...editableTour, includes: e.target.value })
                      }
                      rows={6}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>What's Excluded</Label>
                    <Textarea
                      value={editableTour.excludes || ""}
                      onChange={(e) =>
                        setEditableTour({ ...editableTour, excludes: e.target.value })
                      }
                      rows={6}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Pickup Information</Label>
                    <Textarea
                      value={editableTour.pickup_info || ""}
                      onChange={(e) =>
                        setEditableTour({ ...editableTour, pickup_info: e.target.value })
                      }
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>What to Bring</Label>
                    <Textarea
                      value={editableTour.what_to_bring || ""}
                      onChange={(e) =>
                        setEditableTour({
                          ...editableTour,
                          what_to_bring: e.target.value,
                        })
                      }
                      rows={4}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Images Tab */}
          <TabsContent value="images" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Generated Images
                </CardTitle>
                <CardDescription>
                  AI-curated images for your tour. Click to preview or remove.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {generatedImages.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {generatedImages.map((url, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden group"
                      >
                        <img
                          src={url}
                          alt={`Tour image ${index + 1}`}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=400&q=80";
                          }}
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button
                            size="icon"
                            variant="secondary"
                            onClick={() => window.open(url, "_blank")}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="destructive"
                            onClick={() => handleRemoveImage(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        {index === 0 && (
                          <Badge className="absolute top-2 left-2 bg-primary">
                            <Star className="h-3 w-3 mr-1" />
                            Main
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No images generated yet</p>
                  </div>
                )}
                <div className="mt-4">
                  <Button variant="outline" onClick={handleAddImageUrl}>
                    <Upload className="h-4 w-4 mr-2" />
                    Add Image URL
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO Tab */}
          <TabsContent value="seo" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    SEO Optimization
                  </CardTitle>
                  <CardDescription>
                    Search engine and meta information
                  </CardDescription>
                </div>
                <Button onClick={handleOptimizeSEO}>
                  <Zap className="h-4 w-4 mr-2" />
                  Re-optimize with AI
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>SEO Title</Label>
                    <span className="text-xs text-muted-foreground">
                      {(editableTour.seo_title || "").length}/60
                    </span>
                  </div>
                  <Input
                    value={editableTour.seo_title || ""}
                    onChange={(e) =>
                      setEditableTour({ ...editableTour, seo_title: e.target.value })
                    }
                    placeholder="SEO-optimized page title"
                  />
                  <p className="text-xs text-muted-foreground">
                    Optimal length: 50-60 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Meta Description</Label>
                    <span className="text-xs text-muted-foreground">
                      {(editableTour.seo_description || "").length}/160
                    </span>
                  </div>
                  <Textarea
                    value={editableTour.seo_description || ""}
                    onChange={(e) =>
                      setEditableTour({
                        ...editableTour,
                        seo_description: e.target.value,
                      })
                    }
                    placeholder="Compelling meta description with call-to-action"
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    Optimal length: 150-160 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Keywords</Label>
                  <div className="flex flex-wrap gap-2">
                    {(editableTour.seo_keywords || []).map((keyword, index) => (
                      <Badge key={index} variant="secondary">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* SEO Preview */}
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <Label className="text-sm text-muted-foreground mb-2 block">
                    Search Result Preview
                  </Label>
                  <div className="space-y-1">
                    <p className="text-blue-600 text-lg hover:underline cursor-pointer">
                      {editableTour.seo_title || editableTour.title}
                    </p>
                    <p className="text-green-700 text-sm">
                      zanzibarvibetours.com/tours/{editableTour.slug}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {editableTour.seo_description || editableTour.short_description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sales Tab */}
          <TabsContent value="sales" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Sales Optimization
                </CardTitle>
                <CardDescription>
                  Marketing copy and conversion content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Sales Highlights */}
                <div className="space-y-2">
                  <Label>Sales Highlights</Label>
                  <div className="space-y-2">
                    {(editableTour.sales_highlights || []).map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg"
                      >
                        <Check className="h-4 w-4 text-green-600 shrink-0" />
                        <span className="text-sm">{highlight}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-auto h-6 w-6"
                          onClick={() => copyToClipboard(highlight)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Value Proposition */}
                <div className="space-y-2">
                  <Label>Value Proposition</Label>
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm font-medium">
                      {editableTour.value_proposition}
                    </p>
                  </div>
                </div>

                {/* Urgency Message */}
                <div className="space-y-2">
                  <Label>Urgency Message</Label>
                  <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                    <p className="text-sm font-medium text-orange-700 dark:text-orange-400">
                      ⚡ {editableTour.urgency_message}
                    </p>
                  </div>
                </div>

                {/* Additional Sales Content */}
                {salesContent && (
                  <>
                    <div className="space-y-2">
                      <Label>Email Subject Line</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          value={salesContent.email_subject || ""}
                          readOnly
                          className="bg-muted"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(salesContent.email_subject)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Social Media Post</Label>
                      <div className="flex gap-2">
                        <Textarea
                          value={salesContent.social_media_post || ""}
                          readOnly
                          className="bg-muted"
                          rows={4}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(salesContent.social_media_post)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Sample Testimonial Template</Label>
                      <div className="flex gap-2">
                        <Textarea
                          value={salesContent.testimonial_template || ""}
                          readOnly
                          className="bg-muted"
                          rows={3}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(salesContent.testimonial_template)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </div>
      )}
    </motion.div>
  );
}
