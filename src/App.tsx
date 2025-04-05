
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, SignIn, SignUp } from "@clerk/clerk-react";
import Index from "./pages/Index";
import Browse from "./pages/Browse";
import RequestPage from "./pages/RequestPage";
import Forum from "./pages/Forum";
import NotFound from "./pages/NotFound";
import AuthLayout from "./components/AuthLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/browse" element={<Browse />} />
          
          {/* Protected routes - only accessible when signed in */}
          <Route path="/request" element={
            <>
              <SignedIn>
                <RequestPage />
              </SignedIn>
              <SignedOut>
                <Navigate to="/sign-in" replace />
              </SignedOut>
            </>
          } />
          
          <Route path="/forum" element={
            <>
              <SignedIn>
                <Forum />
              </SignedIn>
              <SignedOut>
                <Navigate to="/sign-in" replace />
              </SignedOut>
            </>
          } />
          
          {/* Auth routes */}
          <Route path="/sign-in/*" element={
            <AuthLayout>
              <SignIn routing="path" path="/sign-in" />
            </AuthLayout>
          } />
          <Route path="/sign-up/*" element={
            <AuthLayout>
              <SignUp routing="path" path="/sign-up" />
            </AuthLayout>
          } />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
