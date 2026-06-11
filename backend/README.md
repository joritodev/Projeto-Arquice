# Arquice — Backend API

API REST em Node.js/Express para autenticação, configuração do site, upload de imagens e (futuro) pagamentos PIX.

## Configuração

```bash
cd backend
cp .env.example .env
npm install
npm run dev   # desenvolvimento (nodemon)
npm start     # produção
```

Servidor por defeito: `http://localhost:3000`

## Variáveis de ambiente

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `MONGODB_URI` | Sim | Connection string MongoDB (`mongodb+srv://...`) |
| `JWT_SECRET` | Sim | Segredo para access tokens (expira em 15 min) |
| `JWT_REFRESH_SECRET` | Sim | Segredo para refresh tokens (expira em 7 dias) |
| `EMAIL_HOST` | Para email | Host SMTP |
| `EMAIL_PORT` | Para email | Porta SMTP |
| `EMAIL_USER` | Para email | Utilizador SMTP |
| `EMAIL_PASS` | Para email | Senha SMTP |
| `MERCADO_PAGO_ACCESS_TOKEN` | Para PIX | Token Mercado Pago (rota comentada) |
| `PORT` | Não | Porta (default `3000`) |
| `API_BASE_URL` | Recomendado em prod | URL pública para links de upload |

### Windows + MongoDB Atlas

O `server.js` configura DNS (`8.8.8.8`, `1.1.1.1`) para resolver `mongodb+srv://` quando o DNS local falha.

## CORS

Origens permitidas (ver `server.js`):

- `http://localhost:5173`
- `http://127.0.0.1:5173`
- `https://projeto-arquice.vercel.app`
- Qualquer `https://*.vercel.app`

## Modelos de dados

### User (`models/User.js`)

| Campo | Tipo | Notas |
|-------|------|-------|
| `email` | string | Único, lowercase |
| `password` | string | Hash bcrypt |
| `role` | `user` \| `admin` | Default `user` |
| `refreshToken` | string \| null | Para refresh/logout |

### SiteConfig (`models/SiteConfig.js`)

Documento único com campos espelhados do frontend (`orgEmail`, `contactAddress`, `images`, etc.). Ver contrato em [`../src/admin/BACKEND_INTEGRATION.md`](../src/admin/BACKEND_INTEGRATION.md).

## Endpoints

Base: `/api`

### Autenticação — `/api/auth`

#### `POST /register`

Regista novo utilizador.

```json
// Request
{ "email": "user@example.com", "password": "min6chars" }

// Response 201
{ "message": "User registered" }
```

#### `POST /login`

```json
// Request
{ "email": "user@example.com", "password": "senha" }

// Response 200
{
  "accessToken": "eyJ...",
  "refreshToken": "eyJ...",
  "user": { "id": "...", "email": "...", "role": "user" }
}
```

#### `POST /forgot-password`

Envia email com link de reset (requer SMTP configurado).

```json
{ "email": "user@example.com" }
```

#### `POST /reset-password`

```json
{ "token": "jwt-do-email", "newPassword": "novasenha" }
```

#### `PUT /change-password` 🔒 JWT

```json
{ "currentPassword": "...", "newPassword": "..." }
```

#### `PUT /change-email` 🔒 JWT

```json
{ "newEmail": "novo@email.com", "password": "senha-atual" }
```

#### `POST /refresh-token`

```json
{ "refreshToken": "..." }
// Response: { "accessToken": "..." }
```

#### `POST /logout` 🔒 JWT

Invalida refresh token do utilizador.

---

### Configuração do site — `/api/site-config`

#### `GET /`

Público. Devolve configuração ou objeto vazio se ainda não existir documento.

```json
{
  "orgEmail": "",
  "contactEmail": "",
  "pixKey": "",
  "orgName": "",
  "orgFullName": "",
  "orgDescription": "",
  "orgCnpj": "",
  "contactPhone": "",
  "contactAddress": { "street": "", "neighborhood": "", "city": "", "state": "" },
  "socialMedia": { "instagram": "" },
  "images": { "logo": "", "banner": "", "about": "", "cause": "" },
  "faviconPath": ""
}
```

#### `PUT /` 🔒 JWT + admin

Cria ou actualiza configuração (`upsert`).

```json
// Headers
Authorization: Bearer <accessToken>
Content-Type: application/json

// Body: SiteConfigPayload (ver BACKEND_INTEGRATION.md)
```

#### `POST /upload` 🔒 JWT + admin

Upload múltiplo de imagens do site (logo, banner, etc.) via `multipart/form-data`.

---

### Upload geral — `/api/upload`

#### `POST /` 🔒 JWT + admin

Upload de imagem única.

```
Content-Type: multipart/form-data
Campo: image (ficheiro)

// Response 200
{ "imageUrl": "https://api.exemplo.com/uploads/123456-foto.jpg" }
```

Ficheiros guardados em `backend/uploads/` e servidos em `/uploads/:filename`.

---

### Pagamentos — `/api/payments` (desactivado)

Rota comentada em `server.js`. Implementação em `routes/payments.js` (Mercado Pago PIX).

## Middleware

| Ficheiro | Função |
|----------|--------|
| `middleware/auth.js` | Valida `Authorization: Bearer <token>` |
| `middleware/admin.js` | Exige `req.user.role === 'admin'` |

## Estrutura de ficheiros

```
backend/
├── server.js           # Entrada, CORS, MongoDB, rotas
├── routes/
│   ├── auth.js
│   ├── siteConfig.js
│   ├── upload.js
│   └── payments.js     # (não montado)
├── models/
│   ├── User.js
│   └── SiteConfig.js
├── middleware/
│   ├── auth.js
│   └── admin.js
└── uploads/            # Imagens enviadas (gitignored em prod)
```

## Testes rápidos (curl)

```bash
# Health / config
curl http://localhost:3000/api/site-config

# Registar
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'
```

## Deploy

Ver [`../docs/DEPLOYMENT.md`](../docs/DEPLOYMENT.md).
