import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { AdminSiteConfigPage } from "./pages/AdminSiteConfigPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { ADMIN_SITE_CONFIG_PATH } from "./admin/constants";

function ScrollHandler() {
  const location = useLocation();

  useEffect(() => {
    if (location.state && typeof location.state === "object" && "scrollTo" in location.state) {
      const sectionId = (location.state as { scrollTo: string }).scrollTo;
      setTimeout(() => {
        const element = document.querySelector(`#${sectionId}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  return null;
}

function PublicLayout() {
  return (
    <div className="min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded"
      >
        Pular para o conteúdo principal
      </a>

      <ScrollHandler />
      <Header />

      <main id="main-content" role="main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

function AppContent() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacidade" element={<PrivacyPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path={ADMIN_SITE_CONFIG_PATH} element={
        <ProtectedRoute>
          <AdminSiteConfigPage />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}
