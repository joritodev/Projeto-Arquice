import { Calendar, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Noticias = () => {
  const noticias = [
    {
      title: "Nova turma de artesanato marajoara formada com sucesso",
      excerpt:
        "15 mulheres concluíram o curso de cerâmica marajoara e já estão comercializando suas peças na comunidade.",
      date: "15 de Janeiro, 2025",
      author: "Equipe ARQUICE",
      category: "Geração de Renda",
    },
    {
      title: "Projeto EducaAção atinge marca de 100 crianças atendidas",
      excerpt:
        "Celebramos o crescimento do nosso programa de reforço escolar que tem transformado a vida de dezenas de famílias.",
      date: "08 de Janeiro, 2025",
      author: "Coordenação Pedagógica",
      category: "Educação",
    },
    {
      title: "Parceria com escola local amplia alcance dos projetos",
      excerpt:
        "Nova parceria permite que mais estudantes tenham acesso às atividades extracurriculares oferecidas pela ARQUICE.",
      date: "20 de Dezembro, 2024",
      author: "Diretoria",
      category: "Parcerias",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary to-primary text-secondary-foreground py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 fade-in">
            Notícias e Atualizações
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl fade-in">
            Acompanhe as últimas novidades sobre nossos projetos e o impacto na comunidade
          </p>
        </div>
      </section>

      {/* Lista de Notícias */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {noticias.map((noticia, index) => (
            <Card
              key={index}
              className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <CardHeader>
                <div className="flex flex-wrap items-center gap-4 mb-3">
                  <Badge className="bg-primary">{noticia.category}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar size={16} className="mr-2" />
                    {noticia.date}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User size={16} className="mr-2" />
                    {noticia.author}
                  </div>
                </div>
                <CardTitle className="text-2xl font-heading hover:text-primary transition-colors cursor-pointer">
                  {noticia.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg">{noticia.excerpt}</p>
                <button className="text-primary font-semibold mt-4 hover:underline">
                  Ler mais →
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Placeholder para mais notícias */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Mais notícias em breve! Acompanhe nossas redes sociais para não perder nenhuma atualização.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Noticias;
