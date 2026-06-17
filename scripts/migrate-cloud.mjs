import pg from 'pg';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const migrationsDir = join(__dirname, '../supabase/migrations');

const client = new pg.Client({
  connectionString: 'postgresql://postgres:HnGPcMUkQK4S.2N@db.lhuiisaoxecbpytadczi.supabase.co:5432/postgres',
  ssl: { rejectUnauthorized: false },
});

await client.connect();
console.log('✓ Connected to Supabase cloud\n');

// Schema sem profiles (já existe)
const schemaSql = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "unaccent";

DO $$ BEGIN CREATE TYPE vehicle_status AS ENUM ('rascunho','publicado','reservado','vendido','inativo','arquivado'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE transmission_type AS ENUM ('manual','automatico','automatizado','cvt'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE fuel_type AS ENUM ('flex','gasolina','etanol','diesel','hibrido','eletrico','gnv'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE conservation_state AS ENUM ('excelente','otimo','bom','regular'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE user_role AS ENUM ('admin','gerente','editor'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE feature_category AS ENUM ('conforto','seguranca','tecnologia','exterior'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE lead_origin AS ENUM ('whatsapp','formulario','instagram','google','meta_ads','indicacao','ligacao','loja_fisica','outro'); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TYPE banner_status AS ENUM ('ativo','inativo','agendado'); EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), name TEXT NOT NULL, slug TEXT NOT NULL UNIQUE,
  logo_url TEXT, is_active BOOLEAN NOT NULL DEFAULT true, sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_brands_slug ON brands(slug);
CREATE INDEX IF NOT EXISTS idx_brands_active ON brands(is_active);

CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), name TEXT NOT NULL, slug TEXT NOT NULL UNIQUE,
  icon TEXT, description TEXT, is_active BOOLEAN NOT NULL DEFAULT true, sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

CREATE TABLE IF NOT EXISTS vehicle_models (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE RESTRICT,
  name TEXT NOT NULL, slug TEXT NOT NULL, is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now(), UNIQUE(brand_id, slug)
);
CREATE INDEX IF NOT EXISTS idx_vehicle_models_brand ON vehicle_models(brand_id);

CREATE TABLE IF NOT EXISTS features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), key TEXT NOT NULL UNIQUE, label TEXT NOT NULL,
  category feature_category NOT NULL DEFAULT 'conforto', sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE RESTRICT,
  model_id UUID NOT NULL REFERENCES vehicle_models(id) ON DELETE RESTRICT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  version TEXT NOT NULL, year_fabrication INT NOT NULL, year_model INT NOT NULL,
  mileage INT NOT NULL DEFAULT 0, color TEXT, transmission transmission_type NOT NULL,
  fuel fuel_type NOT NULL, doors SMALLINT, plate_end CHAR(1),
  price NUMERIC(12,2) NOT NULL, promotional_price NUMERIC(12,2),
  accepts_trade BOOLEAN NOT NULL DEFAULT false, min_negotiation NUMERIC(12,2), internal_notes TEXT,
  is_armored BOOLEAN NOT NULL DEFAULT false, single_owner BOOLEAN NOT NULL DEFAULT false,
  ipva_paid BOOLEAN NOT NULL DEFAULT false, has_warranty BOOLEAN NOT NULL DEFAULT false,
  revisions_up_to_date BOOLEAN NOT NULL DEFAULT false, has_manual BOOLEAN NOT NULL DEFAULT false,
  has_spare_key BOOLEAN NOT NULL DEFAULT false, conservation conservation_state, provenance TEXT, description TEXT,
  status vehicle_status NOT NULL DEFAULT 'rascunho', is_published BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false, is_new_arrival BOOLEAN NOT NULL DEFAULT false,
  show_price BOOLEAN NOT NULL DEFAULT true, show_whatsapp BOOLEAN NOT NULL DEFAULT true,
  published_at TIMESTAMPTZ, sold_at TIMESTAMPTZ,
  slug TEXT NOT NULL UNIQUE, seo_title TEXT, seo_description TEXT, share_text TEXT,
  views_count INT NOT NULL DEFAULT 0, whatsapp_clicks_count INT NOT NULL DEFAULT 0,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now(), deleted_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_vehicles_status ON vehicles(status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_vehicles_brand ON vehicles(brand_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_vehicles_published ON vehicles(is_published, status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_vehicles_slug ON vehicles(slug) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_vehicles_price ON vehicles(price) WHERE is_published = true AND deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_vehicles_created ON vehicles(created_at DESC) WHERE deleted_at IS NULL;

CREATE TABLE IF NOT EXISTS vehicle_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL, url TEXT NOT NULL, alt TEXT, sort_order SMALLINT NOT NULL DEFAULT 0,
  is_primary BOOLEAN NOT NULL DEFAULT false, is_hidden BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_vehicle_images_vehicle ON vehicle_images(vehicle_id, sort_order);

CREATE TABLE IF NOT EXISTS vehicle_features (
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  feature_id UUID NOT NULL REFERENCES features(id) ON DELETE CASCADE,
  PRIMARY KEY (vehicle_id, feature_id)
);

CREATE TABLE IF NOT EXISTS banners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), title TEXT NOT NULL, subtitle TEXT,
  image_desktop TEXT, image_mobile TEXT, button_text TEXT, button_url TEXT,
  sort_order SMALLINT NOT NULL DEFAULT 0, status banner_status NOT NULL DEFAULT 'inativo',
  starts_at TIMESTAMPTZ, ends_at TIMESTAMPTZ,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), author_name TEXT NOT NULL, avatar_url TEXT,
  content TEXT NOT NULL, rating SMALLINT CHECK (rating BETWEEN 1 AND 5), vehicle_name TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true, sort_order SMALLINT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), store_name TEXT NOT NULL DEFAULT 'Eduardo Veículos',
  logo_url TEXT, favicon_url TEXT, cnpj TEXT, phone TEXT, whatsapp TEXT, email TEXT,
  address TEXT, city TEXT, state CHAR(2), instagram_url TEXT, facebook_url TEXT, google_maps_url TEXT,
  business_hours JSONB, whatsapp_message TEXT DEFAULT 'Olá, tenho interesse no {{vehicle_name}} anunciado no site. Pode me passar mais informações?',
  primary_color TEXT DEFAULT '#1454D9', secondary_color TEXT DEFAULT '#050B33',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS whatsapp_clicks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
  vehicle_slug TEXT, vehicle_name TEXT, referrer TEXT, user_agent TEXT, ip_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), name TEXT NOT NULL, phone TEXT, email TEXT,
  message TEXT NOT NULL, origin lead_origin NOT NULL DEFAULT 'formulario',
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
  is_read BOOLEAN NOT NULL DEFAULT false, created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_contact_messages_read ON contact_messages(is_read, created_at DESC);

CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL, entity_type TEXT, entity_id UUID, details JSONB, ip_address INET,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql;

DO $$ BEGIN CREATE TRIGGER trg_brands_updated_at BEFORE UPDATE ON brands FOR EACH ROW EXECUTE FUNCTION set_updated_at(); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TRIGGER trg_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION set_updated_at(); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TRIGGER trg_vehicle_models_updated BEFORE UPDATE ON vehicle_models FOR EACH ROW EXECUTE FUNCTION set_updated_at(); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TRIGGER trg_vehicles_updated_at BEFORE UPDATE ON vehicles FOR EACH ROW EXECUTE FUNCTION set_updated_at(); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TRIGGER trg_banners_updated_at BEFORE UPDATE ON banners FOR EACH ROW EXECUTE FUNCTION set_updated_at(); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TRIGGER trg_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION set_updated_at(); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE TRIGGER trg_site_settings_updated BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION set_updated_at(); EXCEPTION WHEN duplicate_object THEN null; END $$;
`;

const steps = [
  { name: 'Schema (tabelas + triggers)', sql: schemaSql },
  { name: 'RLS Policies', sql: readFileSync(join(migrationsDir, '20240101000002_rls_policies.sql'), 'utf8') },
  { name: 'Seed (marcas/categorias)', sql: readFileSync(join(migrationsDir, '20240101000003_seed.sql'), 'utf8') },
  { name: 'Vehicles seed (20 carros)', sql: readFileSync(join(migrationsDir, '20240101000004_vehicles_seed.sql'), 'utf8') },
  { name: 'Grants (permissões anon)', sql: readFileSync(join(migrationsDir, '20240101000005_grants.sql'), 'utf8') },
];

for (const step of steps) {
  try {
    await client.query(step.sql);
    console.log(`✓ ${step.name}`);
  } catch (e) {
    console.log(`⚠ ${step.name}: ${e.message.slice(0, 120)}`);
  }
}

// Verify
const { rows } = await client.query("SELECT count(*) FROM vehicles WHERE status='publicado'");
console.log(`\n✓ Veículos publicados: ${rows[0].count}`);

await client.end();
console.log('✓ Concluído!');
