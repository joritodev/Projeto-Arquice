/**
 * Base URL da API (sem barra final).
 * Definir em `.env` / Vercel: `VITE_ADMIN_API_BASE_URL=https://projeto-arquice.onrender.com`
 */
export function getApiBaseUrl(): string {
  const raw = import.meta.env.VITE_ADMIN_API_BASE_URL as string | undefined;
  return typeof raw === "string" ? raw.replace(/\/$/, "") : "";
}

export function apiUrl(path: string): string {
  const base = getApiBaseUrl();
  if (!base) {
    throw new Error(
      "API não configurada: defina VITE_ADMIN_API_BASE_URL (ver .env.example)."
    );
  }
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
