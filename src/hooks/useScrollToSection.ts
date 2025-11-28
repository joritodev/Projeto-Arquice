import { useNavigate, useLocation } from "react-router-dom";

export function useScrollToSection() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (hash: string) => {
    // Remove o # se estiver presente
    const sectionId = hash.startsWith("#") ? hash.slice(1) : hash;
    const fullHash = `#${sectionId}`;

    // Se já estamos na home, apenas faz scroll
    if (location.pathname === "/") {
      const element = document.querySelector(fullHash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Se não estamos na home, navega para home e depois faz scroll
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  return { scrollToSection };
}

