import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { ButtonLink, ButtonAnchor } from "@/components/ui/button-link";
import { Skeleton } from "@/components/ui/skeleton";
import { VehicleCard } from "@/components/public/vehicle-card";
import { HeroSearch } from "@/components/public/hero-search";
import { CategoryChips } from "@/components/public/category-chips";
import { BrandChips } from "@/components/public/brand-chips";
import { TrustSection } from "@/components/public/trust-section";
import { getPublishedVehicles } from "@/lib/queries/vehicles";
import { getActiveCategories, getActiveBrands } from "@/lib/queries/site";
import { buildWhatsAppUrl } from "@/lib/utils/whatsapp";

export const revalidate = 300;

async function FeaturedVehicles() {
  const { data: vehicles } = await getPublishedVehicles({ sort: "mais_recente", per_page: 8 });
  const featured = vehicles.filter((v) => v.is_featured).slice(0, 8);
  if (featured.length === 0) return null;
  return (
    <div className="flex flex-wrap justify-center gap-5">
      {featured.map((v) => (
        <div key={v.id} className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] min-w-[260px] max-w-[320px]">
          <VehicleCard vehicle={v} className="h-full" />
        </div>
      ))}
    </div>
  );
}

async function NewArrivals() {
  const { data: vehicles } = await getPublishedVehicles({ sort: "mais_recente", per_page: 6 });
  const arrivals = vehicles.filter((v) => v.is_new_arrival).slice(0, 6);
  const display = arrivals.length > 0 ? arrivals : vehicles.slice(0, 6);
  return (
    <div className="flex flex-wrap justify-center gap-5">
      {display.map((v) => (
        <div key={v.id} className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] min-w-[260px] max-w-[380px]">
          <VehicleCard vehicle={v} className="h-full" />
        </div>
      ))}
    </div>
  );
}

function CardsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl overflow-hidden border border-[#E5E7EB]">
          <Skeleton className="aspect-[4/3] w-full" />
          <div className="p-4 space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  const [categories, brands] = await Promise.all([
    getActiveCategories(),
    getActiveBrands(),
  ]);
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <div className="flex flex-col">

      {/* ─── Hero com vídeo de fundo ─────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center text-white overflow-hidden">
        {/* Vídeo de fundo — carro de luxo */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105"
          poster="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1920&q=85&fit=crop"
        >
          <source src="/videos/hero-car.mp4" type="video/mp4" />
        </video>

        {/* Overlay escuro gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/75" />
        <div className="absolute inset-0 bg-[#050B33]/35" />

        {/* Conteúdo */}
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Image
                src="/logo-oficial.png"
                alt="Eduardo Veículos"
                width={140}
                height={56}
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </div>
            <h1 className="font-heading text-4xl sm:text-6xl font-bold leading-tight text-balance drop-shadow-lg">
              Encontre seu próximo carro com{" "}
              <span className="text-[#60A5FA]">segurança e procedência</span>
            </h1>
            <p className="mt-5 text-white/70 text-base sm:text-xl max-w-xl mx-auto leading-relaxed">
              Amplo estoque de veículos seminovos e usados selecionados.
              Qualidade garantida, documentação em dia.
            </p>
            <div className="mt-10">
              <Suspense><HeroSearch /></Suspense>
            </div>
            <div className="mt-12 flex items-center justify-center gap-10 sm:gap-16">
              {[
                { value: "+500", label: "Veículos vendidos" },
                { value: "10+", label: "Anos de mercado" },
                { value: "4.9★", label: "Avaliação Google" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-bold font-heading drop-shadow">{stat.value}</p>
                  <p className="text-xs text-white/50 mt-1 tracking-wide">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowRight size={28} className="text-white/60 rotate-90" />
        </div>
      </section>

      {/* ─── Categorias ──────────────────────────────────── */}
      <section className="py-8 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense><CategoryChips categories={categories} /></Suspense>
        </div>
      </section>

      {/* ─── Novidades ───────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#111827]">Últimas novidades</h2>
            <p className="text-[#6B7280] mt-2">Acabaram de chegar no nosso estoque</p>
          </div>
          <Suspense fallback={<CardsSkeleton count={3} />}><NewArrivals /></Suspense>
          <div className="mt-10 text-center">
            <ButtonLink href="/estoque" variant="outline" className="px-8 h-11 gap-2">
              Ver todo o estoque <ArrowRight size={16} />
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ─── Banner luxo 1 ───────────────────────────────── */}
      <section className="relative h-72 sm:h-96 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=85&fit=crop"
          alt="Carro de luxo em estrada"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050B33]/80 via-[#050B33]/40 to-transparent" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center text-center">
          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-white drop-shadow-lg">
            Veículos com história e procedência
          </h2>
          <p className="mt-3 text-white/70 text-base sm:text-lg max-w-xl mx-auto">
            Cada carro do nosso estoque passa por inspeção rigorosa antes de ser anunciado.
          </p>
          <div className="mt-6">
            <ButtonLink href="/estoque" className="bg-[#1454D9] hover:bg-[#1044B8] text-white h-11 px-8 gap-2">
              Ver estoque completo <ArrowRight size={16} />
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ─── Destaques ───────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#F5F7FB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#111827]">Veículos em destaque</h2>
            <p className="text-[#6B7280] mt-2">Seleção especial do nosso estoque</p>
          </div>
          <Suspense fallback={<CardsSkeleton count={4} />}><FeaturedVehicles /></Suspense>
          <div className="mt-10 text-center">
            <ButtonLink href="/estoque" variant="outline" className="px-8 h-11 gap-2">
              Ver todos os destaques <ArrowRight size={16} />
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ─── Marcas ──────────────────────────────────────── */}
      <section className="py-12 bg-white border-t border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-xl font-bold text-[#111827] mb-6 text-center">Principais marcas</h2>
          <BrandChips brands={brands.slice(0, 12)} />
        </div>
      </section>

      {/* ─── Bloco de confiança ──────────────────────────── */}
      <TrustSection />

      {/* ─── Banner luxo 2 ───────────────────────────────── */}
      <section className="relative h-80 sm:h-[420px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1563720223185-11003d516935?w=1920&q=85&fit=crop"
          alt="Interior de carro de luxo"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-white drop-shadow-lg">
            Não encontrou o carro ideal?
          </h2>
          <p className="mt-3 text-white/70 text-base sm:text-lg max-w-lg mx-auto">
            Fale com nossa equipe no WhatsApp. Nos diga o que você procura e encontramos para você.
          </p>
          <ButtonAnchor
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 bg-[#25D366] hover:bg-[#1DA851] text-white gap-2 h-12 px-10 text-base font-semibold"
          >
            <MessageCircle size={20} />
            Falar no WhatsApp
          </ButtonAnchor>
        </div>
      </section>

    </div>
  );
}
