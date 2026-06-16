import Image from "next/image";
import Link from "next/link";
import { Fuel, Gauge, GitFork, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonLink, ButtonAnchor } from "@/components/ui/button-link";
import { formatPrice, formatMileage, formatYear } from "@/lib/utils/format";
import { buildWhatsAppUrl } from "@/lib/utils/whatsapp";
import { cn } from "@/lib/utils/cn";
import type { VehicleCard as VehicleCardType } from "@/types/database";

const FUEL_LABELS: Record<string, string> = {
  flex: "Flex", gasolina: "Gasolina", etanol: "Etanol",
  diesel: "Diesel", hibrido: "Híbrido", eletrico: "Elétrico", gnv: "GNV",
};

const TRANSMISSION_LABELS: Record<string, string> = {
  manual: "Manual", automatico: "Automático", automatizado: "Automatizado", cvt: "CVT",
};

interface VehicleBadgeConfig { label: string; className: string; }

function getVehicleBadge(vehicle: VehicleCardType): VehicleBadgeConfig | null {
  if (vehicle.status === "vendido") return { label: "Vendido", className: "badge-vendido" };
  if (vehicle.status === "reservado") return { label: "Reservado", className: "badge-reservado" };
  if (vehicle.is_new_arrival) return { label: "Novidade", className: "badge-novo" };
  if (vehicle.is_featured) return { label: "Destaque", className: "badge-destaque" };
  if (vehicle.mileage < 30000) return { label: "Baixa km", className: "badge-baixakm" };
  return null;
}

interface Props {
  vehicle: VehicleCardType;
  className?: string;
}

export function VehicleCard({ vehicle, className }: Props) {
  const badge = getVehicleBadge(vehicle);
  const vehicleName = `${vehicle.brand_name} ${vehicle.model_name} ${vehicle.version}`;
  const whatsappUrl = buildWhatsAppUrl(vehicleName, vehicle.slug);
  const isSoldOrReserved = vehicle.status === "vendido" || vehicle.status === "reservado";

  return (
    <article
      className={cn(
        "group bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-sm",
        "hover:shadow-md hover:border-[#1454D9]/30 transition-all duration-200",
        className
      )}
    >
      {/* Imagem */}
      <Link href={`/veiculo/${vehicle.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-[#F5F7FB]">
        {vehicle.primary_image ? (
          <Image
            src={vehicle.primary_image}
            alt={vehicleName}
            fill
            className={cn(
              "object-cover transition-transform duration-300 group-hover:scale-105",
              isSoldOrReserved && "opacity-70 grayscale-[30%]"
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[#D1D5DB]">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h12l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </div>
        )}

        {badge && (
          <span className={cn("absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full", badge.className)}>
            {badge.label}
          </span>
        )}
      </Link>

      {/* Conteúdo */}
      <div className="p-4 flex flex-col gap-3 text-center">
        <div>
          <p className="text-xs text-[#6B7280] font-medium uppercase tracking-wide">{vehicle.brand_name}</p>
          <h3 className="font-semibold text-[#111827] text-base leading-tight mt-0.5 line-clamp-1">
            {vehicle.model_name} {vehicle.version}
          </h3>
          <p className="text-sm text-[#6B7280] mt-0.5">
            {formatYear(vehicle.year_fabrication, vehicle.year_model)}
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 text-xs text-[#6B7280]">
          <span className="flex items-center gap-1"><Gauge size={13} />{formatMileage(vehicle.mileage)}</span>
          <span className="w-px h-3 bg-[#E5E7EB]" />
          <span className="flex items-center gap-1"><GitFork size={13} />{TRANSMISSION_LABELS[vehicle.transmission] ?? vehicle.transmission}</span>
          <span className="w-px h-3 bg-[#E5E7EB]" />
          <span className="flex items-center gap-1"><Fuel size={13} />{FUEL_LABELS[vehicle.fuel] ?? vehicle.fuel}</span>
        </div>

        <div className="mt-auto">
          {vehicle.show_price ? (
            <div className="flex items-baseline justify-center gap-2">
              {vehicle.promotional_price ? (
                <>
                  <span className="text-xl font-bold text-[#1454D9]">{formatPrice(vehicle.promotional_price)}</span>
                  <span className="text-sm text-[#6B7280] line-through">{formatPrice(vehicle.price)}</span>
                </>
              ) : (
                <span className="text-xl font-bold text-[#111827]">{formatPrice(vehicle.price)}</span>
              )}
            </div>
          ) : (
            <span className="text-sm font-medium text-[#6B7280]">Consulte o preço</span>
          )}
        </div>

        <div className="flex gap-2 pt-1">
          <ButtonLink
            href={`/veiculo/${vehicle.slug}`}
            variant="outline"
            className="flex-1 h-10 text-sm border-[#E5E7EB] hover:border-[#1454D9]"
          >
            Ver detalhes
          </ButtonLink>

          {vehicle.show_whatsapp && !isSoldOrReserved && (
            <ButtonAnchor
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 px-3 bg-[#25D366] hover:bg-[#1DA851] text-white"
              aria-label="Contato via WhatsApp"
            >
              <MessageCircle size={18} />
            </ButtonAnchor>
          )}
        </div>
      </div>
    </article>
  );
}
