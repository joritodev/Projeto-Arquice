import { useEffect, useState } from "react";
import { Sprout, HeartHandshake } from "lucide-react";
import { useScrollToSection } from "../hooks/useScrollToSection";
import { getApiBaseUrl } from "../lib/api";
import { SITE_CONFIG_API_PATH } from "../admin/constants";
import { DEFAULT_PROJECTS, parseProjects, type Project } from "../config/projects";
import { ProjectCard } from "./ProjectCard";
import { Button } from "./ui/button";

export function ProjectsSection() {
  const { scrollToSection } = useScrollToSection();
  // Fallback (DEFAULT_PROJECTS) só vale enquanto carrega ou se a API falhar.
  // Quando o backend responde com sucesso, a home reflete exatamente o CRUD
  // (inclusive vazio), em vez de manter o projeto mockado.
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);

  useEffect(() => {
    const base = getApiBaseUrl();
    if (!base) return; // Sem API configurada: mantém a lista padrão.

    let cancelled = false;
    fetch(`${base}${SITE_CONFIG_API_PATH}`, { headers: { Accept: "application/json" } })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((data: unknown) => {
        if (cancelled) return;
        const list = parseProjects((data as { projects?: unknown })?.projects);
        setProjects(list);
      })
      .catch(() => {
        // Em caso de falha de rede/API, mantém o fallback (DEFAULT_PROJECTS).
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleDonateClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSection("#doacoes");
  };

  return (
    <section 
      id="projetos" 
      className="relative isolate overflow-hidden py-20 md:py-28 bg-secondary/10"
      aria-labelledby="projects-heading"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/3 h-[30rem] w-[30rem] rounded-full bg-brand/[0.06] blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-[26rem] w-[26rem] rounded-full bg-brand-green/[0.05] blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16" data-reveal>
          <h2 id="projects-heading" className="mb-6">
            Projetos Futuros
          </h2>
          <p className="text-xl text-muted-foreground">
            Com sua ajuda, podemos transformar estes sonhos em realidade. 
            Cada contribuição nos aproxima de um futuro melhor para nossa comunidade.
          </p>
        </div>

        {projects.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8" data-reveal>
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onContribute={handleDonateClick}
              />
            ))}
          </div>
        ) : (
          <div
            className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-dashed border-brand/30 bg-card/60 px-8 py-14 text-center shadow-sm backdrop-blur-sm"
            data-reveal
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-brand/10 blur-3xl"
            />

            <span className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-brand/10 text-brand ring-1 ring-inset ring-brand/20">
              <Sprout className="h-9 w-9" aria-hidden="true" />
            </span>

            <h3 className="mb-3 text-2xl">Novos projetos em breve</h3>
            <p className="mx-auto mb-8 max-w-md text-muted-foreground">
              Estamos plantando as próximas iniciativas que vão transformar nossa
              comunidade. Seu apoio é o que torna cada novo sonho possível.
            </p>

            <Button asChild size="lg">
              <a href="#doacoes" onClick={handleDonateClick}>
                <HeartHandshake className="h-5 w-5" aria-hidden="true" />
                Quero apoiar a causa
              </a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
