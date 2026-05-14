# Arquice Backend

Backend para o projeto Arquice, com autenticação, integração de email e Pix.

## Configuração

1. Instale as dependências: `npm install`
2. Configure o `.env` com suas chaves.
3. Inicie o MongoDB localmente ou use uma URI remota.
4. Execute `npm run dev` para desenvolvimento.

## APIs

- **Auth**: `/api/auth/register`, `/api/auth/login`, `/api/auth/forgot-password`, `/api/auth/reset-password`
- **Site Config**: `/api/site-config` (GET/PUT, protegido)
- **Payments**: `/api/payments/pix` (POST para criar pagamento Pix)

## Integrações

- **Email**: Usando Nodemailer com SMTP.
- **Pix**: Usando Mercado Pago SDK.
- **DB**: MongoDB com Mongoose.