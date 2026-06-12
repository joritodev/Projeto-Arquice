import { Hero } from "../components/Hero";
import { CauseSection } from "../components/CauseSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { AboutSection } from "../components/AboutSection";
import { TeamSection } from "../components/TeamSection";
import { DonationSection } from "../components/DonationSection";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

export function HomePage() {
  useRevealOnScroll();

  return (
    <>
      <Hero />
      <CauseSection />
      <ProjectsSection />
      <AboutSection />
      <TeamSection />
      <DonationSection />
    </>
  );
}

