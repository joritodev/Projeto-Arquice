import { Button } from "./ui/button";
import { ArrowRight, Heart } from "lucide-react";
import { IMAGES } from "../config/siteConfig";
import { useScrollToSection } from "../hooks/useScrollToSection";
import { getImagePath } from "../utils/imageLoader";

const Banner = getImagePath(IMAGES.banner);

export function Hero() {
  const { scrollToSection } = useScrollToSection();

  const handleDonateClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSection("#doacoes");
  };

  const handleProjectsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSection("#projetos");
  };

  return (
    <section 
      id="home" 
      className="relative bg-gradient-to-br from-primary/5 to-secondary/10 py-20 md:py-32"
      aria-labelledby="hero-heading"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl">
              Transformando Vidas Através da Solidariedade
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl">
              Juntos, construímos um futuro mais justo e inclusivo para todos. 
              Cada contribuição faz a diferença na vida de quem mais precisa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6"
                asChild
              >
                <a href="#doacoes" onClick={handleDonateClick} className="flex items-center gap-2">
                  <Heart className="h-5 w-5" aria-hidden="true" />
                  Fazer Doação
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6"
                asChild
              >
                <a href="#projetos" onClick={handleProjectsClick}>Conheça Nossos Projetos</a>
              </Button>
            </div>
          </div>

          <div className="relative">
            <img
              src={Banner}
              alt="Voluntários da OSC ajudando a comunidade"
              className="rounded-lg shadow-2xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
