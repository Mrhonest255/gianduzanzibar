import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { LanguageProvider } from "@/components/LanguageSelector";
import Index from "./pages/Index";
import ToursPage from "./pages/ToursPage";
import TourDetailPage from "./pages/TourDetailPage";
import TransfersPage from "./pages/TransfersPage";
import MainlandSafarisPage from "./pages/MainlandSafarisPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BookingSuccessPage from "./pages/BookingSuccessPage";
import TrackBookingPage from "./pages/TrackBookingPage";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import { AdminLayout } from "./components/admin/AdminLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminToursPage from "./pages/admin/AdminToursPage";
import AdminTourFormPage from "./pages/admin/AdminTourFormPage";
import AdminAITourPage from "./pages/admin/AdminAITourPage";
import AdminBookingsPage from "./pages/admin/AdminBookingsPage";
import AdminBookingDetailPage from "./pages/admin/AdminBookingDetailPage";
import AdminMessagesPage from "./pages/admin/AdminMessagesPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/tours" element={<ToursPage />} />
                <Route path="/tours/:slug" element={<TourDetailPage />} />
                <Route path="/transfers" element={<TransfersPage />} />
                <Route path="/mainland-safaris" element={<MainlandSafarisPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/booking/success" element={<BookingSuccessPage />} />
                <Route path="/track-booking" element={<TrackBookingPage />} />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboardPage />} />
                  <Route path="ai-tour" element={<AdminAITourPage />} />
                  <Route path="ai-tour/:id" element={<AdminAITourPage />} />
                  <Route path="tours" element={<AdminToursPage />} />
                  <Route path="tours/new" element={<AdminTourFormPage />} />
                  <Route path="tours/:id/edit" element={<AdminTourFormPage />} />
                  <Route path="bookings" element={<AdminBookingsPage />} />
                  <Route path="bookings/:id" element={<AdminBookingDetailPage />} />
                  <Route path="messages" element={<AdminMessagesPage />} />
                  <Route path="settings" element={<AdminSettingsPage />} />
                </Route>
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
