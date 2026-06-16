export const USER_ROLES = [
  { value: "admin", label: "Administrador" },
  { value: "gerente", label: "Gerente" },
  { value: "editor", label: "Editor" },
] as const;

export const ADMIN_NAV = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: "LayoutDashboard",
  },
  {
    label: "Veículos",
    href: "/admin/veiculos",
    icon: "Car",
    children: [
      { label: "Todos os veículos", href: "/admin/veiculos" },
      { label: "Cadastrar veículo", href: "/admin/veiculos/novo" },
      { label: "Marcas", href: "/admin/marcas" },
      { label: "Modelos", href: "/admin/modelos" },
      { label: "Categorias", href: "/admin/categorias" },
    ],
  },
  {
    label: "Site",
    href: "/admin/banners",
    icon: "Layout",
    children: [
      { label: "Banners", href: "/admin/banners" },
      { label: "Depoimentos", href: "/admin/depoimentos" },
    ],
  },
  {
    label: "Leads",
    href: "/admin/leads",
    icon: "MessageSquare",
  },
  {
    label: "Configurações",
    href: "/admin/configuracoes",
    icon: "Settings",
  },
] as const;
