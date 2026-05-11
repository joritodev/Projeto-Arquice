# Integração backend — configuração do site (admin)

Este documento descreve o contrato JSON que o frontend da rota de administração espera do backend. O ficheiro espelhado no código estático é [`src/config/siteConfig.ts`](../config/siteConfig.ts); **hoje o site público ainda lê só esse ficheiro**. Quando o backend estiver pronto, pode passar a ser a fonte de verdade e o site público pode ser alterado noutra tarefa para consumir a API.

## Segurança

- A rota admin é **oculta** (não há link no site), mas **isso não é autenticação**.
- Recomenda-se proteger `GET`/`PUT` com login, API key ou JWT e enviar `Authorization: Bearer <token>` nos pedidos (o front pode ser estendido para incluir o header quando existir fluxo de login).

## Variável de ambiente (frontend)

| Variável | Descrição |
|----------|-----------|
| `VITE_ADMIN_API_BASE_URL` | URL base do servidor, **sem** barra final (ex.: `http://localhost:3000`). |

Copie `.env.example` para `.env` na raiz do projeto Vite e preencha o valor.

### Comportamento sem `VITE_ADMIN_API_BASE_URL`

- **GET (carregar):** o front não chama rede; preenche o formulário com os valores de `siteConfig.ts` (build local).
- **PUT (guardar):** o front mostra erro a pedir para configurar a variável — não há para onde enviar os dados.

## Endpoints sugeridos

Constante no front: `SITE_CONFIG_API_PATH = "/api/site-config"` (ver [`constants.ts`](./constants.ts)).

| Método | Caminho completo | Corpo | Resposta |
|--------|------------------|-------|----------|
| `GET` | `{VITE_ADMIN_API_BASE_URL}/api/site-config` | — | `200` + JSON no formato abaixo |
| `PUT` | `{VITE_ADMIN_API_BASE_URL}/api/site-config` | JSON no formato abaixo | `200` (opcional: JSON atualizado) ou `204` |

**Headers:**

- `Content-Type: application/json` no `PUT`.
- `Accept: application/json` em ambos.
- Quando houver auth: `Authorization: Bearer <token>`.

## Formato JSON (`SiteConfigPayload`)

Todas as chaves em **camelCase** (igual ao TypeScript em [`siteConfigPayload.ts`](./siteConfigPayload.ts)).

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `orgEmail` | string | Email que recebe formulários (ex.: voluntários). |
| `contactEmail` | string | Email público (rodapé, privacidade). |
| `pixKey` | string | Payload EMV da chave PIX. |
| `orgName` | string | Nome curto da organização. |
| `orgFullName` | string | Nome completo. |
| `orgDescription` | string | Descrição curta. |
| `orgCnpj` | string | CNPJ formatado ou não. |
| `contactPhone` | string | Telefone de contacto. |
| `contactAddress` | object | Ver tabela abaixo. |
| `socialMedia` | object | Ver tabela abaixo. |
| `images` | object | Nomes de ficheiro em `src/assets/`. |
| `faviconPath` | string | Caminho público (ex.: `/Logo.ico`). |

### `contactAddress`

| Campo | Tipo |
|-------|------|
| `street` | string |
| `neighborhood` | string |
| `city` | string |
| `state` | string |

### `socialMedia`

| Campo | Tipo | Notas |
|-------|------|--------|
| `instagram` | string | URL completa ou `"#"` se não existir. |

### `images`

| Campo | Tipo |
|-------|------|
| `logo` | string |
| `banner` | string |
| `about` | string |
| `cause` | string |

## Exemplo de corpo (GET resposta ou PUT pedido)

```json
{
  "orgEmail": "org@example.com",
  "contactEmail": "contact@example.com",
  "pixKey": "00020126...",
  "orgName": "Arquice",
  "orgFullName": "Associação ...",
  "orgDescription": "Organização comprometida ...",
  "orgCnpj": "33.018.533/0001-50",
  "contactPhone": "(88) 99603-1103",
  "contactAddress": {
    "street": "Comunidade ...",
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

## Validação no servidor

O front valida formato básico de email e campos obrigatórios não vazios. O backend deve validar de novo (tamanhos máximos, formato CNPJ/telefone, sanitização, etc.) e responder **422** com mensagens de erro por campo, se possível (o front hoje mostra o corpo textual da resposta no toast).

## CORS (desenvolvimento)

Com Vite em `http://localhost:5173` (ou outra porta), o browser fará pedidos **cross-origin** para a API. O servidor deve enviar cabeçalhos CORS adequados, por exemplo:

- `Access-Control-Allow-Origin: http://localhost:5173` (ou `*` em dev, com cuidado)
- `Access-Control-Allow-Methods: GET, PUT, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, Authorization`

## Implementação no front

- Pedidos: [`siteConfigAdminApi.ts`](./siteConfigAdminApi.ts)
- Tipos e defaults a partir do código: [`siteConfigPayload.ts`](./siteConfigPayload.ts)
- Rota da UI: constante `ADMIN_SITE_CONFIG_PATH` (por defeito `/adm`) em [`constants.ts`](./constants.ts)

## Equivalência snake_case (opcional)

Se o backend usar `snake_case`, pode fazer a conversão no servidor **ou** estender `siteConfigAdminApi.ts` para mapear antes do `fetch`. Tabela rápida:

| camelCase (front) | snake_case |
|-------------------|------------|
| `orgEmail` | `org_email` |
| `contactEmail` | `contact_email` |
| `pixKey` | `pix_key` |
| `orgName` | `org_name` |
| `orgFullName` | `org_full_name` |
| `orgDescription` | `org_description` |
| `orgCnpj` | `org_cnpj` |
| `contactPhone` | `contact_phone` |
| `contactAddress` | `contact_address` |
| `socialMedia` | `social_media` |
| `faviconPath` | `favicon_path` |

(Objetos aninhados: `contact_address.street`, etc.)
