import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#050B33] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Marca */}
          <div className="lg:col-span-2">
            <Image
              src="/logo-oficial.png"
              alt="Eduardo Veículos"
              width={160}
              height={64}
              className="h-14 w-auto object-contain brightness-0 invert"
            />
            <p className="mt-4 text-white/60 text-sm leading-relaxed max-w-sm">
              Encontre seu próximo carro com segurança e procedência. Amplo estoque de veículos
              seminovos e usados selecionados com qualidade garantida.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-widest text-white/40 mb-4">
              Navegação
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/70 hover:text-white text-sm transition-colors">
                  Início
                </Link>
              </li>
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-widest text-white/40 mb-4">
              Contato
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/70">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-[#1454D9]" />
                <span>Av. Brasil Sul, Nº 4122 - St. Sul Jamil Miguel, Anápolis - GO</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Phone size={16} className="flex-shrink-0 text-[#1454D9]" />
                <a href="tel:+556299487-0068" className="hover:text-white transition-colors">(62) 99487-0068</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Mail size={16} className="flex-shrink-0 text-[#1454D9]" />
                <a href="mailto:eduardoveiculosanapolis@gmail.com" className="hover:text-white transition-colors break-all">eduardoveiculosanapolis@gmail.com</a>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/70">
                <Clock size={16} className="mt-0.5 flex-shrink-0 text-[#1454D9]" />
                <span>Seg–Sex: 8h–18h<br />Sáb: 8h–13h</span>
              </li>
            </ul>

            {/* Redes sociais */}
            <div className="flex gap-3 mt-5">
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#1454D9] flex items-center justify-center transition-colors text-sm font-bold"
              >
                In
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#1454D9] flex items-center justify-center transition-colors text-sm font-bold"
              >
                Fb
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col items-center gap-2 text-xs text-white/40 text-center">
          <p>© {year} Eduardo Veículos. Todos os direitos reservados.</p>
          <p>Desenvolvido com excelência</p>
        </div>
      </div>
    </footer>
  );
}
