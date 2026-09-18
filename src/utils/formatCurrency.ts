/**
 * Formats a number into Vietnamese Dong (VND) currency string format.
 * Example: 17890000 -> "17.890.000₫"
 */
export function formatCurrency(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '0₫'
  }
  return `${amount.toLocaleString('vi-VN')}₫`
}
