import { Users, Heart, Target, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const QuemSomos = () => {
  const valores = [
    {
      icon: Heart,
      title: "Empoderamento",
      description: "Fortalecemos pessoas para que sejam protagonistas de suas próprias histórias",
    },
    {
      icon: Target,
      title: "Educação",
      description: "Acreditamos na educação como ferramenta de transformação social",
    },
    {
      icon: Users,
      title: "Comunidade",
      description: "Trabalhamos junto com a comunidade, valorizando suas raízes e cultura",
    },
    {
      icon: Award,
      title: "Transparência",
      description: "Prestamos contas de todas as nossas ações e recursos com clareza total",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 fade-in">
            Quem Somos
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl fade-in">
            Uma organização dedicada a transformar vidas através da educação e capacitação
            no coração do Marajó
          </p>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 text-center">
            Nossa História
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              A ARQUICE (Associação de Resgate, Qualificação e Inclusão Social em Curralinho
              e Entorno) nasceu do desejo de três mulheres visionárias de fazer a diferença
              na Ilha do Marajó, uma região de beleza natural exuberante, mas que enfrenta
              grandes desafios socioeconômicos.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Fundada com o propósito de combater a desigualdade através da educação e da
              geração de renda, a ARQUICE atua nas comunidades de Curralinho, Morrinho e
              região, oferecendo oportunidades para que crianças, jovens e adultos possam
              construir um futuro melhor.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Nosso trabalho é baseado no respeito à cultura local, na valorização dos
              saberes tradicionais e na crença de que cada pessoa tem potencial para
              transformar sua própria realidade quando recebe as ferramentas certas.
            </p>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-heading font-bold mb-4 text-primary">
                  Nossa Missão
                </h3>
                <p className="text-muted-foreground text-lg">
                  Promover a educação de qualidade e a capacitação profissional para
                  crianças, jovens e adultos em situação de vulnerabilidade social,
                  fomentando a autonomia, a geração de renda e o desenvolvimento sustentável
                  das comunidades da Ilha do Marajó.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-heading font-bold mb-4 text-primary">
                  Nossa Visão
                </h3>
                <p className="text-muted-foreground text-lg">
                  Ser referência em desenvolvimento comunitário na região do Marajó,
                  reconhecida pela excelência de nossos projetos educacionais e de geração
                  de renda, contribuindo para uma sociedade mais justa, inclusiva e
                  próspera.
                </p>
              </CardContent>
            </Card>
          </div>

          <h3 className="text-3xl font-heading font-bold mb-8 text-center">
            Nossos Valores
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valores.map((valor, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <valor.icon className="text-primary" size={32} />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{valor.title}</h4>
                  <p className="text-muted-foreground">{valor.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12 text-center">
          Nossa Equipe
        </h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-muted-foreground text-lg mb-8">
            A ARQUICE é formada por uma equipe dedicada de educadores, coordenadores e
            voluntários apaixonados por fazer a diferença. Juntos, trabalhamos incansavelmente
            para oferecer oportunidades e esperança para nossa comunidade.
          </p>
          <p className="text-muted-foreground italic">
            Conheça mais sobre nossa equipe entrando em contato conosco!
          </p>
        </div>
      </section>
    </div>
  );
};

export default QuemSomos;
