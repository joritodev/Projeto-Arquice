# Site institucional — Arquice (OSC)

Site em React (Vite + TypeScript) para a **Arquice** — associação comunitária de moradores remanescentes quilombolas (organização da sociedade civil, OSC), com foco em transformação social por meio de educação, inclusão e desenvolvimento humano. Este repositório contém o **front-end** público e a área de administração de conteúdos configuráveis.

## Personalizar textos, contatos e imagens

O ponto central de personalização continua sendo o ficheiro:

**[`src/config/siteConfig.ts`](src/config/siteConfig.ts)**

Aí estão emails, chave PIX, dados da organização (nome, CNPJ, descrição), contato, redes sociais, nomes dos ficheiros de imagem e caminho do favicon.

Para um passo a passo mais longo, use o guia na raiz do projeto:

**[`GUIA_CONFIGURACAO.md`](GUIA_CONFIGURACAO.md)**

### Início rápido

1. Abra `src/config/siteConfig.ts`.
2. Localize a secção desejada (por exemplo com a pesquisa do editor).
3. Altere os valores entre aspas e guarde o ficheiro.

### O que pode configurar em `siteConfig.ts`

- Emails (formulários e contato público)
- Chave PIX (doações)
- Informações institucionais da OSC
- Telefone e endereço
- Redes sociais
- Nomes dos ficheiros das imagens usadas no site

### Imagens

Os ficheiros gráficos ficam em **`src/assets/`**. Para substituir uma imagem: coloque o novo ficheiro nessa pasta, use o mesmo nome **ou** atualize o nome correspondente na secção `IMAGES` de `siteConfig.ts`.

## Desenvolvimento local

Na raiz do projeto:

```bash
npm install
npm run dev
```

Compilação de produção:

```bash
npm run build
```

## Administração (edição via API, futuro backend)

Existe uma rota de administração **sem link no site público** (acesso direto pelo URL), pensada para editar os mesmos dados modelados em `siteConfig.ts` quando existir API. Detalhes para quem implementa o backend:

**[`src/admin/BACKEND_INTEGRATION.md`](src/admin/BACKEND_INTEGRATION.md)**

Variáveis de ambiente: ver **[`.env.example`](.env.example)**.

---

Em caso de dúvida sobre configuração, consulte primeiro o **`GUIA_CONFIGURACAO.md`**.
