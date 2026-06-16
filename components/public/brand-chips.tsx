"use client";

import Link from "next/link";
import Image from "next/image";
import type { Brand } from "@/types/database";

// Logos via CDN público — sem direitos autorais para uso referencial
const BRAND_LOGOS: Record<string, string> = {
  chevrolet:    "https://www.carlogos.org/car-logos/chevrolet-logo-2013-download.png",
  volkswagen:   "https://www.carlogos.org/car-logos/volkswagen-logo-2019-download.png",
  fiat:         "https://www.carlogos.org/car-logos/fiat-logo-2020-download.png",
  ford:         "https://www.carlogos.org/car-logos/ford-logo-download.png",
  toyota:       "https://www.carlogos.org/car-logos/toyota-logo-2019-download.png",
  honda:        "https://www.carlogos.org/car-logos/honda-logo-download.png",
  hyundai:      "https://www.carlogos.org/car-logos/hyundai-logo-download.png",
  jeep:         "https://www.carlogos.org/car-logos/jeep-logo-download.png",
  renault:      "https://www.carlogos.org/car-logos/renault-logo-2021-download.png",
  nissan:       "https://www.carlogos.org/car-logos/nissan-logo-download.png",
  mitsubishi:   "https://www.carlogos.org/car-logos/mitsubishi-logo-download.png",
  bmw:          "https://www.carlogos.org/car-logos/bmw-logo-2020-download.png",
  "mercedes-benz": "https://www.carlogos.org/car-logos/mercedes-benz-logo-2011-download.png",
  audi:         "https://www.carlogos.org/car-logos/audi-logo-2016-download.png",
  kia:          "https://www.carlogos.org/car-logos/kia-logo-2021-download.png",
  peugeot:      "https://www.carlogos.org/car-logos/peugeot-logo-2021-download.png",
  citroen:      "https://www.carlogos.org/car-logos/citroen-logo-2022-download.png",
  "land-rover": "https://www.carlogos.org/car-logos/land-rover-logo-download.png",
  volvo:        "https://www.carlogos.org/car-logos/volvo-logo-download.png",
  subaru:       "https://www.carlogos.org/car-logos/subaru-logo-download.png",
  byd:          "https://www.carlogos.org/car-logos/byd-logo-download.png",
};

interface Props {
  brands: Brand[];
}

export function BrandChips({ brands }: Props) {
  return (
    <div className="flex items-center justify-center flex-wrap gap-5 pb-2">
      {brands.map((brand) => {
        const logo = brand.logo_url ?? BRAND_LOGOS[brand.slug];
        return (
          <Link
            key={brand.id}
            href={`/estoque?marca=${brand.slug}`}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-16 h-16 rounded-2xl bg-white border border-[#E5E7EB] group-hover:border-[#1454D9] group-hover:shadow-md transition-all flex items-center justify-center p-2.5">
              {logo ? (
                <Image
                  src={logo}
                  alt={brand.name}
                  width={48}
                  height={48}
                  className="object-contain w-full h-full"
                  unoptimized
                />
              ) : (
                <span className="text-[11px] font-bold text-[#374151] text-center leading-tight">
                  {brand.name.slice(0, 3).toUpperCase()}
                </span>
              )}
            </div>
            <span className="text-xs text-[#6B7280] group-hover:text-[#1454D9] font-medium transition-colors">
              {brand.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
