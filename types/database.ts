// Tipos gerados do schema do banco de dados
// Em produção, gere com: supabase gen types typescript --local

export type VehicleStatus =
  | "rascunho"
  | "publicado"
  | "reservado"
  | "vendido"
  | "inativo"
  | "arquivado";

export type TransmissionType = "manual" | "automatico" | "automatizado" | "cvt";

export type FuelType =
  | "flex"
  | "gasolina"
  | "etanol"
  | "diesel"
  | "hibrido"
  | "eletrico"
  | "gnv";

export type ConservationState = "excelente" | "otimo" | "bom" | "regular";

export type UserRole = "admin" | "gerente" | "editor";

export type FeatureCategory = "conforto" | "seguranca" | "tecnologia" | "exterior";

export type LeadOrigin =
  | "whatsapp"
  | "formulario"
  | "instagram"
  | "google"
  | "meta_ads"
  | "indicacao"
  | "ligacao"
  | "loja_fisica"
  | "outro";

export type BannerStatus = "ativo" | "inativo" | "agendado";

// ─── Entidades ───────────────────────────────────────────────

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  description: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface VehicleModel {
  id: string;
  brand_id: string;
  name: string;
  slug: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  brand?: Brand;
}

export interface Feature {
  id: string;
  key: string;
  label: string;
  category: FeatureCategory;
  sort_order: number;
}

export interface VehicleImage {
  id: string;
  vehicle_id: string;
  storage_path: string;
  url: string;
  alt: string | null;
  sort_order: number;
  is_primary: boolean;
  is_hidden: boolean;
  created_at: string;
}

export interface Vehicle {
  id: string;

  // Identificação
  brand_id: string;
  model_id: string;
  category_id: string | null;
  version: string;

  // Especificações
  year_fabrication: number;
  year_model: number;
  mileage: number;
  color: string | null;
  transmission: TransmissionType;
  fuel: FuelType;
  doors: number | null;
  plate_end: string | null;

  // Preço
  price: number;
  promotional_price: number | null;
  accepts_trade: boolean;
  min_negotiation: number | null;
  internal_notes: string | null;

  // Características
  is_armored: boolean;
  single_owner: boolean;
  ipva_paid: boolean;
  has_warranty: boolean;
  revisions_up_to_date: boolean;
  has_manual: boolean;
  has_spare_key: boolean;
  conservation: ConservationState | null;
  provenance: string | null;
  description: string | null;

  // Publicação
  status: VehicleStatus;
  is_published: boolean;
  is_featured: boolean;
  is_new_arrival: boolean;
  show_price: boolean;
  show_whatsapp: boolean;
  published_at: string | null;
  sold_at: string | null;

  // SEO
  slug: string;
  seo_title: string | null;
  seo_description: string | null;
  share_text: string | null;

  // Métricas
  views_count: number;
  whatsapp_clicks_count: number;

  // Auditoria
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// Veículo com relações (para listagens e detalhe)
export interface VehicleWithRelations extends Vehicle {
  brand: Brand;
  model: VehicleModel;
  category: Category | null;
  images: VehicleImage[];
  features: Feature[];
}

// Card de veículo (versão enxuta para listagens)
export interface VehicleCard {
  id: string;
  slug: string;
  brand_name: string;
  model_name: string;
  version: string;
  year_fabrication: number;
  year_model: number;
  mileage: number;
  transmission: TransmissionType;
  fuel: FuelType;
  price: number;
  promotional_price: number | null;
  show_price: boolean;
  show_whatsapp: boolean;
  status: VehicleStatus;
  is_featured: boolean;
  is_new_arrival: boolean;
  primary_image: string | null;
  category_slug: string | null;
}

// ─── Banner ──────────────────────────────────────────────────

export interface Banner {
  id: string;
  title: string;
  subtitle: string | null;
  image_desktop: string | null;
  image_mobile: string | null;
  button_text: string | null;
  button_url: string | null;
  sort_order: number;
  status: BannerStatus;
  starts_at: string | null;
  ends_at: string | null;
  created_at: string;
  updated_at: string;
}

// ─── Testimonial ─────────────────────────────────────────────

export interface Testimonial {
  id: string;
  author_name: string;
  avatar_url: string | null;
  content: string;
  rating: number | null;
  vehicle_name: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// ─── Site Settings ───────────────────────────────────────────

export interface SiteSettings {
  id: string;
  store_name: string;
  logo_url: string | null;
  favicon_url: string | null;
  cnpj: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  google_maps_url: string | null;
  business_hours: Record<string, string> | null;
  whatsapp_message: string | null;
  primary_color: string;
  secondary_color: string;
  updated_at: string;
}

// ─── Profile ─────────────────────────────────────────────────

export interface Profile {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  avatar_url: string | null;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ─── WhatsApp Clicks ─────────────────────────────────────────

export interface WhatsAppClick {
  id: string;
  vehicle_id: string | null;
  vehicle_slug: string | null;
  vehicle_name: string | null;
  referrer: string | null;
  created_at: string;
}

// ─── Contact Message ─────────────────────────────────────────

export interface ContactMessage {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  message: string;
  origin: LeadOrigin;
  vehicle_id: string | null;
  is_read: boolean;
  created_at: string;
}

// ─── Filtros de busca ────────────────────────────────────────

export interface VehicleFilters {
  search?: string;
  brand_slug?: string;
  category_slug?: string;
  transmission?: TransmissionType;
  fuel?: FuelType;
  year_min?: number;
  year_max?: number;
  price_min?: number;
  price_max?: number;
  mileage_max?: number;
  sort?: "menor_preco" | "maior_preco" | "mais_novo" | "mais_recente";
  page?: number;
  per_page?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}
