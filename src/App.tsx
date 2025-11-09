import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./providers/ThemeProvider";
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Decks from "./pages/Decks";
import Study from "./pages/Study";
import Interleaved from "./pages/Interleaved";
import MemoryPalace from "./pages/MemoryPalace";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Articles from "./pages/Articles";
import Pricing from "./pages/Pricing";
import KnowledgeNetwork from "./pages/KnowledgeNetwork";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/pricing" element={<Pricing />} />
              
              {/* Protected routes */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/decks" element={<ProtectedRoute><Decks /></ProtectedRoute>} />
              <Route path="/study" element={<ProtectedRoute><Study /></ProtectedRoute>} />
              <Route path="/study/:deckId" element={<ProtectedRoute><Study /></ProtectedRoute>} />
              <Route path="/interleaved" element={<ProtectedRoute><Interleaved /></ProtectedRoute>} />
              <Route path="/memory-palace" element={<ProtectedRoute><MemoryPalace /></ProtectedRoute>} />
              <Route path="/knowledge-network" element={<ProtectedRoute><KnowledgeNetwork /></ProtectedRoute>} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
