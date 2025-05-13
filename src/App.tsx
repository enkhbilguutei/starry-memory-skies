import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "./components/Layout";

// Replace static imports with lazy loaded components
const Index = lazy(() => import("./pages/Index"));
const StarMap = lazy(() => import("./pages/StarMap"));
const FutureDreams = lazy(() => import("./pages/FutureDreams"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-constellation-dark">
              <div className="w-8 h-8 rounded-full border-2 border-r-transparent border-constellation-star1 animate-spin"></div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Index />} />
            <Route element={<Layout />}>
              <Route path="/starmap" element={<StarMap />} />
              <Route path="/dreams" element={<FutureDreams />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
