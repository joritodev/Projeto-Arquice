import { Card, CardContent } from "./ui/card";
import { Linkedin, Mail } from "lucide-react";
import { Button } from "./ui/button";
import React from "react";

export function TeamSection() {
  const team = [
    {
      name: "Maria Solange de Lima Faustino",
      role: "Presidenta",
      bio: "presidente da associação remanescente quilombola de Curralinho morrinhos Arquice Ceará",
      image: "/Maria Solange.jpg",
      importance: "Tomada de decisões, reuniões e estratégias"
    },
    {
      name: "Francis Girliane Vasconcelos",
      role: "Sócia Apoiadora",
      bio: "Aí eu estou como sócia apoiadora da associação, para eventos, reuniões, sistema e o que precisar estou disponível para ajudar.",
      image: "/Francisca Girliane.jpg",
      importance: "Gerencia recursos financeiros e parcerias corporativas"
    },
    {
      "name": "Maria Salete Secundo",
      "role": "Suplente do Conselho Fiscal",
      "bio": "Administradora com especialização em gestão financeira para o terceiro setor.",
      "image": "/Maria Salete.jpg",
      "importance": "Apoia os membros titulares na fiscalização da gestão econômico-financeira e atua na ausência destes para garantir o cumprimento das obrigações estatutárias."
    },
  ];

  return (
    <section
      id="equipe"
      className="py-20 bg-secondary/5"
      aria-labelledby="team-heading"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 id="team-heading" className="mb-6">
            Principais Representantes
          </h2>
          <p className="text-xl text-muted-foreground">
            Nossa equipe de liderança é formada por profissionais comprometidos,
            experientes e apaixonados pela causa social.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="mb-4">
                  <img
                    src={member.image}
                    alt={`Foto de ${member.name}`}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary/10"
                  />
                </div>
                <h3 className="mb-1">{member.name}</h3>
                <p className="text-sm text-primary mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                <div className="bg-secondary/20 p-3 rounded mb-4">
                  <p className="text-xs">{member.importance}</p>
                </div>
                <div className="flex gap-2 justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    aria-label={`LinkedIn de ${member.name}`}
                  >
                    <Linkedin className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    aria-label={`Enviar e-mail para ${member.name}`}
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
