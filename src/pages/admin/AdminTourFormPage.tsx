import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Save,
  ArrowLeft,
  Upload,
  X,
  Image as ImageIcon,
  GripVertical,
  Trash2,
  Sparkles,
  Wand2,
  Loader2,
  Search,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { enhanceExistingTour, optimizeTourForSEO, type GeneratedTour } from "@/lib/gemini";

const tourSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  category: z.string().optional(),
  location: z.string().optional(),
  duration_hours: z.coerce.number().min(1).optional(),
  price: z.coerce.number().min(0).optional(),
  currency: z.string().default("USD"),
  short_description: z.string().max(500).optional(),
  long_description: z.string().optional(),
  itinerary: z.string().optional(),
  includes: z.string().optional(),
  excludes: z.string().optional(),
  pickup_info: z.string().optional(),
  what_to_bring: z.string().optional(),
  is_featured: z.boolean().default(false),
  is_active: z.boolean().default(true),
});

type TourFormData = z.infer<typeof tourSchema>;

interface TourImage {
  id: string;
  path: string;
  alt_text: string | null;
  sort_order: number | null;
}

export default function AdminTourFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [images, setImages] = useState<TourImage[]>([]);
  const [newImageUrls, setNewImageUrls] = useState<string[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [isAIEnhancing, setIsAIEnhancing] = useState(false);
  const [enhanceType, setEnhanceType] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TourFormData>({
    resolver: zodResolver(tourSchema),
    defaultValues: {
      currency: "USD",
      is_featured: false,
      is_active: true,
    },
  });

  useEffect(() => {
    if (isEditing) {
      fetchTour();
    }
  }, [id]);

  const fetchTour = async () => {
    if (!id) return;
    setIsLoading(true);

    try {
      const { data: tour, error } = await supabase
        .from("tours")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      // Set form values
      Object.keys(tour).forEach((key) => {
        if (key in tourSchema.shape) {
          setValue(key as keyof TourFormData, tour[key]);
        }
      });

      // Fetch images
      const { data: tourImages } = await supabase
        .from("tour_images")
        .select("*")
        .eq("tour_id", id)
        .order("sort_order", { ascending: true });

      setImages(tourImages || []);
    } catch (error) {
      console.error("Error fetching tour:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load tour data.",
      });
      navigate("/admin/tours");
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const onSubmit = async (data: TourFormData) => {
    setIsSaving(true);

    try {
      let tourId = id;

      if (isEditing) {
        const { error } = await supabase
          .from("tours")
          .update(data as any)
          .eq("id", id);

        if (error) throw error;
      } else {
        const { data: newTour, error } = await supabase
          .from("tours")
          .insert(data)
          .select("id")
          .single();

        if (error) throw error;
        tourId = newTour.id;
      }

      // Add new image URLs
      if (newImageUrls.length > 0 && tourId) {
        const imageInserts = newImageUrls.map((url, index) => ({
          tour_id: tourId,
          path: url,
          sort_order: images.length + index,
        }));

        const { error: imageError } = await supabase
          .from("tour_images")
          .insert(imageInserts);

        if (imageError) throw imageError;
      }

      toast({
        title: isEditing ? "Tour Updated" : "Tour Created",
        description: `${data.title} has been saved successfully.`,
      });

      navigate("/admin/tours");
    } catch (error: any) {
      console.error("Error saving tour:", error);
      toast({
        variant: "destructive",
        title: "Save Failed",
        description: error.message || "Failed to save tour. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddImageUrl = () => {
    const url = prompt("Enter image URL:");
    if (url && url.startsWith("http")) {
      setNewImageUrls([...newImageUrls, url]);
    }
  };

  const handleRemoveNewImage = (index: number) => {
    setNewImageUrls(newImageUrls.filter((_, i) => i !== index));
  };

  const handleDeleteImage = async (imageId: string) => {
    try {
      const { error } = await supabase
        .from("tour_images")
        .delete()
        .eq("id", imageId);

      if (error) throw error;

      setImages(images.filter((img) => img.id !== imageId));
      toast({
        title: "Image Deleted",
        description: "The image has been removed.",
      });
    } catch (error) {
      console.error("Error deleting image:", error);
      toast({
        variant: "destructive",
        title: "Delete Failed",
        description: "Failed to delete the image.",
      });
    }
  };

  // AI Enhancement Handler
  const handleAIEnhance = async (type: "full" | "seo" | "sales") => {
    setIsAIEnhancing(true);
    setEnhanceType(type);

    try {
      const currentData = {
        title: watch("title"),
        slug: watch("slug"),
        category: watch("category"),
        location: watch("location"),
        duration_hours: watch("duration_hours"),
        price: watch("price"),
        currency: watch("currency"),
        short_description: watch("short_description"),
        long_description: watch("long_description"),
        itinerary: watch("itinerary"),
        includes: watch("includes"),
        excludes: watch("excludes"),
        pickup_info: watch("pickup_info"),
        what_to_bring: watch("what_to_bring"),
        is_featured: watch("is_featured"),
        is_active: watch("is_active"),
      };

      toast({
        title: "AI Enhancement Started",
        description: `Optimizing tour for ${type}...`,
      });

      const enhanced = await enhanceExistingTour(currentData as Partial<GeneratedTour>, type);

      // Update form values with enhanced content
      setValue("title", enhanced.title);
      setValue("short_description", enhanced.short_description);
      setValue("long_description", enhanced.long_description);
      setValue("itinerary", enhanced.itinerary);
      setValue("includes", enhanced.includes);
      setValue("excludes", enhanced.excludes);
      setValue("what_to_bring", enhanced.what_to_bring);
      setValue("pickup_info", enhanced.pickup_info);
      if (enhanced.price) setValue("price", enhanced.price);

      toast({
        title: "AI Enhancement Complete!",
        description: `Tour has been optimized for ${type}. Review the changes and save.`,
      });
    } catch (error: any) {
      console.error("AI Enhancement error:", error);
      toast({
        variant: "destructive",
        title: "Enhancement Failed",
        description: error.message || "Failed to enhance with AI.",
      });
    } finally {
      setIsAIEnhancing(false);
      setEnhanceType(null);
    }
  };

  // File Upload Handler
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploadingImages(true);

    try {
      const uploadedUrls: string[] = [];

      for (const file of Array.from(files)) {
        // Validate file type
        if (!file.type.startsWith("image/")) {
          toast({
            variant: "destructive",
            title: "Invalid File",
            description: `${file.name} is not an image file.`,
          });
          continue;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast({
            variant: "destructive",
            title: "File Too Large",
            description: `${file.name} exceeds 5MB limit.`,
          });
          continue;
        }

        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `tour-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("tours")
          .upload(filePath, file);

        if (uploadError) {
          console.error("Upload error:", uploadError);
          toast({
            variant: "destructive",
            title: "Upload Failed",
            description: `Failed to upload ${file.name}.`,
          });
          continue;
        }

        const { data: urlData } = supabase.storage
          .from("tours")
          .getPublicUrl(filePath);

        uploadedUrls.push(urlData.publicUrl);
      }

      if (uploadedUrls.length > 0) {
        setNewImageUrls([...newImageUrls, ...uploadedUrls]);
        toast({
          title: "Images Uploaded",
          description: `${uploadedUrls.length} image(s) uploaded successfully.`,
        });
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: "Failed to upload images.",
      });
    } finally {
      setUploadingImages(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const title = watch("title");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/tours")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="font-display text-3xl font-bold text-foreground">
              {isEditing ? "Edit Tour" : "Add New Tour"}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? "Update tour details and images" : "Create a new tour listing"}
            </p>
          </div>
        </div>

        {/* AI Enhancement Toolbar */}
        {isEditing && (
          <Card className="bg-gradient-to-r from-purple-500/10 via-yellow-500/10 to-green-500/10 border-purple-500/20">
            <CardContent className="py-3">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                  <span>AI Enhancement:</span>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleAIEnhance("full")}
                  disabled={isAIEnhancing}
                  className="bg-background/50"
                >
                  {isAIEnhancing && enhanceType === "full" ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Wand2 className="h-4 w-4 mr-2 text-purple-500" />
                  )}
                  Full Enhancement
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleAIEnhance("seo")}
                  disabled={isAIEnhancing}
                  className="bg-background/50"
                >
                  {isAIEnhancing && enhanceType === "seo" ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4 mr-2 text-blue-500" />
                  )}
                  SEO Optimize
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleAIEnhance("sales")}
                  disabled={isAIEnhancing}
                  className="bg-background/50"
                >
                  {isAIEnhancing && enhanceType === "sales" ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                  )}
                  Sales Boost
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* AI Creator Link for New Tours */}
        {!isEditing && (
          <Card className="bg-gradient-to-r from-yellow-500/10 to-purple-500/10 border-yellow-500/20">
            <CardContent className="py-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Want AI to create this tour for you?</span>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/admin/ai-tour")}
                  className="bg-background/50"
                >
                  <Wand2 className="h-4 w-4 mr-2 text-purple-500" />
                  Use AI Tour Creator
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Enter the tour's main details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Safari Blue Full Day Experience"
                  {...register("title")}
                  onChange={(e) => {
                    register("title").onChange(e);
                    if (!isEditing || !watch("slug")) {
                      setValue("slug", generateSlug(e.target.value));
                    }
                  }}
                />
                {errors.title && (
                  <p className="text-destructive text-sm mt-1">{errors.title.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="slug">URL Slug *</Label>
                <Input
                  id="slug"
                  placeholder="safari-blue-full-day"
                  {...register("slug")}
                />
                {errors.slug && (
                  <p className="text-destructive text-sm mt-1">{errors.slug.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={watch("category") || ""}
                  onValueChange={(value) => setValue("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {TOUR_CATEGORIES.filter((c) => c.value !== "all").map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., Zanzibar, Tanzania"
                  {...register("location")}
                />
              </div>
              <div>
                <Label htmlFor="duration_hours">Duration (hours)</Label>
                <Input
                  id="duration_hours"
                  type="number"
                  min="1"
                  placeholder="8"
                  {...register("duration_hours")}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="150"
                  {...register("price")}
                />
              </div>
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Select
                  value={watch("currency") || "USD"}
                  onValueChange={(value) => setValue("currency", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="TZS">TZS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Descriptions */}
        <Card>
          <CardHeader>
            <CardTitle>Descriptions</CardTitle>
            <CardDescription>Describe the tour experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="short_description">Short Description</Label>
              <Textarea
                id="short_description"
                placeholder="Brief overview shown on tour cards..."
                rows={2}
                {...register("short_description")}
              />
            </div>
            <div>
              <Label htmlFor="long_description">Full Description</Label>
              <Textarea
                id="long_description"
                placeholder="Detailed description of the tour..."
                rows={5}
                {...register("long_description")}
              />
            </div>
            <div>
              <Label htmlFor="itinerary">Itinerary</Label>
              <Textarea
                id="itinerary"
                placeholder="Timeline of activities..."
                rows={4}
                {...register("itinerary")}
              />
            </div>
          </CardContent>
        </Card>

        {/* Includes/Excludes */}
        <Card>
          <CardHeader>
            <CardTitle>Inclusions & Information</CardTitle>
            <CardDescription>What's included and other details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="includes">What's Included (comma-separated)</Label>
                <Textarea
                  id="includes"
                  placeholder="Transport, Lunch, Guide, Entrance fees..."
                  rows={3}
                  {...register("includes")}
                />
              </div>
              <div>
                <Label htmlFor="excludes">Not Included (comma-separated)</Label>
                <Textarea
                  id="excludes"
                  placeholder="Tips, Personal expenses, Travel insurance..."
                  rows={3}
                  {...register("excludes")}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="pickup_info">Pickup Information</Label>
              <Textarea
                id="pickup_info"
                placeholder="We pick up from all hotels in Stone Town..."
                rows={2}
                {...register("pickup_info")}
              />
            </div>
            <div>
              <Label htmlFor="what_to_bring">What to Bring</Label>
              <Textarea
                id="what_to_bring"
                placeholder="Sunscreen, Hat, Comfortable shoes..."
                rows={2}
                {...register("what_to_bring")}
              />
            </div>
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
            <CardDescription>Add tour images via upload or URL</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Existing Images */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {images.map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.path}
                      alt={image.alt_text || "Tour image"}
                      className="w-full aspect-video object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(image.id)}
                      className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* New Images */}
            {newImageUrls.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {newImageUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`New image ${index + 1}`}
                      className="w-full aspect-video object-cover rounded-lg border-2 border-dashed border-primary"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveNewImage(index)}
                      className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload and URL buttons */}
            <div className="flex flex-wrap gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                multiple
                className="hidden"
              />
              <Button
                type="button"
                variant="default"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingImages}
              >
                {uploadingImages ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4 mr-2" />
                )}
                {uploadingImages ? "Uploading..." : "Upload Images"}
              </Button>
              <Button type="button" variant="outline" onClick={handleAddImageUrl}>
                <ImageIcon className="h-4 w-4 mr-2" />
                Add Image URL
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Upload images (max 5MB each) or add URLs from external sources
            </p>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Visibility and featured status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="is_active">Active</Label>
                <p className="text-sm text-muted-foreground">
                  Tour will be visible to visitors
                </p>
              </div>
              <Switch
                id="is_active"
                checked={watch("is_active")}
                onCheckedChange={(checked) => setValue("is_active", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="is_featured">Featured</Label>
                <p className="text-sm text-muted-foreground">
                  Highlight on homepage
                </p>
              </div>
              <Switch
                id="is_featured"
                checked={watch("is_featured")}
                onCheckedChange={(checked) => setValue("is_featured", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex items-center justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate("/admin/tours")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : isEditing ? "Save Changes" : "Create Tour"}
          </Button>
        </div>
      </form>
    </div>
  );
}
