import type { Metadata } from "next";
import Image from "next/image";
import { MessageCircle, MapPin, Phone, Clock, Mail, Shield, Star, Users, CheckCircle, ArrowRight, Award, ThumbsUp } from "lucide-react";
import { ButtonLink, ButtonAnchor } from "@/components/ui/button-link";
import { buildWhatsAppUrl } from "@/lib/utils/whatsapp";

export const metadata: Metadata = {
  title: "Sobre nós | Eduardo Veículos",
  description: "Fundada em 2021, a Eduardo Veículos é referência em seminovos em Anápolis-GO. Transparência, qualidade e atendimento personalizado.",
};

const diferenciais = [
  {
    icon: Shield,
    titulo: "Procedência garantida",
    descricao: "Todos os veículos passam por laudo cautelar completo antes de entrar no estoque. Você compra com total segurança jurídica e mecânica.",
  },
  {
    icon: Star,
    titulo: "Avaliação 4.9 no Google",
    descricao: "Centenas de clientes avaliaram nossa experiência de compra. Somos referência em satisfação e confiança no mercado de Anápolis.",
  },
  {
    icon: Users,
    titulo: "Atendimento personalizado",
    descricao: "Cada cliente é único. Nossa equipe ouve suas necessidades e apresenta as melhores opções dentro do seu perfil e orçamento.",
  },
  {
    icon: Award,
    titulo: "Documentação em dia",
    descricao: "Cuidamos de toda a burocracia para você. Transferência, IPVA e licenciamento resolvidos com agilidade e sem surpresas.",
  },
  {
    icon: ThumbsUp,
    titulo: "Financiamento facilitado",
    descricao: "Trabalhamos com as principais financeiras do país para encontrar as melhores taxas e condições de parcelamento para o seu caso.",
  },
  {
    icon: CheckCircle,
    titulo: "Pós-venda presente",
    descricao: "Nosso relacionamento não termina na venda. Estamos disponíveis para tirar dúvidas e apoiar você após a compra do seu veículo.",
  },
];

const numeros = [
  { valor: "2021", label: "Fundação da empresa" },
  { valor: "500+", label: "Clientes satisfeitos" },
  { valor: "4.9★", label: "Avaliação Google" },
  { valor: "100%", label: "Procedência verificada" },
];

const depoimentos = [
  {
    nome: "Carlos Mendes",
    cidade: "Anápolis – GO",
    texto: "Comprei meu Corolla aqui e foi a melhor experiência que já tive numa compra de carro. Tudo transparente, sem pressão e o carro estava impecável.",
  },
  {
    nome: "Fernanda Oliveira",
    cidade: "Goiânia – GO",
    texto: "Fui indicada por uma amiga e não me arrependo. Atendimento excelente, financiamento aprovado rápido e entrega no prazo combinado. Recomendo demais!",
  },
  {
    nome: "Ricardo Santos",
    cidade: "Anápolis – GO",
    texto: "Já é o segundo carro que compro na Eduardo Veículos. Voltei porque confio no trabalho deles. Profissionais sérios e honestos.",
  },
];

export default function SobrePage() {
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <div className="flex flex-col">

      {/* ─── Hero Banner ─── */}
      <section className="relative h-[420px] sm:h-[500px] overflow-hidden">
        <Image
          src="/about-hero.png"
          alt="Eduardo Veículos — Sobre nós"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050B33]/85 via-[#050B33]/60 to-[#050B33]/30" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#60A5FA] mb-4">Nossa história</span>
          <h1 className="font-heading text-5xl sm:text-7xl font-bold text-white leading-none">
            Sobre<br />
            <span className="text-[#1454D9]">Nós</span>
          </h1>
          <p className="mt-5 text-white/70 text-base sm:text-lg max-w-md leading-relaxed">
            Referência em seminovos em Anápolis desde 2021. Transparência, qualidade e respeito pelo cliente em cada negociação.
          </p>
        </div>
      </section>

      {/* ─── Nossa missão ─── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#1454D9]">Quem somos</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#111827] mt-3">
              Realizamos o sonho do carro próprio com transparência
            </h2>
            <p className="mt-6 text-[#6B7280] text-lg leading-relaxed">
              Fundada em 2021, a Eduardo Veículos nasceu com uma missão clara: tornar a compra de um seminovo uma experiência simples, segura e honesta. Em um mercado cheio de incertezas, somos a referência em Anápolis para quem quer comprar com confiança.
            </p>
            <p className="mt-4 text-[#6B7280] leading-relaxed">
              Somos especializados na venda de veículos novos e seminovos, oferecendo uma experiência diferenciada para quem busca qualidade, confiança e atendimento personalizado. Cada veículo do nosso estoque é criteriosamente selecionado e inspecionado antes de ser disponibilizado ao cliente.
            </p>
            <p className="mt-4 text-[#6B7280] leading-relaxed">
              Na Eduardo Veículos, não vendemos apenas carros — criamos relações de confiança. Trabalhamos com diversas marcas e modelos, sempre com ótimas condições de pagamento e financiamento facilitado para que o seu sonho se torne realidade.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Números ─── */}
      <section className="py-14 bg-[#050B33]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
            {numeros.map((n) => (
              <div key={n.label} className="text-center px-8">
                <p className="font-heading text-4xl sm:text-5xl font-bold text-white">{n.valor}</p>
                <p className="text-white/50 text-sm mt-2 tracking-wide">{n.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Diferenciais ─── */}
      <section className="py-16 sm:py-20 bg-[#F5F7FB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#1454D9]">Por que nos escolher</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#111827] mt-3">
              O que nos diferencia no mercado
            </h2>
            <p className="mt-3 text-[#6B7280] max-w-xl mx-auto">
              Cada detalhe do nosso processo foi pensado para garantir a melhor experiência possível para você.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {diferenciais.map((d) => (
              <div
                key={d.titulo}
                className="bg-white rounded-2xl border border-[#E5E7EB] p-7 text-center w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] min-w-[260px] max-w-[380px]"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#EEF3FD] mb-5">
                  <d.icon size={26} className="text-[#1454D9]" />
                </div>
                <h3 className="font-heading font-bold text-[#111827] text-lg mb-3">{d.titulo}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">{d.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Banner CTA ─── */}
      <section className="relative h-72 sm:h-80 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=85&fit=crop"
          alt="Carro de luxo"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#050B33]/75" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-white drop-shadow-lg">
            Venha nos visitar em Anápolis
          </h2>
          <p className="mt-3 text-white/70 max-w-lg mx-auto">
            Nossa equipe está pronta para encontrar o carro ideal dentro do seu perfil e orçamento. Sem pressão, sem enrolação.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <ButtonAnchor
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#1DA851] text-white gap-2 h-12 px-8 font-semibold"
            >
              <MessageCircle size={18} />
              Falar no WhatsApp
            </ButtonAnchor>
            <ButtonLink href="/estoque" variant="outline" className="h-12 px-8 gap-2 border-white/30 text-white hover:bg-white/10">
              Ver estoque <ArrowRight size={16} />
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ─── Depoimentos ─── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#1454D9]">Depoimentos</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#111827] mt-3">
              O que nossos clientes dizem
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {depoimentos.map((d) => (
              <div
                key={d.nome}
                className="bg-[#F5F7FB] rounded-2xl border border-[#E5E7EB] p-7 text-center w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] min-w-[260px] max-w-[380px]"
              >
                <div className="flex justify-center gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-[#FBBF24] text-[#FBBF24]" />
                  ))}
                </div>
                <p className="text-[#374151] text-sm leading-relaxed italic">"{d.texto}"</p>
                <div className="mt-5 pt-5 border-t border-[#E5E7EB]">
                  <p className="font-semibold text-[#111827] text-sm">{d.nome}</p>
                  <p className="text-[#9CA3AF] text-xs mt-0.5">{d.cidade}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Localização ─── */}
      <section className="py-16 sm:py-20 bg-[#F5F7FB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#1454D9]">Onde estamos</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#111827] mt-3">Como nos encontrar</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 text-center space-y-5">
              <div className="flex flex-col items-center gap-2">
                <MapPin size={22} className="text-[#1454D9]" />
                <div>
                  <p className="font-semibold text-[#111827]">Endereço</p>
                  <p className="text-[#6B7280] text-sm mt-1">Av. Brasil Sul, Nº 4122 - St. Sul Jamil Miguel<br />Anápolis - GO, 75124-820</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Phone size={20} className="text-[#1454D9]" />
                <div>
                  <p className="font-semibold text-[#111827]">Telefone / WhatsApp</p>
                  <a href="tel:+556299487-0068" className="text-[#1454D9] text-sm hover:underline mt-1 block">(62) 99487-0068</a>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Mail size={20} className="text-[#1454D9]" />
                <div>
                  <p className="font-semibold text-[#111827]">E-mail</p>
                  <a href="mailto:eduardoveiculosanapolis@gmail.com" className="text-[#1454D9] text-sm hover:underline mt-1 block break-all">
                    eduardoveiculosanapolis@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Clock size={20} className="text-[#1454D9]" />
                <div>
                  <p className="font-semibold text-[#111827]">Horário de funcionamento</p>
                  <p className="text-[#6B7280] text-sm mt-1">Seg–Sex: 8h às 18h<br />Sábado: 8h às 13h</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-[#E5E7EB] h-96 lg:h-full min-h-[380px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.0!2d-48.961681!3d-16.35731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef49c3e2e8b2f%3A0x8d1a2e2e2e2e8d11!2sEduardo%20Ve%C3%ADculos!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr&cid=10167603834099345297"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Eduardo Veículos"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
