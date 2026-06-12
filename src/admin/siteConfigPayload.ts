import {
  ORG_EMAIL,
  CONTACT_EMAIL,
  PIX_KEY,
  ORG_NAME,
  ORG_FULL_NAME,
  ORG_DESCRIPTION,
  ORG_CNPJ,
  CONTACT_PHONE,
  CONTACT_ADDRESS,
  SOCIAL_MEDIA,
  IMAGES,
  FAVICON_PATH,
} from "../config/siteConfig";
import { DEFAULT_PROJECTS, type Project } from "../config/projects";

/**
 * Payload JSON (camelCase) alinhado ao que o backend deve aceitar/devolver.
 * Mantém correspondência 1:1 com os exports editáveis de `siteConfig.ts`.
 */
export type SiteConfigPayload = {
  orgEmail: string;
  contactEmail: string;
  pixKey: string;
  orgName: string;
  orgFullName: string;
  orgDescription: string;
  orgCnpj: string;
  contactPhone: string;
  contactAddress: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  /** Extensível: hoje só `instagram`; novas chaves podem ser adicionadas no tipo e no formulário. */
  socialMedia: {
    instagram: string;
  };
  /** Nomes de ficheiro em `src/assets/` (como em `IMAGES` do siteConfig). */
  images: {
    logo: string;
    banner: string;
    about: string;
    cause: string;
  };
  /** Caminho público do favicon (ex.: `/Logo.ico`). */
  faviconPath: string;
  /** Projetos exibidos na seção "Projetos Futuros". */
  projects: Project[];
};

/**
 * Valores iniciais do formulário a partir do código em `siteConfig.ts`.
 * Se adicionares campos ao siteConfig, atualiza também `SiteConfigPayload` e esta função.
 */
export function defaultsFromSiteConfig(): SiteConfigPayload {
  return {
    orgEmail: ORG_EMAIL,
    contactEmail: CONTACT_EMAIL,
    pixKey: PIX_KEY,
    orgName: ORG_NAME,
    orgFullName: ORG_FULL_NAME,
    orgDescription: ORG_DESCRIPTION,
    orgCnpj: ORG_CNPJ,
    contactPhone: CONTACT_PHONE,
    contactAddress: {
      street: CONTACT_ADDRESS.street,
      neighborhood: CONTACT_ADDRESS.neighborhood,
      city: CONTACT_ADDRESS.city,
      state: CONTACT_ADDRESS.state,
    },
    socialMedia: {
      instagram: SOCIAL_MEDIA.instagram,
    },
    images: {
      logo: IMAGES.logo,
      banner: IMAGES.banner,
      about: IMAGES.about,
      cause: IMAGES.cause,
    },
    faviconPath: FAVICON_PATH,
    projects: DEFAULT_PROJECTS.map((p) => ({ ...p })),
  };
}
