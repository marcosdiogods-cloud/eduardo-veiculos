import pg from 'pg';

const client = new pg.Client({
  connectionString: 'postgresql://postgres:HnGPcMUkQK4S.2N@db.lhuiisaoxecbpytadczi.supabase.co:5432/postgres',
  ssl: { rejectUnauthorized: false }
});

await client.connect();

const sqls = [
  "ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY",
  "ALTER TABLE brands ENABLE ROW LEVEL SECURITY",
  "ALTER TABLE categories ENABLE ROW LEVEL SECURITY",
  "ALTER TABLE vehicle_images ENABLE ROW LEVEL SECURITY",
  "ALTER TABLE vehicle_features ENABLE ROW LEVEL SECURITY",
  "ALTER TABLE features ENABLE ROW LEVEL SECURITY",
  "ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY",
  "DROP POLICY IF EXISTS vehicles_public_read ON vehicles",
  "CREATE POLICY vehicles_public_read ON vehicles FOR SELECT TO anon, authenticated USING (status = 'publicado' AND is_published = true AND deleted_at IS NULL)",
  "DROP POLICY IF EXISTS brands_public_read ON brands",
  "CREATE POLICY brands_public_read ON brands FOR SELECT TO anon, authenticated USING (is_active = true)",
  "DROP POLICY IF EXISTS categories_public_read ON categories",
  "CREATE POLICY categories_public_read ON categories FOR SELECT TO anon, authenticated USING (is_active = true)",
  "DROP POLICY IF EXISTS vehicle_images_public_read ON vehicle_images",
  "CREATE POLICY vehicle_images_public_read ON vehicle_images FOR SELECT TO anon, authenticated USING (true)",
  "DROP POLICY IF EXISTS vehicle_features_public_read ON vehicle_features",
  "CREATE POLICY vehicle_features_public_read ON vehicle_features FOR SELECT TO anon, authenticated USING (true)",
  "DROP POLICY IF EXISTS features_public_read ON features",
  "CREATE POLICY features_public_read ON features FOR SELECT TO anon, authenticated USING (true)",
  "DROP POLICY IF EXISTS contact_messages_insert ON contact_messages",
  "CREATE POLICY contact_messages_insert ON contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true)",
];

for (const sql of sqls) {
  try {
    await client.query(sql);
  } catch(e) {
    console.log('w', e.message.slice(0, 80));
  }
}

console.log('RLS policies applied');
await client.end();
