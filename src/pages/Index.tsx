import { ArrowRight, BookOpen, Users, TrendingUp, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import heroEducation from "@/assets/hero-education.jpg";
import communityBg from "@/assets/community-background.jpg";

const Index = () => {
  const impactNumbers = [
    { number: "200+", label: "Vidas Transformadas" },
    { number: "3", label: "Comunidades Atendidas" },
    { number: "5", label: "Projetos Ativos" },
    { number: "50+", label: "Voluntários" },
  ];

  const projetos = [
    {
      icon: BookOpen,
      title: "Educação",
      description: "Reforço escolar e atividades extracurriculares para crianças e jovens",
    },
    {
      icon: TrendingUp,
      title: "Geração de Renda",
      description: "Capacitação profissional e apoio ao empreendedorismo local",
    },
    {
      icon: Users,
      title: "Desenvolvimento Comunitário",
      description: "Fortalecimento dos laços sociais e valorização da cultura local",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroEducation})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 text-center z-10">
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 fade-in">
            Educando para o Futuro,
            <br />
            <span className="text-gradient-primary">Capacitando para o Presente</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto fade-in">
            Transformando vidas através da educação e geração de renda nas comunidades do
            Marajó
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in">
            <Link to="/como-ajudar">
              <Button size="lg" className="text-lg px-8 btn-hover-lift">
                <Heart className="mr-2" size={20} />
                Faça Parte
              </Button>
            </Link>
            <Link to="/projetos">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 btn-hover-lift"
              >
                Conheça os Projetos
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Nossa Missão */}
      <section className="py-20 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">Nossa Missão</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A <span className="font-bold text-primary">ARQUICE</span> é uma organização da
            sociedade civil dedicada a promover a educação de qualidade e a capacitação
            profissional para crianças, jovens e adultos em situação de vulnerabilidade
            social nas comunidades de Curralinho, Morrinho e região, na Ilha do Marajó.
          </p>
        </div>
      </section>

      {/* Números de Impacto */}
      <section className="py-20 bg-gradient-to-br from-primary to-accent text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-heading font-bold mb-12 text-center">
            Nosso Impacto
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactNumbers.map((item, index) => (
              <div key={index} className="text-center">
                <p className="text-5xl md:text-6xl font-heading font-bold mb-2">
                  {item.number}
                </p>
                <p className="text-lg">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O Que Fazemos */}
      <section className="py-20 container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-12 text-center">
          O Que Fazemos
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {projetos.map((projeto, index) => (
            <Card
              key={index}
              className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-2"
            >
              <CardContent className="p-8 text-center">
                <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <projeto.icon className="text-primary" size={40} />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4">{projeto.title}</h3>
                <p className="text-muted-foreground text-lg">{projeto.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/projetos">
            <Button size="lg" variant="outline" className="btn-hover-lift">
              Ver Todos os Projetos
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Depoimentos */}
      <section
        className="py-20 relative text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${communityBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-12 text-center">
            Histórias que Inspiram
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-8">
                <p className="text-lg italic mb-4 text-white">
                  "A ARQUICE mudou minha vida. Hoje tenho uma profissão e consigo sustentar
                  minha família com dignidade através do artesanato que aprendi aqui."
                </p>
                <p className="font-bold text-white">- Maria, ex-aluna do curso de artesanato</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-8">
                <p className="text-lg italic mb-4 text-white">
                  "Meu filho era tímido e tinha dificuldades na escola. Depois do reforço
                  escolar, ele está mais confiante e tirando notas melhores!"
                </p>
                <p className="font-bold text-white">- João, pai de beneficiário </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Final */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Juntos Podemos Transformar Mais Vidas
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Sua contribuição, seja ela qual for, faz toda a diferença para as comunidades
            que atendemos. Venha fazer parte dessa transformação!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/como-ajudar">
              <Button size="lg" className="text-lg px-8 btn-hover-lift bg-primary">
                Quero Contribuir
              </Button>
            </Link>
            <Link to="/contato">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 btn-hover-lift border-white text-black hover:bg-white hover:text-primary"
              >
                Entre em Contato
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
