# Deploy — Vercel + Render + MongoDB Atlas

Este guia descreve como publicar o Projeto Arquice em produção.

## Arquitetura de produção

```
Utilizador → projeto-arquice.vercel.app (frontend)
                    ↓
         projeto-arquice.onrender.com (backend)
                    ↓
              MongoDB Atlas (dados)
```

## 1. MongoDB Atlas

1. Crie um cluster gratuito em [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Em **Database Access**, crie um utilizador com senha.
3. Em **Network Access**, permita `0.0.0.0/0` (ou IPs específicos do Render).
4. Copie a connection string (`mongodb+srv://...`) para `MONGODB_URI`.

## 2. Backend no Render

1. Crie um **Web Service** ligado ao repositório Git.
2. **Root Directory:** `backend`
3. **Build Command:** `npm install`
4. **Start Command:** `npm start`
5. Defina as variáveis de ambiente:

| Variável | Valor |
|----------|-------|
| `MONGODB_URI` | Connection string do Atlas |
| `JWT_SECRET` | String aleatória longa |
| `JWT_REFRESH_SECRET` | Outra string aleatória |
| `EMAIL_HOST` | `smtp.gmail.com` |
| `EMAIL_PORT` | `587` |
| `EMAIL_USER` | Email SMTP |
| `EMAIL_PASS` | Senha de app Gmail |
| `PORT` | `3000` (Render define automaticamente) |
| `API_BASE_URL` | `https://SEU-SERVICO.onrender.com` |

6. Após deploy, teste:

```bash
curl https://SEU-SERVICO.onrender.com/api/site-config
```

Deve retornar JSON (objeto vazio ou configuração existente).

### CORS

O backend aceita pedidos de:

- `http://localhost:5173` e `http://127.0.0.1:5173` (dev)
- `https://projeto-arquice.vercel.app`
- Qualquer subdomínio `*.vercel.app` (previews)

Para outro domínio customizado, adicione a origem em `backend/server.js`.

### Cold start (plano gratuito)

O Render suspende serviços inactivos. O primeiro pedido pode demorar ~30–60 s. É comportamento normal do plano free.

## 3. Frontend na Vercel

1. Importe o repositório em [vercel.com](https://vercel.com).
2. **Framework Preset:** Vite
3. **Root Directory:** `.` (raiz)
4. **Build Command:** `npm run build`
5. **Output Directory:** `dist`
6. Em **Environment Variables**, adicione:

| Variável | Valor | Ambientes |
|----------|-------|-----------|
| `VITE_ADMIN_API_BASE_URL` | `https://SEU-SERVICO.onrender.com` | Production, Preview, Development |

> Variáveis `VITE_*` são embutidas no build. O ficheiro `.env` local **não** é enviado para a Vercel.

7. Faça deploy. O ficheiro `vercel.json` já configura rewrites SPA.

### Redeploy obrigatório

Sempre que alterar `VITE_ADMIN_API_BASE_URL` na Vercel, é necessário **novo deploy** para o valor entrar no JavaScript compilado.

## 4. Criar admin em produção

```bash
curl -X POST https://SEU-SERVICO.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@arquice.org","password":"SUA_SENHA"}'
```

No MongoDB Atlas, edite o documento do utilizador e defina `role: "admin"`.

## 5. Primeira configuração do site

1. Aceda a `https://SEU-SITE.vercel.app/login`
2. Faça login
3. Em `/adm`, reveja os dados (vêm de `siteConfig.ts` até ao primeiro guardar)
4. Clique **Guardar** para persistir no MongoDB
5. Use **Recarregar do servidor** para confirmar

## Checklist pós-deploy

- [ ] `GET /api/site-config` responde 200 no Render
- [ ] `POST /api/auth/login` funciona no Postman
- [ ] Login funciona no site Vercel (mesmo URL da API)
- [ ] Painel `/adm` carrega e guarda dados
- [ ] Upload de imagens devolve URL com domínio Render (não `localhost`)
- [ ] Email de recuperação de senha configurado (SMTP)

## Ambientes de desenvolvimento vs produção

| | Desenvolvimento | Produção |
|--|-----------------|----------|
| Frontend | `http://localhost:5173` | `https://*.vercel.app` |
| Backend | `http://localhost:3000` | `https://*.onrender.com` |
| `.env` front | `VITE_ADMIN_API_BASE_URL=http://localhost:3000` | Definido na Vercel |
| Base de dados | Pode ser Atlas ou local | MongoDB Atlas |

**Regra:** o URL em `VITE_ADMIN_API_BASE_URL` deve ser o mesmo que usa no Postman para testar a API.
