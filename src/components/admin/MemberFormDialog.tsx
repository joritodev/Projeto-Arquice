import { useEffect, useState, type ChangeEvent } from "react";
import { toast } from "sonner";
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
import { MemberCard } from "../MemberCard";
import { useAuth } from "../../contexts/AuthContext";
import { apiUrl } from "../../lib/api";
import type { TeamMember } from "../../config/team";

type MemberFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Membro a editar; em criação, passe um membro "vazio" recém-gerado. */
  initial: TeamMember;
  /** `true` quando estiver editando um membro existente. */
  isEditing: boolean;
  onSubmit: (member: TeamMember) => void;
};

export function MemberFormDialog({
  open,
  onOpenChange,
  initial,
  isEditing,
  onSubmit,
}: MemberFormDialogProps) {
  const { token } = useAuth();
  const [draft, setDraft] = useState<TeamMember>(initial);
  const [uploading, setUploading] = useState(false);

  // Sincroniza o rascunho sempre que o diálogo abre com um novo membro.
  useEffect(() => {
    if (open) setDraft(initial);
  }, [open, initial]);

  const setField = <K extends keyof TeamMember>(key: K, value: TeamMember[K]) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const canSave = draft.name.trim().length > 0;

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    try {
      const response = await fetch(apiUrl("/api/upload"), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro upload");
      }

      const data = await response.json();
      setField("image", data.imageUrl);
      toast.success("Foto enviada com sucesso");
    } catch {
      toast.error("Erro ao enviar foto");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSave) return;
    onSubmit({
      ...draft,
      name: draft.name.trim(),
      role: draft.role.trim(),
      bio: draft.bio.trim(),
      importance: draft.importance.trim(),
      linkedin: draft.linkedin.trim() || "#",
      email: draft.email.trim(),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar membro" : "Novo membro"}</DialogTitle>
          <DialogDescription>
            Preencha os campos e veja o card sendo atualizado em tempo real ao
            lado.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-border">
          {/* Formulário */}
          <form
            id="member-form"
            onSubmit={handleSubmit}
            className="space-y-4 order-2 lg:order-1 lg:pr-12"
          >
            <div>
              <Label htmlFor="member-name">Nome *</Label>
              <Input
                id="member-name"
                value={draft.name}
                onChange={(e) => setField("name", e.target.value)}
                placeholder="Ex.: Maria Solange de Lima Faustino"
                required
                aria-required="true"
              />
            </div>

            <div>
              <Label htmlFor="member-role">Cargo / função</Label>
              <Input
                id="member-role"
                value={draft.role}
                onChange={(e) => setField("role", e.target.value)}
                placeholder="Ex.: Presidenta"
              />
            </div>

            <div>
              <Label htmlFor="member-bio">Biografia</Label>
              <Textarea
                id="member-bio"
                rows={3}
                value={draft.bio}
                onChange={(e) => setField("bio", e.target.value)}
                placeholder="Pequena apresentação do membro"
              />
            </div>

            <div>
              <Label htmlFor="member-importance">Importância / atuação</Label>
              <Textarea
                id="member-importance"
                rows={2}
                value={draft.importance}
                onChange={(e) => setField("importance", e.target.value)}
                placeholder="Ex.: Tomada de decisões, reuniões e estratégias"
              />
            </div>

            <div>
              <Label htmlFor="member-image">Foto</Label>
              <Input
                id="member-image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
              />
              {uploading && (
                <p className="text-sm text-muted-foreground mt-1">A enviar foto…</p>
              )}
            </div>

            <div>
              <Label htmlFor="member-linkedin">LinkedIn (URL)</Label>
              <Input
                id="member-linkedin"
                value={draft.linkedin}
                onChange={(e) => setField("linkedin", e.target.value)}
                placeholder="https://linkedin.com/in/... ou #"
              />
            </div>

            <div>
              <Label htmlFor="member-email">Email</Label>
              <Input
                id="member-email"
                type="email"
                value={draft.email}
                onChange={(e) => setField("email", e.target.value)}
                placeholder="contato@exemplo.com"
              />
            </div>
          </form>

          {/* Pré-visualização ao vivo */}
          <div className="order-1 lg:order-2 lg:pl-12">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Pré-visualização
            </p>
            <div className="rounded-lg border bg-secondary/10 p-4">
              <MemberCard member={draft} />
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
          <Button type="submit" form="member-form" disabled={!canSave || uploading}>
            {isEditing ? "Salvar alterações" : "Adicionar membro"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
