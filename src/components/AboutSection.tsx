import { Card, CardContent } from "./ui/card";
import { Award, Eye, Target, Users } from "lucide-react";
import { IMAGES } from "../config/siteConfig";
import { getImagePath } from "../utils/imageLoader";

const AboutPicture = getImagePath(IMAGES.about);

export function AboutSection() {
  const values = [
    {
      icon: Heart,
      title: "Compromisso Social",
      description: "Dedicação total à transformação de vidas",
    },
    {
      icon: Award,
      title: "Transparência",
      description: "Prestação de contas clara e acessível",
    },
    {
      icon: Users,
      title: "Inclusão",
      description: "Respeito à diversidade e dignidade humana",
    },
    {
      icon: Target,
      title: "Eficiência",
      description: "Resultados concretos e mensuráveis",
    },
  ];

  return (
    <section
      id="sobre"
      className="py-20 bg-background"
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src={AboutPicture}
              alt="Voluntários cuidando de idosos na comunidade"
              className="rounded-lg shadow-xl w-full"
            />
          </div>

          <div className="space-y-6">
            <h2 id="about-heading">Quem Somos</h2>

            <div className="space-y-4">
              <div>
                <h3 className="mb-2 flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" aria-hidden="true" />
                  Missão
                </h3>
                <p className="text-muted-foreground">
                Promover a inclusão social e o desenvolvimento humano da comunidade quilombola de Curralinho, através de capacitação e incentivo ao empreendedorismo, valorizando a cultura local.
                </p>
              </div>

              <div>
                <h3 className="mb-2 flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" aria-hidden="true" />
                  Visão
                </h3>
                <p className="text-muted-foreground">
                Ser referência como associação quilombola, reconhecida por gerar impacto positivo e desenvolvimento pleno para crianças, jovens, homens, mulheres e idosos da comunidade.
                </p>
              </div>

              <div className="bg-primary/5 p-6 rounded-lg border-l-4 border-primary">
                <h3 className="mb-3">Nossa História</h3>
                <p className="text-muted-foreground">
                Fundada em 6 de maio de 2017, a Associação nasceu com o objetivo de incentivar as famílias em seus projetos de empreendimento, esporte e cultura. Consolidamos projetos como a oficina de costura, que gera nova profissão e renda. Nosso trabalho é focado no compromisso com o futuro de nossa comunidade.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-center mb-8">Nossos Valores</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index}>
                  <CardContent className="pt-6 text-center">
                    <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon
                        className="h-7 w-7 text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <h4 className="mb-2">{value.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Heart({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}
