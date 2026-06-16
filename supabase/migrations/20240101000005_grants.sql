-- ============================================================
-- Eduardo Veículos — Grants para roles anon e authenticated
-- RLS policies existem mas os GRANTs base estavam faltando
-- ============================================================

-- ─── anon: leitura das tabelas públicas ─────────────────────
GRANT SELECT ON public.brands          TO anon;
GRANT SELECT ON public.categories      TO anon;
GRANT SELECT ON public.vehicle_models  TO anon;
GRANT SELECT ON public.features        TO anon;
GRANT SELECT ON public.vehicles        TO anon;
GRANT SELECT ON public.vehicle_images  TO anon;
GRANT SELECT ON public.vehicle_features TO anon;
GRANT SELECT ON public.banners         TO anon;
GRANT SELECT ON public.testimonials    TO anon;
GRANT SELECT ON public.site_settings   TO anon;

-- anon: inserção permitida (cliques e contato)
GRANT INSERT ON public.whatsapp_clicks  TO anon;
GRANT INSERT ON public.contact_messages TO anon;

-- ─── authenticated: tudo que anon tem + escrita ──────────────
GRANT SELECT ON public.brands          TO authenticated;
GRANT SELECT ON public.categories      TO authenticated;
GRANT SELECT ON public.vehicle_models  TO authenticated;
GRANT SELECT ON public.features        TO authenticated;
GRANT SELECT ON public.vehicles        TO authenticated;
GRANT SELECT ON public.vehicle_images  TO authenticated;
GRANT SELECT ON public.vehicle_features TO authenticated;
GRANT SELECT ON public.banners         TO authenticated;
GRANT SELECT ON public.testimonials    TO authenticated;
GRANT SELECT ON public.site_settings   TO authenticated;
GRANT SELECT ON public.whatsapp_clicks TO authenticated;
GRANT SELECT ON public.contact_messages TO authenticated;
GRANT SELECT ON public.activity_logs   TO authenticated;
GRANT SELECT ON public.profiles        TO authenticated;

GRANT INSERT, UPDATE ON public.brands          TO authenticated;
GRANT INSERT, UPDATE ON public.categories      TO authenticated;
GRANT INSERT, UPDATE ON public.vehicle_models  TO authenticated;
GRANT INSERT, UPDATE ON public.features        TO authenticated;
GRANT INSERT, UPDATE ON public.vehicles        TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.vehicle_images   TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.vehicle_features TO authenticated;
GRANT INSERT, UPDATE ON public.banners         TO authenticated;
GRANT INSERT, UPDATE ON public.testimonials    TO authenticated;
GRANT INSERT, UPDATE ON public.site_settings   TO authenticated;
GRANT INSERT ON public.whatsapp_clicks         TO authenticated;
GRANT INSERT ON public.contact_messages        TO authenticated;
GRANT INSERT ON public.activity_logs           TO authenticated;
GRANT UPDATE ON public.profiles                TO authenticated;
