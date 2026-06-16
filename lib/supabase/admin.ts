import { createClient } from "@supabase/supabase-js";

// Cliente com service_role — NUNCA usar no browser/client components
// Usar apenas em Server Actions e Route Handlers
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY não configurado. Verifique as variáveis de ambiente."
    );
  }

  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
