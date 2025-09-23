import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import InshortsPage from "./pages/InshortsPage";
import VideosBytesPage from "./pages/VideosBytesPage";
import EPaperPage from "./pages/EPaperPage";
import FlipBookViewer from "./pages/FlipBookViewer";
import HighlightsPage from "./pages/HighlightsPage";
import NITPage from "./pages/NITPage";
import ArticlePage from "./pages/ArticlePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/inshorts" element={<InshortsPage />} />
            <Route path="/bytes" element={<VideosBytesPage />} />
            <Route path="/epaper" element={<EPaperPage />} />
            <Route path="/flipbook" element={<FlipBookViewer />} />
            <Route path="/highlights" element={<HighlightsPage />} />
            <Route path="/nit" element={<NITPage />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
