import { ShieldCheck, ThumbsUp, Headphones, FileText } from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "Veículos verificados",
    description: "Todos os nossos veículos passam por inspeção rigorosa antes de serem anunciados.",
  },
  {
    icon: FileText,
    title: "Documentação em dia",
    description: "Garantimos que toda documentação está regularizada para uma compra tranquila.",
  },
  {
    icon: ThumbsUp,
    title: "Procedência garantida",
    description: "Histórico completo do veículo, com rastreamento de proprietários anteriores.",
  },
  {
    icon: Headphones,
    title: "Suporte dedicado",
    description: "Nossa equipe está disponível para tirar dúvidas e auxiliar em todo o processo.",
  },
];

export function TrustSection() {
  return (
    <section className="py-16 bg-[#F5F7FB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#111827]">
            Por que comprar com a gente?
          </h2>
          <p className="mt-3 text-[#6B7280] max-w-xl mx-auto">
            Mais de X anos no mercado com transparência, qualidade e respeito pelo cliente.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-6 text-center border border-[#E5E7EB] hover:border-[#1454D9]/30 hover:shadow-sm transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#EEF3FD] flex items-center justify-center mx-auto mb-4">
                <item.icon size={22} className="text-[#1454D9]" />
              </div>
              <h3 className="font-semibold text-[#111827] mb-2">{item.title}</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
