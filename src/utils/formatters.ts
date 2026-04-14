export function formatCurrency(value: number | string | null | undefined): string {
  const numericValue = Number(value ?? 0);

  return `$${numericValue.toLocaleString('es-CO')}`;
}