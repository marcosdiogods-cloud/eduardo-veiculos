import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  MessageCircle, Gauge, Fuel, GitFork, Calendar,
  Shield, CheckCircle, ChevronRight, Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonAnchor } from "@/components/ui/button-link";
import { Separator } from "@/components/ui/separator";
import { VehicleGallery } from "@/components/public/vehicle-gallery";
import { VehicleCard } from "@/components/public/vehicle-card";
import { getVehicleBySlug, getRelatedVehicles } from "@/lib/queries/vehicles";
import { formatPrice, formatMileage, formatYear } from "@/lib/utils/format";
import { buildWhatsAppUrl } from "@/lib/utils/whatsapp";
import { WhatsAppFab } from "@/components/shared/whatsapp-fab";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) return { title: "Veículo não encontrado" };

  const title = vehicle.seo_title ?? `${vehicle.brand.name} ${vehicle.model.name} ${vehicle.version} ${vehicle.year_model}`;
  const description = vehicle.seo_description ?? `${vehicle.brand.name} ${vehicle.model.name} ${vehicle.version}, ${vehicle.year_model}, ${formatMileage(vehicle.mileage)}. ${vehicle.show_price ? formatPrice(vehicle.price) : "Consulte o preço"}.`;
  const image = vehicle.images[0]?.url;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [{ url: image }] : [],
      type: "website",
    },
  };
}

const FUEL_LABELS: Record<string, string> = {
  flex: "Flex", gasolina: "Gasolina", etanol: "Etanol",
  diesel: "Diesel", hibrido: "Híbrido", eletrico: "Elétrico", gnv: "GNV",
};
const TRANSMISSION_LABELS: Record<string, string> = {
  manual: "Manual", automatico: "Automático", automatizado: "Automatizado", cvt: "CVT",
};

export default async function VehicleDetailPage({ params }: Props) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);
  if (!vehicle) notFound();

  const vehicleName = `${vehicle.brand.name} ${vehicle.model.name} ${vehicle.version}`;
  const whatsappUrl = buildWhatsAppUrl(vehicleName, vehicle.slug);

  const related = await getRelatedVehicles(vehicle.id, vehicle.brand_id, vehicle.category_id, 4);

  const featuresByCategory = vehicle.features.reduce<Record<string, typeof vehicle.features>>(
    (acc, f) => {
      const cat = f.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(f);
      return acc;
    },
    {}
  );

  const CATEGORY_LABELS: Record<string, string> = {
    conforto: "Conforto", seguranca: "Segurança", tecnologia: "Tecnologia", exterior: "Exterior",
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-[#F5F7FB] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
            <Link href="/" className="hover:text-[#1454D9]">Início</Link>
            <ChevronRight size={12} />
            <Link href="/estoque" className="hover:text-[#1454D9]">Estoque</Link>
            <ChevronRight size={12} />
            <span className="text-[#111827] truncate">{vehicleName}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">

          {/* ─── Coluna principal ─────────────────────── */}
          <div className="space-y-8">
            <VehicleGallery images={vehicle.images} vehicleName={vehicleName} />

            {vehicle.description && (
              <section>
                <h2 className="font-heading text-lg font-semibold text-[#111827] mb-3">Descrição</h2>
                <p className="text-[#374151] text-sm leading-relaxed whitespace-pre-line">{vehicle.description}</p>
              </section>
            )}

            {vehicle.features.length > 0 && (
              <section>
                <h2 className="font-heading text-lg font-semibold text-[#111827] mb-4">Opcionais e equipamentos</h2>
                <div className="space-y-5">
                  {Object.entries(featuresByCategory).map(([cat, features]) => (
                    <div key={cat}>
                      <h3 className="text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-2">
                        {CATEGORY_LABELS[cat] ?? cat}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {features.map((f) => (
                          <div key={f.id} className="flex items-center gap-2 text-sm text-[#374151]">
                            <CheckCircle size={15} className="text-[#1454D9] flex-shrink-0" />
                            {f.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {(vehicle.single_owner || vehicle.ipva_paid || vehicle.has_warranty ||
              vehicle.revisions_up_to_date || vehicle.is_armored || vehicle.has_manual || vehicle.has_spare_key) && (
              <section>
                <h2 className="font-heading text-lg font-semibold text-[#111827] mb-3">Diferenciais</h2>
                <div className="flex flex-wrap gap-2">
                  {vehicle.single_owner && <DiffBadge label="Único dono" />}
                  {vehicle.ipva_paid && <DiffBadge label="IPVA pago" />}
                  {vehicle.has_warranty && <DiffBadge label="Com garantia" />}
                  {vehicle.revisions_up_to_date && <DiffBadge label="Revisões em dia" />}
                  {vehicle.is_armored && <DiffBadge label="Blindado" />}
                  {vehicle.has_manual && <DiffBadge label="Manual" />}
                  {vehicle.has_spare_key && <DiffBadge label="Chave reserva" />}
                </div>
              </section>
            )}
          </div>

          {/* ─── Sidebar sticky ───────────────────────── */}
          <aside>
            <div className="sticky top-24 space-y-4">
              <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 space-y-4">
                <div>
                  <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">{vehicle.brand.name}</p>
                  <h1 className="font-heading text-xl font-bold text-[#111827] mt-1 leading-snug">
                    {vehicle.model.name} {vehicle.version}
                  </h1>
                  <p className="text-sm text-[#6B7280] mt-1">{formatYear(vehicle.year_fabrication, vehicle.year_model)}</p>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-3">
                  <SpecItem icon={<Gauge size={15} />} label="Km" value={formatMileage(vehicle.mileage)} />
                  <SpecItem icon={<GitFork size={15} />} label="Câmbio" value={TRANSMISSION_LABELS[vehicle.transmission] ?? vehicle.transmission} />
                  <SpecItem icon={<Fuel size={15} />} label="Combustível" value={FUEL_LABELS[vehicle.fuel] ?? vehicle.fuel} />
                  <SpecItem icon={<Calendar size={15} />} label="Ano" value={formatYear(vehicle.year_fabrication, vehicle.year_model)} />
                  {vehicle.color && <SpecItem icon={<Shield size={15} />} label="Cor" value={vehicle.color} />}
                  {vehicle.doors && <SpecItem icon={<Shield size={15} />} label="Portas" value={`${vehicle.doors} portas`} />}
                </div>

                <Separator />

                {vehicle.show_price ? (
                  <div>
                    {vehicle.promotional_price ? (
                      <>
                        <p className="text-sm text-[#6B7280] line-through">{formatPrice(vehicle.price)}</p>
                        <p className="text-3xl font-bold text-[#1454D9] font-heading mt-0.5">{formatPrice(vehicle.promotional_price)}</p>
                      </>
                    ) : (
                      <p className="text-3xl font-bold text-[#111827] font-heading">{formatPrice(vehicle.price)}</p>
                    )}
                    <p className="text-xs text-[#6B7280] mt-1">{vehicle.accepts_trade ? "Aceita troca" : "Não aceita troca"}</p>
                  </div>
                ) : (
                  <p className="text-lg font-semibold text-[#6B7280]">Consulte o preço</p>
                )}

                {vehicle.show_whatsapp && vehicle.status !== "vendido" && (
                  <ButtonAnchor
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-12 bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold gap-2 text-base"
                  >
                    <MessageCircle size={20} />
                    Tenho interesse
                  </ButtonAnchor>
                )}
                <ButtonAnchor
                  href={`tel:${process.env.NEXT_PUBLIC_PHONE ?? ""}`}
                  variant="outline"
                  className="w-full h-11 gap-2"
                >
                  <Phone size={16} />
                  Ligar para a loja
                </ButtonAnchor>
              </div>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-heading text-2xl font-bold text-[#111827] mb-6 text-center">Você também pode gostar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((v) => <VehicleCard key={v.id} vehicle={v} />)}
            </div>
          </section>
        )}
      </div>

      <WhatsAppFab vehicleName={vehicleName} vehicleSlug={vehicle.slug} />
    </>
  );
}

function SpecItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-[#6B7280] mt-0.5 flex-shrink-0">{icon}</span>
      <div>
        <p className="text-[10px] text-[#9CA3AF] uppercase tracking-wide">{label}</p>
        <p className="text-sm font-medium text-[#111827]">{value}</p>
      </div>
    </div>
  );
}

function DiffBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EEF3FD] text-[#1454D9] text-xs font-medium">
      <CheckCircle size={12} />
      {label}
    </span>
  );
}
