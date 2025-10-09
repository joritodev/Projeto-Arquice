import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/arquice-logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-primary text-secondary-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src={logo} alt="ARQUICE" className="h-12 w-12 object-contain" />
              <span className="text-2xl font-heading font-bold">ARQUICE</span>
            </div>
            <p className="text-secondary-foreground/80 mb-4">
              Associação de Resgate, Qualificação e Inclusão Social em Curralinho e Entorno.
              Transformando vidas através da educação e capacitação.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/quem-somos" className="hover:text-secondary transition-colors">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link to="/projetos" className="hover:text-secondary transition-colors">
                  Projetos
                </Link>
              </li>
              <li>
                <Link to="/como-ajudar" className="hover:text-secondary transition-colors">
                  Como Ajudar
                </Link>
              </li>
              <li>
                <Link to="/noticias" className="hover:text-secondary transition-colors">
                  Notícias
                </Link>
              </li>
              <li>
                <Link to="/contato" className="hover:text-secondary transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <span className="text-sm">Curralinho, Pará, Brasil</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={20} className="flex-shrink-0" />
                <span className="text-sm">(91) 99999-9999</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={20} className="flex-shrink-0" />
                <span className="text-sm">contato@arquice.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-sm text-secondary-foreground/60">
          <p>
            © {new Date().getFullYear()} ARQUICE - Todos os direitos reservados. CNPJ: 00.000.000/0000-00
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
