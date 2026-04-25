import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { client } from "@/lib/appwrite";
import { AuthProvider, useAuth } from "@/lib/AuthContext";
import { queryClientInstance } from "@/lib/query-client";
import PageNotFound from "@/lib/PageNotFound";
import UserNotRegisteredError from "@/components/UserNotRegisteredError";
import Home from "@/pages/Home";
import Admin from "@/pages/Admin";

const DefaultFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
  </div>
);

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) return <DefaultFallback />;

  if (authError) {
    if (authError.type === "user_not_registered") return <UserNotRegisteredError />;
    if (authError.type === "auth_required") {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default function App() {
  useEffect(() => {
    client.ping().catch((error) => {
      console.error("Appwrite ping failed:", error);
    });
  }, []);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}
