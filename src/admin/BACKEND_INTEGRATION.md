# Integração backend — painel de administração

Contrato entre o frontend (`/adm`) e a API Express. O site público ainda lê `src/config/siteConfig.ts` em build; o painel grava no MongoDB.

## Segurança

| Endpoint | Autenticação |
|----------|--------------|
| `GET /api/site-config` | Público |
| `PUT /api/site-config` | JWT + role `admin` |
| `POST /api/upload` | JWT + role `admin` |

A rota `/adm` é oculta (sem link no site), mas protegida no front por `ProtectedRoute` + JWT.

## Variável de ambiente (frontend)

| Variável | Descrição |
|----------|-----------|
| `VITE_ADMIN_API_BASE_URL` | URL base do servidor, **sem** barra final |

Copie `.env.example` → `.env` na raiz. Em produção (Vercel), defina na dashboard e faça redeploy.

### Sem `VITE_ADMIN_API_BASE_URL`

- **GET:** não chama rede; usa `siteConfig.ts`
- **PUT:** erro a pedir configuração da variável

## Endpoints

Constante: `SITE_CONFIG_API_PATH = "/api/site-config"`

| Método | URL | Auth | Resposta |
|--------|-----|------|----------|
| `GET` | `{base}/api/site-config` | — | `200` + JSON `SiteConfigPayload` ou objeto vazio |
| `PUT` | `{base}/api/site-config` | Bearer token | `200` + documento actualizado |
| `POST` | `{base}/api/upload` | Bearer token | `200` + `{ imageUrl }` |

### Login

`POST {base}/api/auth/login` devolve `accessToken` (não `token`). O front guarda em `localStorage` como `token`.

## Formato JSON (`SiteConfigPayload`)

Definido em [`siteConfigPayload.ts`](./siteConfigPayload.ts).

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `orgEmail` | string | Email que recebe formulários |
| `contactEmail` | string | Email público |
| `pixKey` | string | Payload EMV PIX |
| `orgName` | string | Nome curto |
| `orgFullName` | string | Nome completo |
| `orgDescription` | string | Descrição |
| `orgCnpj` | string | CNPJ |
| `contactPhone` | string | Telefone |
| `contactAddress` | object | `street`, `neighborhood`, `city`, `state` |
| `socialMedia` | object | `instagram` |
| `images` | object | `logo`, `banner`, `about`, `cause` |
| `faviconPath` | string | Ex.: `/Logo.ico` |

### Exemplo

```json
{
  "orgEmail": "org@example.com",
  "contactEmail": "contact@example.com",
  "pixKey": "00020126...",
  "orgName": "Arquice",
  "orgFullName": "Associação Remanescente Quilombola...",
  "orgDescription": "Organização comprometida...",
  "orgCnpj": "33.018.533/0001-50",
  "contactPhone": "(88) 99603-1103",
  "contactAddress": {
    "street": "Comunidade...",
    "neighborhood": "Zona Rural",
    "city": "Morrinhos",
    "state": "CE"
  },
  "socialMedia": {
    "instagram": "https://www.instagram.com/arquice_/"
  },
  "images": {
    "logo": "Logo.png",
    "banner": "BannerPicture.jpg",
    "about": "AboutPicture.jpg",
    "cause": "SocialCausePicture.jpg"
  },
  "faviconPath": "/Logo.ico"
}
```

## Comportamento do GET no frontend

Em [`siteConfigAdminApi.ts`](./siteConfigAdminApi.ts):

1. Se a API devolver `null` ou objeto com **todos** os campos vazios → usa `defaultsFromSiteConfig()` (`siteConfig.ts`)
2. Se existir configuração gravada → usa dados do servidor
3. Evita que o formulário fique em branco antes do primeiro Guardar

## CORS

O backend permite `localhost:5173`, `127.0.0.1:5173`, `projeto-arquice.vercel.app` e `*.vercel.app`.

## Ficheiros relacionados

| Ficheiro | Função |
|----------|--------|
| `siteConfigAdminApi.ts` | Pedidos GET/PUT |
| `siteConfigPayload.ts` | Tipos e defaults |
| `constants.ts` | `/adm` e `/api/site-config` |
| `../lib/api.ts` | `getApiBaseUrl()`, `apiUrl()` |
| `../pages/AdminSiteConfigPage.tsx` | UI do painel |

## Documentação geral

- [README do projeto](../../README.md)
- [API backend](../../backend/README.md)
- [Guia do painel](../../docs/ADMIN.md)
- [Deploy](../../docs/DEPLOYMENT.md)
