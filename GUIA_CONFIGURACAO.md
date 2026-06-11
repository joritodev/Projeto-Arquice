# 📖 GUIA DE CONFIGURAÇÃO DO SITE - ARQUICE

Este guia foi feito para pessoas que **não têm conhecimento técnico**. Siga os passos abaixo com calma! 😊

> **Alternativa:** se tiver acesso ao painel administrativo, pode editar o site em `/adm` sem alterar código. Ver [`docs/ADMIN.md`](docs/ADMIN.md).

---

## 📁 ONDE ESTÁ O ARQUIVO DE CONFIGURAÇÃO?

O arquivo que você precisa editar está em:
```
src/config/siteConfig.ts
```

**Como abrir:**
1. Abra a pasta do projeto no computador
2. Entre na pasta `src`
3. Entre na pasta `config`
4. Abra o arquivo `siteConfig.ts`

---

## ✏️ COMO EDITAR O ARQUIVO

### Passo 1: Abra o arquivo
- Clique duas vezes no arquivo `siteConfig.ts`
- Ele abrirá em um editor de texto (como Bloco de Notas ou Visual Studio Code)

### Passo 2: Encontre o que quer alterar
- Use `Ctrl + F` (ou `Cmd + F` no Mac) para procurar
- Digite o que você quer alterar (ex: "PIX", "email", "telefone")

### Passo 3: Altere o texto
- Procure o texto entre aspas `""`
- **IMPORTANTE:** Não apague as aspas `""`
- Substitua apenas o texto dentro das aspas

**Exemplo:**
```typescript
// ANTES:
export const CONTACT_EMAIL = "contato@arquice.org.br";

// DEPOIS (você altera só o que está entre as aspas):
export const CONTACT_EMAIL = "seuemail@gmail.com";
```

### Passo 4: Salve o arquivo
- Pressione `Ctrl + S` (ou `Cmd + S` no Mac)
- Ou clique em "Arquivo" → "Salvar"

---

## 📧 ALTERAR EMAILS

### Email para receber formulários de voluntários
Procure por: `ORG_EMAIL`

**O que fazer:**
- Coloque o email que vai receber as inscrições de voluntários
- Exemplo: `"arquice@gmail.com"`

### Email público de contato
Procure por: `CONTACT_EMAIL`

**O que fazer:**
- Coloque o email que aparece no rodapé do site
- Exemplo: `"contato@arquice.org.br"`

---

## 💰 ALTERAR CHAVE PIX

Procure por: `PIX_KEY`

**O que fazer:**
1. Copie sua chave PIX completa
2. Cole entre as aspas `""`
3. **CUIDADO:** Não apague nenhum caractere da chave PIX

**Exemplo:**
```typescript
export const PIX_KEY = "00020126580014BR.GOV.BCB.PIX013674dc9547...";
```

---

## 🏢 ALTERAR INFORMAÇÕES DA ORGANIZAÇÃO

### Nome da organização
Procure por: `ORG_NAME`

**O que fazer:**
- Coloque o nome que aparece no rodapé
- Exemplo: `"Arquice - Associação Quilombola"`

### Nome completo
Procure por: `ORG_FULL_NAME`

**O que fazer:**
- Coloque o nome completo legal da organização
- Exemplo: `"Associação Remanescente Quilombola de Curralinho Morrinhos"`

### Descrição
Procure por: `ORG_DESCRIPTION`

**O que fazer:**
- Escreva uma frase curta sobre a organização
- Exemplo: `"Organização comprometida com a transformação social..."`

### CNPJ
Procure por: `ORG_CNPJ`

**O que fazer:**
- Coloque o CNPJ no formato: `"00.000.000/0001-00"`

---

## 📞 ALTERAR CONTATO

### Telefone
Procure por: `CONTACT_PHONE`

**O que fazer:**
- Coloque o telefone no formato: `"(11) 3333-4444"`
- Ou: `"(11) 99999-9999"` (celular)

### Endereço
Procure por: `CONTACT_ADDRESS`

**O que fazer:**
- Altere cada parte do endereço:
  - `street`: Rua e número
  - `neighborhood`: Bairro
  - `city`: Cidade
  - `state`: Estado (sigla: SP, RJ, MG, etc.)

**Exemplo:**
```typescript
export const CONTACT_ADDRESS = {
  street: "Rua Principal, 123",
  neighborhood: "Centro",
  city: "Morrinhos",
  state: "CE"
};
```

---

## 🌐 ALTERAR REDES SOCIAIS

Procure por: `SOCIAL_MEDIA`

**O que fazer:**
- Se você **TEM** a rede social: coloque o link completo
- Se você **NÃO TEM**: deixe como `"#facebook"` (não vai aparecer link)

**Exemplo com redes sociais:**
```typescript
export const SOCIAL_MEDIA = {
  facebook: "https://www.facebook.com/arquice",
  instagram: "https://www.instagram.com/arquice",
  linkedin: "#linkedin",  // Se não tem, deixa assim
  youtube: "https://www.youtube.com/@arquice"
};
```

**Como pegar o link:**
1. Abra sua página no Facebook/Instagram/etc.
2. Copie o endereço que aparece na barra do navegador
3. Cole aqui

---

## 🖼️ ALTERAR IMAGENS

### Como trocar as fotos do site

**Passo 1: Prepare suas imagens**
- Logo: recomendado 200x150 pixels
- Banner (foto grande): recomendado 1200x600 pixels
- Fotos menores: recomendado 800x600 pixels

**Passo 2: Coloque as imagens na pasta**
1. Vá para a pasta: `src/assets/`
2. Coloque suas novas imagens lá
3. **IMPORTANTE:** Renomeie as imagens para os nomes abaixo:
   - Logo → `Logo.png` (ou `Logo.jpg`)
   - Banner → `BannerPicture.jpg`
   - Foto "Quem Somos" → `AboutPicture.jpg`
   - Foto "Nossa Causa" → `SocialCausePicture.jpg`

**Passo 3: Se você usou nomes diferentes**
- Abra o arquivo `siteConfig.ts`
- Procure por: `IMAGES`
- Altere os nomes das imagens para o nome que você usou

**Exemplo:**
```typescript
export const IMAGES = {
  logo: "MeuLogo.png",  // Se você renomeou para MeuLogo.png
  banner: "BannerPicture.jpg",
  about: "AboutPicture.jpg",
  cause: "SocialCausePicture.jpg"
};
```

---

## ⚠️ DICAS IMPORTANTES

### ✅ FAÇA:
- Sempre salve o arquivo após fazer alterações
- Teste o site após alterar algo
- Faça backup do arquivo antes de alterar (copie e cole em outro lugar)

### ❌ NÃO FAÇA:
- Não apague as aspas `""`
- Não apague vírgulas `,`
- Não apague pontos e vírgulas `;`
- Não altere palavras como `export const` ou `=`
- Não apague ou altere a estrutura do arquivo

### 🆘 SE DER ERRO:
1. Feche o arquivo sem salvar
2. Abra novamente
3. Tente de novo com mais cuidado
4. Se precisar, peça ajuda para alguém que entende de computador

---

## 📋 CHECKLIST DE CONFIGURAÇÃO

Marque o que você já configurou:

- [ ] Email para receber formulários (`ORG_EMAIL`)
- [ ] Email público de contato (`CONTACT_EMAIL`)
- [ ] Chave PIX (`PIX_KEY`)
- [ ] Nome da organização (`ORG_NAME`)
- [ ] Nome completo (`ORG_FULL_NAME`)
- [ ] Descrição (`ORG_DESCRIPTION`)
- [ ] CNPJ (`ORG_CNPJ`)
- [ ] Telefone (`CONTACT_PHONE`)
- [ ] Endereço (`CONTACT_ADDRESS`)
- [ ] Redes sociais (`SOCIAL_MEDIA`)
- [ ] Imagens (Logo, Banner, etc.)

---

## 🎉 PRONTO!

Depois de fazer todas as alterações:
1. Salve o arquivo (`Ctrl + S`)
2. Teste o site
3. Verifique se tudo está aparecendo corretamente

**Lembre-se:** Se você mudar algo no futuro (como email ou telefone), é só abrir este mesmo arquivo e alterar! 😊

---

## 📞 PRECISA DE AJUDA?

Se tiver dúvidas ou precisar de ajuda, procure alguém que entenda de computador ou programação para te ajudar a editar o arquivo.

