"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SORT_OPTIONS } from "@/config/vehicle";
import type { Brand, Category } from "@/types/database";
import { StockFilters } from "./stock-filters";

interface Props {
  total: number;
  brands: Brand[];
  categories: Category[];
}

export function StockToolbar({ total, brands, categories }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function setSort(value: string | null) {
    if (!value) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("ordem", value);
    params.delete("pagina");
    router.push(`${pathname}?${params.toString()}`);
  }

  const currentSort = searchParams.get("ordem") ?? "mais_recente";

  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-[#E5E7EB]">
      <p className="text-sm text-[#6B7280]">
        <span className="font-semibold text-[#111827]">{total}</span> veículo{total !== 1 ? "s" : ""} encontrado{total !== 1 ? "s" : ""}
      </p>

      <div className="flex items-center gap-2">
        {/* Filtros mobile */}
        <Sheet>
          <SheetTrigger
            render={
              <button className="lg:hidden inline-flex items-center gap-2 h-8 px-3 rounded-lg border border-[#E5E7EB] text-sm font-medium text-[#374151] hover:bg-[#F5F7FB] transition-colors" />
            }
          >
            <SlidersHorizontal size={15} />
            Filtros
          </SheetTrigger>
          <SheetContent side="left" className="w-80 overflow-y-auto">
            <div className="pt-6">
              <StockFilters brands={brands} categories={categories} />
            </div>
          </SheetContent>
        </Sheet>

        {/* Ordenação */}
        <Select value={currentSort} onValueChange={setSort}>
          <SelectTrigger className="h-9 w-48 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
