export function formatPrice(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatMileage(value: number): string {
  return new Intl.NumberFormat("pt-BR").format(value) + " km";
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("pt-BR").format(
    typeof date === "string" ? new Date(date) : date
  );
}

export function formatYear(fabrication: number, model: number): string {
  return fabrication === model ? String(fabrication) : `${fabrication}/${model}`;
}
