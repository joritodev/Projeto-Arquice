import { Linkedin, Mail, UserRound } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import type { TeamMember } from "../config/team";

type MemberCardProps = {
  member: TeamMember;
};

export function MemberCard({ member }: MemberCardProps) {
  const hasLinkedin = Boolean(member.linkedin) && member.linkedin !== "#";
  const hasEmail = Boolean(member.email);

  return (
    <Card className="card-interactive text-center">
      <CardContent className="pt-6">
        <div className="mb-4">
          {member.image ? (
            <img
              src={member.image}
              alt={`Foto de ${member.name || "membro"}`}
              className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-brand/20"
              width={128}
              height={128}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="w-32 h-32 rounded-full mx-auto flex items-center justify-center bg-brand/10 text-brand border-4 border-brand/20">
              <UserRound className="h-12 w-12" aria-hidden="true" />
            </div>
          )}
        </div>
        <h3 className="mb-1">{member.name || "Nome do membro"}</h3>
        <p className="text-sm text-brand mb-3">{member.role || "Cargo"}</p>
        {member.bio && (
          <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
        )}
        {member.importance && (
          <div className="bg-secondary/20 p-3 rounded mb-4">
            <p className="text-xs">{member.importance}</p>
          </div>
        )}
        <div className="flex gap-2 justify-center">
          <Button
            variant="outline"
            size="sm"
            asChild={hasLinkedin}
            disabled={!hasLinkedin}
            aria-label={`LinkedIn de ${member.name || "membro"}`}
          >
            {hasLinkedin ? (
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : (
              <Linkedin className="h-4 w-4" aria-hidden="true" />
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild={hasEmail}
            disabled={!hasEmail}
            aria-label={`Enviar e-mail para ${member.name || "membro"}`}
          >
            {hasEmail ? (
              <a href={`mailto:${member.email}`}>
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : (
              <Mail className="h-4 w-4" aria-hidden="true" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
