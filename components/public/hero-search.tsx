"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function HeroSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("busca", query.trim());
    router.push(`/estoque?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-xl mx-auto">
      <div className="relative flex-1">
        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280]" />
        <Input
          type="text"
          placeholder="Marca, modelo ou versão..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 h-12 text-base bg-white border-0 shadow-sm rounded-xl"
        />
      </div>
      <Button
        type="submit"
        className="h-12 px-6 bg-[#1454D9] hover:bg-[#0F3FA8] text-white font-semibold rounded-xl"
      >
        Buscar
      </Button>
    </form>
  );
}
