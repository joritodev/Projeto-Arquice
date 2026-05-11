import { SITE_CONFIG_API_PATH } from "./constants";
import { defaultsFromSiteConfig, type SiteConfigPayload } from "./siteConfigPayload";

/**
 * Base URL da API de administração (sem barra final).
 * Definir em `.env`: `VITE_ADMIN_API_BASE_URL=http://localhost:3000`
 */
export function getAdminApiBaseUrl(): string {
  const raw = import.meta.env.VITE_ADMIN_API_BASE_URL as string | undefined;
  return typeof raw === "string" ? raw.replace(/\/$/, "") : "";
}

function assertApiConfigured(): string {
  const base = getAdminApiBaseUrl();
  if (!base) {
    throw new Error(
      "API não configurada: defina VITE_ADMIN_API_BASE_URL no ficheiro .env (ver .env.example e BACKEND_INTEGRATION.md)."
    );
  }
  return base + SITE_CONFIG_API_PATH;
}

/**
 * Valida e normaliza JSON devolvido pelo servidor para `SiteConfigPayload`.
 * Lança se faltar chave obrigatória.
 */
export function parseSiteConfigResponse(data: unknown): SiteConfigPayload {
  if (!data || typeof data !== "object") {
    throw new Error("Resposta inválida: esperado um objeto JSON.");
  }
  const o = data as Record<string, unknown>;
  const addr = o.contactAddress;
  if (!addr || typeof addr !== "object") {
    throw new Error("Resposta inválida: contactAddress em falta.");
  }
  const a = addr as Record<string, unknown>;
  const social = o.socialMedia;
  if (!social || typeof social !== "object") {
    throw new Error("Resposta inválida: socialMedia em falta.");
  }
  const s = social as Record<string, unknown>;
  const images = o.images;
  if (!images || typeof images !== "object") {
    throw new Error("Resposta inválida: images em falta.");
  }
  const im = images as Record<string, unknown>;

  return {
    orgEmail: String(o.orgEmail ?? ""),
    contactEmail: String(o.contactEmail ?? ""),
    pixKey: String(o.pixKey ?? ""),
    orgName: String(o.orgName ?? ""),
    orgFullName: String(o.orgFullName ?? ""),
    orgDescription: String(o.orgDescription ?? ""),
    orgCnpj: String(o.orgCnpj ?? ""),
    contactPhone: String(o.contactPhone ?? ""),
    contactAddress: {
      street: String(a.street ?? ""),
      neighborhood: String(a.neighborhood ?? ""),
      city: String(a.city ?? ""),
      state: String(a.state ?? ""),
    },
    socialMedia: {
      instagram: String(s.instagram ?? ""),
    },
    images: {
      logo: String(im.logo ?? ""),
      banner: String(im.banner ?? ""),
      about: String(im.about ?? ""),
      cause: String(im.cause ?? ""),
    },
    faviconPath: String(o.faviconPath ?? ""),
  };
}

/**
 * Obtém a configuração do site a partir do backend.
 *
 * - **Método:** `GET`
 * - **URL:** `{VITE_ADMIN_API_BASE_URL}{SITE_CONFIG_API_PATH}` (ex.: `GET /api/site-config`)
 * - **Corpo:** nenhum
 * - **Resposta esperada:** `200` com `Content-Type: application/json` e corpo no formato {@link SiteConfigPayload}
 * - **Erros comuns:** `401` (não autorizado), `404` (endpoint inexistente), rede/CORS
 *
 * Se `VITE_ADMIN_API_BASE_URL` estiver vazio, **não** chama rede: devolve os valores de
 * `siteConfig.ts` via {@link defaultsFromSiteConfig} (útil para desenvolver só o formulário).
 */
export async function getSiteConfig(): Promise<SiteConfigPayload> {
  const base = getAdminApiBaseUrl();
  if (!base) {
    if (import.meta.env.DEV) {
      console.warn(
        "[admin] VITE_ADMIN_API_BASE_URL não definido — a usar valores de siteConfig.ts (build local)."
      );
    }
    return defaultsFromSiteConfig();
  }

  const url = base + SITE_CONFIG_API_PATH;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`GET falhou (${res.status}): ${text || res.statusText}`);
  }

  const json: unknown = await res.json();
  return parseSiteConfigResponse(json);
}

/**
 * Grava a configuração do site no backend.
 *
 * - **Método:** `PUT`
 * - **URL:** mesma que em {@link getSiteConfig}
 * - **Corpo:** JSON {@link SiteConfigPayload}
 * - **Headers:** `Content-Type: application/json`; quando existir auth, enviar também `Authorization: Bearer <token>`
 * - **Resposta esperada:** `200` ou `204`; se `200` com JSON, pode devolver o objeto atualizado no mesmo formato
 * - **Erros comuns:** `401`, `422` (validação), `415` (tipo inválido)
 *
 * Exige `VITE_ADMIN_API_BASE_URL` definido; caso contrário lança erro (guardar sem API não tem efeito no site público).
 */
export async function saveSiteConfig(payload: SiteConfigPayload): Promise<void> {
  const url = assertApiConfigured();

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`PUT falhou (${res.status}): ${text || res.statusText}`);
  }
}
