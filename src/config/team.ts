/**
 * Modelo de um membro exibido na seção "Principais Representantes".
 * É persistido embutido no SiteConfig (campo `team`).
 */
export type TeamMember = {
  /** Identificador estável (usado como key e para edição). */
  id: string;
  name: string;
  /** Cargo/função (ex.: "Presidenta"). */
  role: string;
  /** Pequena biografia/apresentação. */
  bio: string;
  /** Frase que destaca a importância/atuação do membro. */
  importance: string;
  /** URL pública da foto (ex.: `/Maria Solange.jpg` ou link de upload). */
  image: string;
  /** Link do LinkedIn (ou "#"/vazio se não existir). */
  linkedin: string;
  /** Email de contato do membro (opcional). */
  email: string;
};

/**
 * Lista padrão de membros. Usada como fallback no site público quando a API
 * não está configurada/disponível e como valor inicial no formulário do ADM.
 */
export const DEFAULT_TEAM: TeamMember[] = [
  {
    id: "maria-solange",
    name: "Maria Solange de Lima Faustino",
    role: "Presidenta",
    bio: "presidente da associação remanescente quilombola de Curralinho morrinhos Arquice Ceará",
    importance: "Tomada de decisões, reuniões e estratégias",
    image: "/Maria Solange.jpg",
    linkedin: "#",
    email: "",
  },
  {
    id: "francis-girliane",
    name: "Francis Girliane Vasconcelos",
    role: "Sócia Apoiadora",
    bio: "Aí eu estou como sócia apoiadora da associação, para eventos, reuniões, sistema e o que precisar estou disponível para ajudar.",
    importance: "Gerencia recursos financeiros e parcerias corporativas",
    image: "/Francisca Girliane.jpg",
    linkedin: "#",
    email: "",
  },
  {
    id: "maria-salete",
    name: "Maria Salete Secundo",
    role: "Suplente do Conselho Fiscal",
    bio: "Administradora com especialização em gestão financeira para o terceiro setor.",
    importance:
      "Apoia os membros titulares na fiscalização da gestão econômico-financeira e atua na ausência destes para garantir o cumprimento das obrigações estatutárias.",
    image: "/Maria Salete.jpg",
    linkedin: "#",
    email: "",
  },
];

/** Gera um id estável e único para um novo membro. */
export function createMemberId(): string {
  return `member-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

/** Cria um membro vazio (valores iniciais para o formulário de criação). */
export function createEmptyMember(): TeamMember {
  return {
    id: createMemberId(),
    name: "",
    role: "",
    bio: "",
    importance: "",
    image: "",
    linkedin: "#",
    email: "",
  };
}

/**
 * Normaliza/valida um valor desconhecido (ex.: resposta da API) em `TeamMember[]`.
 * Ignora entradas inválidas e faz coerção segura dos tipos.
 */
export function parseTeam(value: unknown): TeamMember[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item, index): TeamMember[] => {
    if (!item || typeof item !== "object") return [];
    const o = item as Record<string, unknown>;

    const name = typeof o.name === "string" ? o.name : "";
    const role = typeof o.role === "string" ? o.role : "";
    if (!name && !role) return [];

    return [
      {
        id: typeof o.id === "string" && o.id ? o.id : `member-${index}`,
        name,
        role,
        bio: typeof o.bio === "string" ? o.bio : "",
        importance: typeof o.importance === "string" ? o.importance : "",
        image: typeof o.image === "string" ? o.image : "",
        linkedin: typeof o.linkedin === "string" ? o.linkedin : "#",
        email: typeof o.email === "string" ? o.email : "",
      },
    ];
  });
}
