import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { IMAGES } from "../config/siteConfig";
import { useScrollToSection } from "../hooks/useScrollToSection";
import { getImagePath } from "../utils/imageLoader";

const Logo = getImagePath(IMAGES.logo);

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollToSection } = useScrollToSection();

  const navigation = [
    { name: "Início", href: "#home" },
    { name: "Nossa Causa", href: "#causa" },
    { name: "Projetos", href: "#projetos" },
    { name: "Quem Somos", href: "#sobre" },
    { name: "Equipe", href: "#equipe" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href);
    setMobileMenuOpen(false);
  };

  const handleDonateClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSection("#doacoes");
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <nav className="container mx-auto px-4 py-4" role="navigation" aria-label="Navegação Principal">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-ring rounded"
            aria-label="Página inicial da OSC"
          >
            <img src={Logo} alt="Logo da OSC" className="h-12 w-16" />
            <span className="sr-only">Arquice</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded px-2 py-1"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <Button 
              size="lg" 
              asChild
              aria-label="Fazer doação agora"
            >
              <a href="#doacoes" onClick={handleDonateClick}>Doar Agora</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col gap-3">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded px-2 py-2"
                >
                  {item.name}
                </a>
              ))}
              <Button size="lg" className="w-full mt-2" asChild>
                <a href="#doacoes" onClick={handleDonateClick}>Doar Agora</a>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
