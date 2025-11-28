# Configuração do Email - Formulário de Voluntário

## ⚠️ ATENÇÃO: Arquivo de Configuração Mudou!

Agora **TODAS** as configurações do site estão em um único arquivo!

### 📁 Onde está o arquivo?
Abra o arquivo: `src/config/siteConfig.ts`

### 📖 Guia Completo
Para instruções detalhadas, veja o arquivo: **`GUIA_CONFIGURACAO.md`**

---

## Como Configurar o Email

É muito simples! Você só precisa alterar **UMA COISA**:

### Passo 1: Abrir o arquivo
Abra o arquivo: `src/config/siteConfig.ts`

### Passo 2: Encontrar a linha do email
Procure por: `ORG_EMAIL`

Você verá algo assim:
```typescript
export const ORG_EMAIL = "joaogamer602.br@gmail.com";
```

### Passo 3: Alterar o email
Substitua o email entre as aspas `""` pelo email real da organização.

**Exemplo:**
```typescript
export const ORG_EMAIL = "seuemail@gmail.com";
```

**IMPORTANTE:** Não apague as aspas `""` nem a palavra `export const`!

### Pronto! 🎉

Agora o formulário está configurado! Quando alguém se inscrever como voluntário:

1. ✅ A organização receberá um email com todas as informações
2. ✅ O voluntário receberá um email de agradecimento automático

## Como Funciona

- **Não precisa criar conta** em nenhum serviço
- **Não precisa configurar** nada complexo
- **Só precisa alterar o email** em um único lugar
- **É totalmente gratuito** e ilimitado

## Se Mudar de Email

Se a organização mudar de email no futuro, é só alterar a mesma linha novamente. Não precisa fazer mais nada!

## ⚠️ Importante - Ativação Inicial

### Primeira vez usando o formulário

Na **primeira vez** que o formulário for usado, você e o voluntário receberão um email do FormSubmit pedindo para ativar o recebimento de emails.

**O que fazer:**
1. Abra o email do FormSubmit
2. Clique no botão **"ACTIVATE FORM"**
3. Pronto! Após isso, você receberá normalmente todos os emails do formulário

**Importante:**
- Este processo acontece **apenas uma vez** por email
- É necessário ativar para receber os emails
- É uma medida de segurança automática do FormSubmit

### Para os voluntários

O email de agradecimento que enviamos aos voluntários já contém uma nota explicando sobre esse processo de ativação, para que eles saibam o que fazer.

## Observação

O serviço usado (FormSubmit) é gratuito e confiável. Funciona automaticamente sem necessidade de configuração adicional, exceto pela ativação inicial que é feita apenas uma vez.

