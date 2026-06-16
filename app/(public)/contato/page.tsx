import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { ButtonAnchor } from "@/components/ui/button-link";
import { ContactForm } from "@/components/public/contact-form";
import { buildWhatsAppUrl } from "@/lib/utils/whatsapp";

export const metadata: Metadata = {
  title: "Contato",
  description: "Entre em contato com a Eduardo Veículos em Anápolis-GO. Estamos prontos para ajudá-lo a encontrar o carro ideal.",
};

export default function ContatoPage() {
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="mb-10 text-center">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#111827]">Entre em contato</h1>
        <p className="mt-2 text-[#6B7280] text-lg">Estamos aqui para ajudá-lo a encontrar o carro ideal.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10">
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 sm:p-8">
          <h2 className="font-heading text-lg font-semibold text-[#111827] mb-6 text-center">Envie uma mensagem</h2>
          <ContactForm />
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 text-center">
            <h2 className="font-semibold text-[#111827] mb-5">Informações de contato</h2>
            <div className="space-y-4 text-sm">
              <InfoItem
                icon={<MapPin size={16} />}
                text="Av. Brasil Sul, Nº 4122 - St. Sul Jamil Miguel, Anápolis - GO, 75124-820"
              />
              <InfoItem
                icon={<Phone size={16} />}
                text="(62) 99487-0068"
                href="tel:+556299487-0068"
              />
              <InfoItem
                icon={<Mail size={16} />}
                text="eduardoveiculosanapolis@gmail.com"
                href="mailto:eduardoveiculosanapolis@gmail.com"
              />
              <InfoItem
                icon={<Clock size={16} />}
                text="Seg–Sex: 8h–18h | Sáb: 8h–13h"
              />
            </div>
          </div>

          <ButtonAnchor
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-12 bg-[#25D366] hover:bg-[#1DA851] text-white gap-2 font-semibold text-base"
          >
            <MessageCircle size={20} />
            Falar agora no WhatsApp
          </ButtonAnchor>

          {/* Mapa real — Eduardo Veículos Anápolis */}
          <div className="rounded-2xl overflow-hidden border border-[#E5E7EB] h-64">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.0!2d-48.961681!3d-16.35731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef49c3e2e8b2f%3A0x8d1a2e2e2e2e8d11!2sEduardo%20Ve%C3%ADculos!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr&cid=10167603834099345297"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Eduardo Veículos"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  text,
  href,
}: {
  icon: React.ReactNode;
  text: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start justify-center gap-2.5 text-[#6B7280]">
      <span className="text-[#1454D9] flex-shrink-0 mt-0.5">{icon}</span>
      <span className="text-left">{text}</span>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block hover:text-[#1454D9] transition-colors">
        {content}
      </a>
    );
  }
  return content;
}
