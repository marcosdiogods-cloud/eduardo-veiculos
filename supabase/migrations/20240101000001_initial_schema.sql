-- ============================================================
-- Eduardo Veículos — Schema inicial
-- ============================================================

-- Extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- ─── ENUMS ──────────────────────────────────────────────────

CREATE TYPE vehicle_status AS ENUM (
  'rascunho', 'publicado', 'reservado', 'vendido', 'inativo', 'arquivado'
);

CREATE TYPE transmission_type AS ENUM (
  'manual', 'automatico', 'automatizado', 'cvt'
);

CREATE TYPE fuel_type AS ENUM (
  'flex', 'gasolina', 'etanol', 'diesel', 'hibrido', 'eletrico', 'gnv'
);

CREATE TYPE conservation_state AS ENUM (
  'excelente', 'otimo', 'bom', 'regular'
);

CREATE TYPE user_role AS ENUM (
  'admin', 'gerente', 'editor'
);

CREATE TYPE feature_category AS ENUM (
  'conforto', 'seguranca', 'tecnologia', 'exterior'
);

CREATE TYPE lead_origin AS ENUM (
  'whatsapp', 'formulario', 'instagram', 'google', 'meta_ads',
  'indicacao', 'ligacao', 'loja_fisica', 'outro'
);

CREATE TYPE banner_status AS ENUM (
  'ativo', 'inativo', 'agendado'
);

-- ─── PROFILES (usuários do painel) ──────────────────────────

CREATE TABLE profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  avatar_url  TEXT,
  role        user_role NOT NULL DEFAULT 'editor',
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── BRANDS ─────────────────────────────────────────────────

CREATE TABLE brands (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       TEXT NOT NULL,
  slug       TEXT NOT NULL UNIQUE,
  logo_url   TEXT,
  is_active  BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_brands_slug ON brands(slug);
CREATE INDEX idx_brands_active ON brands(is_active);

-- ─── CATEGORIES ─────────────────────────────────────────────

CREATE TABLE categories (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  icon        TEXT,
  description TEXT,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  sort_order  INT NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_categories_slug ON categories(slug);

-- ─── VEHICLE MODELS ─────────────────────────────────────────

CREATE TABLE vehicle_models (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id   UUID NOT NULL REFERENCES brands(id) ON DELETE RESTRICT,
  name       TEXT NOT NULL,
  slug       TEXT NOT NULL,
  is_active  BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(brand_id, slug)
);

CREATE INDEX idx_vehicle_models_brand ON vehicle_models(brand_id);

-- ─── FEATURES (catálogo de opcionais) ───────────────────────

CREATE TABLE features (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key        TEXT NOT NULL UNIQUE,
  label      TEXT NOT NULL,
  category   feature_category NOT NULL DEFAULT 'conforto',
  sort_order INT NOT NULL DEFAULT 0
);

-- ─── VEHICLES ───────────────────────────────────────────────

CREATE TABLE vehicles (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Identificação
  brand_id        UUID NOT NULL REFERENCES brands(id) ON DELETE RESTRICT,
  model_id        UUID NOT NULL REFERENCES vehicle_models(id) ON DELETE RESTRICT,
  category_id     UUID REFERENCES categories(id) ON DELETE SET NULL,
  version         TEXT NOT NULL,

  -- Especificações
  year_fabrication INT NOT NULL,
  year_model       INT NOT NULL,
  mileage          INT NOT NULL DEFAULT 0,
  color            TEXT,
  transmission     transmission_type NOT NULL,
  fuel             fuel_type NOT NULL,
  doors            SMALLINT,
  plate_end        CHAR(1),

  -- Preço
  price            NUMERIC(12,2) NOT NULL,
  promotional_price NUMERIC(12,2),
  accepts_trade    BOOLEAN NOT NULL DEFAULT false,
  min_negotiation  NUMERIC(12,2),
  internal_notes   TEXT,

  -- Características
  is_armored       BOOLEAN NOT NULL DEFAULT false,
  single_owner     BOOLEAN NOT NULL DEFAULT false,
  ipva_paid        BOOLEAN NOT NULL DEFAULT false,
  has_warranty     BOOLEAN NOT NULL DEFAULT false,
  revisions_up_to_date BOOLEAN NOT NULL DEFAULT false,
  has_manual       BOOLEAN NOT NULL DEFAULT false,
  has_spare_key    BOOLEAN NOT NULL DEFAULT false,
  conservation     conservation_state,
  provenance       TEXT,
  description      TEXT,

  -- Publicação
  status           vehicle_status NOT NULL DEFAULT 'rascunho',
  is_published     BOOLEAN NOT NULL DEFAULT false,
  is_featured      BOOLEAN NOT NULL DEFAULT false,
  is_new_arrival   BOOLEAN NOT NULL DEFAULT false,
  show_price       BOOLEAN NOT NULL DEFAULT true,
  show_whatsapp    BOOLEAN NOT NULL DEFAULT true,
  published_at     TIMESTAMPTZ,
  sold_at          TIMESTAMPTZ,

  -- SEO
  slug             TEXT NOT NULL UNIQUE,
  seo_title        TEXT,
  seo_description  TEXT,
  share_text       TEXT,

  -- Métricas
  views_count          INT NOT NULL DEFAULT 0,
  whatsapp_clicks_count INT NOT NULL DEFAULT 0,

  -- Auditoria
  created_by  UUID REFERENCES profiles(id) ON DELETE SET NULL,
  updated_by  UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at  TIMESTAMPTZ
);

CREATE INDEX idx_vehicles_status ON vehicles(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_vehicles_brand ON vehicles(brand_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_vehicles_model ON vehicles(model_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_vehicles_category ON vehicles(category_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_vehicles_published ON vehicles(is_published, status) WHERE deleted_at IS NULL;
CREATE INDEX idx_vehicles_featured ON vehicles(is_featured) WHERE is_published = true AND deleted_at IS NULL;
CREATE INDEX idx_vehicles_slug ON vehicles(slug) WHERE deleted_at IS NULL;
CREATE INDEX idx_vehicles_price ON vehicles(price) WHERE is_published = true AND deleted_at IS NULL;
CREATE INDEX idx_vehicles_year ON vehicles(year_model DESC) WHERE is_published = true AND deleted_at IS NULL;
CREATE INDEX idx_vehicles_created ON vehicles(created_at DESC) WHERE deleted_at IS NULL;

-- ─── VEHICLE IMAGES ─────────────────────────────────────────

CREATE TABLE vehicle_images (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_id   UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  url          TEXT NOT NULL,
  alt          TEXT,
  sort_order   SMALLINT NOT NULL DEFAULT 0,
  is_primary   BOOLEAN NOT NULL DEFAULT false,
  is_hidden    BOOLEAN NOT NULL DEFAULT false,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_vehicle_images_vehicle ON vehicle_images(vehicle_id, sort_order);
CREATE INDEX idx_vehicle_images_primary ON vehicle_images(vehicle_id) WHERE is_primary = true;

-- ─── VEHICLE FEATURES (junction) ────────────────────────────

CREATE TABLE vehicle_features (
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  feature_id UUID NOT NULL REFERENCES features(id) ON DELETE CASCADE,
  PRIMARY KEY (vehicle_id, feature_id)
);

CREATE INDEX idx_vehicle_features_vehicle ON vehicle_features(vehicle_id);

-- ─── BANNERS ────────────────────────────────────────────────

CREATE TABLE banners (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title            TEXT NOT NULL,
  subtitle         TEXT,
  image_desktop    TEXT,
  image_mobile     TEXT,
  button_text      TEXT,
  button_url       TEXT,
  sort_order       SMALLINT NOT NULL DEFAULT 0,
  status           banner_status NOT NULL DEFAULT 'inativo',
  starts_at        TIMESTAMPTZ,
  ends_at          TIMESTAMPTZ,
  created_by       UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_banners_status ON banners(status, sort_order);

-- ─── TESTIMONIALS ───────────────────────────────────────────

CREATE TABLE testimonials (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_name TEXT NOT NULL,
  avatar_url  TEXT,
  content     TEXT NOT NULL,
  rating      SMALLINT CHECK (rating BETWEEN 1 AND 5),
  vehicle_name TEXT,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  sort_order  SMALLINT NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── SITE SETTINGS ──────────────────────────────────────────

CREATE TABLE site_settings (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  store_name          TEXT NOT NULL DEFAULT 'Eduardo Veículos',
  logo_url            TEXT,
  favicon_url         TEXT,
  cnpj                TEXT,
  phone               TEXT,
  whatsapp            TEXT,
  email               TEXT,
  address             TEXT,
  city                TEXT,
  state               CHAR(2),
  instagram_url       TEXT,
  facebook_url        TEXT,
  google_maps_url     TEXT,
  business_hours      JSONB,
  whatsapp_message    TEXT DEFAULT 'Olá, tenho interesse no {{vehicle_name}} anunciado no site. Pode me passar mais informações?',
  primary_color       TEXT DEFAULT '#1454D9',
  secondary_color     TEXT DEFAULT '#050B33',
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT single_row CHECK (id = id)
);

-- ─── WHATSAPP CLICKS (leads leves) ──────────────────────────

CREATE TABLE whatsapp_clicks (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_id  UUID REFERENCES vehicles(id) ON DELETE SET NULL,
  vehicle_slug TEXT,
  vehicle_name TEXT,
  referrer    TEXT,
  user_agent  TEXT,
  ip_hash     TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_whatsapp_clicks_vehicle ON whatsapp_clicks(vehicle_id, created_at DESC);
CREATE INDEX idx_whatsapp_clicks_created ON whatsapp_clicks(created_at DESC);

-- ─── CONTACT MESSAGES ───────────────────────────────────────

CREATE TABLE contact_messages (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  phone       TEXT,
  email       TEXT,
  message     TEXT NOT NULL,
  origin      lead_origin NOT NULL DEFAULT 'formulario',
  vehicle_id  UUID REFERENCES vehicles(id) ON DELETE SET NULL,
  is_read     BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_contact_messages_read ON contact_messages(is_read, created_at DESC);

-- ─── ACTIVITY LOGS ──────────────────────────────────────────

CREATE TABLE activity_logs (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action      TEXT NOT NULL,
  entity_type TEXT,
  entity_id   UUID,
  details     JSONB,
  ip_address  INET,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_activity_logs_user ON activity_logs(user_id, created_at DESC);
CREATE INDEX idx_activity_logs_entity ON activity_logs(entity_type, entity_id);
CREATE INDEX idx_activity_logs_created ON activity_logs(created_at DESC);

-- ─── UPDATED_AT TRIGGER ─────────────────────────────────────

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_profiles_updated_at     BEFORE UPDATE ON profiles     FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_brands_updated_at       BEFORE UPDATE ON brands       FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_categories_updated_at   BEFORE UPDATE ON categories   FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_vehicle_models_updated  BEFORE UPDATE ON vehicle_models FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_vehicles_updated_at     BEFORE UPDATE ON vehicles      FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_banners_updated_at      BEFORE UPDATE ON banners       FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_testimonials_updated_at BEFORE UPDATE ON testimonials  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_site_settings_updated   BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─── AUTO-CREATE PROFILE APÓS SIGNUP ────────────────────────

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
