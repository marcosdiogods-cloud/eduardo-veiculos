"use client";

import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/utils/whatsapp";

interface Props {
  vehicleName?: string;
  vehicleSlug?: string;
}

export function WhatsAppFab({ vehicleName, vehicleSlug }: Props) {
  const url = buildWhatsAppUrl(vehicleName, vehicleSlug);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="
        fixed bottom-6 right-5 z-50
        md:hidden
        w-14 h-14 rounded-full
        bg-[#25D366] hover:bg-[#1DA851]
        text-white shadow-lg hover:shadow-xl
        flex items-center justify-center
        transition-all duration-200 active:scale-95
      "
    >
      <MessageCircle size={26} fill="white" stroke="none" />
    </a>
  );
}
