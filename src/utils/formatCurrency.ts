/**
 * Format a number to Vietnamese Dong currency format.
 * Example: 4490000 -> "4.490.000đ"
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ'
}
