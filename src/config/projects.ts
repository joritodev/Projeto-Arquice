import {
  Spool,
  Heart,
  HandHeart,
  Home,
  BookOpen,
  GraduationCap,
  Sun,
  Sprout,
  Users,
  Utensils,
  Stethoscope,
  Palette,
  type LucideIcon,
} from "lucide-react";

/**
 * Modelo de um projeto exibido na seção "Projetos Futuros".
 * É persistido embutido no SiteConfig (campo `projects`).
 */
export type Project = {
  /** Identificador estável (usado como key e para edição). */
  id: string;
  title: string;
  description: string;
  /** Chave de um ícone do conjunto curado em {@link PROJECT_ICONS}. */
  icon: string;
  /** Meta em reais (BRL), número inteiro. */
  goal: number;
  /** Frase de impacto exibida no card. */
  impact: string;
  /** Quando `true`, o card mostra o estado "Meta Alcançada". */
  goalReached: boolean;
};

/** Conjunto curado de ícones disponíveis para os projetos. */
export const PROJECT_ICONS: Record<string, LucideIcon> = {
  Spool,
  Heart,
  HandHeart,
  Home,
  BookOpen,
  GraduationCap,
  Sun,
  Sprout,
  Users,
  Utensils,
  Stethoscope,
  Palette,
};

/** Opções de ícone com rótulo amigável (para o seletor no ADM). */
export const PROJECT_ICON_OPTIONS: { value: string; label: string }[] = [
  { value: "Spool", label: "Costura" },
  { value: "Heart", label: "Coração" },
  { value: "HandHeart", label: "Solidariedade" },
  { value: "Home", label: "Casa" },
  { value: "BookOpen", label: "Educação" },
  { value: "GraduationCap", label: "Formação" },
  { value: "Sun", label: "Sol" },
  { value: "Sprout", label: "Plantio" },
  { value: "Users", label: "Comunidade" },
  { value: "Utensils", label: "Alimentação" },
  { value: "Stethoscope", label: "Saúde" },
  { value: "Palette", label: "Cultura" },
];

/** Ícone padrão quando a chave não existir no conjunto. */
export const DEFAULT_PROJECT_ICON = "Spool";

/** Retorna o componente de ícone para a chave informada (com fallback seguro). */
export function getProjectIcon(name: string): LucideIcon {
  return PROJECT_ICONS[name] ?? PROJECT_ICONS[DEFAULT_PROJECT_ICON];
}

/**
 * Lista padrão de projetos. Usada como fallback no site público quando a API
 * não está configurada/disponível e como valor inicial no formulário do ADM.
 */
export const DEFAULT_PROJECTS: Project[] = [
  {
    id: "oficina-costura",
    title: "Oficina de Costura",
    description:
      "Construção de uma oficina de costura para a produção de roupas e acessórios.",
    icon: "Spool",
    goal: 250000,
    impact: "Beneficiará 300 pessoas por ano",
    goalReached: false,
  },
];

/** Gera um id estável e único para um novo projeto. */
export function createProjectId(): string {
  return `proj-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

/** Cria um projeto vazio (valores iniciais para o formulário de criação). */
export function createEmptyProject(): Project {
  return {
    id: createProjectId(),
    title: "",
    description: "",
    icon: DEFAULT_PROJECT_ICON,
    goal: 0,
    impact: "",
    goalReached: false,
  };
}

/**
 * Normaliza/valida um valor desconhecido (ex.: resposta da API) em `Project[]`.
 * Ignora entradas inválidas e faz coerção segura dos tipos.
 */
export function parseProjects(value: unknown): Project[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item, index): Project[] => {
    if (!item || typeof item !== "object") return [];
    const o = item as Record<string, unknown>;

    const title = typeof o.title === "string" ? o.title : "";
    const description = typeof o.description === "string" ? o.description : "";
    if (!title && !description) return [];

    const rawGoal = o.goal;
    const goal =
      typeof rawGoal === "number"
        ? rawGoal
        : Number.parseInt(String(rawGoal ?? ""), 10) || 0;

    return [
      {
        id: typeof o.id === "string" && o.id ? o.id : `proj-${index}`,
        title,
        description,
        icon:
          typeof o.icon === "string" && o.icon in PROJECT_ICONS
            ? o.icon
            : DEFAULT_PROJECT_ICON,
        goal,
        impact: typeof o.impact === "string" ? o.impact : "",
        goalReached: o.goalReached === true,
      },
    ];
  });
}
