"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import type { Category } from "@/types/database";

interface Props {
  categories: Category[];
}

export function CategoryChips({ categories }: Props) {
  const searchParams = useSearchParams();
  const active = searchParams.get("categoria");

  return (
    <div className="flex items-center justify-center flex-wrap gap-2 pb-1">
      <Link
        href="/estoque"
        className={cn(
          "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors border",
          !active
            ? "bg-[#1454D9] text-white border-[#1454D9]"
            : "bg-white text-[#374151] border-[#E5E7EB] hover:border-[#1454D9] hover:text-[#1454D9]"
        )}
      >
        Todos
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/estoque?categoria=${cat.slug}`}
          className={cn(
            "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors border",
            active === cat.slug
              ? "bg-[#1454D9] text-white border-[#1454D9]"
              : "bg-white text-[#374151] border-[#E5E7EB] hover:border-[#1454D9] hover:text-[#1454D9]"
          )}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}
