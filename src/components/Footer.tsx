import { Heart, Facebook, Instagram, Linkedin, Youtube, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground" role="contentinfo">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo e Descrição */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="h-8 w-8 fill-current" aria-hidden="true" />
              <span className="text-xl">OSC Transformando Vidas</span>
            </div>
            <p className="opacity-90 mb-4">
              Organização comprometida com a transformação social através da educação, 
              inclusão e desenvolvimento humano.
            </p>
            <div className="flex gap-3">
              <a 
                href="#facebook" 
                className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </a>
              <a 
                href="#instagram" 
                className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
              <a 
                href="#linkedin" 
                className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </a>
              <a 
                href="#youtube" 
                className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#sobre" className="opacity-90 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring rounded">
                  Quem Somos
                </a>
              </li>
              <li>
                <a href="#projetos" className="opacity-90 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring rounded">
                  Projetos
                </a>
              </li>
              <li>
                <a href="#doacoes" className="opacity-90 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring rounded">
                  Como Doar
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="mb-4">Contato</h3>
            <ul className="space-y-3 opacity-90">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span className="text-sm">
                  Rua da Solidariedade, 123<br />
                  Centro, São Paulo - SP
                </span>
              </li>
              <li>
                <a 
                  href="tel:+551133334444" 
                  className="flex items-center gap-2 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring rounded"
                >
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  <span className="text-sm">(11) 3333-4444</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:contato@osc.org.br" 
                  className="flex items-center gap-2 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring rounded"
                >
                  <Mail className="h-5 w-5" aria-hidden="true" />
                  <span className="text-sm">contato@osc.org.br</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center">
          <p className="text-sm opacity-90">
            © {currentYear} OSC Transformando Vidas. Todos os direitos reservados.
          </p>
          <p className="text-sm opacity-75 mt-2">
            CNPJ: 00.000.000/0001-00 | Utilidade Pública Municipal
          </p>
        </div>
      </div>
    </footer>
  );
}
