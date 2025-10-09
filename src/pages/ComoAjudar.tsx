import { Heart, Users, Building2, Share2, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ComoAjudar = () => {
  const formasDeAjudar = [
    {
      icon: Heart,
      title: "Doação Única ou Mensal",
      description:
        "Contribua com qualquer valor através de PIX, transferência bancária ou cartão de crédito. Cada contribuição faz a diferença!",
      action: "Doar Agora",
    },
    {
      icon: Users,
      title: "Seja Voluntário",
      description:
        "Compartilhe seu tempo e talentos conosco. Precisamos de professores, mentores, fotógrafos e muitos outros profissionais.",
      action: "Quero ser Voluntário",
    },
    {
      icon: Building2,
      title: "Parcerias Empresariais",
      description:
        "Sua empresa pode fazer parte dessa transformação através de patrocínio, programas de voluntariado corporativo ou doação de recursos.",
      action: "Conhecer Opções",
    },
    {
      icon: Share2,
      title: "Divulgue Nossa Causa",
      description:
        "Compartilhe nosso trabalho nas redes sociais e ajude a ampliar nosso alcance. Quanto mais pessoas souberem, mais vidas transformaremos.",
      action: "Compartilhar",
    },
  ];

  const valoresDoacao = [
    {
      valor: "R$ 50",
      descricao: "Material escolar para uma criança por um mês",
    },
    {
      valor: "R$ 100",
      descricao: "Kit de ferramentas para oficina de artesanato",
    },
    {
      valor: "R$ 250",
      descricao: "Bolsa de estudos para um curso profissionalizante",
    },
    {
      valor: "R$ 500",
      descricao: "Equipamentos para uma oficina comunitária",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-accent to-secondary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 fade-in">
            Como Você Pode Ajudar
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto fade-in">
            Existem várias formas de fazer parte dessa transformação. Escolha a que mais
            combina com você!
          </p>
        </div>
      </section>

      {/* Formas de Ajudar */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {formasDeAjudar.map((forma, index) => (
            <Card
              key={index}
              className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-2"
            >
              <CardHeader>
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <forma.icon className="text-primary" size={32} />
                </div>
                <CardTitle className="text-2xl font-heading">{forma.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{forma.description}</p>
                <Button className="w-full btn-hover-lift">{forma.action}</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Seção de Doação */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 text-center">
              Faça Sua Doação
            </h2>
            <p className="text-center text-muted-foreground text-lg mb-12">
              Veja o impacto que sua doação pode gerar na vida de uma pessoa:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {valoresDoacao.map((item, index) => (
                <Card key={index} className="border-2 border-primary/20">
                  <CardContent className="p-6">
                    <p className="text-3xl font-bold text-primary mb-2">{item.valor}</p>
                    <p className="text-muted-foreground">{item.descricao}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-none shadow-xl bg-card">
              <CardContent className="p-8">
                <div className="flex items-center justify-center mb-6">
                  <CreditCard className="text-primary mr-3" size={32} />
                  <h3 className="text-2xl font-heading font-bold">Dados para Doação</h3>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="font-semibold mb-1">PIX (CNPJ):</p>
                    <p className="text-muted-foreground font-mono">00.000.000/0000-00</p>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <p className="font-semibold mb-1">Banco:</p>
                    <p className="text-muted-foreground">Banco do Brasil</p>
                    <p className="text-muted-foreground">Agência: 0000-0 | Conta: 00000-0</p>
                    <p className="text-muted-foreground">CNPJ: 00.000.000/0000-00</p>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <p className="font-semibold mb-1">Razão Social:</p>
                    <p className="text-muted-foreground">
                      Associação de Resgate, Qualificação e Inclusão Social em Curralinho e Entorno
                    </p>
                  </div>
                </div>

                <p className="text-center text-sm text-muted-foreground italic">
                  Após realizar a doação, envie o comprovante para nosso WhatsApp ou e-mail
                  para emitirmos o recibo.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComoAjudar;
