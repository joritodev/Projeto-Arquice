import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Heart, QrCode, Users, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { QRCodeSVG } from "qrcode.react";
import { ORG_EMAIL, PIX_KEY, ORG_FULL_NAME } from "../config/siteConfig";

export function DonationSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [consentGiven, setConsentGiven] = useState(false);
  
  // Estados para formulário de voluntário
  const [volunteerFormSubmitted, setVolunteerFormSubmitted] = useState(false);
  const [volName, setVolName] = useState("");
  const [volEmail, setVolEmail] = useState("");
  const [volPhone, setVolPhone] = useState("");
  const [volCity, setVolCity] = useState("");
  const [volSkills, setVolSkills] = useState("");
  const [volAvailability, setVolAvailability] = useState("");
  const [volConsentGiven, setVolConsentGiven] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentGiven) {
      alert("Por favor, aceite os termos de privacidade para continuar.");
      return;
    }
    setFormSubmitted(true);
  };

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!volConsentGiven) {
      alert("Por favor, aceite os termos de privacidade para continuar.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const messageToOrg = `
═══════════════════════════════════════════════════════════
    🎉 NOVA INSCRIÇÃO DE VOLUNTÁRIO
═══════════════════════════════════════════════════════════

📋 INFORMAÇÕES PESSOAIS
───────────────────────────────────────────────────────────
Nome:        ${volName}
E-mail:      ${volEmail}
Telefone:    ${volPhone}
Cidade:      ${volCity}

───────────────────────────────────────────────────────────

💼 HABILIDADES E EXPERIÊNCIAS
───────────────────────────────────────────────────────────
${volSkills || "Não informado"}

───────────────────────────────────────────────────────────

📅 DISPONIBILIDADE
───────────────────────────────────────────────────────────
${volAvailability || "Não informado"}

───────────────────────────────────────────────────────────

Este email foi enviado automaticamente pelo formulário do site Arquice.
      `.trim();

      // Preparar mensagem formatada de agradecimento para o voluntário
      const thankYouMessage = `
═══════════════════════════════════════════════════════════
    🙏 OBRIGADO PELO SEU INTERESSE!
═══════════════════════════════════════════════════════════

Olá ${volName},

Muito obrigado pelo seu interesse em fazer parte da nossa 
equipe de voluntários!

✅ RECEBEMOS SUA INSCRIÇÃO!

Entraremos em contato em breve através do e-mail:
${volEmail}

Para darmos continuidade ao processo.

───────────────────────────────────────────────────────────

📧 IMPORTANTE - ATIVAÇÃO DO EMAIL
───────────────────────────────────────────────────────────

Você receberá um email do FormSubmit pedindo para ativar o 
recebimento de emails deste formulário. 

⚠️ É NECESSÁRIO clicar no botão "ACTIVATE FORM" no email 
para que você possa receber este email de agradecimento e 
futuras comunicações da nossa organização.

Este é um processo de segurança automático que acontece apenas 
uma vez. Após a ativação, você receberá normalmente todos os 
nossos emails.

───────────────────────────────────────────────────────────

Sua dedicação e vontade de ajudar fazem toda a diferença 
para nossa organização e para as pessoas que atendemos.

Ficamos muito felizes em ter você conosco nesta jornada de 
transformação social!

───────────────────────────────────────────────────────────

Atenciosamente,
Equipe Arquice

${ORG_FULL_NAME}

───────────────────────────────────────────────────────────
Este é um email automático, por favor não responda.
      `.trim();

      // Enviar email para a organização usando FormSubmit
      const formData = new FormData();
      formData.append("name", volName);
      formData.append("email", volEmail);
      formData.append("phone", volPhone);
      formData.append("city", volCity);
      formData.append("skills", volSkills || "Não informado");
      formData.append("availability", volAvailability || "Não informado");
      formData.append("subject", `🎉 Nova Inscrição de Voluntário - ${volName}`);
      formData.append("message", messageToOrg);

      const orgResponse = await fetch("https://formsubmit.co/ajax/" + ORG_EMAIL, {
        method: "POST",
        body: formData,
      });

      if (!orgResponse.ok) {
        throw new Error("Erro ao enviar email para a organização");
      }

      // Enviar email de agradecimento para o voluntário
      const thankYouFormData = new FormData();
      thankYouFormData.append("name", "Equipe Arquice");
      thankYouFormData.append("email", ORG_EMAIL);
      thankYouFormData.append("subject", "🙏 Obrigado pelo seu interesse em ser voluntário!");
      thankYouFormData.append("message", thankYouMessage);

      const thankYouResponse = await fetch("https://formsubmit.co/ajax/" + volEmail, {
        method: "POST",
        body: thankYouFormData,
      });

      if (!thankYouResponse.ok) {
        // Se falhar o email de agradecimento, não é crítico - o importante é que a organização recebeu
        console.warn("Não foi possível enviar email de agradecimento, mas a organização foi notificada");
      }

      // Sucesso!
      setVolunteerFormSubmitted(true);
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      setSubmitError("Ocorreu um erro ao enviar o formulário. Por favor, tente novamente ou entre em contato conosco diretamente pelo email: " + ORG_EMAIL);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="doacoes" 
      className="relative isolate overflow-hidden py-20 md:py-28 bg-gradient-to-br from-brand/5 to-secondary/10"
      aria-labelledby="donation-heading"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-28 -left-20 h-[30rem] w-[30rem] rounded-full bg-brand/[0.07] blur-3xl" />
        <div className="absolute -bottom-32 -right-20 h-[28rem] w-[28rem] rounded-full bg-brand-blue/[0.05] blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12" data-reveal>
            <h2 id="donation-heading" className="mb-6">
              Faça Parte Desta Transformação
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Sua doação é essencial para continuarmos nosso trabalho. 
              Cada contribuição, independente do valor, faz a diferença.
            </p>
          </div>


          <Tabs
            defaultValue="monetary"
            className="w-full"
            data-reveal
            style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
          >
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="monetary" className="text-base">
                <QrCode className="h-4 w-4 mr-2" aria-hidden="true" />
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
                  {!formSubmitted ? (
                    <form onSubmit={handleDonation} className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="donor-name">Nome Completo *</Label>
                          <Input 
                            id="donor-name" 
                            placeholder="Seu nome completo"
                            value={donorName}
                            onChange={(e) => setDonorName(e.target.value)}
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
                            value={donorEmail}
                            onChange={(e) => setDonorEmail(e.target.value)}
                            required
                            aria-required="true"
                          />
                        </div>

                        <div>
                          <Label htmlFor="donor-phone">Telefone *</Label>
                          <Input 
                            id="donor-phone" 
                            type="tel" 
                            placeholder="(00) 00000-0000"
                            value={donorPhone}
                            onChange={(e) => setDonorPhone(e.target.value)}
                            required
                            aria-required="true"
                          />
                        </div>
                      </div>

                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="mb-3 flex items-center gap-2">
                          <Heart className="h-5 w-5 text-brand" aria-hidden="true" />
                          Como sua doação é utilizada
                        </h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <Heart className="h-4 w-4 text-brand mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span>85% destinados diretamente aos projetos e beneficiários</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Heart className="h-4 w-4 text-brand mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span>10% em capacitação de equipe e voluntários</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Heart className="h-4 w-4 text-brand mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span>5% em custos administrativos essenciais</span>
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-start space-x-2">
                          <Checkbox 
                            id="consent" 
                            checked={consentGiven}
                            onCheckedChange={(checked) => setConsentGiven(checked === true)}
                            required
                            aria-required="true"
                            className="mt-0.5 flex-shrink-0"
                          />
                          <Label 
                            htmlFor="consent" 
                            className="text-sm font-normal leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
                          >
                            <span className="whitespace-normal">
                              Aceito os{" "}
                              <Link 
                                to="/privacidade" 
                                className="text-brand underline hover:text-brand/80 inline"
                              >
                                termos de privacidade
                              </Link>
                              {" "}e autorizo o tratamento dos meus dados pessoais conforme a LGPD. *
                            </span>
                          </Label>
                        </div>
                        <Button 
                          type="submit" 
                          size="lg" 
                          className="w-full"
                          disabled={!consentGiven}
                        >
                          <Heart className="h-5 w-5 mr-2" aria-hidden="true" />
                          Continuar com a Doação
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <Alert className="bg-success-muted border-success-border">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        <AlertDescription className="text-success">
                          <strong>Obrigado pela sua doação!</strong> Em breve você receberá um e-mail de agradecimento.
                        </AlertDescription>
                      </Alert>

                      <div className="bg-muted/50 p-6 rounded-lg">
                        <div className="text-center space-y-4">
                          <div className="flex items-center justify-center gap-2 mb-4">
                            <QrCode className="h-6 w-6 text-brand" aria-hidden="true" />
                            <h3 className="text-lg font-semibold">Escaneie o QR Code para doar</h3>
                          </div>
                          
                          <div className="flex justify-center">
                            <div className="bg-white p-4 rounded-lg border-2 border-brand/20">
                              <QRCodeSVG 
                                value={PIX_KEY}
                                size={256}
                                level="H"
                                includeMargin={true}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => {
                            setFormSubmitted(false);
                            setDonorName("");
                            setDonorEmail("");
                            setDonorPhone("");
                          }}
                        >
                          Nova Doação
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={async () => {
                            try {
                              await navigator.clipboard.writeText(PIX_KEY);
                              alert("Chave PIX copiada para a área de transferência!");
                            } catch (error) {
                              console.error("Erro ao copiar:", error);
                            }
                          }}
                        >
                          Copiar Chave PIX
                        </Button>
                      </div>
                    </div>
                  )}
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
                  {!volunteerFormSubmitted ? (
                    <form onSubmit={handleVolunteerSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="vol-name">Nome Completo *</Label>
                          <Input 
                            id="vol-name" 
                            placeholder="Seu nome"
                            value={volName}
                            onChange={(e) => setVolName(e.target.value)}
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
                            value={volEmail}
                            onChange={(e) => setVolEmail(e.target.value)}
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
                            value={volPhone}
                            onChange={(e) => setVolPhone(e.target.value)}
                            required
                            aria-required="true"
                          />
                        </div>
                        <div>
                          <Label htmlFor="vol-city">Cidade *</Label>
                          <Input 
                            id="vol-city" 
                            placeholder="Sua cidade"
                            value={volCity}
                            onChange={(e) => setVolCity(e.target.value)}
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
                          value={volSkills}
                          onChange={(e) => setVolSkills(e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="vol-availability">Disponibilidade</Label>
                        <Textarea 
                          id="vol-availability"
                          placeholder="Quais dias e horários você pode dedicar ao voluntariado?"
                          rows={3}
                          value={volAvailability}
                          onChange={(e) => setVolAvailability(e.target.value)}
                        />
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox 
                          id="vol-consent" 
                          checked={volConsentGiven}
                          onCheckedChange={(checked) => setVolConsentGiven(checked === true)}
                          required
                          aria-required="true"
                          className="mt-0.5 flex-shrink-0"
                        />
                        <Label 
                          htmlFor="vol-consent" 
                          className="text-sm font-normal leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1"
                        >
                          <span className="whitespace-normal">
                            Aceito os{" "}
                            <Link 
                              to="/privacidade" 
                              className="text-brand underline hover:text-brand/80 inline"
                            >
                              termos de privacidade
                            </Link>
                            {" "}e autorizo o tratamento dos meus dados pessoais conforme a LGPD. *
                          </span>
                        </Label>
                      </div>

                      {submitError && (
                        <Alert className="bg-destructive/10 border-destructive/30">
                          <AlertCircle className="h-4 w-4 text-destructive" />
                          <AlertDescription className="text-destructive">
                            {submitError}
                          </AlertDescription>
                        </Alert>
                      )}

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full"
                        disabled={!volConsentGiven || isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" aria-hidden="true" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Users className="h-5 w-5 mr-2" aria-hidden="true" />
                            Enviar Inscrição
                          </>
                        )}
                      </Button>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <Alert className="bg-success-muted border-success-border">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        <AlertDescription className="text-success">
                          <strong>Obrigado pelo seu interesse em ser voluntário!</strong> Em breve entraremos em contato através do e-mail informado.
                        </AlertDescription>
                      </Alert>
                      <Alert className="bg-info-muted border-info-border">
                        <AlertCircle className="h-4 w-4 text-info" />
                        <AlertDescription className="text-info text-sm">
                          <strong>📧 Importante:</strong> Você receberá um email do FormSubmit pedindo para ativar o recebimento de emails. É necessário clicar no botão "ACTIVATE FORM" para receber nosso email de agradecimento e futuras comunicações. Este processo acontece apenas uma vez.
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
