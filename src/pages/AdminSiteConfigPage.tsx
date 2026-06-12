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
                  <CardTitle>Emails</CardTitle>
                  <CardDescription>Formulários de voluntários e email público no rodapé.</CardDescription>
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
                  <CardTitle>Chave PIX</CardTitle>
                  <CardDescription>Código PIX (EMV) para doações.</CardDescription>
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
                  <CardTitle>Organização</CardTitle>
                  <CardDescription>Nome, descrição e CNPJ exibidos no site.</CardDescription>
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
                  <CardTitle>Contato</CardTitle>
                  <CardDescription>Telefone e endereço.</CardDescription>
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
                  <CardTitle>Redes sociais</CardTitle>
                  <CardDescription>URL completa do Instagram (ou &quot;#&quot; se não existir).</CardDescription>
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
                  <CardTitle>Ficheiros de imagem</CardTitle>
                  <CardDescription>Nomes dos ficheiros em src/assets/ (ex.: Logo.png).</CardDescription>
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
                  <Button type="button" onClick={openCreateProject} className="shrink-0">
                    <Plus className="h-4 w-4" aria-hidden="true" />
                    Novo projeto
                  </Button>
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
                  <CardTitle>Favicon</CardTitle>
                  <CardDescription>Caminho público (ficheiro em public/), ex.: /Logo.ico</CardDescription>
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
                  <CardTitle>Conta Admin</CardTitle>
                  <CardDescription>Alterar senha e email da conta administrativa.</CardDescription>
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
