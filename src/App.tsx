import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminPanel from "./components/AdminPanel";
import PremiumExpiredModal from "./components/PremiumExpiredModal";
import { useAuth, AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user, showPremiumExpiredModal, setShowPremiumExpiredModal, handlePremiumRenewal } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/admin" element={<AdminPanel />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {/* Modal de Premium Expirado */}
      <PremiumExpiredModal
        isOpen={showPremiumExpiredModal}
        onClose={() => setShowPremiumExpiredModal(false)}
        onRenew={handlePremiumRenewal}
        userName={user?.name || 'Usuário'}
      />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
