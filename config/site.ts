export const siteConfig = {
  name: "Eduardo Veículos",
  description:
    "Encontre seu próximo carro com segurança e procedência. Amplo estoque de veículos seminovos e usados selecionados.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  whatsapp: {
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5500000000000",
    defaultMessage:
      "Olá, tenho interesse em um veículo anunciado no site. Pode me passar mais informações?" as string,
  },
  social: {
    instagram: "",
    facebook: "",
  },
  nav: [
    { label: "Início", href: "/" },
    { label: "Estoque", href: "/estoque" },
    { label: "Sobre", href: "/sobre" },
    { label: "Contato", href: "/contato" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
