import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CONTACT_EMAIL } from "../config/siteConfig";

export function PrivacyPolicy() {
  return (
    <section 
      className="py-20 bg-background"
      aria-labelledby="privacy-heading"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 id="privacy-heading" className="mb-8 text-center">
            Política de Privacidade
          </h2>

          <Card>
            <CardHeader>
              <CardTitle>1. Informações Gerais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações pessoais 
                quando você utiliza nosso site e serviços, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018).
              </p>
              <p className="text-muted-foreground">
                <strong>Responsável pelo tratamento dos dados:</strong> Arquice - Associação Remanescente Quilombola de Curralinho Morrinhos
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>2. Dados Coletados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Coletamos os seguintes dados pessoais quando você preenche nossos formulários:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Nome completo</li>
                <li>Endereço de e-mail</li>
                <li>Número de telefone</li>
                <li>Cidade (apenas no formulário de voluntariado)</li>
                <li>Informações sobre habilidades e disponibilidade (apenas no formulário de voluntariado)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>3. Finalidade do Uso dos Dados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Utilizamos seus dados pessoais exclusivamente para:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Enviar e-mails de agradecimento e confirmação de doações</li>
                <li>Entrar em contato com voluntários interessados</li>
                <li>Manter registros de doadores e voluntários para fins administrativos</li>
                <li>Cumprir obrigações legais e regulatórias</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>4. Base Legal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                O tratamento dos seus dados pessoais é baseado no seu <strong>consentimento explícito</strong>, 
                obtido através da marcação do checkbox de aceite dos termos de privacidade nos formulários.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>5. Compartilhamento de Dados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Não compartilhamos, vendemos ou alugamos seus dados pessoais para terceiros. 
                Seus dados são utilizados exclusivamente pela nossa organização para os fins descritos nesta política.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>6. Segurança dos Dados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais 
                contra acesso não autorizado, alteração, divulgação ou destruição.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>7. Seus Direitos (LGPD)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                De acordo com a LGPD, você tem direito a:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Confirmar a existência de tratamento de dados</li>
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
                <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários</li>
                <li>Revogar seu consentimento a qualquer momento</li>
                <li>Solicitar a portabilidade dos dados</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Para exercer seus direitos, entre em contato conosco através do e-mail:{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline">
                  {CONTACT_EMAIL}
                </a>
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>8. Retenção de Dados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas 
                nesta política ou conforme exigido por lei. Quando os dados não forem mais necessários, 
                serão excluídos de forma segura.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>9. Alterações nesta Política</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Podemos atualizar esta Política de Privacidade periodicamente. 
                Recomendamos que você revise esta página regularmente para se manter informado sobre como protegemos seus dados.
              </p>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>10. Contato</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Para questões relacionadas a esta Política de Privacidade ou ao tratamento de seus dados pessoais, 
                entre em contato conosco:
              </p>
              <p className="text-muted-foreground mt-2">
                <strong>E-mail:</strong>{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline">
                  {CONTACT_EMAIL}
                </a>
              </p>
              <p className="text-muted-foreground mt-2">
                <strong>Última atualização:</strong> {new Date().toLocaleDateString("pt-BR")}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

