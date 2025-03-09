
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LocationProvider } from "./components/LocationContext";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import BookingConfirmation from "./pages/BookingConfirmation";
import Tickets from "./pages/Tickets";
import Profile from "./pages/Profile";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LocationProvider>
        <Toaster />
        <Sonner position="top-center" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/booking-confirmation/:id" element={<BookingConfirmation />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LocationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
