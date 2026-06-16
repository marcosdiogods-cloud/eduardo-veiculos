-- ============================================================
-- Eduardo Veículos — Row Level Security Policies
-- ============================================================

-- Helper: verifica se o usuário tem role mínima
CREATE OR REPLACE FUNCTION is_admin_or_manager()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role IN ('admin', 'gerente')
    AND is_active = true
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION is_authenticated_staff()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND is_active = true
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ─── PROFILES ───────────────────────────────────────────────
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own"
  ON profiles FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "profiles_select_staff"
  ON profiles FOR SELECT
  USING (is_authenticated_staff());

CREATE POLICY "profiles_update_own"
  ON profiles FOR UPDATE
  USING (id = auth.uid());

CREATE POLICY "profiles_manage_admin"
  ON profiles FOR ALL
  USING (is_admin_or_manager());

-- ─── BRANDS ─────────────────────────────────────────────────
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;

-- Anon: leitura das marcas ativas
CREATE POLICY "brands_select_public"
  ON brands FOR SELECT
  TO anon
  USING (is_active = true);

-- Staff: leitura total
CREATE POLICY "brands_select_staff"
  ON brands FOR SELECT
  TO authenticated
  USING (true);

-- Admin/Gerente: escrita
CREATE POLICY "brands_write_admin"
  ON brands FOR ALL
  TO authenticated
  USING (is_admin_or_manager());

-- ─── CATEGORIES ─────────────────────────────────────────────
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "categories_select_public"
  ON categories FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "categories_select_staff"
  ON categories FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "categories_write_admin"
  ON categories FOR ALL
  TO authenticated
  USING (is_admin_or_manager());

-- ─── VEHICLE MODELS ─────────────────────────────────────────
ALTER TABLE vehicle_models ENABLE ROW LEVEL SECURITY;

CREATE POLICY "models_select_public"
  ON vehicle_models FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "models_select_staff"
  ON vehicle_models FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "models_write_admin"
  ON vehicle_models FOR ALL
  TO authenticated
  USING (is_admin_or_manager());

-- ─── FEATURES ───────────────────────────────────────────────
ALTER TABLE features ENABLE ROW LEVEL SECURITY;

CREATE POLICY "features_select_public"
  ON features FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "features_write_admin"
  ON features FOR ALL
  TO authenticated
  USING (is_admin_or_manager());

-- ─── VEHICLES ───────────────────────────────────────────────
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

-- Anon: só veículos publicados e não deletados
CREATE POLICY "vehicles_select_public"
  ON vehicles FOR SELECT
  TO anon
  USING (
    is_published = true
    AND status = 'publicado'
    AND deleted_at IS NULL
  );

-- Staff autenticado: vê tudo (exceto deletados)
CREATE POLICY "vehicles_select_staff"
  ON vehicles FOR SELECT
  TO authenticated
  USING (deleted_at IS NULL);

-- Editor+: pode criar e editar
CREATE POLICY "vehicles_insert_staff"
  ON vehicles FOR INSERT
  TO authenticated
  WITH CHECK (is_authenticated_staff());

CREATE POLICY "vehicles_update_staff"
  ON vehicles FOR UPDATE
  TO authenticated
  USING (is_authenticated_staff() AND deleted_at IS NULL);

-- Admin/Gerente: pode deletar (soft delete via updated)
CREATE POLICY "vehicles_delete_admin"
  ON vehicles FOR UPDATE
  TO authenticated
  USING (is_admin_or_manager());

-- ─── VEHICLE IMAGES ─────────────────────────────────────────
ALTER TABLE vehicle_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "vehicle_images_select_public"
  ON vehicle_images FOR SELECT
  TO anon
  USING (
    is_hidden = false
    AND EXISTS (
      SELECT 1 FROM vehicles v
      WHERE v.id = vehicle_images.vehicle_id
      AND v.is_published = true
      AND v.status = 'publicado'
      AND v.deleted_at IS NULL
    )
  );

CREATE POLICY "vehicle_images_select_staff"
  ON vehicle_images FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "vehicle_images_write_staff"
  ON vehicle_images FOR ALL
  TO authenticated
  USING (is_authenticated_staff());

-- ─── VEHICLE FEATURES ───────────────────────────────────────
ALTER TABLE vehicle_features ENABLE ROW LEVEL SECURITY;

CREATE POLICY "vfeatures_select_public"
  ON vehicle_features FOR SELECT
  TO anon
  USING (
    EXISTS (
      SELECT 1 FROM vehicles v
      WHERE v.id = vehicle_features.vehicle_id
      AND v.is_published = true
      AND v.status = 'publicado'
      AND v.deleted_at IS NULL
    )
  );

CREATE POLICY "vfeatures_select_staff"
  ON vehicle_features FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "vfeatures_write_staff"
  ON vehicle_features FOR ALL
  TO authenticated
  USING (is_authenticated_staff());

-- ─── BANNERS ────────────────────────────────────────────────
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "banners_select_public"
  ON banners FOR SELECT
  TO anon
  USING (
    status = 'ativo'
    AND (starts_at IS NULL OR starts_at <= now())
    AND (ends_at IS NULL OR ends_at >= now())
  );

CREATE POLICY "banners_select_staff"
  ON banners FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "banners_write_admin"
  ON banners FOR ALL
  TO authenticated
  USING (is_admin_or_manager());

-- ─── TESTIMONIALS ───────────────────────────────────────────
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "testimonials_select_public"
  ON testimonials FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "testimonials_select_staff"
  ON testimonials FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "testimonials_write_admin"
  ON testimonials FOR ALL
  TO authenticated
  USING (is_admin_or_manager());

-- ─── SITE SETTINGS ──────────────────────────────────────────
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "settings_select_public"
  ON site_settings FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "settings_select_staff"
  ON site_settings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "settings_write_admin"
  ON site_settings FOR ALL
  TO authenticated
  USING (is_admin_or_manager());

-- ─── WHATSAPP CLICKS ────────────────────────────────────────
ALTER TABLE whatsapp_clicks ENABLE ROW LEVEL SECURITY;

-- Anon pode inserir (registrar clique)
CREATE POLICY "wclicks_insert_anon"
  ON whatsapp_clicks FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "wclicks_insert_auth"
  ON whatsapp_clicks FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Só staff lê
CREATE POLICY "wclicks_select_staff"
  ON whatsapp_clicks FOR SELECT
  TO authenticated
  USING (is_authenticated_staff());

-- ─── CONTACT MESSAGES ───────────────────────────────────────
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "contact_insert_anon"
  ON contact_messages FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "contact_insert_auth"
  ON contact_messages FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "contact_select_staff"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (is_authenticated_staff());

CREATE POLICY "contact_update_staff"
  ON contact_messages FOR UPDATE
  TO authenticated
  USING (is_authenticated_staff());

-- ─── ACTIVITY LOGS ──────────────────────────────────────────
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "logs_insert_auth"
  ON activity_logs FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "logs_select_admin"
  ON activity_logs FOR SELECT
  TO authenticated
  USING (is_admin_or_manager());
