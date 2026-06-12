import { Target, Heart, Lightbulb } from "lucide-react";
import { IMAGES } from "../config/siteConfig";
import { getImagePath } from "../utils/imageLoader";

const CausePicture = getImagePath(IMAGES.cause);

export function CauseSection() {
  return (
    <section 
      id="causa" 
      className="relative isolate overflow-hidden py-20 md:py-28 bg-background"
      aria-labelledby="cause-heading"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 -right-32 h-[30rem] w-[30rem] rounded-full bg-brand-blue/[0.05] blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16" data-reveal>
          <h2 id="cause-heading" className="mb-6">
            Nossa Causa Social
          </h2>
          <p className="text-xl text-muted-foreground">
            Atuamos na transformação de vidas através da educação, inclusão social e apoio às 
            pessoas em situação de vulnerabilidade. Nosso compromisso é construir uma sociedade 
            mais justa e igualitária.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="relative rounded-lg overflow-hidden" data-reveal>
            <img
              src={CausePicture}
              alt="Crianças em programa educacional da OSC"
              className="w-full h-[400px] object-cover"
              width={1600}
              height={900}
              loading="lazy"
              decoding="async"
            />
          </div>

          <div
            className="space-y-6"
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          >
            <div className="border-l-4 border-brand pl-6">
              <h3 className="mb-3 flex items-center gap-2">
                <Target className="h-6 w-6 text-brand" aria-hidden="true" />
                O Problema
              </h3>
              <p className="text-muted-foreground">
                Todos os dias, os moradores desta pequena comunidade enfrentam desafios que refletem a dura realidade da desigualdade social. A falta de acesso à educação de qualidade, à saúde e a oportunidades de trabalho limita o desenvolvimento de muitas famílias, que lutam para construir um futuro melhor mesmo com poucos recursos.
              </p>
            </div>

            <div className="border-l-4 border-brand pl-6">
              <h3 className="mb-3 flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-brand" aria-hidden="true" />
                Nossa Solução
              </h3>
              <p className="text-muted-foreground">
                Através de programas estruturados de educação, capacitação profissional e apoio 
                psicossocial, oferecemos ferramentas reais para que cada pessoa possa transformar 
                sua própria realidade. Acreditamos no potencial humano e trabalhamos para desenvolvê-lo.
              </p>
            </div>

            <div className="border-l-4 border-brand pl-6">
              <h3 className="mb-3 flex items-center gap-2">
                <Heart className="h-6 w-6 text-brand" aria-hidden="true" />
                Nosso Diferencial
              </h3>
              <p className="text-muted-foreground">
                Atuação personalizada, equipe multidisciplinar qualificada e acompanhamento contínuo. 
                Não oferecemos apenas assistência temporária, mas construímos caminhos sustentáveis 
                para a autonomia e dignidade de cada beneficiário.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
