import { Heart, CheckCircle2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { getProjectIcon, type Project } from "../config/projects";

type ProjectCardProps = {
  project: Project;
  /**
   * Handler do botão "Contribuir". Quando fornecido, o botão vira um link
   * âncora (#doacoes). Quando ausente (ex.: pré-visualização no ADM), o botão
   * é inerte e não navega.
   */
  onContribute?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

export function ProjectCard({ project, onContribute }: ProjectCardProps) {
  const Icon = getProjectIcon(project.icon);
  const reached = project.goalReached;

  return (
    <Card className="card-interactive relative flex flex-col">
      {reached && (
        <Badge className="absolute right-4 top-4 bg-success text-success-foreground">
          <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
          Meta Alcançada
        </Badge>
      )}

      <CardHeader>
        <div
          className={`h-12 w-12 rounded-full flex items-center justify-center mb-4 ${
            reached ? "bg-success/10" : "bg-brand/10"
          }`}
        >
          <Icon
            className={`h-6 w-6 ${reached ? "text-success" : "text-brand"}`}
            aria-hidden="true"
          />
        </div>
        <CardTitle>{project.title || "Título do projeto"}</CardTitle>
        <CardDescription>
          {project.description || "Descrição do projeto aparecerá aqui."}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2 gap-2">
              <span className="text-sm">
                Meta: R$ {(project.goal || 0).toLocaleString("pt-BR")}
              </span>
              {reached && (
                <span className="text-sm font-medium text-success">
                  100%
                </span>
              )}
            </div>
          </div>
          <div className="bg-secondary/20 p-3 rounded">
            <p className="text-sm flex items-center gap-2">
              <Heart
                className={`h-4 w-4 ${reached ? "text-success" : "text-brand"}`}
                aria-hidden="true"
              />
              {project.impact || "Impacto do projeto"}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        {reached ? (
          <Button
            variant="outline"
            className="w-full"
            type="button"
            disabled
            aria-label="Projeto concluído"
          >
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            Projeto Concluído
          </Button>
        ) : onContribute ? (
          <Button className="w-full" asChild>
            <a href="#doacoes" onClick={onContribute}>
              Contribuir com este Projeto
            </a>
          </Button>
        ) : (
          <Button className="w-full" type="button">
            Contribuir com este Projeto
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
