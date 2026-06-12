import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { ProjectCard } from "../ProjectCard";
import {
  PROJECT_ICON_OPTIONS,
  getProjectIcon,
  type Project,
} from "../../config/projects";

type ProjectFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Projeto a editar; em criação, passe um projeto "vazio" recém-gerado. */
  initial: Project;
  /** `true` quando estiver editando um projeto existente. */
  isEditing: boolean;
  onSubmit: (project: Project) => void;
};

export function ProjectFormDialog({
  open,
  onOpenChange,
  initial,
  isEditing,
  onSubmit,
}: ProjectFormDialogProps) {
  const [draft, setDraft] = useState<Project>(initial);

  // Sincroniza o rascunho sempre que o diálogo abre com um novo projeto.
  useEffect(() => {
    if (open) setDraft(initial);
  }, [open, initial]);

  const setField = <K extends keyof Project>(key: K, value: Project[K]) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const canSave = draft.title.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSave) return;
    onSubmit({
      ...draft,
      title: draft.title.trim(),
      description: draft.description.trim(),
      impact: draft.impact.trim(),
      goal: Number.isFinite(draft.goal) ? draft.goal : 0,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar projeto" : "Novo projeto"}
          </DialogTitle>
          <DialogDescription>
            Preencha os campos e veja o card sendo atualizado em tempo real ao
            lado.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Formulário */}
          <form
            id="project-form"
            onSubmit={handleSubmit}
            className="space-y-4 order-2 lg:order-1"
          >
            <div>
              <Label htmlFor="project-title">Título *</Label>
              <Input
                id="project-title"
                value={draft.title}
                onChange={(e) => setField("title", e.target.value)}
                placeholder="Ex.: Oficina de Costura"
                required
                aria-required="true"
              />
            </div>

            <div>
              <Label htmlFor="project-description">Descrição</Label>
              <Textarea
                id="project-description"
                rows={3}
                value={draft.description}
                onChange={(e) => setField("description", e.target.value)}
                placeholder="O que será construído / realizado neste projeto"
              />
            </div>

            <div>
              <Label>Ícone</Label>
              <div className="mt-1.5 grid grid-cols-6 gap-2">
                {PROJECT_ICON_OPTIONS.map((opt) => {
                  const OptIcon = getProjectIcon(opt.value);
                  const selected = draft.icon === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setField("icon", opt.value)}
                      title={opt.label}
                      aria-label={opt.label}
                      aria-pressed={selected}
                      className={`flex items-center justify-center rounded-md border p-2 transition-colors ${
                        selected
                          ? "border-brand bg-brand/10 text-brand"
                          : "border-border text-muted-foreground hover:bg-accent"
                      }`}
                    >
                      <OptIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <Label htmlFor="project-goal">Meta (R$)</Label>
              <Input
                id="project-goal"
                type="number"
                min={0}
                step={1}
                value={Number.isFinite(draft.goal) ? draft.goal : 0}
                onChange={(e) =>
                  setField("goal", Math.max(0, Math.trunc(Number(e.target.value) || 0)))
                }
                placeholder="250000"
              />
            </div>

            <div>
              <Label htmlFor="project-impact">Impacto</Label>
              <Input
                id="project-impact"
                value={draft.impact}
                onChange={(e) => setField("impact", e.target.value)}
                placeholder="Ex.: Beneficiará 300 pessoas por ano"
              />
            </div>

            <div className="flex items-start gap-2 pt-1">
              <Checkbox
                id="project-goal-reached"
                checked={draft.goalReached}
                onCheckedChange={(checked) =>
                  setField("goalReached", checked === true)
                }
                className="mt-0.5"
              />
              <Label
                htmlFor="project-goal-reached"
                className="text-sm font-normal leading-tight"
              >
                Meta alcançada (marca o projeto como concluído no site)
              </Label>
            </div>
          </form>

          {/* Pré-visualização ao vivo */}
          <div className="order-1 lg:order-2">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Pré-visualização
            </p>
            <div className="rounded-lg border bg-secondary/10 p-4">
              <ProjectCard project={draft} />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button type="submit" form="project-form" disabled={!canSave}>
            {isEditing ? "Salvar alterações" : "Adicionar projeto"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
