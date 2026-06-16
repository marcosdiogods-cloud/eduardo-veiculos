"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonAnchor } from "@/components/ui/button-link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/utils/whatsapp";
import { cn } from "@/lib/utils/cn";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <header className="sticky top-0 z-50 bg-[#050B33] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/logo-oficial.png"
              alt="Eduardo Veículos"
              width={140}
              height={56}
              className="h-12 w-auto object-contain brightness-0 invert"
              priority
            />
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "text-white bg-white/15"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA WhatsApp desktop */}
          <div className="hidden md:block">
            <ButtonAnchor
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#1DA851] text-white gap-2 font-semibold"
            >
              <MessageCircle size={18} />
              WhatsApp
            </ButtonAnchor>
          </div>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <button
                  className="md:hidden p-2 rounded-lg text-white/80 hover:bg-white/10"
                  aria-label="Abrir menu"
                />
              }
            >
              <Menu size={22} />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB] bg-[#050B33]">
                  <Image
                    src="/logo-oficial.png"
                    alt="Eduardo Veículos"
                    width={120}
                    height={48}
                    className="h-10 w-auto object-contain brightness-0 invert"
                  />
                </div>

                <nav className="flex flex-col gap-1 p-4 flex-1">
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-xl text-base font-medium transition-colors",
                      pathname === "/"
                        ? "text-[#1454D9] bg-[#EEF3FD]"
                        : "text-[#374151] hover:bg-[#F5F7FB]"
                    )}
                  >
                    Início
                  </Link>
                  {siteConfig.nav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "px-4 py-3 rounded-xl text-base font-medium transition-colors",
                        pathname === item.href
                          ? "text-[#1454D9] bg-[#EEF3FD]"
                          : "text-[#374151] hover:bg-[#F5F7FB]"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className="p-4 border-t border-[#E5E7EB]">
                  <ButtonAnchor
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white gap-2 font-semibold h-12 text-base"
                  >
                    <MessageCircle size={20} />
                    Falar no WhatsApp
                  </ButtonAnchor>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
