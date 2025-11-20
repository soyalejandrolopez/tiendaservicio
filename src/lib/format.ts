/**
 * Formats a number as currency with thousand separators
 * @param price - The price to format
 * @returns Formatted price string with dots as thousand separators (e.g., "1.000")
 */
export function formatPrice(price: number | string): string {
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

  if (isNaN(numericPrice)) {
    return '0';
  }

  // Format with dot as thousand separator (Colombian/Latin American format)
  return numericPrice.toLocaleString('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

/**
 * Formats a number as currency with currency symbol
 * @param price - The price to format
 * @param currency - Currency symbol (default: '$')
 * @returns Formatted price string with currency symbol (e.g., "$1.000")
 */
export function formatCurrency(price: number | string, currency: string = '$'): string {
  return `${currency}${formatPrice(price)}`;
}
