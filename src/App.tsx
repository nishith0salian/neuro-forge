import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./providers/ThemeProvider";
import Index from "./pages/Index";
import Decks from "./pages/Decks";
import Study from "./pages/Study";
import Interleaved from "./pages/Interleaved";
import MemoryPalace from "./pages/MemoryPalace";
import Auth from "./pages/Auth";
import Articles from "./pages/Articles";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import KnowledgeNetwork from "./pages/KnowledgeNetwork";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/decks" element={<Decks />} />
            <Route path="/study" element={<Study />} />
            <Route path="/study/:deckId" element={<Study />} />
            <Route path="/interleaved" element={<Interleaved />} />
            <Route path="/memory-palace" element={<MemoryPalace />} />
            <Route path="/knowledge-network" element={<KnowledgeNetwork />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
