import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { CauseSection } from "./components/CauseSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { AboutSection } from "./components/AboutSection";
import { TeamSection } from "./components/TeamSection";
import { DonationSection } from "./components/DonationSection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen">
      {/* Skip to main content link for screen readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded"
      >
        Pular para o conteúdo principal
      </a>

      <Header />

      <main id="main-content" role="main">
        <Hero />
        <CauseSection />
        <ProjectsSection />
        <AboutSection />
        <TeamSection />
        <DonationSection />
      </main>

      <Footer />
    </div>
  );
}
