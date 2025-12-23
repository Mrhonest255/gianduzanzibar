import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Map,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  ArrowRight,
  Eye,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface DashboardStats {
  totalTours: number;
  activeTours: number;
  pendingBookings: number;
  approvedBookings: number;
  totalBookings: number;
  unreadMessages: number;
}

interface RecentBooking {
  id: string;
  booking_reference: string;
  tour_title_snapshot: string;
  full_name: string;
  tour_date: string;
  status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  approved: "bg-forest-green/10 text-forest-green",
  rejected: "bg-destructive/10 text-destructive",
  archived: "bg-muted text-muted-foreground",
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalTours: 0,
    activeTours: 0,
    pendingBookings: 0,
    approvedBookings: 0,
    totalBookings: 0,
    unreadMessages: 0,
  });
  const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch tours count
      const { count: totalTours } = await supabase
        .from("tours")
        .select("*", { count: "exact", head: true });

      const { count: activeTours } = await supabase
        .from("tours")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true);

      // Fetch bookings stats
      const { count: totalBookings } = await supabase
        .from("bookings")
        .select("*", { count: "exact", head: true });

      const { count: pendingBookings } = await supabase
        .from("bookings")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

      const { count: approvedBookings } = await supabase
        .from("bookings")
        .select("*", { count: "exact", head: true })
        .eq("status", "approved");

      // Fetch unread messages
      const { count: unreadMessages } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .eq("is_read", false);

      // Fetch recent bookings
      const { data: bookings } = await supabase
        .from("bookings")
        .select("id, booking_reference, tour_title_snapshot, full_name, tour_date, status, created_at")
        .order("created_at", { ascending: false })
        .limit(5);

      setStats({
        totalTours: totalTours || 0,
        activeTours: activeTours || 0,
        pendingBookings: pendingBookings || 0,
        approvedBookings: approvedBookings || 0,
        totalBookings: totalBookings || 0,
        unreadMessages: unreadMessages || 0,
      });

      setRecentBookings(bookings || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const statsCards = [
    {
      title: "Total Tours",
      value: stats.totalTours,
      subtitle: `${stats.activeTours} active`,
      icon: Map,
      color: "text-primary",
      bgColor: "bg-ocean-light",
    },
    {
      title: "Pending Bookings",
      value: stats.pendingBookings,
      subtitle: "Awaiting approval",
      icon: Clock,
      color: "text-amber-600",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
    },
    {
      title: "Approved Bookings",
      value: stats.approvedBookings,
      subtitle: "Confirmed tours",
      icon: CheckCircle,
      color: "text-forest-green",
      bgColor: "bg-forest-green/10",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      subtitle: "All time",
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-ocean-light",
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-16 bg-muted rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-medium transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.subtitle}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions + Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild variant="outline" className="w-full justify-between">
              <Link to="/admin/tours/new">
                Add New Tour
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-between">
              <Link to="/admin/bookings?status=pending">
                View Pending Bookings
                {stats.pendingBookings > 0 && (
                  <Badge variant="destructive">{stats.pendingBookings}</Badge>
                )}
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-between">
              <Link to="/admin/messages">
                View Messages
                {stats.unreadMessages > 0 && (
                  <Badge variant="destructive">{stats.unreadMessages}</Badge>
                )}
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Bookings */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest booking requests</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link to="/admin/bookings">
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {recentBookings.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No bookings yet</p>
            ) : (
              <div className="space-y-3">
                {recentBookings.map((booking) => (
                  <Link
                    key={booking.id}
                    to={`/admin/bookings/${booking.id}`}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground truncate">
                          {booking.full_name}
                        </p>
                        <Badge
                          variant="secondary"
                          className={statusColors[booking.status || "pending"]}
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {booking.tour_title_snapshot}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(booking.tour_date), "MMM d, yyyy")} •{" "}
                        {booking.booking_reference}
                      </p>
                    </div>
                    <Eye className="h-4 w-4 text-muted-foreground shrink-0 ml-2" />
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
