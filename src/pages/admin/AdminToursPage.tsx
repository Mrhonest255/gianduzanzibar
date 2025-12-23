import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Star,
  MoreVertical,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Tour {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  location: string | null;
  price: number | null;
  duration_hours: number | null;
  is_featured: boolean | null;
  is_active: boolean | null;
  created_at: string | null;
  image_count?: number;
}

export default function AdminToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const { data: toursData, error } = await supabase
        .from("tours")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Get image counts for each tour
      const toursWithImages = await Promise.all(
        (toursData || []).map(async (tour) => {
          const { count } = await supabase
            .from("tour_images")
            .select("*", { count: "exact", head: true })
            .eq("tour_id", tour.id);
          return { ...tour, image_count: count || 0 };
        })
      );

      setTours(toursWithImages);
    } catch (error) {
      console.error("Error fetching tours:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load tours.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase
        .from("tours")
        .delete()
        .eq("id", deleteId);

      if (error) throw error;

      setTours(tours.filter((t) => t.id !== deleteId));
      toast({
        title: "Tour Deleted",
        description: "The tour has been permanently deleted.",
      });
    } catch (error) {
      console.error("Error deleting tour:", error);
      toast({
        variant: "destructive",
        title: "Delete Failed",
        description: "Failed to delete the tour. Please try again.",
      });
    } finally {
      setDeleteId(null);
    }
  };

  const toggleFeatured = async (tour: Tour) => {
    try {
      const { error } = await supabase
        .from("tours")
        .update({ is_featured: !tour.is_featured })
        .eq("id", tour.id);

      if (error) throw error;

      setTours(
        tours.map((t) =>
          t.id === tour.id ? { ...t, is_featured: !t.is_featured } : t
        )
      );

      toast({
        title: tour.is_featured ? "Removed from Featured" : "Added to Featured",
        description: `${tour.title} has been updated.`,
      });
    } catch (error) {
      console.error("Error toggling featured:", error);
    }
  };

  const toggleActive = async (tour: Tour) => {
    try {
      const { error } = await supabase
        .from("tours")
        .update({ is_active: !tour.is_active })
        .eq("id", tour.id);

      if (error) throw error;

      setTours(
        tours.map((t) =>
          t.id === tour.id ? { ...t, is_active: !t.is_active } : t
        )
      );

      toast({
        title: tour.is_active ? "Tour Deactivated" : "Tour Activated",
        description: `${tour.title} is now ${tour.is_active ? "hidden" : "visible"} to visitors.`,
      });
    } catch (error) {
      console.error("Error toggling active:", error);
    }
  };

  const filteredTours = tours.filter(
    (tour) =>
      tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Tours</h1>
          <p className="text-muted-foreground">Manage your tour offerings</p>
        </div>
        <Button asChild>
          <Link to="/admin/tours/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Tour
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tours..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tours List */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-20 bg-muted rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredTours.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">
              {searchQuery ? "No tours found matching your search." : "No tours created yet."}
            </p>
            <Button asChild>
              <Link to="/admin/tours/new">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Tour
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredTours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={!tour.is_active ? "opacity-60" : ""}>
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Tour Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-foreground truncate">
                          {tour.title}
                        </h3>
                        {tour.is_featured && (
                          <Badge className="bg-accent text-accent-foreground">
                            <Star className="h-3 w-3 mr-1" fill="currentColor" />
                            Featured
                          </Badge>
                        )}
                        {!tour.is_active && (
                          <Badge variant="secondary">Hidden</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        {tour.category && <span>{tour.category}</span>}
                        {tour.location && <span>• {tour.location}</span>}
                        {tour.price && <span>• ${tour.price}</span>}
                        {tour.duration_hours && <span>• {tour.duration_hours}h</span>}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                        <ImageIcon className="h-3 w-3" />
                        <span>{tour.image_count} images</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <Button asChild variant="outline" size="sm">
                        <Link to={`/tours/${tour.slug}`} target="_blank">
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <Link to={`/admin/tours/${tour.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => toggleFeatured(tour)}>
                            <Star className="h-4 w-4 mr-2" />
                            {tour.is_featured ? "Remove Featured" : "Make Featured"}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toggleActive(tour)}>
                            <Eye className="h-4 w-4 mr-2" />
                            {tour.is_active ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setDeleteId(tour.id)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Tour?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the tour
              and all associated images.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
