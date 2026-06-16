import { siteConfig } from "@/config/site";

export function buildWhatsAppUrl(vehicleName?: string, vehicleSlug?: string): string {
  const number = siteConfig.whatsapp.number;
  const baseUrl = siteConfig.url;

  let message = siteConfig.whatsapp.defaultMessage;

  if (vehicleName) {
    const vehicleUrl = vehicleSlug ? `\n${baseUrl}/veiculo/${vehicleSlug}` : "";
    message = `Olá, tenho interesse no ${vehicleName} anunciado no site.${vehicleUrl}\nPode me passar mais informações?`;
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppUrlWithMessage(message: string): string {
  const number = siteConfig.whatsapp.number;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
