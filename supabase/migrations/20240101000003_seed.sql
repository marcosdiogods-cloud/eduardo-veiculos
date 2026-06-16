-- ============================================================
-- Eduardo Veículos — Seed inicial
-- ============================================================

-- ─── SITE SETTINGS (linha única) ────────────────────────────

INSERT INTO site_settings (
  store_name, phone, whatsapp, email, city, state
) VALUES (
  'Eduardo Veículos',
  '(00) 0000-0000',
  '5500000000000',
  'contato@eduardoveiculos.com.br',
  'Sua Cidade',
  'SP'
) ON CONFLICT DO NOTHING;

-- ─── CATEGORIES ─────────────────────────────────────────────

INSERT INTO categories (name, slug, icon, sort_order) VALUES
  ('SUV',        'suv',        'truck',      1),
  ('Hatch',      'hatch',      'car',        2),
  ('Sedã',       'seda',       'car-front',  3),
  ('Pickup',     'pickup',     'truck',      4),
  ('Minivan',    'minivan',    'bus',        5),
  ('Conversível','conversivel','car',        6),
  ('Elétrico',   'eletrico',   'zap',        7)
ON CONFLICT (slug) DO NOTHING;

-- ─── BRANDS ─────────────────────────────────────────────────

INSERT INTO brands (name, slug, sort_order) VALUES
  ('Chevrolet',   'chevrolet',  1),
  ('Volkswagen',  'volkswagen', 2),
  ('Fiat',        'fiat',       3),
  ('Ford',        'ford',       4),
  ('Toyota',      'toyota',     5),
  ('Honda',       'honda',      6),
  ('Hyundai',     'hyundai',    7),
  ('Jeep',        'jeep',       8),
  ('Renault',     'renault',    9),
  ('Nissan',      'nissan',     10),
  ('Mitsubishi',  'mitsubishi', 11),
  ('BMW',         'bmw',        12),
  ('Mercedes-Benz','mercedes-benz', 13),
  ('Audi',        'audi',       14),
  ('Kia',         'kia',        15),
  ('Peugeot',     'peugeot',    16),
  ('Citroën',     'citroen',    17),
  ('Land Rover',  'land-rover', 18),
  ('Volvo',       'volvo',      19),
  ('Subaru',      'subaru',     20),
  ('BYD',         'byd',        21),
  ('JAC',         'jac',        22),
  ('Chery',       'chery',      23)
ON CONFLICT (slug) DO NOTHING;

-- ─── FEATURES (catálogo completo de opcionais) ───────────────

INSERT INTO features (key, label, category, sort_order) VALUES
  -- Conforto
  ('ar_condicionado',   'Ar-condicionado',        'conforto',   1),
  ('direcao_eletrica',  'Direção elétrica',        'conforto',   2),
  ('banco_couro',       'Banco de couro',          'conforto',   3),
  ('teto_solar',        'Teto solar',              'conforto',   4),
  ('bancos_eletricos',  'Bancos elétricos',        'conforto',   5),
  ('bancos_aquecidos',  'Bancos aquecidos',        'conforto',   6),
  -- Tecnologia
  ('central_multimidia','Central multimídia',      'tecnologia', 7),
  ('camera_re',         'Câmera de ré',            'tecnologia', 8),
  ('sensor_estacionamento', 'Sensor de estacionamento', 'tecnologia', 9),
  ('piloto_automatico', 'Piloto automático',       'tecnologia', 10),
  ('partida_botao',     'Partida por botão',       'tecnologia', 11),
  ('chave_presencial',  'Chave presencial',        'tecnologia', 12),
  ('carregador_inducao','Carregador por indução',  'tecnologia', 13),
  ('som_premium',       'Som premium',             'tecnologia', 14),
  ('assistente_faixa',  'Assistente de faixa',     'tecnologia', 15),
  ('frenagem_automatica','Frenagem automática',    'tecnologia', 16),
  -- Segurança
  ('controle_estabilidade', 'Controle de estabilidade', 'seguranca', 17),
  ('airbags',           'Airbags',                 'seguranca',  18),
  -- Exterior
  ('rodas_liga_leve',   'Rodas de liga leve',      'exterior',   19),
  ('farol_led',         'Farol em LED',            'exterior',   20)
ON CONFLICT (key) DO NOTHING;

-- ─── VEHICLE MODELS (modelos mais comuns para seed) ──────────

DO $$
DECLARE
  chevrolet_id UUID;
  volkswagen_id UUID;
  fiat_id UUID;
  ford_id UUID;
  toyota_id UUID;
  honda_id UUID;
  hyundai_id UUID;
  jeep_id UUID;
BEGIN
  SELECT id INTO chevrolet_id FROM brands WHERE slug = 'chevrolet';
  SELECT id INTO volkswagen_id FROM brands WHERE slug = 'volkswagen';
  SELECT id INTO fiat_id FROM brands WHERE slug = 'fiat';
  SELECT id INTO ford_id FROM brands WHERE slug = 'ford';
  SELECT id INTO toyota_id FROM brands WHERE slug = 'toyota';
  SELECT id INTO honda_id FROM brands WHERE slug = 'honda';
  SELECT id INTO hyundai_id FROM brands WHERE slug = 'hyundai';
  SELECT id INTO jeep_id FROM brands WHERE slug = 'jeep';

  -- Chevrolet
  INSERT INTO vehicle_models (brand_id, name, slug) VALUES
    (chevrolet_id, 'Onix',      'onix'),
    (chevrolet_id, 'Tracker',   'tracker'),
    (chevrolet_id, 'Cruze',     'cruze'),
    (chevrolet_id, 'S10',       's10'),
    (chevrolet_id, 'Spin',      'spin')
  ON CONFLICT (brand_id, slug) DO NOTHING;

  -- Volkswagen
  INSERT INTO vehicle_models (brand_id, name, slug) VALUES
    (volkswagen_id, 'Gol',       'gol'),
    (volkswagen_id, 'Polo',      'polo'),
    (volkswagen_id, 'T-Cross',   't-cross'),
    (volkswagen_id, 'Virtus',    'virtus'),
    (volkswagen_id, 'Nivus',     'nivus'),
    (volkswagen_id, 'Tiguan',    'tiguan')
  ON CONFLICT (brand_id, slug) DO NOTHING;

  -- Fiat
  INSERT INTO vehicle_models (brand_id, name, slug) VALUES
    (fiat_id, 'Argo',      'argo'),
    (fiat_id, 'Pulse',     'pulse'),
    (fiat_id, 'Fastback',  'fastback'),
    (fiat_id, 'Mobi',      'mobi'),
    (fiat_id, 'Toro',      'toro'),
    (fiat_id, 'Strada',    'strada')
  ON CONFLICT (brand_id, slug) DO NOTHING;

  -- Ford
  INSERT INTO vehicle_models (brand_id, name, slug) VALUES
    (ford_id, 'Ranger',    'ranger'),
    (ford_id, 'Territory', 'territory'),
    (ford_id, 'Bronco',    'bronco')
  ON CONFLICT (brand_id, slug) DO NOTHING;

  -- Toyota
  INSERT INTO vehicle_models (brand_id, name, slug) VALUES
    (toyota_id, 'Corolla',   'corolla'),
    (toyota_id, 'Hilux',     'hilux'),
    (toyota_id, 'SW4',       'sw4'),
    (toyota_id, 'Yaris',     'yaris'),
    (toyota_id, 'Corolla Cross', 'corolla-cross')
  ON CONFLICT (brand_id, slug) DO NOTHING;

  -- Honda
  INSERT INTO vehicle_models (brand_id, name, slug) VALUES
    (honda_id, 'Civic',    'civic'),
    (honda_id, 'HR-V',     'hr-v'),
    (honda_id, 'CR-V',     'cr-v'),
    (honda_id, 'City',     'city'),
    (honda_id, 'WR-V',     'wr-v')
  ON CONFLICT (brand_id, slug) DO NOTHING;

  -- Hyundai
  INSERT INTO vehicle_models (brand_id, name, slug) VALUES
    (hyundai_id, 'HB20',    'hb20'),
    (hyundai_id, 'Creta',   'creta'),
    (hyundai_id, 'Tucson',  'tucson'),
    (hyundai_id, 'Santa Fe','santa-fe')
  ON CONFLICT (brand_id, slug) DO NOTHING;

  -- Jeep
  INSERT INTO vehicle_models (brand_id, name, slug) VALUES
    (jeep_id, 'Renegade',  'renegade'),
    (jeep_id, 'Compass',   'compass'),
    (jeep_id, 'Commander', 'commander'),
    (jeep_id, 'Wrangler',  'wrangler')
  ON CONFLICT (brand_id, slug) DO NOTHING;

END $$;
