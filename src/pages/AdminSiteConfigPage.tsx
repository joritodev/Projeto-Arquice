import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { Pencil, Trash2, Plus, CheckCircle2, RotateCcw } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { getAdminApiBaseUrl, getSiteConfig, saveSiteConfig } from "../admin/siteConfigAdminApi";
import { defaultsFromSiteConfig, type SiteConfigPayload } from "../admin/siteConfigPayload";
import { ProjectFormDialog } from "../components/admin/ProjectFormDialog";
import { TabHelpDialog } from "../components/admin/TabHelpDialog";
import { createEmptyProject, getProjectIcon, type Project } from "../config/projects";
import { useAuth } from "../contexts/AuthContext";
import { apiUrl } from "../lib/api";

const emailPattern = {
  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  message: "Email inválido",
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-sm text-destructive mt-1">{message}</p>;
}

export function AdminSiteConfigPage() {
  const [initializing, setInitializing] = useState(true);
  const apiBase = getAdminApiBaseUrl();
  const { logout, token } = useAuth();
  const navigate = useNavigate();

  const form = useForm<SiteConfigPayload>({
    defaultValues: defaultsFromSiteConfig(),
    mode: "onBlur",
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    getValues,
    formState: { errors, isSubmitting },
  } = form;

  const { fields: projectFields, append, update, remove } = useFieldArray({
    control,
    name: "projects",
    keyName: "_rhfId",
  });

  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [projectDraft, setProjectDraft] = useState<Project>(() => createEmptyProject());

  const openCreateProject = () => {
    setEditingIndex(null);
    setProjectDraft(createEmptyProject());
    setProjectDialogOpen(true);
  };

  const openEditProject = (index: number) => {
    const current = getValues(`projects.${index}`) as Project;
    setEditingIndex(index);
    setProjectDraft({ ...current });
    setProjectDialogOpen(true);
  };

  const handleProjectSubmit = (project: Project) => {
    if (editingIndex === null) {
      append(project);
      toast.success("Projeto adicionado. Lembre-se de Guardar para publicar.");
    } else {
      update(editingIndex, project);
      toast.success("Projeto atualizado. Lembre-se de Guardar para publicar.");
    }
    setProjectDialogOpen(false);
  };

  const handleProjectDelete = (index: number) => {
    remove(index);
    toast.success("Projeto removido. Lembre-se de Guardar para publicar.");
  };

  const toggleProjectGoalReached = (index: number) => {
    const current = getValues(`projects.${index}`) as Project;
    update(index, { ...current, goalReached: !current.goalReached });
  };

  const loadFromServer = useCallback(async () => {
    try {
      const data = await getSiteConfig();
      reset(data);
      toast.success("Dados carregados.");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Erro ao carregar.";
      toast.error(msg);
      reset(defaultsFromSiteConfig());
    }
  }, [reset]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getSiteConfig();
        if (!cancelled) reset(data);
      } catch (e) {
        if (!cancelled) {
          const msg = e instanceof Error ? e.message : "Erro ao carregar.";
          toast.error(msg);
          reset(defaultsFromSiteConfig());
        }
      } finally {
        if (!cancelled) setInitializing(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [reset]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleChangePassword = async () => {
    const currentPassword = (document.getElementById('currentPassword') as HTMLInputElement)?.value;
    const newPassword = (document.getElementById('newPassword') as HTMLInputElement)?.value;
    const confirmPassword = (document.getElementById('confirmPassword') as HTMLInputElement)?.value;

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Preencha todos os campos.');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Nova senha e confirmação não coincidem.');
      return;
    }

    try {
      const response = await fetch(apiUrl('/api/auth/change-password'), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao alterar senha.');
      }

      toast.success('Senha alterada com sucesso.');
      // Limpar campos
      (document.getElementById('currentPassword') as HTMLInputElement).value = '';
      (document.getElementById('newPassword') as HTMLInputElement).value = '';
      (document.getElementById('confirmPassword') as HTMLInputElement).value = '';
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Erro ao alterar senha.';
      toast.error(msg);
    }
  };

  const handleChangeEmail = async () => {
    const newEmail = (document.getElementById('newEmail') as HTMLInputElement)?.value;
    const password = (document.getElementById('passwordForEmail') as HTMLInputElement)?.value;

    if (!newEmail || !password) {
      toast.error('Preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch(apiUrl('/api/auth/change-email'), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ newEmail, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao alterar email.');
      }

      toast.success('Email alterado com sucesso.');
      // Limpar campos
      (document.getElementById('newEmail') as HTMLInputElement).value = '';
      (document.getElementById('passwordForEmail') as HTMLInputElement).value = '';
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Erro ao alterar email.';
      toast.error(msg);
    }
  };

  const handleImageUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof SiteConfigPayload["images"]
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(apiUrl('/api/upload'), {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erro upload');
      }

      const data = await response.json();
      setValue(`images.${field}`, data.imageUrl);
      toast.success('Imagem enviada com sucesso');
    } catch {
      toast.error('Erro ao enviar imagem');
    }
  };

  const onSave = handleSubmit(async (data) => {
    try {
      await saveSiteConfig(data);
      toast.success("Configuração guardada no servidor.");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Erro ao guardar.";
      toast.error(msg);
    }
  });

  return (
    <div className="min-h-screen bg-muted/40 text-foreground">
      <Toaster richColors position="top-right" />

      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Administração — Site</h1>
            <p className="text-sm text-muted-foreground">
              Edição dos dados espelhados
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" disabled={initializing} onClick={() => void loadFromServer()}>
              Recarregar do servidor
            </Button>
            <Button type="submit" form="admin-site-config-form" disabled={initializing || isSubmitting}>
              {isSubmitting ? "A guardar…" : "Guardar"}
            </Button>
            <Button type="button" variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {!apiBase && (
          <Card className="mb-6 border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-900">
            <CardHeader className="py-3">
              <CardTitle className="text-base text-amber-900 dark:text-amber-100">Modo sem API</CardTitle>
              <CardDescription className="text-amber-900/90 dark:text-amber-100/90">
                <code className="text-xs">VITE_ADMIN_API_BASE_URL</code> não está definido. O formulário mostra os
                valores do código local; <strong>Guardar</strong> só funciona após configurar a variável e ter o
                backend a responder. Consulte <code className="text-xs">src/admin/BACKEND_INTEGRATION.md</code>.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        <form id="admin-site-config-form" onSubmit={onSave} className="space-y-6">
          <Tabs defaultValue="emails" className="w-full">
            <TabsList className="flex flex-wrap h-auto gap-1">
              <TabsTrigger value="emails">Emails</TabsTrigger>
              <TabsTrigger value="pix">PIX</TabsTrigger>
              <TabsTrigger value="org">Organização</TabsTrigger>
              <TabsTrigger value="contacto">Contato</TabsTrigger>
              <TabsTrigger value="redes">Redes</TabsTrigger>
              <TabsTrigger value="imagens">Imagens</TabsTrigger>
              <TabsTrigger value="projetos">Projetos</TabsTrigger>
              <TabsTrigger value="favicon">Favicon</TabsTrigger>
              <TabsTrigger value="conta">Conta</TabsTrigger>
            </TabsList>

            <TabsContent value="emails">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle>Emails</CardTitle>
                      <CardDescription>Formulários de voluntários e email público no rodapé.</CardDescription>
                    </div>
                    <TabHelpDialog
                      title="Sobre a aba Emails"
                      intro="Aqui você define para onde vão as mensagens do site e qual email o público vê."
                      items={[
                        {
                          label: "Email da organização (formulários)",
                          description:
                            "É a caixa de email que vai RECEBER as mensagens de quem preenche os formulários do site (por exemplo, pessoas que querem ser voluntárias). Use um email que vocês acessam com frequência.",
                        },
                        {
                          label: "Email de contato público",
                          description:
                            "É o email que APARECE para qualquer visitante do site (no rodapé), para que possam entrar em contato com vocês. Pode ser o mesmo do campo acima.",
                        },
                      ]}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="orgEmail">Email da organização (formulários)</Label>
                    <Input
                      id="orgEmail"
                      type="email"
                      autoComplete="email"
                      {...register("orgEmail", { required: "Obrigatório", pattern: emailPattern })}
                    />
                    <FieldError message={errors.orgEmail?.message} />
                  </div>
                  <div>
                    <Label htmlFor="contactEmail">Email de contato público</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      autoComplete="email"
                      {...register("contactEmail", { required: "Obrigatório", pattern: emailPattern })}
                    />
                    <FieldError message={errors.contactEmail?.message} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pix">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle>Chave PIX</CardTitle>
                      <CardDescription>Código PIX (EMV) para doações.</CardDescription>
                    </div>
                    <TabHelpDialog
                      title="Sobre a aba Chave PIX"
                      intro="Este é o código que permite ao site receber doações por PIX."
                      items={[
                        {
                          label: "PIX (código)",
                          description:
                            'É o código do PIX que aparece na seção de doações do site (no formato \"copia e cola\" e em QR Code). As pessoas usam ele para doar. Para obtê-lo, gere um \"PIX copia e cola\" no aplicativo do seu banco e cole aqui exatamente como veio.',
                        },
                      ]}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <Label htmlFor="pixKey">PIX</Label>
                  <Textarea
                    id="pixKey"
                    rows={6}
                    className="font-mono text-xs mt-1.5"
                    {...register("pixKey", { required: "Obrigatório" })}
                  />
                  <FieldError message={errors.pixKey?.message} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="org">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle>Organização</CardTitle>
                      <CardDescription>Nome, descrição e CNPJ exibidos no site.</CardDescription>
                    </div>
                    <TabHelpDialog
                      title="Sobre a aba Organização"
                      intro="São os dados de identificação da organização que aparecem em vários lugares do site."
                      items={[
                        {
                          label: "Nome curto",
                          description:
                            "O nome abreviado da organização. Aparece no topo do site e em títulos. Ex.: \"Arquice\".",
                        },
                        {
                          label: "Nome completo",
                          description:
                            "O nome oficial e completo da organização. Aparece em lugares mais formais, como textos de apresentação.",
                        },
                        {
                          label: "Descrição curta",
                          description:
                            "Uma frase curta que resume o que a organização faz. Aparece em destaque para apresentar a causa logo de cara.",
                        },
                        {
                          label: "CNPJ",
                          description:
                            "O número de CNPJ da organização. É mostrado no site para passar transparência e confiança a quem quer doar.",
                        },
                      ]}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="orgName">Nome curto</Label>
                    <Input id="orgName" {...register("orgName", { required: "Obrigatório" })} />
                    <FieldError message={errors.orgName?.message} />
                  </div>
                  <div>
                    <Label htmlFor="orgFullName">Nome completo</Label>
                    <Textarea id="orgFullName" rows={3} {...register("orgFullName", { required: "Obrigatório" })} />
                    <FieldError message={errors.orgFullName?.message} />
                  </div>
                  <div>
                    <Label htmlFor="orgDescription">Descrição curta</Label>
                    <Textarea id="orgDescription" rows={3} {...register("orgDescription", { required: "Obrigatório" })} />
                    <FieldError message={errors.orgDescription?.message} />
                  </div>
                  <div>
                    <Label htmlFor="orgCnpj">CNPJ</Label>
                    <Input id="orgCnpj" {...register("orgCnpj", { required: "Obrigatório" })} />
                    <FieldError message={errors.orgCnpj?.message} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contacto">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle>Contato</CardTitle>
                      <CardDescription>Telefone e endereço.</CardDescription>
                    </div>
                    <TabHelpDialog
                      title="Sobre a aba Contato"
                      intro="São as informações de telefone e localização que o site mostra ao público."
                      items={[
                        {
                          label: "Telefone",
                          description:
                            "O número de telefone de contato que aparece no site para o público ligar ou chamar.",
                        },
                        {
                          label: "Morada / comunidade",
                          description:
                            "A rua e número (ou o nome da comunidade) onde a organização fica ou atua. Aparece na área de contato/endereço.",
                        },
                        {
                          label: "Bairro / zona",
                          description: "O bairro ou zona do endereço. Complementa a localização exibida no site.",
                        },
                        {
                          label: "Cidade",
                          description: "A cidade onde a organização está localizada.",
                        },
                        {
                          label: "Estado (UF)",
                          description:
                            "A sigla do estado, com 2 letras. Ex.: SP (São Paulo), RJ (Rio de Janeiro), MG (Minas Gerais).",
                        },
                      ]}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="contactPhone">Telefone</Label>
                    <Input id="contactPhone" {...register("contactPhone", { required: "Obrigatório" })} />
                    <FieldError message={errors.contactPhone?.message} />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <Label htmlFor="street">Morada / comunidade</Label>
                      <Input id="street" {...register("contactAddress.street", { required: "Obrigatório" })} />
                      <FieldError message={errors.contactAddress?.street?.message} />
                    </div>
                    <div>
                      <Label htmlFor="neighborhood">Bairro / zona</Label>
                      <Input id="neighborhood" {...register("contactAddress.neighborhood", { required: "Obrigatório" })} />
                      <FieldError message={errors.contactAddress?.neighborhood?.message} />
                    </div>
                    <div>
                      <Label htmlFor="city">Cidade</Label>
                      <Input id="city" {...register("contactAddress.city", { required: "Obrigatório" })} />
                      <FieldError message={errors.contactAddress?.city?.message} />
                    </div>
                    <div>
                      <Label htmlFor="state">Estado (UF)</Label>
                      <Input id="state" maxLength={2} {...register("contactAddress.state", { required: "Obrigatório" })} />
                      <FieldError message={errors.contactAddress?.state?.message} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="redes">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle>Redes sociais</CardTitle>
                      <CardDescription>URL completa do Instagram (ou &quot;#&quot; se não existir).</CardDescription>
                    </div>
                    <TabHelpDialog
                      title="Sobre a aba Redes sociais"
                      intro="Define para onde os ícones de redes sociais do site levam quando alguém clica."
                      items={[
                        {
                          label: "Instagram",
                          description:
                            "Cole aqui o endereço (link) completo do Instagram da organização, começando com https:// (ex.: https://instagram.com/suaong). Quando alguém clicar no ícone do Instagram no site, será levado para essa página. Se a organização ainda não tem Instagram, deixe apenas o símbolo #.",
                        },
                      ]}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    type="text"
                    placeholder="https://... ou #"
                    {...register("socialMedia.instagram", { required: "Obrigatório" })}
                  />
                  <FieldError message={errors.socialMedia?.instagram?.message} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="imagens">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle>Ficheiros de imagem</CardTitle>
                      <CardDescription>Nomes dos ficheiros em src/assets/ (ex.: Logo.png).</CardDescription>
                    </div>
                    <TabHelpDialog
                      title="Sobre a aba Imagens"
                      intro="Aqui você troca as fotos do site. Em cada campo, clique para escolher uma imagem do seu computador — ela é enviada automaticamente."
                      items={[
                        {
                          label: "Logo",
                          description:
                            "O logotipo da organização. Aparece no topo do site (no menu) e identifica a marca em toda a página.",
                        },
                        {
                          label: "Banner",
                          description:
                            "A imagem grande de destaque no início da página — geralmente a primeira coisa que a pessoa vê ao abrir o site.",
                        },
                        {
                          label: "Sobre",
                          description:
                            "A foto que acompanha a seção \"Sobre\" (quem somos), onde a organização se apresenta.",
                        },
                        {
                          label: "Causa",
                          description:
                            "A foto da seção que fala sobre a causa da organização, ajudando a contar a história e emocionar o visitante.",
                        },
                      ]}
                    />
                  </div>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="imgLogo">Logo</Label>
                    <Input
                      id="imgLogo"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "logo")}
                    />
                    <FieldError message={errors.images?.logo?.message} />
                  </div>
                  <div>
                    <Label htmlFor="imgBanner">Banner</Label>
                    <Input
                      id="imgBanner"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "banner")}
                    />
                    <FieldError message={errors.images?.banner?.message} />
                  </div>
                  <div>
                    <Label htmlFor="imgAbout">Sobre</Label>
                    <Input
                      id="imgAbout"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "about")}
                    />
                    <FieldError message={errors.images?.about?.message} />
                  </div>
                  <div>
                    <Label htmlFor="imgCause">Causa</Label>
                    <Input
                      id="imgCause"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "cause")}
                    />
                    <FieldError message={errors.images?.cause?.message} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projetos">
              <Card>
                <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <CardTitle>Projetos Futuros</CardTitle>
                    <CardDescription>
                      Crie, edite, marque como "Meta alcançada" ou remova os projetos
                      exibidos na home. As alterações são publicadas ao clicar em{" "}
                      <strong>Guardar</strong>.
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <TabHelpDialog
                      title="Sobre a aba Projetos Futuros"
                      intro="Esta aba controla os cards de projetos que aparecem na seção 'Projetos Futuros' da página inicial."
                      items={[
                        {
                          label: "Botão \"Novo projeto\"",
                          description:
                            "Abre uma janela para criar um novo projeto. Enquanto você preenche, vê do lado uma prévia de como o card vai ficar no site.",
                        },
                        {
                          label: "Título, Descrição, Ícone, Meta e Impacto",
                          description:
                            "São as informações de cada card: o nome do projeto, o que ele é, um desenho (ícone), o valor que se pretende arrecadar e a frase que mostra a quem o projeto vai ajudar.",
                        },
                        {
                          label: "Botão de marcar/desmarcar meta (✓)",
                          description:
                            "Marca o projeto como \"Meta Alcançada\" quando ele for concluído (o card mostra um selo no site). É possível desmarcar para voltar ao estado anterior.",
                        },
                        {
                          label: "Botão de editar (lápis) e remover (lixeira)",
                          description:
                            "O lápis abre o projeto para mudar os dados. A lixeira apaga o projeto. Se não houver nenhum projeto, o site mostra uma mensagem de \"em breve\".",
                        },
                      ]}
                    />
                    <Button type="button" onClick={openCreateProject} className="shrink-0">
                      <Plus className="h-4 w-4" aria-hidden="true" />
                      Novo projeto
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {projectFields.length === 0 ? (
                    <p className="text-sm text-muted-foreground py-8 text-center">
                      Nenhum projeto cadastrado. Clique em <strong>Novo projeto</strong> para adicionar.
                    </p>
                  ) : (
                    projectFields.map((field, index) => {
                      const Icon = getProjectIcon(field.icon);
                      return (
                        <div
                          key={field._rhfId}
                          className="flex items-center gap-3 rounded-lg border p-3"
                        >
                          <div
                            className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                              field.goalReached
                                ? "bg-success/10 text-success"
                                : "bg-brand/10 text-brand"
                            }`}
                          >
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-medium truncate">
                                {field.title || "Sem título"}
                              </p>
                              {field.goalReached && (
                                <Badge className="bg-success text-success-foreground">
                                  <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                                  Meta Alcançada
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              Meta: R$ {(field.goal || 0).toLocaleString("pt-BR")}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleProjectGoalReached(index)}
                              aria-label={
                                field.goalReached
                                  ? "Reabrir projeto (desmarcar meta)"
                                  : "Marcar meta como alcançada"
                              }
                              title={
                                field.goalReached
                                  ? "Reabrir (desmarcar meta)"
                                  : "Marcar meta alcançada"
                              }
                            >
                              {field.goalReached ? (
                                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                              ) : (
                                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                              )}
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditProject(index)}
                              aria-label="Editar projeto"
                            >
                              <Pencil className="h-4 w-4" aria-hidden="true" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleProjectDelete(index)}
                              aria-label="Remover projeto"
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" aria-hidden="true" />
                            </Button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="favicon">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle>Favicon</CardTitle>
                      <CardDescription>Caminho público (ficheiro em public/), ex.: /Logo.ico</CardDescription>
                    </div>
                    <TabHelpDialog
                      title="Sobre a aba Favicon"
                      intro="O favicon é aquele iconezinho que aparece na aba do navegador, ao lado do nome do site."
                      items={[
                        {
                          label: "Caminho",
                          description:
                            "Indica qual arquivo será usado como o iconezinho da aba do navegador (e nos favoritos). Normalmente já vem configurado (ex.: /Logo.ico). Só mude se souber o nome exato do novo arquivo de ícone.",
                        },
                      ]}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <Label htmlFor="faviconPath">Caminho</Label>
                  <Input id="faviconPath" {...register("faviconPath", { required: "Obrigatório" })} />
                  <FieldError message={errors.faviconPath?.message} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="conta">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle>Conta Admin</CardTitle>
                      <CardDescription>Alterar senha e email da conta administrativa.</CardDescription>
                    </div>
                    <TabHelpDialog
                      title="Sobre a aba Conta Admin"
                      intro="Aqui você cuida dos dados de acesso a este painel de administração (não muda nada visível no site público)."
                      items={[
                        {
                          label: "Alterar Senha",
                          description:
                            "Troca a senha usada para entrar neste painel. Digite a senha atual, depois a nova senha duas vezes para confirmar. Use uma senha que só você saiba.",
                        },
                        {
                          label: "Alterar Email",
                          description:
                            "Troca o email usado para fazer login neste painel. Digite o novo email e a sua senha atual para confirmar que é você.",
                        },
                      ]}
                      note={
                        <>
                          <strong>Atenção:</strong> nesta aba, as mudanças são
                          aplicadas pelos botões <strong>Alterar Senha</strong> e{" "}
                          <strong>Alterar Email</strong> — não pelo botão Guardar.
                        </>
                      }
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Alterar Senha</h3>
                    <div className="space-y-4 mt-4">
                      <div>
                        <Label htmlFor="currentPassword">Senha Atual</Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      <div>
                        <Label htmlFor="newPassword">Nova Senha</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                      <Button type="button" onClick={handleChangePassword}>Alterar Senha</Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Alterar Email</h3>
                    <div className="space-y-4 mt-4">
                      <div>
                        <Label htmlFor="newEmail">Novo Email</Label>
                        <Input id="newEmail" type="email" />
                      </div>
                      <div>
                        <Label htmlFor="passwordForEmail">Senha Atual</Label>
                        <Input id="passwordForEmail" type="password" />
                      </div>
                      <Button type="button" onClick={handleChangeEmail}>Alterar Email</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </form>

        <ProjectFormDialog
          open={projectDialogOpen}
          onOpenChange={setProjectDialogOpen}
          initial={projectDraft}
          isEditing={editingIndex !== null}
          onSubmit={handleProjectSubmit}
        />

        <p className="mt-8 text-center text-sm text-muted-foreground">
          <Link to="/" className="underline underline-offset-4 hover:text-foreground">
            Voltar ao site
          </Link>
        </p>
      </div>
    </div>
  );
}
