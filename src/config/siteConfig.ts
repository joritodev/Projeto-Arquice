/**
 * ═══════════════════════════════════════════════════════════
 * CONFIGURAÇÃO DO SITE - ARQUICE
 * ═══════════════════════════════════════════════════════════
 * 
 * Este arquivo contém TODAS as informações que você precisa
 * alterar para personalizar o site.
 * 
 * INSTRUÇÕES SIMPLES:
 * 1. Abra este arquivo
 * 2. Procure a seção que você quer alterar
 * 3. Substitua o texto entre as aspas ""
 * 4. Salve o arquivo
 * 
 * ═══════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════
// 📧 EMAILS
// ═══════════════════════════════════════════════════════════

// Email para receber os formulários de voluntários
// Este email receberá as informações quando alguém se inscrever
export const ORG_EMAIL = "solangemarialima871@gmail.com";

// Email público para contato (aparece no rodapé e política de privacidade)
export const CONTACT_EMAIL = "solangemarialima871@gmail.com";

// ═══════════════════════════════════════════════════════════
// 💰 PIX - DOAÇÕES
// ═══════════════════════════════════════════════════════════

// Chave PIX para receber doações
// Cole aqui o código do QR Code da sua chave PIX
export const PIX_KEY = "00020126580014BR.GOV.BCB.PIX013674dc9547-d94c-4d52-a48f-24d0dbb089535204000053039865802BR5922RAIMUNDO FABIO SECUNDO6009MORRINHOS62070503***6304593A";

// ═══════════════════════════════════════════════════════════
// 🏢 INFORMAÇÕES DA ORGANIZAÇÃO
// ═══════════════════════════════════════════════════════════

// Nome da organização (aparece no rodapé)
export const ORG_NAME = "Arquice";

// Nome completo da organização (aparece em emails)
export const ORG_FULL_NAME = "Associação Comunitária de Moradores Remanescentes Quilombolas de Curralinhos Morrinhos";

// Descrição curta da organização (aparece no rodapé)
export const ORG_DESCRIPTION = "Organização comprometida com a transformação social através da educação, inclusão e desenvolvimento humano.";

// CNPJ da organização
export const ORG_CNPJ = "33.018.533/0001-50";

// ═══════════════════════════════════════════════════════════
// 📞 CONTATO
// ═══════════════════════════════════════════════════════════

// Telefone para contato (formato: (00) 00000-0000)
export const CONTACT_PHONE = "(88) 99603-1103";

// Endereço completo
export const CONTACT_ADDRESS = {
  street: "Comunidade Negra Quilombola de Curralinho Morrinhos",
  neighborhood: "Zona Rural",
  city: "Morrinhos",
  state: "CE"
};

// ═══════════════════════════════════════════════════════════
// 🌐 REDES SOCIAIS
// ═══════════════════════════════════════════════════════════
// 
// IMPORTANTE: 
// - Se você NÃO tem uma rede social, deixe o link como "#"
// - Se você TEM, coloque o link completo (ex: https://www.facebook.com/suaorganizacao)
// - Exemplo: export const FACEBOOK_URL = "https://www.facebook.com/arquice";

export const SOCIAL_MEDIA = {
  facebook: "#facebook",
  instagram: "https://www.instagram.com/arquice_/",
};

// ═══════════════════════════════════════════════════════════
// 🖼️ IMAGENS
// ═══════════════════════════════════════════════════════════
// 
// Para trocar as imagens:
// 1. Coloque suas novas imagens na pasta: src/assets/
// 2. Renomeie as imagens para os nomes abaixo OU
// 3. Altere os nomes abaixo para o nome da sua imagem
// 
// Tamanhos recomendados:
// - Logo: 200x150 pixels (ou proporção similar)
// - Banner: 1200x600 pixels (ou proporção similar)
// - About e Cause: 800x600 pixels (ou proporção similar)

export const IMAGES = {
  logo: "Logo.png",
  banner: "BannerPicture.jpg",
  about: "AboutPicture.jpg",
  cause: "SocialCausePicture.jpg"
};

