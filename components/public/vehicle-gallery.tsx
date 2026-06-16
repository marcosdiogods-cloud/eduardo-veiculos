"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { VehicleImage } from "@/types/database";

interface Props {
  images: VehicleImage[];
  vehicleName: string;
}

export function VehicleGallery({ images, vehicleName }: Props) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const visibleImages = images.filter((i) => !i.is_hidden);
  if (visibleImages.length === 0) {
    return (
      <div className="aspect-[4/3] bg-[#F5F7FB] rounded-2xl flex items-center justify-center text-[#D1D5DB]">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h12l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      </div>
    );
  }

  function prev() {
    setActive((a) => (a === 0 ? visibleImages.length - 1 : a - 1));
  }
  function next() {
    setActive((a) => (a === visibleImages.length - 1 ? 0 : a + 1));
  }

  return (
    <div className="space-y-3">
      {/* Imagem principal */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F5F7FB] group">
        <Image
          src={visibleImages[active].url}
          alt={visibleImages[active].alt ?? vehicleName}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 55vw"
          priority
        />

        {/* Controles prev/next */}
        {visibleImages.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Botão lightbox */}
        <button
          onClick={() => setLightbox(true)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100"
        >
          <ZoomIn size={16} />
        </button>

        {/* Contador */}
        <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs font-medium px-2 py-1 rounded-full">
          {active + 1} / {visibleImages.length}
        </div>
      </div>

      {/* Thumbnails */}
      {visibleImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {visibleImages.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActive(i)}
              className={cn(
                "relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all",
                i === active
                  ? "border-[#1454D9] opacity-100"
                  : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={img.url}
                alt={img.alt ?? `Foto ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
          >
            <X size={20} />
          </button>

          {visibleImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          <div
            className="relative w-full max-w-5xl max-h-[85vh] aspect-video mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={visibleImages[active].url}
              alt={visibleImages[active].alt ?? vehicleName}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </div>
  );
}
