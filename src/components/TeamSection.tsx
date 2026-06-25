import { useEffect, useState } from "react";
import { getApiBaseUrl } from "../lib/api";
import { SITE_CONFIG_API_PATH } from "../admin/constants";
import { DEFAULT_TEAM, parseTeam, type TeamMember } from "../config/team";
import { MemberCard } from "./MemberCard";

export function TeamSection() {
  // Fallback (DEFAULT_TEAM) só vale enquanto carrega ou se a API falhar.
  // Quando o backend responde com sucesso, a home reflete exatamente o CRUD.
  const [team, setTeam] = useState<TeamMember[]>(DEFAULT_TEAM);

  useEffect(() => {
    const base = getApiBaseUrl();
    if (!base) return; // Sem API configurada: mantém a lista padrão.

    let cancelled = false;
    fetch(`${base}${SITE_CONFIG_API_PATH}`, { headers: { Accept: "application/json" } })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((data: unknown) => {
        if (cancelled) return;
        const list = parseTeam((data as { team?: unknown })?.team);
        // Só substitui se o backend tiver membros; caso contrário mantém o fallback.
        if (list.length > 0) setTeam(list);
      })
      .catch(() => {
        // Em caso de falha de rede/API, mantém o fallback (DEFAULT_TEAM).
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="equipe"
      className="py-20 md:py-28 bg-secondary/5"
      aria-labelledby="team-heading"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16" data-reveal>
          <h2 id="team-heading" className="mb-6">
            Principais Representantes
          </h2>
          <p className="text-xl text-muted-foreground">
            Nossa equipe de liderança é formada por profissionais comprometidos,
            experientes e apaixonados pela causa social.
          </p>
        </div>

        {team.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-reveal>
            {team.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
