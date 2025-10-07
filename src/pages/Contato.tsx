import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Contato = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("Mensagem enviada! Entraremos em contato em breve.");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent to-primary text-accent-foreground py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 fade-in">
            Entre em Contato
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl fade-in">
            Tire suas dúvidas, faça sugestões ou venha conhecer nosso trabalho de perto
          </p>
        </div>
      </section>

      {/* Formulário e Informações */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Formulário */}
          <div>
            <h2 className="text-3xl font-heading font-bold mb-6">Envie uma Mensagem</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="nome">Nome Completo</Label>
                <Input
                  id="nome"
                  type="text"
                  placeholder="Seu nome"
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="assunto">Assunto</Label>
                <Input
                  id="assunto"
                  type="text"
                  placeholder="Qual o motivo do contato?"
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="mensagem">Mensagem</Label>
                <Textarea
                  id="mensagem"
                  placeholder="Escreva sua mensagem aqui..."
                  rows={6}
                  required
                  className="mt-2"
                />
              </div>

              <Button type="submit" size="lg" className="w-full btn-hover-lift">
                <Send className="mr-2" size={20} />
                Enviar Mensagem
              </Button>
            </form>
          </div>

          {/* Informações de Contato */}
          <div>
            <h2 className="text-3xl font-heading font-bold mb-6">
              Informações de Contato
            </h2>
            <div className="space-y-6">
              <Card className="border-none shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <MapPin className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Endereço</h3>
                      <p className="text-muted-foreground">
                        Rua Principal, s/n
                        <br />
                        Curralinho, Pará
                        <br />
                        CEP: 00000-000
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Phone className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Telefone</h3>
                      <p className="text-muted-foreground">
                        (91) 99999-9999
                        <br />
                        Segunda a Sexta, 8h às 17h
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Mail className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">E-mail</h3>
                      <p className="text-muted-foreground">
                        contato@arquice.org
                        <br />
                        projetos@arquice.org
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 bg-muted p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-3">Visite-nos!</h3>
              <p className="text-muted-foreground mb-4">
                Estamos de portas abertas para receber visitantes que queiram conhecer
                nosso trabalho de perto. Entre em contato para agendar sua visita.
              </p>
              <Button variant="outline" className="btn-hover-lift">
                Agendar Visita
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa (Placeholder) */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold mb-8 text-center">
            Nossa Localização
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-secondary/20 rounded-lg h-96 flex items-center justify-center">
              <p className="text-muted-foreground">
                [Mapa do Google Maps será integrado aqui]
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contato;
