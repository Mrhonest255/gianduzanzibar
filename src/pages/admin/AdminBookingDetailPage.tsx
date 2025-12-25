import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Archive,
  Trash2,
  Send,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
import { format } from "date-fns";

interface Booking {
  id: string;
  booking_reference: string | null;
  tour_title_snapshot: string;
  tour_price_snapshot?: number | null;
  full_name: string;
  email: string;
  phone: string;
  country: string | null;
  tour_date: string;
  adults: number | null;
  children: number | null;
  special_requests?: string | null;
  message?: string | null;
  status: string | null;
  created_at: string | null;
  tour_id: string | null;
}

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  approved: "bg-forest-green/10 text-forest-green",
  rejected: "bg-destructive/10 text-destructive",
  archived: "bg-muted text-muted-foreground",
};

const statusIcons: Record<string, typeof Clock> = {
  pending: Clock,
  approved: CheckCircle,
  rejected: XCircle,
  archived: Archive,
};

export default function AdminBookingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");

  useEffect(() => {
    if (id) {
      fetchBooking();
    }
  }, [id]);

  const fetchBooking = async () => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setBooking(data);
    } catch (error) {
      console.error("Error fetching booking:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load booking details.",
      });
      navigate("/admin/bookings");
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (newStatus: string) => {
    if (!booking) return;

    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: newStatus as "pending" | "approved" | "rejected" | "archived" })
        .eq("id", booking.id);

      if (error) throw error;

      setBooking({ ...booking, status: newStatus });
      toast({
        title: "Status Updated",
        description: `Booking marked as ${newStatus}.`,
      });
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Failed to update booking status.",
      });
    }
  };

  const handleDelete = async () => {
    if (!booking) return;

    try {
      const { error } = await supabase
        .from("bookings")
        .delete()
        .eq("id", booking.id);

      if (error) throw error;

      toast({
        title: "Booking Deleted",
        description: "The booking has been permanently deleted.",
      });
      navigate("/admin/bookings");
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast({
        variant: "destructive",
        title: "Delete Failed",
        description: "Failed to delete the booking.",
      });
    }
  };

  const sendEmail = async () => {
    if (!booking || !emailMessage.trim()) {
      toast({
        variant: "destructive",
        title: "Message Required",
        description: "Please enter a message to send.",
      });
      return;
    }

    setIsSendingEmail(true);
    try {
      const { error } = await supabase.functions.invoke("send-email", {
        body: {
          to: booking.email,
          subject: `Update on your booking: ${booking.booking_reference}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Dear ${booking.full_name},</h2>
              <p>${emailMessage.replace(/\n/g, "<br>")}</p>
              <hr style="margin: 20px 0;">
              <p style="color: #666; font-size: 14px;">
                Booking Reference: <strong>${booking.booking_reference}</strong><br>
                Tour: ${booking.tour_title_snapshot}<br>
                Date: ${format(new Date(booking.tour_date), "MMMM d, yyyy")}
              </p>
              <p style="margin-top: 20px;">Best regards,<br>Giandu Tours Team</p>
            </div>
          `,
          reply_to: "info@zanzibartravelhelper.com",
        },
      });

      if (error) throw error;

      toast({
        title: "Email Sent",
        description: `Message sent to ${booking.email}.`,
      });
      setEmailMessage("");
    } catch (error: any) {
      console.error("Error sending email:", error);
      toast({
        variant: "destructive",
        title: "Email Failed",
        description: error.message || "Failed to send email.",
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Booking not found.</p>
        <Button onClick={() => navigate("/admin/bookings")} className="mt-4">
          Back to Bookings
        </Button>
      </div>
    );
  }

  const StatusIcon = statusIcons[booking.status || "pending"] || Clock;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/bookings")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-2xl font-bold text-foreground">
                {booking.booking_reference}
              </h1>
              <Badge className={statusColors[booking.status || "pending"]}>
                <StatusIcon className="h-3 w-3 mr-1" />
                {booking.status}
              </Badge>
            </div>
            <p className="text-muted-foreground">Booking Details</p>
          </div>
        </div>
        <div className="flex gap-2">
          {booking.status === "pending" && (
            <>
              <Button
                variant="outline"
                className="text-forest-green border-forest-green hover:bg-forest-green hover:text-white"
                onClick={() => updateStatus("approved")}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </Button>
              <Button
                variant="outline"
                className="text-destructive border-destructive hover:bg-destructive hover:text-white"
                onClick={() => updateStatus("rejected")}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
            </>
          )}
          <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{booking.full_name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href={`mailto:${booking.email}`} className="font-medium text-primary hover:underline">
                    {booking.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a href={`tel:${booking.phone}`} className="font-medium text-primary hover:underline">
                    {booking.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Country</p>
                  <p className="font-medium">{booking.country || "Not specified"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tour Info */}
          <Card>
            <CardHeader>
              <CardTitle>Tour Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Tour</p>
                <p className="font-medium text-lg">{booking.tour_title_snapshot}</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{format(new Date(booking.tour_date), "MMM d, yyyy")}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Adults</p>
                  <p className="font-medium">{booking.adults || 1}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Children</p>
                  <p className="font-medium">{booking.children || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="font-medium">${booking.tour_price_snapshot || 0}</p>
                </div>
              </div>
              {booking.special_requests && (
                <div>
                  <p className="text-sm text-muted-foreground">Special Requests</p>
                  <p className="mt-1 p-3 bg-muted rounded-lg">{booking.special_requests}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Send Email */}
          <Card>
            <CardHeader>
              <CardTitle>Send Email to Customer</CardTitle>
              <CardDescription>Send a message directly to the customer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  rows={4}
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                />
              </div>
              <Button onClick={sendEmail} disabled={isSendingEmail}>
                {isSendingEmail ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                Send Email
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {booking.status !== "approved" && (
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => updateStatus("approved")}
                >
                  <CheckCircle className="h-4 w-4 mr-2 text-forest-green" />
                  Mark as Approved
                </Button>
              )}
              {booking.status !== "pending" && (
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => updateStatus("pending")}
                >
                  <Clock className="h-4 w-4 mr-2 text-amber-500" />
                  Mark as Pending
                </Button>
              )}
              {booking.status !== "rejected" && (
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => updateStatus("rejected")}
                >
                  <XCircle className="h-4 w-4 mr-2 text-destructive" />
                  Mark as Rejected
                </Button>
              )}
              {booking.status !== "archived" && (
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => updateStatus("archived")}
                >
                  <Archive className="h-4 w-4 mr-2" />
                  Archive
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Booking Meta */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Info</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reference</span>
                <span className="font-mono">{booking.booking_reference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span>{booking.created_at ? format(new Date(booking.created_at), "MMM d, yyyy HH:mm") : "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge className={statusColors[booking.status || "pending"]} variant="secondary">
                  {booking.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Booking?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The booking will be permanently removed.
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
    </motion.div>
  );
}
