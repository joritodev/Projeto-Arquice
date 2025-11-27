import { Card, CardContent } from "./ui/card";
import { Award, Eye, Target, Users } from "lucide-react";

export function AboutSection() {
  const values = [
    {
      icon: Heart,
      title: "Compromisso Social",
      description: "Dedicação total à transformação de vidas"
    },
    {
      icon: Award,
      title: "Transparência",
      description: "Prestação de contas clara e acessível"
    },
    {
      icon: Users,
      title: "Inclusão",
      description: "Respeito à diversidade e dignidade humana"
    },
    {
      icon: Target,
      title: "Eficiência",
      description: "Resultados concretos e mensuráveis"
    }
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
              src="https://images.unsplash.com/photo-1751977979590-3554dd691c5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwY2FyZSUyMGNvbW11bml0eXxlbnwxfHx8fDE3NjAwMTAzODR8MA&ixlib=rb-4.1.0&q=80&w=1080"
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
                  Promover a inclusão social e o desenvolvimento humano através de ações 
                  educativas, assistenciais e de capacitação, contribuindo para a construção 
                  de uma sociedade mais justa e solidária.
                </p>
              </div>

              <div>
                <h3 className="mb-2 flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" aria-hidden="true" />
                  Visão
                </h3>
                <p className="text-muted-foreground">
                  Ser referência em ações sociais transformadoras, reconhecida pela excelência 
                  no atendimento e pelo impacto positivo na vida das pessoas e comunidades.
                </p>
              </div>

              <div className="bg-primary/5 p-6 rounded-lg border-l-4 border-primary">
                <h3 className="mb-3">Nossa História</h3>
                <p className="text-muted-foreground">
                  Fundada em 2010, nossa organização nasceu do sonho de um grupo de voluntários 
                  que acreditava no poder transformador da solidariedade. Ao longo de mais de 
                  uma década, crescemos e nos consolidamos como uma instituição comprometida 
                  com a mudança real na vida de milhares de pessoas.
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
                      <Icon className="h-7 w-7 text-primary" aria-hidden="true" />
                    </div>
                    <h4 className="mb-2">{value.title}</h4>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
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
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  );
}
