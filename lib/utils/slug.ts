export function generateSlug(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function generateVehicleSlug(
  brand: string,
  model: string,
  version: string,
  year: number,
  suffix?: string
): string {
  const base = generateSlug(`${brand} ${model} ${version} ${year}`);
  return suffix ? `${base}-${suffix}` : base;
}
