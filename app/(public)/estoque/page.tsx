import { Suspense } from "react";
import type { Metadata } from "next";
import { VehicleCard } from "@/components/public/vehicle-card";
import { StockFilters } from "@/components/public/stock-filters";
import { StockToolbar } from "@/components/public/stock-toolbar";
import { Pagination } from "@/components/public/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { getPublishedVehicles } from "@/lib/queries/vehicles";
import { getActiveBrands, getActiveCategories } from "@/lib/queries/site";
import type { VehicleFilters } from "@/types/database";

export const metadata: Metadata = {
  title: "Estoque de Veículos",
  description:
    "Confira nosso estoque completo de veículos seminovos e usados. Filtre por marca, modelo, preço, câmbio e combustível.",
};

interface Props {
  searchParams: Promise<Record<string, string | undefined>>;
}

function parseFilters(params: Record<string, string | undefined>): VehicleFilters {
  const filters: VehicleFilters = {
    search: params.busca,
    brand_slug: params.marca,
    category_slug: params.categoria,
    sort: (params.ordem as VehicleFilters["sort"]) ?? "mais_recente",
    page: params.pagina ? Number(params.pagina) : 1,
    per_page: 12,
  };

  if (params.cambio) filters.transmission = params.cambio as any;
  if (params.combustivel) filters.fuel = params.combustivel as any;
  if (params.ano_min) filters.year_min = Number(params.ano_min);
  if (params.km) filters.mileage_max = Number(params.km);

  if (params.preco) {
    if (params.preco.startsWith("max_")) {
      filters.price_max = Number(params.preco.replace("max_", ""));
    } else if (params.preco.startsWith("min_")) {
      filters.price_min = Number(params.preco.replace("min_", ""));
    }
  }

  return filters;
}

export default async function EstoquePage({ searchParams }: Props) {
  const params = await searchParams;
  const filters = parseFilters(params);

  const [result, brands, categories] = await Promise.all([
    getPublishedVehicles(filters),
    getActiveBrands(),
    getActiveCategories(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 text-center">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#111827]">
          Estoque de veículos
        </h1>
        <p className="text-[#6B7280] mt-1">
          Veículos seminovos e usados selecionados com qualidade e procedência
        </p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar filtros — desktop */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24 bg-white rounded-2xl border border-[#E5E7EB] p-5">
            <Suspense>
              <StockFilters brands={brands} categories={categories} />
            </Suspense>
          </div>
        </aside>

        {/* Conteúdo principal */}
        <div className="flex-1 min-w-0">
          <Suspense>
            <StockToolbar
              total={result.total}
              brands={brands}
              categories={categories}
            />
          </Suspense>

          {result.data.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.5" className="mb-4">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <h3 className="text-lg font-semibold text-[#374151]">Nenhum veículo encontrado</h3>
              <p className="text-[#6B7280] mt-1 text-sm">Tente ajustar os filtros de busca</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
                {result.data.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>

              <Suspense>
                <Pagination
                  currentPage={result.page}
                  totalPages={result.total_pages}
                />
              </Suspense>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
