import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Spool, Heart } from "lucide-react";

export function ProjectsSection() {
  const projects = [
    {
      icon: Spool,
      title: "Oficina de Costura  ",
      description: "Construção de uma oficina de costura para a produção de roupas e acessórios.",
      goal: 250000, 
      impact: "Beneficiará 300 pessoas por ano"
    }
  ];

  return (
    <section 
      id="projetos" 
      className="py-20 bg-secondary/10"
      aria-labelledby="projects-heading"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 id="projects-heading" className="mb-6">
            Projetos Futuros
          </h2>
          <p className="text-xl text-muted-foreground">
            Com sua ajuda, podemos transformar estes sonhos em realidade. 
            Cada contribuição nos aproxima de um futuro melhor para nossa comunidade.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const Icon = project.icon;
            
            return (
              <Card key={index} className="flex flex-col">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Meta: R$ {project.goal.toLocaleString('pt-BR')}</span>
                      </div>
                    </div>
                    <div className="bg-secondary/20 p-3 rounded">
                      <p className="text-sm flex items-center gap-2">
                        <Heart className="h-4 w-4 text-primary" aria-hidden="true" />
                        {project.impact}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <a href="#doacoes">Contribuir com este Projeto</a>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
