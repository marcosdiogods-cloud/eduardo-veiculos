"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  phone: z.string().optional(),
  email: z.string().email("E-mail inválido").optional().or(z.literal("")),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

export type ContactState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof ContactSchema>, string>>;
};

export async function submitContactForm(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const raw = {
    name: formData.get("name") as string,
    phone: formData.get("phone") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
  };

  const result = ContactSchema.safeParse(raw);
  if (!result.success) {
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as keyof typeof fieldErrors;
      if (key) fieldErrors[key] = issue.message;
    }
    return { fieldErrors };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").insert({
    name: result.data.name,
    phone: result.data.phone || null,
    email: result.data.email || null,
    message: result.data.message,
    origin: "formulario",
  });

  if (error) return { error: "Erro ao enviar mensagem. Tente novamente." };

  return { success: true };
}
