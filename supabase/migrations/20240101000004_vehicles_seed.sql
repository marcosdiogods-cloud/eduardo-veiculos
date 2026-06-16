-- ============================================================
-- Eduardo Veículos — Seed de veículos premium (20 carros)
-- Imagens: Unsplash (licença gratuita)
-- ============================================================

DO $$
DECLARE
  -- Brands
  bmw_id         UUID;
  mercedes_id    UUID;
  audi_id        UUID;
  toyota_id      UUID;
  honda_id       UUID;
  jeep_id        UUID;
  land_rover_id  UUID;
  volvo_id       UUID;
  hyundai_id     UUID;
  volkswagen_id  UUID;

  -- Models
  bmw_x5_id        UUID;
  bmw_320i_id      UUID;
  bmw_530i_id      UUID;
  merc_c300_id     UUID;
  merc_glc_id      UUID;
  merc_s500_id     UUID;
  audi_a4_id       UUID;
  audi_q5_id       UUID;
  toyota_sw4_id    UUID;
  toyota_corolla_id UUID;
  honda_crv_id     UUID;
  jeep_commander_id UUID;
  jeep_wrangler_id UUID;
  lr_defender_id   UUID;
  lr_discovery_id  UUID;
  volvo_xc60_id    UUID;
  hyundai_tucson_id UUID;
  hyundai_creta_id UUID;
  vw_tiguan_id     UUID;
  vw_tcross_id     UUID;

  -- Categories
  suv_id      UUID;
  seda_id     UUID;
  pickup_id   UUID;
  conv_id     UUID;

  -- Features
  ar_id         UUID;
  couro_id      UUID;
  teto_id       UUID;
  multimidia_id UUID;
  camera_id     UUID;
  sensor_id     UUID;
  piloto_id     UUID;
  botao_id      UUID;
  chave_id      UUID;
  inducao_id    UUID;
  som_id        UUID;
  faixa_id      UUID;
  frena_id      UUID;
  estab_id      UUID;
  airbag_id     UUID;
  rodas_id      UUID;
  farol_id      UUID;
  bancos_el_id  UUID;
  bancos_aq_id  UUID;
  direcao_id    UUID;

  -- Vehicles
  v01 UUID; v02 UUID; v03 UUID; v04 UUID; v05 UUID;
  v06 UUID; v07 UUID; v08 UUID; v09 UUID; v10 UUID;
  v11 UUID; v12 UUID; v13 UUID; v14 UUID; v15 UUID;
  v16 UUID; v17 UUID; v18 UUID; v19 UUID; v20 UUID;

BEGIN

  -- ─── Busca IDs de marcas ──────────────────────────────────
  SELECT id INTO bmw_id        FROM brands WHERE slug = 'bmw';
  SELECT id INTO mercedes_id   FROM brands WHERE slug = 'mercedes-benz';
  SELECT id INTO audi_id       FROM brands WHERE slug = 'audi';
  SELECT id INTO toyota_id     FROM brands WHERE slug = 'toyota';
  SELECT id INTO honda_id      FROM brands WHERE slug = 'honda';
  SELECT id INTO jeep_id       FROM brands WHERE slug = 'jeep';
  SELECT id INTO land_rover_id FROM brands WHERE slug = 'land-rover';
  SELECT id INTO volvo_id      FROM brands WHERE slug = 'volvo';
  SELECT id INTO hyundai_id    FROM brands WHERE slug = 'hyundai';
  SELECT id INTO volkswagen_id FROM brands WHERE slug = 'volkswagen';

  -- ─── Busca IDs de categorias ─────────────────────────────
  SELECT id INTO suv_id   FROM categories WHERE slug = 'suv';
  SELECT id INTO seda_id  FROM categories WHERE slug = 'seda';
  SELECT id INTO pickup_id FROM categories WHERE slug = 'pickup';
  SELECT id INTO conv_id  FROM categories WHERE slug = 'conversivel';

  -- ─── Busca IDs de features ───────────────────────────────
  SELECT id INTO ar_id         FROM features WHERE key = 'ar_condicionado';
  SELECT id INTO couro_id      FROM features WHERE key = 'banco_couro';
  SELECT id INTO teto_id       FROM features WHERE key = 'teto_solar';
  SELECT id INTO multimidia_id FROM features WHERE key = 'central_multimidia';
  SELECT id INTO camera_id     FROM features WHERE key = 'camera_re';
  SELECT id INTO sensor_id     FROM features WHERE key = 'sensor_estacionamento';
  SELECT id INTO piloto_id     FROM features WHERE key = 'piloto_automatico';
  SELECT id INTO botao_id      FROM features WHERE key = 'partida_botao';
  SELECT id INTO chave_id      FROM features WHERE key = 'chave_presencial';
  SELECT id INTO inducao_id    FROM features WHERE key = 'carregador_inducao';
  SELECT id INTO som_id        FROM features WHERE key = 'som_premium';
  SELECT id INTO faixa_id      FROM features WHERE key = 'assistente_faixa';
  SELECT id INTO frena_id      FROM features WHERE key = 'frenagem_automatica';
  SELECT id INTO estab_id      FROM features WHERE key = 'controle_estabilidade';
  SELECT id INTO airbag_id     FROM features WHERE key = 'airbags';
  SELECT id INTO rodas_id      FROM features WHERE key = 'rodas_liga_leve';
  SELECT id INTO farol_id      FROM features WHERE key = 'farol_led';
  SELECT id INTO bancos_el_id  FROM features WHERE key = 'bancos_eletricos';
  SELECT id INTO bancos_aq_id  FROM features WHERE key = 'bancos_aquecidos';
  SELECT id INTO direcao_id    FROM features WHERE key = 'direcao_eletrica';

  -- ─── Cria modelos premium que faltam ─────────────────────

  -- BMW
  INSERT INTO vehicle_models (brand_id, name, slug) VALUES
    (bmw_id, 'X5',    'x5'),
    (bmw_id, '320i',  '320i'),
    (bmw_id, '530i',  '530i')
  ON CONFLICT (brand_id, slug) DO NOTHING;

  -- Mercedes-Benz
  INSERT INTO vehicle_models (brand_id, name, slug) VALUES
    (mercedes_id, 'C 300', 'c-300'),
    (mercedes_id, 'GLC 300', 'glc-300'),
    (mercedes_id, 'S 500', 's-500')
  ON CONFLICT (brand_id, slug) DO NOTHING;

  -- Audi
  INSERT INTO vehicle_models (brand_id, name, slug) VALUES
    (audi_id, 'A4',  'a4'),
    (audi_id, 'Q5',  'q5')
  ON CONFLICT (brand_id, slug) DO NOTHING;

  -- Land Rover
  INSERT INTO vehicle_models (brand_id, name, slug) VALUES
    (land_rover_id, 'Defender', 'defender'),
    (land_rover_id, 'Discovery Sport', 'discovery-sport')
  ON CONFLICT (brand_id, slug) DO NOTHING;

  -- Volvo
  INSERT INTO vehicle_models (brand_id, name, slug) VALUES
    (volvo_id, 'XC60', 'xc60')
  ON CONFLICT (brand_id, slug) DO NOTHING;

  -- ─── Busca IDs dos modelos ────────────────────────────────
  SELECT id INTO bmw_x5_id         FROM vehicle_models WHERE brand_id = bmw_id        AND slug = 'x5';
  SELECT id INTO bmw_320i_id       FROM vehicle_models WHERE brand_id = bmw_id        AND slug = '320i';
  SELECT id INTO bmw_530i_id       FROM vehicle_models WHERE brand_id = bmw_id        AND slug = '530i';
  SELECT id INTO merc_c300_id      FROM vehicle_models WHERE brand_id = mercedes_id   AND slug = 'c-300';
  SELECT id INTO merc_glc_id       FROM vehicle_models WHERE brand_id = mercedes_id   AND slug = 'glc-300';
  SELECT id INTO merc_s500_id      FROM vehicle_models WHERE brand_id = mercedes_id   AND slug = 's-500';
  SELECT id INTO audi_a4_id        FROM vehicle_models WHERE brand_id = audi_id       AND slug = 'a4';
  SELECT id INTO audi_q5_id        FROM vehicle_models WHERE brand_id = audi_id       AND slug = 'q5';
  SELECT id INTO toyota_sw4_id     FROM vehicle_models WHERE brand_id = toyota_id     AND slug = 'sw4';
  SELECT id INTO toyota_corolla_id FROM vehicle_models WHERE brand_id = toyota_id     AND slug = 'corolla';
  SELECT id INTO honda_crv_id      FROM vehicle_models WHERE brand_id = honda_id      AND slug = 'cr-v';
  SELECT id INTO jeep_commander_id FROM vehicle_models WHERE brand_id = jeep_id       AND slug = 'commander';
  SELECT id INTO jeep_wrangler_id  FROM vehicle_models WHERE brand_id = jeep_id       AND slug = 'wrangler';
  SELECT id INTO lr_defender_id    FROM vehicle_models WHERE brand_id = land_rover_id AND slug = 'defender';
  SELECT id INTO lr_discovery_id   FROM vehicle_models WHERE brand_id = land_rover_id AND slug = 'discovery-sport';
  SELECT id INTO volvo_xc60_id     FROM vehicle_models WHERE brand_id = volvo_id      AND slug = 'xc60';
  SELECT id INTO hyundai_tucson_id FROM vehicle_models WHERE brand_id = hyundai_id    AND slug = 'tucson';
  SELECT id INTO hyundai_creta_id  FROM vehicle_models WHERE brand_id = hyundai_id    AND slug = 'creta';
  SELECT id INTO vw_tiguan_id      FROM vehicle_models WHERE brand_id = volkswagen_id AND slug = 'tiguan';
  SELECT id INTO vw_tcross_id      FROM vehicle_models WHERE brand_id = volkswagen_id AND slug = 't-cross';

  -- ─── Insere veículos ─────────────────────────────────────

  -- 01: BMW X5 xDrive30d
  INSERT INTO vehicles (
    brand_id, model_id, category_id, version,
    year_fabrication, year_model, mileage, color,
    transmission, fuel, doors, price,
    is_armored, single_owner, ipva_paid, has_warranty, revisions_up_to_date, has_manual, has_spare_key,
    conservation, description,
    status, is_published, is_featured, is_new_arrival, show_price, show_whatsapp,
    slug, published_at
  ) VALUES (
    bmw_id, bmw_x5_id, suv_id, 'xDrive30d M Sport',
    2023, 2024, 18500, 'Preto Safira',
    'automatico', 'diesel', 5, 549900.00,
    false, true, true, true, true, true, true,
    'excelente',
    'BMW X5 xDrive30d M Sport com pacote completo. Motor diesel 3.0 de 286cv, tração integral xDrive, suspensão adaptativa, painel digital curved display, bancos em couro Vernasca aquecidos e ventilados, teto solar panorâmico e muito mais. Veículo impecável, revisões em dia na concessionária.',
    'publicado', true, true, true, true, true,
    'bmw-x5-xdrive30d-m-sport-2024', now()
  ) RETURNING id INTO v01;

  -- 02: BMW 320i GP
  INSERT INTO vehicles (
    brand_id, model_id, category_id, version,
    year_fabrication, year_model, mileage, color,
    transmission, fuel, doors, price,
    single_owner, ipva_paid, has_warranty, revisions_up_to_date,
    conservation, description,
    status, is_published, is_featured, is_new_arrival, show_price, show_whatsapp,
    slug, published_at
  ) VALUES (
    bmw_id, bmw_320i_id, seda_id, 'GP Sport 2.0 Turbo',
    2022, 2023, 31200, 'Branco Alpino',
    'automatico', 'gasolina', 4, 289900.00,
    true, true, true, true,
    'excelente',
    'BMW 320i GP Sport com motor 2.0 turbo de 184cv e câmbio automático de 8 velocidades. Central multimídia Live Cockpit, câmera 360°, frenagem autônoma, assistente de faixa e piloto automático adaptativo. Excelente estado de conservação.',
    'publicado', true, true, false, true, true,
    'bmw-320i-gp-sport-2023', now()
  ) RETURNING id INTO v02;

  -- 03: BMW 530i M Sport
  INSERT INTO vehicles (
    brand_id, model_id, category_id, version,
    year_fabrication, year_model, mileage, color,
    transmission, fuel, doors, price,
    single_owner, ipva_paid, has_warranty,
    conservation, description,
    status, is_published, is_featured, show_price, show_whatsapp,
    slug, published_at
  ) VALUES (
    bmw_id, bmw_530i_id, seda_id, 'M Sport 2.0 Turbo',
    2023, 2023, 22700, 'Cinza Mineral',
    'automatico', 'gasolina', 4, 389900.00,
    true, true, true,
    'excelente',
    'BMW 530i M Sport com o icônico motor 2.0 TwinPower Turbo de 252cv. Desempenho esportivo aliado ao máximo conforto. Curved Display de 14,9", Head-Up Display, bancos de couro Dakota aquecidos, assistência de estacionamento Plus e sistema de som Harman Kardon.',
    'publicado', true, true, true, true,
    'bmw-530i-m-sport-2023', now()
  ) RETURNING id INTO v03;

  -- 04: Mercedes-Benz C 300 AMG Line
  INSERT INTO vehicles (
    brand_id, model_id, category_id, version,
    year_fabrication, year_model, mileage, color,
    transmission, fuel, doors, price,
    single_owner, ipva_paid, has_warranty, revisions_up_to_date,
    conservation, description,
    status, is_published, is_featured, is_new_arrival, show_price, show_whatsapp,
    slug, published_at
  ) VALUES (
    mercedes_id, merc_c300_id, seda_id, 'AMG Line 2.0 Turbo',
    2023, 2024, 14800, 'Prata Iridium',
    'automatico', 'gasolina', 4, 459900.00,
    true, true, true, true,
    'excelente',
    'Mercedes-Benz C 300 AMG Line com motor 2.0 turbo de 258cv. Nova geração com painel supersport de 12,3" + tela central de 11,9" com MBUX. Bancos Artico/Dinamica aquecidos, faróis Full LED High Performance, assistência ativa de direção e frenagem. Garantia de fábrica.',
    'publicado', true, true, true, true, true,
    'mercedes-c300-amg-line-2024', now()
  ) RETURNING id INTO v04;

  -- 05: Mercedes-Benz GLC 300 4MATIC
  INSERT INTO vehicles (
    brand_id, model_id, category_id, version,
    year_fabrication, year_model, mileage, color,
    transmission, fuel, doors, price,
    single_owner, ipva_paid, has_warranty, revisions_up_to_date,
    conservation, description,
    status, is_published, is_featured, show_price, show_whatsapp,
    slug, published_at
  ) VALUES (
    mercedes_id, merc_glc_id, suv_id, '4MATIC Sport',
    2023, 2023, 27300, 'Preto Obsidian',
    'automatico', 'gasolina', 5, 519900.00,
    true, true, true, true,
    'excelente',
    'Mercedes-Benz GLC 300 4MATIC com motor 2.0 turbo de 258cv e tração nas quatro rodas. SUV premium com interior de altíssimo nível: bancos de couro, painel digital widescreen, suspensão adaptativa AIRMATIC, teto solar panorâmico e sistema de som Burmester.',
    'publicado', true, true, true, true,
    'mercedes-glc300-4matic-2023', now()
  ) RETURNING id INTO v05;

  -- 06: Mercedes-Benz S 500 4MATIC
  INSERT INTO vehicles (
    brand_id, model_id, category_id, version,
    year_fabrication, year_model, mileage, color,
    transmission, fuel, doors, price, promotional_price,
    single_owner, ipva_paid, has_warranty,
    conservation, description,
    status, is_published, is_featured, show_price, show_whatsapp,
    slug, published_at
  ) VALUES (
    mercedes_id, merc_s500_id, seda_id, '4MATIC L Executive',
    2022, 2023, 35100, 'Preto Obsidian',
    'automatico', 'gasolina', 4, 1299900.00, 1189900.00,
    true, true, true,
    'excelente',
    'Mercedes-Benz S 500 4MATIC L — o topo da linha sedã de luxo. Motor V8 biturbo de 435cv, tração integral 4MATIC, suspensão pneumática com nivelamento automático, bancos executivos traseiros reclináveis, teto panorâmico com Magic Sky Control, perfume digital, som Burmester 4D surround.',
    'publicado', true, true, true, true,
    'mercedes-s500-4matic-l-2023', now()
  ) RETURNING id INTO v06;

  -- 07: Audi A4 Prestige Plus
  INSERT INTO vehicles (
    brand_id, model_id, category_id, version,
    year_fabrication, year_model, mileage, color,
    transmission, fuel, doors, price,
    single_owner, ipva_paid, has_warranty, revisions_up_to_date,
    conservation, description,
    status, is_published, is_new_arrival, show_price, show_whatsapp,
    slug, published_at
  ) VALUES (
    audi_id, audi_a4_id, seda_id, 'Prestige Plus 2.0 TFSI',
    2023, 2024, 9800, 'Branco Glacial',
    'automatico', 'gasolina', 4, 319900.00,
    true, true, true, true,
    'excelente',
    'Audi A4 Prestige Plus com motor 2.0 TFSI de 190cv. Virtual Cockpit Plus de 12,3", MMI Navigation Plus com tela de 10,1", banco em couro Milano aquecido, faróis Matrix LED, frenagem pré-sense, assistência de faixa e câmera 360°. Apenas 9.800km rodados.',
    'publicado', true, true, true, true,
    'audi-a4-prestige-plus-2024', now()
  ) RETURNING id INTO v07;

  -- 08: Audi Q5 Performance Black
  INSERT INTO vehicles (
    brand_id, model_id, category_id, version,
    year_fabrication, year_model, mileage, color,
    transmission, fuel, doors, price,
    single_owner, ipva_paid, has_warranty,
    conservation, description,
    status, is_published, is_featured, show_price, show_whatsapp,
    slug, published_at
  ) VALUES (
    audi_id, audi_q5_id, suv_id, 'Performance Black 2.0 TFSI',
    2023, 2023, 19400, 'Preto Mythos',
    'automatico', 'gasolina', 5, 429900.00,
    true, true, true,
    'excelente',
    'Audi Q5 Performance Black com motor 2.0 TFSI de 252cv e tração quattro. Edição especial com visual Sport Black, rodas 20" em preto mate, bancos esportivos S-Line em couro com costuras contrastantes, Virtual Cockpit, teto solar panorâmico e sistemas de assistência avançados.',
    'publicado', true, true, true, true,
    'audi-q5-performance-black-2023', now()
  ) RETURNING id INTO v08;

  -- 09: Toyota SW4 Diamond 7L
  INSERT INTO vehicles (
    brand_id, model_id, category_id, version,
    year_fabrication, year_model, mileage, color,
    transmission, fuel, doors, price,
    single_owner, ipva_paid, has_warranty, revisions_up_to_date,
    conservation, description,
    status, is_published, is_featured, is_new_arrival, show_price, show_whatsapp,
    slug, published_at
  ) VALUES (
    toyota_id, toyota_sw4_id, suv_id, 'Diamond 2.8 TDI 4x4 AT 7L',
    2023, 2024, 16200, 'Cinza Granito',
    'automatico', 'diesel', 5, 479900.00,
    true, true, true, true,
    'excelente',
    'Toyota SW4 Diamond topo de linha 7 lugares com motor diesel 2.8 de 204cv e câmbio automático de 6 marchas. Tração 4x4 com reduzida, painel de 9" com Toyota Safety Sense, bancos de couro, controle de descida, frenagem pré-colisão e monitor de ponto cego.',
    'publicado', true, true, true, true, true,
    'toyota-sw4-diamond-7l-2024', now()
  ) RETURNING id INTO v09;

  -- 10: Toyota Corolla Altis Hybrid
  INSERT INTO vehicles (
    brand_id, model_id, category_id, version,
    year_fabrication, year_model, mileage, color,
    transmission, fuel, doors, price,
    single_owner, ipva_paid, has_warranty, revisions_up_to_date,
    conservation, description,
    status, is_published, show_price, show_whatsapp,
    slug, published_at
  ) VALUES (
    toyota_id, toyota_corolla_id, seda_id, 'Altis Hybrid Premium',
    2023, 2024, 21600, 'Prata Lunar',
    'cvt', 'hibrido', 4, 259900.00,
    true, true, true, true,
    'excelente',
    'Toyota Corolla Altis Hybrid Premium com motor 1.8 híbrido de 122cv total. Câmbio e-CVT, central multimídia de 9" com Android Auto e Apple CarPlay, bancos de couro, Toyota Safety Sense 2.0 completo, head-up display e acabamento premium.',
    'publicado', true, true, true,
    'toyota-corolla-altis-hybrid-2024', now()
  ) RETURNING id INTO v10;

  -- 11: Honda CR-V Touring 4WD
  INSERT INTO vehicles (
    brand_id, model_id, category_id, version,
    year_fabrication, year_model, mileage, color,
    transmission, fuel, doors, price,
    single_owner, ipva_paid, has_warranty,
    conservation, description,
    status, is_published, show_price, show_whatsapp,
    slug, published_at
  ) VALUES (
    honda_id, honda_crv_id, suv_id, 'Touring 1.5 Turbo 4WD',
    2023, 2023, 28900, 'Azul Obsidian',
    'automatico', 'gasolina', 5, 279900.00,
    true, true, true,
    'excelente',
    'Honda CR-V Touring com motor 1.5 turbo de 190cv e tração 4WD. Topo de linha com bancos de couro, teto solar panorâmico, central multimídia com tela de 9", câmera 360° e Honda Sensing completo (frenagem autônoma, assistente de faixa, piloto adaptativo).',
    'publicado', true, true, true,
    'honda-crv-touring-4wd-2023', now()
  ) RETURNING id INTO v11;

  -- 12: Jeep Commander Overland 4x4
  INSERT INTO vehicles (
    brand_id, model_id, category_id, version,
    year_fabrication, year_model, mileage, color,
    transmission, fuel, doors, price,
    single_owner, ipva_paid, has_warranty, revisions_up_to_date,
    conservation, description,
    status, is_published, is_new_arrival, show_price, show_whatsapp,
    slug, published_at
  ) VALUES (
    jeep_id, jeep_commander_id, suv_id, 'Overland 2.0 Turbo 4x4 AT',
    2023, 2024, 12400, 'Vermelho Veludo',
    'automatico', 'gasolina', 5, 369900.00,
    true, true, true, true,
    'excelente',
    'Jeep Commander Overland topo de linha com motor 2.0 turbo de 272cv e câmbio automático de 9 marchas. 7 lugares, tração 4x4 com modos de terreno, teto solar panorâmico, bancos de couro ventilados, central Uconnect de 10,1" e pacote de tecnologia completo.',
    'publicado', true, true, true, true,
    'jeep-commander-overland-4x4-2024', now()
  ) RETURNING id INTO v12;

  -- 13: Jeep Wrangler Rubicon
  INSERT INTO vehicles (
    brand_id, model_id, category_id, version,
    year_fabrication, year_model, mileage, color,
    transmission, fuel, doors, price,
    single_owner, ipva_paid, has_warranty,
    conservation, description,
    status, is_published, is_featured, show_price, show_whatsapp,
    slug, published_at
  ) VALUES (
    jeep_id, jeep_wrangler_id, suv_id, 'Rubicon 2.0 Turbo 4x4 AT',
    2023, 2023, 33800, 'Laranja Nacho',
    'automatico', 'gasolina', 4, 489900.00,
    true, true, true,
    'excelente',
    'Jeep Wrangler Rubicon — ícone off-road com motor 2.0 turbo de 272cv. Diferencial dianteiro e traseiro travável, eixos Dana, suspensão de braço longo, rodas beadlock, protetor de cárter e molas de suspensão levantada. Para quem leva off-road a sério.',
    'publicado', true, true, true, true,
    'jeep-wrangler-rubicon-2023', now()
  ) RETURNING id INTO v13;

  -- 14: Land Rover Defender 110 HSE
  INSERT INTO vehicles (
    brand_id, model_id, category_id, version,
    year_fabrication, year_model, mileage, color,
    transmission, fuel, doors, price,
    single_owner, ipva_paid, has_warranty,
    conservation, description,
    status, is_published, is_featured, show_price, show_whatsapp,
    slug, published_at
  ) VALUES (
    land_rover_id, lr_defender_id, suv_id, '110 HSE P400 3.0 AWD',
    2023, 2023, 25100, 'Verde Pangolin',
    'automatico', 'gasolina', 5, 749900.00,
    true, true, true,
    'excelente',
    'Land Rover Defender 110 HSE com motor P400 mild hybrid de 400cv e câmbio automático de 8 velocidades. Design icônico aliado à tecnologia de ponta: Pivi Pro 11,4", bancos de couro Windsor, Air Suspension, visão Wade de 900mm e sistema ClearSight.',
    'publicado', true, true, true, true,
    'land-rover-defender-110-hse-2023', now()
  ) RETURNING id INTO v14;

  -- 15: Land Rover Discovery Sport R-Dynamic HSE
  INSERT INTO vehicles (
    brand_id, model_id, category_id, version,
    year_fabrication, year_model, mileage, color,
    transmission, fuel, doors, price,
    single_owner, ipva_paid, has_warranty, revisions_up_to_date,
    conservation, description,
    status, is_published, show_price, show_whatsapp,
    slug, published_at
  ) VALUES (
    land_rover_id, lr_discovery_id, suv_id, 'R-Dynamic HSE 2.0 P250 AWD 7L',
    2022, 2023, 38200, 'Branco Fuji',
    'automatico', 'gasolina', 5, 499900.00,
    true, true, false, true,
    'otimo',
    'Land Rover Discovery Sport R-Dynamic HSE 7 lugares com motor 2.0 P250 de 249cv. Visual esportivo R-Dynamic, bancos de couro com costuras contrastantes, teto panorâmico, câmera surround 360°, sistemas de tração avançada Terrain Response e frenagem autônoma.',
    'publicado', true, true, true,
    'land-rover-discovery-sport-r-dynamic-2023', now()
  ) RETURNING id INTO v15;

  -- 16: Volvo XC60 Ultimate B5 AWD
  INSERT INTO vehicles (
    brand_id, model_id, category_id, version,
    year_fabrication, year_model, mileage, color,
    transmission, fuel, doors, price,
    single_owner, ipva_paid, has_warranty, revisions_up_to_date,
    conservation, description,
    status, is_published, is_featured, is_new_arrival, show_price, show_whatsapp,
    slug, published_at
  ) VALUES (
    volvo_id, volvo_xc60_id, suv_id, 'Ultimate B5 AWD Dark Theme',
    2023, 2024, 11700, 'Preto Onyx',
    'automatico', 'hibrido', 5, 569900.00,
    true, true, true, true,
    'excelente',
    'Volvo XC60 Ultimate B5 mild hybrid AWD com motor de 250cv. O SUV sueco mais premiado do mundo em sua versão máxima. Google integrado, Bowers & Wilkins 1.100W, bancos Nappa perfurados aquecidos e ventilados, Pilot Assist, teto panorâmico e pacote Dark Theme completo.',
    'publicado', true, true, true, true, true,
    'volvo-xc60-ultimate-b5-awd-2024', now()
  ) RETURNING id INTO v16;

  -- 17: Hyundai Tucson N-Line 1.6 Turbo AWD
  INSERT INTO vehicles (
    brand_id, model_id, category_id, version,
    year_fabrication, year_model, mileage, color,
    transmission, fuel, doors, price,
    single_owner, ipva_paid, has_warranty,
    conservation, description,
    status, is_published, show_price, show_whatsapp,
    slug, published_at
  ) VALUES (
    hyundai_id, hyundai_tucson_id, suv_id, 'N-Line 1.6 T-GDI AWD AT',
    2022, 2023, 42100, 'Azul Intense',
    'automatico', 'gasolina', 5, 219900.00,
    true, true, false,
    'otimo',
    'Hyundai Tucson N-Line com motor 1.6 T-GDI de 180cv e tração AWD. Edição esportiva com visual agressivo N-Line, bancos de couro com costuras vermelhas, central de 10,25", câmera 360°, frenagem autônoma, assistente de faixa e carregador wireless.',
    'publicado', true, true, true,
    'hyundai-tucson-n-line-awd-2023', now()
  ) RETURNING id INTO v17;

  -- 18: Hyundai Creta Ultimate 2.0 AT
  INSERT INTO vehicles (
    brand_id, model_id, category_id, version,
    year_fabrication, year_model, mileage, color,
    transmission, fuel, doors, price,
    single_owner, ipva_paid, has_warranty, revisions_up_to_date,
    conservation, description,
    status, is_published, is_new_arrival, show_price, show_whatsapp,
    slug, published_at
  ) VALUES (
    hyundai_id, hyundai_creta_id, suv_id, 'Ultimate 2.0 AT Platinum',
    2023, 2024, 8300, 'Branco Atlas',
    'automatico', 'flex', 5, 169900.00,
    true, true, true, true,
    'excelente',
    'Hyundai Creta Ultimate topo de linha com motor 2.0 flex de 167cv. Nova geração com design renovado, tela de 10,25" com Bluelink conectado, câmera de visão 360°, bancos de couro, som premium Bose 8 alto-falantes, teto solar e SmartSense safety completo.',
    'publicado', true, true, true, true,
    'hyundai-creta-ultimate-2024', now()
  ) RETURNING id INTO v18;

  -- 19: Volkswagen Tiguan Allspace R-Line
  INSERT INTO vehicles (
    brand_id, model_id, category_id, version,
    year_fabrication, year_model, mileage, color,
    transmission, fuel, doors, price,
    single_owner, ipva_paid, has_warranty,
    conservation, description,
    status, is_published, show_price, show_whatsapp,
    slug, published_at
  ) VALUES (
    volkswagen_id, vw_tiguan_id, suv_id, 'Allspace R-Line 2.0 TSI 4Motion 7L',
    2022, 2023, 35600, 'Cinza Manganês',
    'automatico', 'gasolina', 5, 299900.00,
    true, false, true,
    'otimo',
    'Volkswagen Tiguan Allspace R-Line 7 lugares com motor 2.0 TSI de 220cv e câmbio DSG de 7 marchas. Tração 4Motion, visual esportivo R-Line, painel digital Innovision Cockpit de 12", faróis IQ.LIGHT matrix LED, frenagem frontal, câmera traseira e bancos de couro.',
    'publicado', true, true, true,
    'volkswagen-tiguan-allspace-r-line-2023', now()
  ) RETURNING id INTO v19;

  -- 20: Volkswagen T-Cross Highline TSI
  INSERT INTO vehicles (
    brand_id, model_id, category_id, version,
    year_fabrication, year_model, mileage, color,
    transmission, fuel, doors, price,
    single_owner, ipva_paid, has_warranty, revisions_up_to_date,
    conservation, description,
    status, is_published, is_new_arrival, show_price, show_whatsapp,
    slug, published_at
  ) VALUES (
    volkswagen_id, vw_tcross_id, suv_id, 'Highline 1.4 TSI AT',
    2023, 2024, 14200, 'Vermelho Rubi',
    'automatico', 'flex', 5, 149900.00,
    true, true, true, true,
    'excelente',
    'Volkswagen T-Cross Highline topo de linha com motor 1.4 TSI de 150cv. Central Discover Media de 10" com Android Auto/Apple CarPlay sem fio, câmera traseira, sensor de estacionamento, partida pelo celular, bancos de couro, controle de velocidade adaptativo e frenagem autônoma.',
    'publicado', true, true, true, true,
    'volkswagen-t-cross-highline-tsi-2024', now()
  ) RETURNING id INTO v20;

  -- ─── Imagens dos veículos (Unsplash — licença gratuita) ──

  -- 01: BMW X5
  INSERT INTO vehicle_images (vehicle_id, storage_path, url, alt, sort_order, is_primary) VALUES
    (v01, 'seed/bmw-x5-1.jpg', 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=85&fit=crop', 'BMW X5 xDrive30d M Sport - Vista frontal', 0, true),
    (v01, 'seed/bmw-x5-2.jpg', 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=1200&q=85&fit=crop', 'BMW X5 xDrive30d M Sport - Vista lateral', 1, false),
    (v01, 'seed/bmw-x5-3.jpg', 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=1200&q=85&fit=crop', 'BMW X5 xDrive30d M Sport - Interior', 2, false);

  -- 02: BMW 320i
  INSERT INTO vehicle_images (vehicle_id, storage_path, url, alt, sort_order, is_primary) VALUES
    (v02, 'seed/bmw-320i-1.jpg', 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&q=85&fit=crop', 'BMW 320i GP Sport - Vista frontal', 0, true),
    (v02, 'seed/bmw-320i-2.jpg', 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=85&fit=crop', 'BMW 320i GP Sport - Vista traseira', 1, false);

  -- 03: BMW 530i
  INSERT INTO vehicle_images (vehicle_id, storage_path, url, alt, sort_order, is_primary) VALUES
    (v03, 'seed/bmw-530i-1.jpg', 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200&q=85&fit=crop', 'BMW 530i M Sport - Vista frontal', 0, true),
    (v03, 'seed/bmw-530i-2.jpg', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=85&fit=crop', 'BMW 530i M Sport - Interior', 1, false);

  -- 04: Mercedes C300
  INSERT INTO vehicle_images (vehicle_id, storage_path, url, alt, sort_order, is_primary) VALUES
    (v04, 'seed/merc-c300-1.jpg', 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=85&fit=crop', 'Mercedes-Benz C 300 AMG Line - Vista frontal', 0, true),
    (v04, 'seed/merc-c300-2.jpg', 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=1200&q=85&fit=crop', 'Mercedes-Benz C 300 AMG Line - Vista lateral', 1, false),
    (v04, 'seed/merc-c300-3.jpg', 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=1200&q=85&fit=crop', 'Mercedes-Benz C 300 AMG Line - Interior', 2, false);

  -- 05: Mercedes GLC 300
  INSERT INTO vehicle_images (vehicle_id, storage_path, url, alt, sort_order, is_primary) VALUES
    (v05, 'seed/merc-glc-1.jpg', 'https://images.unsplash.com/photo-1605559424843-9073730702d8?w=1200&q=85&fit=crop', 'Mercedes-Benz GLC 300 4MATIC - Vista frontal', 0, true),
    (v05, 'seed/merc-glc-2.jpg', 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=1200&q=85&fit=crop', 'Mercedes-Benz GLC 300 4MATIC - Vista lateral', 1, false);

  -- 06: Mercedes S500
  INSERT INTO vehicle_images (vehicle_id, storage_path, url, alt, sort_order, is_primary) VALUES
    (v06, 'seed/merc-s500-1.jpg', 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=1200&q=85&fit=crop', 'Mercedes-Benz S 500 4MATIC L - Vista frontal', 0, true),
    (v06, 'seed/merc-s500-2.jpg', 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=1200&q=85&fit=crop', 'Mercedes-Benz S 500 4MATIC L - Interior luxuoso', 1, false);

  -- 07: Audi A4
  INSERT INTO vehicle_images (vehicle_id, storage_path, url, alt, sort_order, is_primary) VALUES
    (v07, 'seed/audi-a4-1.jpg', 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=1200&q=85&fit=crop', 'Audi A4 Prestige Plus - Vista frontal', 0, true),
    (v07, 'seed/audi-a4-2.jpg', 'https://images.unsplash.com/photo-1562141961-b6b03dce2f76?w=1200&q=85&fit=crop', 'Audi A4 Prestige Plus - Vista lateral', 1, false);

  -- 08: Audi Q5
  INSERT INTO vehicle_images (vehicle_id, storage_path, url, alt, sort_order, is_primary) VALUES
    (v08, 'seed/audi-q5-1.jpg', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=85&fit=crop', 'Audi Q5 Performance Black - Vista frontal', 0, true),
    (v08, 'seed/audi-q5-2.jpg', 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200&q=85&fit=crop', 'Audi Q5 Performance Black - Vista traseira', 1, false);

  -- 09: Toyota SW4
  INSERT INTO vehicle_images (vehicle_id, storage_path, url, alt, sort_order, is_primary) VALUES
    (v09, 'seed/sw4-1.jpg', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&q=85&fit=crop', 'Toyota SW4 Diamond 7L - Vista frontal', 0, true),
    (v09, 'seed/sw4-2.jpg', 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=85&fit=crop', 'Toyota SW4 Diamond 7L - Vista lateral', 1, false);

  -- 10: Toyota Corolla Hybrid
  INSERT INTO vehicle_images (vehicle_id, storage_path, url, alt, sort_order, is_primary) VALUES
    (v10, 'seed/corolla-1.jpg', 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=1200&q=85&fit=crop', 'Toyota Corolla Altis Hybrid - Vista frontal', 0, true),
    (v10, 'seed/corolla-2.jpg', 'https://images.unsplash.com/photo-1592853625511-ad0edcc69c07?w=1200&q=85&fit=crop', 'Toyota Corolla Altis Hybrid - Vista lateral', 1, false);

  -- 11: Honda CR-V
  INSERT INTO vehicle_images (vehicle_id, storage_path, url, alt, sort_order, is_primary) VALUES
    (v11, 'seed/crv-1.jpg', 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=1200&q=85&fit=crop', 'Honda CR-V Touring 4WD - Vista frontal', 0, true),
    (v11, 'seed/crv-2.jpg', 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=85&fit=crop', 'Honda CR-V Touring 4WD - Vista lateral', 1, false);

  -- 12: Jeep Commander
  INSERT INTO vehicle_images (vehicle_id, storage_path, url, alt, sort_order, is_primary) VALUES
    (v12, 'seed/commander-1.jpg', 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&q=85&fit=crop', 'Jeep Commander Overland 4x4 - Vista frontal', 0, true),
    (v12, 'seed/commander-2.jpg', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85&fit=crop', 'Jeep Commander Overland 4x4 - Vista traseira', 1, false);

  -- 13: Jeep Wrangler
  INSERT INTO vehicle_images (vehicle_id, storage_path, url, alt, sort_order, is_primary) VALUES
    (v13, 'seed/wrangler-1.jpg', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&q=85&fit=crop', 'Jeep Wrangler Rubicon - Vista frontal', 0, true),
    (v13, 'seed/wrangler-2.jpg', 'https://images.unsplash.com/photo-1546516820-97c2f4e8e5c7?w=1200&q=85&fit=crop', 'Jeep Wrangler Rubicon - Off-road', 1, false);

  -- 14: Land Rover Defender
  INSERT INTO vehicle_images (vehicle_id, storage_path, url, alt, sort_order, is_primary) VALUES
    (v14, 'seed/defender-1.jpg', 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&q=85&fit=crop', 'Land Rover Defender 110 HSE - Vista frontal', 0, true),
    (v14, 'seed/defender-2.jpg', 'https://images.unsplash.com/photo-1625231338837-6e5d3dae7875?w=1200&q=85&fit=crop', 'Land Rover Defender 110 HSE - Vista lateral', 1, false),
    (v14, 'seed/defender-3.jpg', 'https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?w=1200&q=85&fit=crop', 'Land Rover Defender 110 HSE - Interior', 2, false);

  -- 15: Land Rover Discovery Sport
  INSERT INTO vehicle_images (vehicle_id, storage_path, url, alt, sort_order, is_primary) VALUES
    (v15, 'seed/discovery-1.jpg', 'https://images.unsplash.com/photo-1598977054239-f1e9e9e8c92b?w=1200&q=85&fit=crop', 'Land Rover Discovery Sport R-Dynamic - Vista frontal', 0, true),
    (v15, 'seed/discovery-2.jpg', 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=85&fit=crop', 'Land Rover Discovery Sport R-Dynamic - Vista lateral', 1, false);

  -- 16: Volvo XC60
  INSERT INTO vehicle_images (vehicle_id, storage_path, url, alt, sort_order, is_primary) VALUES
    (v16, 'seed/xc60-1.jpg', 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=1200&q=85&fit=crop', 'Volvo XC60 Ultimate B5 AWD - Vista frontal', 0, true),
    (v16, 'seed/xc60-2.jpg', 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=1200&q=85&fit=crop', 'Volvo XC60 Ultimate B5 AWD - Vista lateral', 1, false),
    (v16, 'seed/xc60-3.jpg', 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=1200&q=85&fit=crop', 'Volvo XC60 Ultimate B5 AWD - Interior Bowers & Wilkins', 2, false);

  -- 17: Hyundai Tucson N-Line
  INSERT INTO vehicle_images (vehicle_id, storage_path, url, alt, sort_order, is_primary) VALUES
    (v17, 'seed/tucson-1.jpg', 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=1200&q=85&fit=crop', 'Hyundai Tucson N-Line AWD - Vista frontal', 0, true),
    (v17, 'seed/tucson-2.jpg', 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=85&fit=crop', 'Hyundai Tucson N-Line AWD - Vista lateral', 1, false);

  -- 18: Hyundai Creta Ultimate
  INSERT INTO vehicle_images (vehicle_id, storage_path, url, alt, sort_order, is_primary) VALUES
    (v18, 'seed/creta-1.jpg', 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=1200&q=85&fit=crop', 'Hyundai Creta Ultimate - Vista frontal', 0, true),
    (v18, 'seed/creta-2.jpg', 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=85&fit=crop', 'Hyundai Creta Ultimate - Vista lateral', 1, false);

  -- 19: VW Tiguan Allspace R-Line
  INSERT INTO vehicle_images (vehicle_id, storage_path, url, alt, sort_order, is_primary) VALUES
    (v19, 'seed/tiguan-1.jpg', 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=1200&q=85&fit=crop', 'VW Tiguan Allspace R-Line 7L - Vista frontal', 0, true),
    (v19, 'seed/tiguan-2.jpg', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85&fit=crop', 'VW Tiguan Allspace R-Line 7L - Vista traseira', 1, false);

  -- 20: VW T-Cross Highline
  INSERT INTO vehicle_images (vehicle_id, storage_path, url, alt, sort_order, is_primary) VALUES
    (v20, 'seed/tcross-1.jpg', 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=1200&q=85&fit=crop', 'VW T-Cross Highline TSI - Vista frontal', 0, true),
    (v20, 'seed/tcross-2.jpg', 'https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?w=1200&q=85&fit=crop', 'VW T-Cross Highline TSI - Vista lateral', 1, false);

  -- ─── Opcionais dos veículos ───────────────────────────────

  -- 01: BMW X5 — todos os opcionais
  INSERT INTO vehicle_features (vehicle_id, feature_id) VALUES
    (v01, ar_id), (v01, couro_id), (v01, teto_id), (v01, multimidia_id),
    (v01, camera_id), (v01, sensor_id), (v01, piloto_id), (v01, botao_id),
    (v01, chave_id), (v01, inducao_id), (v01, som_id), (v01, faixa_id),
    (v01, frena_id), (v01, estab_id), (v01, airbag_id), (v01, rodas_id),
    (v01, farol_id), (v01, bancos_el_id), (v01, bancos_aq_id), (v01, direcao_id);

  -- 02: BMW 320i
  INSERT INTO vehicle_features (vehicle_id, feature_id) VALUES
    (v02, ar_id), (v02, couro_id), (v02, multimidia_id), (v02, camera_id),
    (v02, sensor_id), (v02, piloto_id), (v02, botao_id), (v02, chave_id),
    (v02, inducao_id), (v02, faixa_id), (v02, frena_id), (v02, estab_id),
    (v02, airbag_id), (v02, rodas_id), (v02, farol_id), (v02, direcao_id);

  -- 03: BMW 530i
  INSERT INTO vehicle_features (vehicle_id, feature_id) VALUES
    (v03, ar_id), (v03, couro_id), (v03, teto_id), (v03, multimidia_id),
    (v03, camera_id), (v03, sensor_id), (v03, piloto_id), (v03, botao_id),
    (v03, chave_id), (v03, inducao_id), (v03, som_id), (v03, faixa_id),
    (v03, frena_id), (v03, estab_id), (v03, airbag_id), (v03, rodas_id),
    (v03, farol_id), (v03, bancos_aq_id), (v03, direcao_id);

  -- 04: Mercedes C300
  INSERT INTO vehicle_features (vehicle_id, feature_id) VALUES
    (v04, ar_id), (v04, couro_id), (v04, multimidia_id), (v04, camera_id),
    (v04, sensor_id), (v04, piloto_id), (v04, botao_id), (v04, chave_id),
    (v04, inducao_id), (v04, faixa_id), (v04, frena_id), (v04, estab_id),
    (v04, airbag_id), (v04, rodas_id), (v04, farol_id), (v04, bancos_aq_id), (v04, direcao_id);

  -- 05: Mercedes GLC 300
  INSERT INTO vehicle_features (vehicle_id, feature_id) VALUES
    (v05, ar_id), (v05, couro_id), (v05, teto_id), (v05, multimidia_id),
    (v05, camera_id), (v05, sensor_id), (v05, piloto_id), (v05, botao_id),
    (v05, chave_id), (v05, inducao_id), (v05, som_id), (v05, faixa_id),
    (v05, frena_id), (v05, estab_id), (v05, airbag_id), (v05, rodas_id),
    (v05, farol_id), (v05, bancos_el_id), (v05, bancos_aq_id), (v05, direcao_id);

  -- 06: Mercedes S500
  INSERT INTO vehicle_features (vehicle_id, feature_id) VALUES
    (v06, ar_id), (v06, couro_id), (v06, teto_id), (v06, multimidia_id),
    (v06, camera_id), (v06, sensor_id), (v06, piloto_id), (v06, botao_id),
    (v06, chave_id), (v06, inducao_id), (v06, som_id), (v06, faixa_id),
    (v06, frena_id), (v06, estab_id), (v06, airbag_id), (v06, rodas_id),
    (v06, farol_id), (v06, bancos_el_id), (v06, bancos_aq_id), (v06, direcao_id);

  -- 07: Audi A4
  INSERT INTO vehicle_features (vehicle_id, feature_id) VALUES
    (v07, ar_id), (v07, couro_id), (v07, multimidia_id), (v07, camera_id),
    (v07, sensor_id), (v07, piloto_id), (v07, botao_id), (v07, chave_id),
    (v07, inducao_id), (v07, faixa_id), (v07, frena_id), (v07, estab_id),
    (v07, airbag_id), (v07, rodas_id), (v07, farol_id), (v07, bancos_aq_id), (v07, direcao_id);

  -- 08: Audi Q5
  INSERT INTO vehicle_features (vehicle_id, feature_id) VALUES
    (v08, ar_id), (v08, couro_id), (v08, teto_id), (v08, multimidia_id),
    (v08, camera_id), (v08, sensor_id), (v08, piloto_id), (v08, botao_id),
    (v08, chave_id), (v08, inducao_id), (v08, som_id), (v08, faixa_id),
    (v08, frena_id), (v08, estab_id), (v08, airbag_id), (v08, rodas_id),
    (v08, farol_id), (v08, bancos_aq_id), (v08, direcao_id);

  -- 09: Toyota SW4
  INSERT INTO vehicle_features (vehicle_id, feature_id) VALUES
    (v09, ar_id), (v09, couro_id), (v09, teto_id), (v09, multimidia_id),
    (v09, camera_id), (v09, sensor_id), (v09, piloto_id), (v09, botao_id),
    (v09, chave_id), (v09, faixa_id), (v09, frena_id), (v09, estab_id),
    (v09, airbag_id), (v09, rodas_id), (v09, farol_id), (v09, bancos_aq_id), (v09, direcao_id);

  -- 10: Toyota Corolla Hybrid
  INSERT INTO vehicle_features (vehicle_id, feature_id) VALUES
    (v10, ar_id), (v10, couro_id), (v10, multimidia_id), (v10, camera_id),
    (v10, sensor_id), (v10, piloto_id), (v10, botao_id), (v10, chave_id),
    (v10, inducao_id), (v10, faixa_id), (v10, frena_id), (v10, estab_id),
    (v10, airbag_id), (v10, rodas_id), (v10, farol_id), (v10, direcao_id);

  -- 11: Honda CR-V
  INSERT INTO vehicle_features (vehicle_id, feature_id) VALUES
    (v11, ar_id), (v11, couro_id), (v11, teto_id), (v11, multimidia_id),
    (v11, camera_id), (v11, sensor_id), (v11, piloto_id), (v11, botao_id),
    (v11, chave_id), (v11, inducao_id), (v11, faixa_id), (v11, frena_id),
    (v11, estab_id), (v11, airbag_id), (v11, rodas_id), (v11, farol_id), (v11, direcao_id);

  -- 12: Jeep Commander
  INSERT INTO vehicle_features (vehicle_id, feature_id) VALUES
    (v12, ar_id), (v12, couro_id), (v12, teto_id), (v12, multimidia_id),
    (v12, camera_id), (v12, sensor_id), (v12, piloto_id), (v12, botao_id),
    (v12, chave_id), (v12, inducao_id), (v12, faixa_id), (v12, frena_id),
    (v12, estab_id), (v12, airbag_id), (v12, rodas_id), (v12, farol_id),
    (v12, bancos_el_id), (v12, direcao_id);

  -- 13: Jeep Wrangler
  INSERT INTO vehicle_features (vehicle_id, feature_id) VALUES
    (v13, ar_id), (v13, couro_id), (v13, multimidia_id), (v13, camera_id),
    (v13, sensor_id), (v13, botao_id), (v13, chave_id), (v13, estab_id),
    (v13, airbag_id), (v13, rodas_id), (v13, farol_id), (v13, direcao_id);

  -- 14: Land Rover Defender
  INSERT INTO vehicle_features (vehicle_id, feature_id) VALUES
    (v14, ar_id), (v14, couro_id), (v14, teto_id), (v14, multimidia_id),
    (v14, camera_id), (v14, sensor_id), (v14, piloto_id), (v14, botao_id),
    (v14, chave_id), (v14, inducao_id), (v14, som_id), (v14, faixa_id),
    (v14, frena_id), (v14, estab_id), (v14, airbag_id), (v14, rodas_id),
    (v14, farol_id), (v14, bancos_el_id), (v14, bancos_aq_id), (v14, direcao_id);

  -- 15: Land Rover Discovery Sport
  INSERT INTO vehicle_features (vehicle_id, feature_id) VALUES
    (v15, ar_id), (v15, couro_id), (v15, teto_id), (v15, multimidia_id),
    (v15, camera_id), (v15, sensor_id), (v15, piloto_id), (v15, botao_id),
    (v15, chave_id), (v15, faixa_id), (v15, frena_id), (v15, estab_id),
    (v15, airbag_id), (v15, rodas_id), (v15, farol_id), (v15, direcao_id);

  -- 16: Volvo XC60
  INSERT INTO vehicle_features (vehicle_id, feature_id) VALUES
    (v16, ar_id), (v16, couro_id), (v16, teto_id), (v16, multimidia_id),
    (v16, camera_id), (v16, sensor_id), (v16, piloto_id), (v16, botao_id),
    (v16, chave_id), (v16, inducao_id), (v16, som_id), (v16, faixa_id),
    (v16, frena_id), (v16, estab_id), (v16, airbag_id), (v16, rodas_id),
    (v16, farol_id), (v16, bancos_el_id), (v16, bancos_aq_id), (v16, direcao_id);

  -- 17: Hyundai Tucson N-Line
  INSERT INTO vehicle_features (vehicle_id, feature_id) VALUES
    (v17, ar_id), (v17, couro_id), (v17, multimidia_id), (v17, camera_id),
    (v17, sensor_id), (v17, piloto_id), (v17, botao_id), (v17, chave_id),
    (v17, inducao_id), (v17, faixa_id), (v17, frena_id), (v17, estab_id),
    (v17, airbag_id), (v17, rodas_id), (v17, farol_id), (v17, direcao_id);

  -- 18: Hyundai Creta Ultimate
  INSERT INTO vehicle_features (vehicle_id, feature_id) VALUES
    (v18, ar_id), (v18, couro_id), (v18, teto_id), (v18, multimidia_id),
    (v18, camera_id), (v18, sensor_id), (v18, piloto_id), (v18, botao_id),
    (v18, chave_id), (v18, inducao_id), (v18, som_id), (v18, faixa_id),
    (v18, frena_id), (v18, estab_id), (v18, airbag_id), (v18, rodas_id),
    (v18, farol_id), (v18, direcao_id);

  -- 19: VW Tiguan Allspace
  INSERT INTO vehicle_features (vehicle_id, feature_id) VALUES
    (v19, ar_id), (v19, couro_id), (v19, multimidia_id), (v19, camera_id),
    (v19, sensor_id), (v19, piloto_id), (v19, botao_id), (v19, chave_id),
    (v19, faixa_id), (v19, frena_id), (v19, estab_id), (v19, airbag_id),
    (v19, rodas_id), (v19, farol_id), (v19, direcao_id);

  -- 20: VW T-Cross Highline
  INSERT INTO vehicle_features (vehicle_id, feature_id) VALUES
    (v20, ar_id), (v20, couro_id), (v20, multimidia_id), (v20, camera_id),
    (v20, sensor_id), (v20, piloto_id), (v20, botao_id), (v20, chave_id),
    (v20, inducao_id), (v20, faixa_id), (v20, frena_id), (v20, estab_id),
    (v20, airbag_id), (v20, rodas_id), (v20, farol_id), (v20, direcao_id);

END $$;
