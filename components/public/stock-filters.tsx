"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FUEL_TYPES, TRANSMISSION_TYPES } from "@/config/vehicle";
import type { Brand, Category } from "@/types/database";

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 20 }, (_, i) => CURRENT_YEAR - i);

const PRICE_RANGES = [
  { label: "Até R$ 30.000", key: "max_30000" },
  { label: "Até R$ 50.000", key: "max_50000" },
  { label: "Até R$ 80.000", key: "max_80000" },
  { label: "Até R$ 120.000", key: "max_120000" },
  { label: "Acima de R$ 120.000", key: "min_120000" },
];

const MILEAGE_RANGES = [
  { label: "Até 20.000 km", key: "20000" },
  { label: "Até 50.000 km", key: "50000" },
  { label: "Até 80.000 km", key: "80000" },
  { label: "Até 100.000 km", key: "100000" },
];

interface Props {
  brands: Brand[];
  categories: Category[];
}

export function StockFilters({ brands, categories }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "all") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("pagina");
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  function clearAll() {
    router.push(pathname);
  }

  const hasFilters = searchParams.size > 0;

  const handleChange = (key: string) => (value: string | null) => setParam(key, value);

  return (
    <aside className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-[#111827]">Filtros</h2>
        {hasFilters && (
          <button onClick={clearAll} className="text-xs text-[#1454D9] hover:underline flex items-center gap-1">
            <X size={12} /> Limpar
          </button>
        )}
      </div>

      <FilterGroup label="Categoria">
        <Select value={searchParams.get("categoria") ?? "all"} onValueChange={handleChange("categoria")}>
          <SelectTrigger className="h-10"><SelectValue placeholder="Todas" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {categories.map((c) => <SelectItem key={c.id} value={c.slug}>{c.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </FilterGroup>

      <FilterGroup label="Marca">
        <Select value={searchParams.get("marca") ?? "all"} onValueChange={handleChange("marca")}>
          <SelectTrigger className="h-10"><SelectValue placeholder="Todas" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {brands.map((b) => <SelectItem key={b.id} value={b.slug}>{b.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </FilterGroup>

      <FilterGroup label="Câmbio">
        <Select value={searchParams.get("cambio") ?? "all"} onValueChange={handleChange("cambio")}>
          <SelectTrigger className="h-10"><SelectValue placeholder="Todos" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {TRANSMISSION_TYPES.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </FilterGroup>

      <FilterGroup label="Combustível">
        <Select value={searchParams.get("combustivel") ?? "all"} onValueChange={handleChange("combustivel")}>
          <SelectTrigger className="h-10"><SelectValue placeholder="Todos" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {FUEL_TYPES.map((f) => <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </FilterGroup>

      <FilterGroup label="Ano mínimo">
        <Select value={searchParams.get("ano_min") ?? "all"} onValueChange={handleChange("ano_min")}>
          <SelectTrigger className="h-10"><SelectValue placeholder="Qualquer" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Qualquer</SelectItem>
            {YEARS.map((y) => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}
          </SelectContent>
        </Select>
      </FilterGroup>

      <FilterGroup label="Faixa de preço">
        <Select value={searchParams.get("preco") ?? "all"} onValueChange={handleChange("preco")}>
          <SelectTrigger className="h-10"><SelectValue placeholder="Qualquer" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Qualquer</SelectItem>
            {PRICE_RANGES.map((p) => <SelectItem key={p.key} value={p.key}>{p.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </FilterGroup>

      <FilterGroup label="Quilometragem máx.">
        <Select value={searchParams.get("km") ?? "all"} onValueChange={handleChange("km")}>
          <SelectTrigger className="h-10"><SelectValue placeholder="Qualquer" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Qualquer</SelectItem>
            {MILEAGE_RANGES.map((m) => <SelectItem key={m.key} value={m.key}>{m.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </FilterGroup>

      {hasFilters && (
        <Button onClick={clearAll} variant="outline" className="w-full text-[#6B7280]">
          Limpar todos os filtros
        </Button>
      )}
    </aside>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">{label}</Label>
      {children}
    </div>
  );
}
