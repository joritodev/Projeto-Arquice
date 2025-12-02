import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { useScrollToSection } from "../hooks/useScrollToSection";
import {
  ORG_NAME,
  ORG_DESCRIPTION,
  ORG_CNPJ,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_ADDRESS,
  SOCIAL_MEDIA,
} from "../config/siteConfig";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { scrollToSection } = useScrollToSection();

  const handleHashClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string
  ) => {
    e.preventDefault();
    scrollToSection(hash);
  };

  return (
    <footer className="bg-primary text-primary-foreground" role="contentinfo">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo e Descrição */}
          <div className="md:col-span-2">
            <span className="text-xl">{ORG_NAME}</span>
            <br />
            <p className="opacity-90 mb-4">{ORG_DESCRIPTION}</p>
            <div className="flex gap-3">
              <a
                href={SOCIAL_MEDIA.instagram}
                className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Instagram"
                target={
                  SOCIAL_MEDIA.instagram.startsWith("http")
                    ? "_blank"
                    : undefined
                }
                rel={
                  SOCIAL_MEDIA.instagram.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#sobre"
                  onClick={(e) => handleHashClick(e, "#sobre")}
                  className="opacity-90 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring rounded"
                >
                  Quem Somos
                </a>
              </li>
              <li>
                <a
                  href="#projetos"
                  onClick={(e) => handleHashClick(e, "#projetos")}
                  className="opacity-90 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring rounded"
                >
                  Projetos
                </a>
              </li>
              <li>
                <a
                  href="#doacoes"
                  onClick={(e) => handleHashClick(e, "#doacoes")}
                  className="opacity-90 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring rounded"
                >
                  Como Doar
                </a>
              </li>
              <li>
                <Link
                  to="/privacidade"
                  className="opacity-90 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring rounded"
                >
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="mb-4">Contato</h3>
            <ul className="space-y-3 opacity-90">
              <li className="flex items-start gap-3">
                <MapPin
                  className="h-5 w-5 mt-0.5 flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="text-sm leading-relaxed">
                  {CONTACT_ADDRESS.street}
                  <br />
                  {CONTACT_ADDRESS.neighborhood}, {CONTACT_ADDRESS.city} -{" "}
                  {CONTACT_ADDRESS.state}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_PHONE.replace(/\D/g, "")}`}
                  className="flex items-center gap-2 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring rounded"
                >
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  <span className="text-sm">{CONTACT_PHONE}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-2 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring rounded"
                >
                  <Mail className="h-5 w-5" aria-hidden="true" />
                  <span className="text-sm">{CONTACT_EMAIL}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center">
          <p className="text-sm opacity-90">
            © {currentYear} {ORG_NAME}. Todos os direitos reservados.
          </p>
          <p className="text-sm opacity-75 mt-2">
            CNPJ: {ORG_CNPJ} | Utilidade Pública Municipal
          </p>
          <p className="text-xs opacity-60 mt-2">
            <Link
              to="/privacidade"
              className="hover:opacity-100 transition-opacity underline"
            >
              Política de Privacidade
            </Link>
            {" | "}
            Conforme LGPD (Lei 13.709/2018)
          </p>
        </div>
      </div>
    </footer>
  );
}
