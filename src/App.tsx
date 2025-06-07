
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { AuthGuard } from "@/components/AuthGuard";
import Index from "./pages/Index";
import Theory from "./pages/Theory";
import Problems from "./pages/Problems";
import Tests from "./pages/Tests";
import TakeTest from "./pages/TakeTest";
import History from "./pages/History";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/theory" element={<Theory />} />
            <Route path="/problems" element={<Problems />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/test/:testId" element={<TakeTest />} />
            <Route path="/history" element={<History />} />
            <Route 
              path="/admin" 
              element={
                <AuthGuard requireAuth requireAdmin>
                  <Admin />
                </AuthGuard>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
