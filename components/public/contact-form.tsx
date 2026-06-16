"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitContactForm, type ContactState } from "@/lib/actions/contact";
import { CheckCircle } from "lucide-react";

const initial: ContactState = {};

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContactForm, initial);

  if (state.success) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
        <div className="w-14 h-14 rounded-full bg-[#EEF3FD] flex items-center justify-center">
          <CheckCircle size={28} className="text-[#1454D9]" />
        </div>
        <h3 className="font-semibold text-[#111827] text-lg">Mensagem enviada!</h3>
        <p className="text-[#6B7280] text-sm">Entraremos em contato em breve.</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="name">Nome *</Label>
        <Input id="name" name="name" placeholder="Seu nome completo" className="h-11" />
        {state.fieldErrors?.name && <p className="text-xs text-red-500">{state.fieldErrors.name}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="phone">Telefone / WhatsApp</Label>
          <Input id="phone" name="phone" placeholder="(00) 00000-0000" className="h-11" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" name="email" type="email" placeholder="seu@email.com" className="h-11" />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message">Mensagem *</Label>
        <Textarea id="message" name="message" placeholder="Escreva sua mensagem..." rows={4} className="resize-none" />
        {state.fieldErrors?.message && <p className="text-xs text-red-500">{state.fieldErrors.message}</p>}
      </div>

      {state.error && <p className="text-sm text-red-500">{state.error}</p>}

      <Button
        type="submit"
        disabled={pending}
        className="w-full h-12 bg-[#1454D9] hover:bg-[#0F3FA8] text-white font-semibold"
      >
        {pending ? "Enviando..." : "Enviar mensagem"}
      </Button>
    </form>
  );
}
