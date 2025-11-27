import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Heart, CreditCard, QrCode, Users, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import React from "react";

export function DonationSection() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const donationAmounts = [50, 100, 250, 500];

  const handleDonation = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <section 
      id="doacoes" 
      className="py-20 bg-gradient-to-br from-primary/5 to-secondary/10"
      aria-labelledby="donation-heading"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="donation-heading" className="mb-6">
              Faça Parte Desta Transformação
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Sua doação é essencial para continuarmos nosso trabalho. 
              Cada contribuição, independente do valor, faz a diferença.
            </p>
          </div>

          {showSuccess && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Obrigado pela sua doação! Em breve você receberá a confirmação por e-mail.
              </AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="monetary" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="monetary" className="text-base">
                <CreditCard className="h-4 w-4 mr-2" aria-hidden="true" />
                Doação Financeira
              </TabsTrigger>
              <TabsTrigger value="volunteer" className="text-base">
                <Users className="h-4 w-4 mr-2" aria-hidden="true" />
                Seja Voluntário
              </TabsTrigger>
            </TabsList>

            <TabsContent value="monetary">
              <Card>
                <CardHeader>
                  <CardTitle>Contribua Financeiramente</CardTitle>
                  <CardDescription>
                    100% da sua doação é destinada aos nossos projetos sociais
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDonation} className="space-y-6">
                    <div>
                      <Label className="mb-3 block">Escolha o valor da doação</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                        {donationAmounts.map((amount) => (
                          <Button
                            key={amount}
                            type="button"
                            variant={selectedAmount === amount ? "default" : "outline"}
                            onClick={() => {
                              setSelectedAmount(amount);
                              setCustomAmount("");
                            }}
                            className="h-auto py-4"
                            aria-pressed={selectedAmount === amount}
                          >
                            R$ {amount}
                          </Button>
                        ))}
                      </div>
                      <div>
                        <Label htmlFor="custom-amount">Ou insira outro valor</Label>
                        <Input
                          id="custom-amount"
                          type="number"
                          placeholder="R$ 0,00"
                          value={customAmount}
                          onChange={(e) => {
                            setCustomAmount(e.target.value);
                            setSelectedAmount(null);
                          }}
                          min="1"
                          aria-label="Valor personalizado de doação em reais"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="donor-name">Nome Completo *</Label>
                        <Input 
                          id="donor-name" 
                          placeholder="Seu nome"
                          required
                          aria-required="true"
                        />
                      </div>
                      <div>
                        <Label htmlFor="donor-email">E-mail *</Label>
                        <Input 
                          id="donor-email" 
                          type="email" 
                          placeholder="seu@email.com"
                          required
                          aria-required="true"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="donor-phone">Telefone</Label>
                      <Input 
                        id="donor-phone" 
                        type="tel" 
                        placeholder="(00) 00000-0000"
                      />
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="mb-3 flex items-center gap-2">
                        <QrCode className="h-5 w-5" aria-hidden="true" />
                        Como sua doação é utilizada
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <Heart className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                          <span>85% destinados diretamente aos projetos e beneficiários</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Heart className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                          <span>10% em capacitação de equipe e voluntários</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Heart className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                          <span>5% em custos administrativos essenciais</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        * Ao confirmar, você será redirecionado para uma página segura de pagamento.
                      </p>
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full"
                        disabled={!selectedAmount && !customAmount}
                      >
                        <Heart className="h-5 w-5 mr-2" aria-hidden="true" />
                        Confirmar Doação
                      </Button>
                      <p className="text-xs text-center text-muted-foreground">
                        Aceitamos PIX, Cartão de Crédito e Boleto Bancário
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="volunteer">
              <Card>
                <CardHeader>
                  <CardTitle>Seja um Voluntário</CardTitle>
                  <CardDescription>
                    Doe seu tempo e talento para transformar vidas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDonation} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="vol-name">Nome Completo *</Label>
                        <Input 
                          id="vol-name" 
                          placeholder="Seu nome"
                          required
                          aria-required="true"
                        />
                      </div>
                      <div>
                        <Label htmlFor="vol-email">E-mail *</Label>
                        <Input 
                          id="vol-email" 
                          type="email" 
                          placeholder="seu@email.com"
                          required
                          aria-required="true"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="vol-phone">Telefone *</Label>
                        <Input 
                          id="vol-phone" 
                          type="tel" 
                          placeholder="(00) 00000-0000"
                          required
                          aria-required="true"
                        />
                      </div>
                      <div>
                        <Label htmlFor="vol-city">Cidade *</Label>
                        <Input 
                          id="vol-city" 
                          placeholder="Sua cidade"
                          required
                          aria-required="true"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="vol-skills">Habilidades e Experiências</Label>
                      <Textarea 
                        id="vol-skills"
                        placeholder="Conte-nos sobre suas habilidades, experiências e áreas de interesse..."
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label htmlFor="vol-availability">Disponibilidade</Label>
                      <Textarea 
                        id="vol-availability"
                        placeholder="Quais dias e horários você pode dedicar ao voluntariado?"
                        rows={3}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      <Users className="h-5 w-5 mr-2" aria-hidden="true" />
                      Enviar Inscrição
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
