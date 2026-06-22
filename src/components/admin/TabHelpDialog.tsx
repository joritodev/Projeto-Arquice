import { useState } from "react";
import { HelpCircle, Lightbulb } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

/** Item explicativo de um campo da aba. */
export type HelpItem = {
  /** Nome do campo, como aparece no formulário. */
  label: string;
  /** Explicação simples e didática do que esse campo muda no site. */
  description: string;
};

type TabHelpDialogProps = {
  /** Título do modal (ex.: "Sobre a aba Emails"). */
  title: string;
  /** Frase introdutória opcional. */
  intro?: string;
  /** Lista de campos e o que cada um faz. */
  items: HelpItem[];
  /**
   * Texto do aviso destacado no rodapé. Quando omitido, mostra o lembrete
   * padrão para clicar em "Guardar". Passe `null` para ocultar o aviso.
   */
  note?: React.ReactNode | null;
};

/**
 * Botão de ajuda para administradores não técnicos.
 *
 * Abre um modal que explica, em linguagem simples, o que cada campo da aba
 * altera no site. Pensado para pessoas com pouca familiaridade com tecnologia.
 */
const DEFAULT_NOTE = (
  <>
    <strong>Importante:</strong> depois de alterar qualquer campo, clique no
    botão <strong>Guardar</strong> (no topo da página) para que as mudanças
    apareçam no site.
  </>
);

export function TabHelpDialog({
  title,
  intro,
  items,
  note = DEFAULT_NOTE,
}: TabHelpDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="shrink-0 gap-1.5"
      >
        <HelpCircle className="h-4 w-4" aria-hidden="true" />
        O que isto faz?
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-brand" aria-hidden="true" />
              {title}
            </DialogTitle>
            {intro && <DialogDescription>{intro}</DialogDescription>}
          </DialogHeader>

          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={item.label}
                className="rounded-lg border bg-secondary/10 p-3"
              >
                <p className="font-medium text-foreground">{item.label}</p>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>

          {note !== null && (
            <div className="rounded-lg bg-brand/10 p-3 text-sm text-foreground">
              {note}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
