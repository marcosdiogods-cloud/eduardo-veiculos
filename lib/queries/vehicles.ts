import { createClient } from "@/lib/supabase/server";
import type {
  VehicleCard,
  VehicleWithRelations,
  VehicleFilters,
  PaginatedResult,
} from "@/types/database";

export async function getPublishedVehicles(
  filters: VehicleFilters = {}
): Promise<PaginatedResult<VehicleCard>> {
  const supabase = await createClient();
  const {
    search,
    brand_slug,
    category_slug,
    transmission,
    fuel,
    year_min,
    year_max,
    price_min,
    price_max,
    mileage_max,
    sort = "mais_recente",
    page = 1,
    per_page = 12,
  } = filters;

  let query = supabase
    .from("vehicles")
    .select(
      `
      id, slug, version,
      year_fabrication, year_model, mileage,
      transmission, fuel, price, promotional_price,
      show_price, show_whatsapp, status, is_featured, is_new_arrival,
      brand:brands!inner(name, slug),
      model:vehicle_models!inner(name),
      category:categories(slug),
      images:vehicle_images(url, is_primary, is_hidden, sort_order)
    `,
      { count: "exact" }
    )
    .eq("is_published", true)
    .eq("status", "publicado")
    .is("deleted_at", null);

  if (search) {
    query = query.or(
      `version.ilike.%${search}%,brands.name.ilike.%${search}%,vehicle_models.name.ilike.%${search}%`
    );
  }
  if (brand_slug) {
    query = query.eq("brands.slug", brand_slug);
  }
  if (category_slug) {
    query = query.eq("categories.slug", category_slug);
  }
  if (transmission) query = query.eq("transmission", transmission);
  if (fuel) query = query.eq("fuel", fuel);
  if (year_min) query = query.gte("year_model", year_min);
  if (year_max) query = query.lte("year_model", year_max);
  if (price_min) query = query.gte("price", price_min);
  if (price_max) query = query.lte("price", price_max);
  if (mileage_max) query = query.lte("mileage", mileage_max);

  switch (sort) {
    case "menor_preco":
      query = query.order("price", { ascending: true });
      break;
    case "maior_preco":
      query = query.order("price", { ascending: false });
      break;
    case "mais_novo":
      query = query.order("year_model", { ascending: false });
      break;
    default:
      query = query.order("created_at", { ascending: false });
  }

  const from = (page - 1) * per_page;
  query = query.range(from, from + per_page - 1);

  const { data, count, error } = await query;

  if (error) throw error;

  const vehicles: VehicleCard[] = (data ?? []).map((v: any) => {
    const primaryImg =
      v.images?.find((i: any) => i.is_primary && !i.is_hidden)?.url ??
      v.images
        ?.filter((i: any) => !i.is_hidden)
        ?.sort((a: any, b: any) => a.sort_order - b.sort_order)[0]?.url ??
      null;

    return {
      id: v.id,
      slug: v.slug,
      brand_name: v.brand?.name ?? "",
      model_name: v.model?.name ?? "",
      version: v.version,
      year_fabrication: v.year_fabrication,
      year_model: v.year_model,
      mileage: v.mileage,
      transmission: v.transmission,
      fuel: v.fuel,
      price: v.price,
      promotional_price: v.promotional_price,
      show_price: v.show_price,
      show_whatsapp: v.show_whatsapp,
      status: v.status,
      is_featured: v.is_featured,
      is_new_arrival: v.is_new_arrival,
      primary_image: primaryImg,
      category_slug: v.category?.slug ?? null,
    };
  });

  const total = count ?? 0;
  return {
    data: vehicles,
    total,
    page,
    per_page,
    total_pages: Math.ceil(total / per_page),
  };
}

export async function getFeaturedVehicles(limit = 8): Promise<VehicleCard[]> {
  const result = await getPublishedVehicles({
    sort: "mais_recente",
    per_page: limit,
  });
  return result.data.filter((v) => v.is_featured);
}

export async function getNewArrivals(limit = 6): Promise<VehicleCard[]> {
  const result = await getPublishedVehicles({ sort: "mais_recente", per_page: limit });
  return result.data.filter((v) => v.is_new_arrival).slice(0, limit);
}

export async function getVehicleBySlug(
  slug: string
): Promise<VehicleWithRelations | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vehicles")
    .select(
      `
      *,
      brand:brands(*),
      model:vehicle_models(*),
      category:categories(*),
      images:vehicle_images(* ) ,
      features:vehicle_features(feature:features(*))
    `
    )
    .eq("slug", slug)
    .eq("is_published", true)
    .eq("status", "publicado")
    .is("deleted_at", null)
    .single();

  if (error || !data) return null;

  return {
    ...data,
    images: (data.images ?? [])
      .filter((i: any) => !i.is_hidden)
      .sort((a: any, b: any) => a.sort_order - b.sort_order),
    features: (data.features ?? []).map((vf: any) => vf.feature).filter(Boolean),
  } as VehicleWithRelations;
}

export async function getRelatedVehicles(
  vehicleId: string,
  brandId: string,
  categoryId: string | null,
  limit = 4
): Promise<VehicleCard[]> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("vehicles")
    .select(
      `
      id, slug, version,
      year_fabrication, year_model, mileage,
      transmission, fuel, price, promotional_price,
      show_price, status, is_featured, is_new_arrival,
      brand:brands!inner(name, slug),
      model:vehicle_models!inner(name),
      category:categories(slug),
      images:vehicle_images(url, is_primary, is_hidden, sort_order)
    `
    )
    .eq("is_published", true)
    .eq("status", "publicado")
    .is("deleted_at", null)
    .neq("id", vehicleId)
    .eq("brand_id", brandId)
    .limit(limit);

  return (data ?? []).map((v: any) => {
    const primaryImg =
      v.images?.find((i: any) => i.is_primary && !i.is_hidden)?.url ??
      v.images
        ?.filter((i: any) => !i.is_hidden)
        ?.sort((a: any, b: any) => a.sort_order - b.sort_order)[0]?.url ??
      null;
    return {
      id: v.id,
      slug: v.slug,
      brand_name: v.brand?.name ?? "",
      model_name: v.model?.name ?? "",
      version: v.version,
      year_fabrication: v.year_fabrication,
      year_model: v.year_model,
      mileage: v.mileage,
      transmission: v.transmission,
      fuel: v.fuel,
      price: v.price,
      promotional_price: v.promotional_price,
      show_price: v.show_price,
      show_whatsapp: v.show_whatsapp,
      status: v.status,
      is_featured: v.is_featured,
      is_new_arrival: v.is_new_arrival,
      primary_image: primaryImg,
      category_slug: v.category?.slug ?? null,
    };
  });
}

export async function incrementVehicleViews(slug: string): Promise<void> {
  const supabase = await createClient();
  await supabase.rpc("increment_vehicle_views", { p_slug: slug });
}
