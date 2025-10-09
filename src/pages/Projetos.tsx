import { BookOpen, Briefcase, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroEducation from "@/assets/hero-education.jpg";
import heroIncome from "@/assets/hero-income.jpg";

const Projetos = () => {
  const projetos = [
    {
      title: "EducaAção - Reforço Escolar",
      icon: BookOpen,
      description:
        "Programa de reforço escolar para crianças e jovens de escolas públicas, oferecendo apoio pedagógico, atividades culturais e esportivas para combater a evasão escolar e ampliar horizontes.",
      impacto: "120+ crianças atendidas",
      image: heroEducation,
      color: "bg-accent",
    },
    {
      title: "Mãos que Criam - Geração de Renda",
      icon: Briefcase,
      description:
        "Cursos e oficinas de capacitação profissional em artesanato marajoara, culinária regional, agricultura familiar e turismo sustentável, promovendo autonomia financeira e valorização da cultura local.",
      impacto: "80+ pessoas capacitadas",
      image: heroIncome,
      color: "bg-secondary",
    },
    {
      title: "Empreendedores do Marajó",
      icon: TrendingUp,
      description:
        "Mentoria e apoio para jovens empreendedores locais, oferecendo capacitação em gestão de negócios, marketing digital e acesso a microcrédito para impulsionar iniciativas econômicas na região.",
      impacto: "Em desenvolvimento",
      image: null,
      color: "bg-primary",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary to-accent text-secondary-foreground py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 fade-in">
            Nossos Projetos
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl fade-in">
            Conheça as iniciativas que estão transformando vidas em Curralinho,
            Morrinho e região
          </p>
        </div>
      </section>

      {/* Projetos em Andamento */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12 text-center">
          Projetos Atuais
        </h2>
        <div className="space-y-12">
          {projetos.map((projeto, index) => (
            <Card
              key={index}
              className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow"
            >
              <div
                className={`grid md:grid-cols-2 gap-0 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`${projeto.color} p-8 md:p-12 flex flex-col justify-center text-white ${
                    index % 2 === 1 ? "md:order-2" : ""
                  }`}
                >
                  <div className="mb-6">
                    <projeto.icon size={48} className="mb-4" />
                  </div>
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-3xl font-heading text-white">
                      {projeto.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-lg mb-6 text-white/90">{projeto.description}</p>
                    <div className="bg-white/20 rounded-lg p-4 mb-6">
                      <p className="font-semibold text-lg">Impacto: {projeto.impacto}</p>
                    </div>
                    <Link to="/como-ajudar">
                      <Button
                        variant="secondary"
                        size="lg"
                        className="btn-hover-lift bg-white text-foreground hover:bg-white/90"
                      >
                        Apoie Este Projeto
                      </Button>
                    </Link>
                  </CardContent>
                </div>
                {projeto.image ? (
                  <div
                    className={`h-64 md:h-auto ${index % 2 === 1 ? "md:order-1" : ""}`}
                    style={{
                      backgroundImage: `url(${projeto.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                ) : (
                  <div
                    className={`h-64 md:h-auto bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center ${
                      index % 2 === 1 ? "md:order-1" : ""
                    }`}
                  >
                    <projeto.icon size={120} className="text-muted-foreground/30" />
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Projetos Futuros */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 text-center">
            Projetos Futuros
          </h2>
          <div className="max-w-3xl mx-auto">
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-heading font-bold mb-4 text-primary">
                  Nossa Oficina de Costura
                </h3>
                <p className="text-muted-foreground text-lg mb-6">
                  Sonhamos em construir uma oficina de costura para a ARQUICE, um espaço que
                  possa abrigar nossas atividades para ajudar as pessoas a terem uma nova fonte de renda 	.
                </p>
                <div className="bg-primary/10 rounded-lg p-6">
                  <p className="font-semibold text-lg mb-2">Meta de Investimento:</p>
                  <p className="text-3xl font-bold text-primary mb-4">R$ 500.000</p>
                  <p className="text-muted-foreground">
                    Com sua ajuda, podemos tornar esse sonho realidade e ampliar ainda
                    mais nosso impacto na comunidade.
                  </p>
                </div>
                <Link to="/como-ajudar" className="block mt-6">
                  <Button size="lg" className="w-full btn-hover-lift">
                    Contribuir para Este Sonho
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projetos;
