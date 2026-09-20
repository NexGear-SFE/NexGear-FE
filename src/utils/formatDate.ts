/**
 * Formats a date string or Date object into 'dd/mm/yyyy' format.
 * Examples:
 * - '2026-09-12' -> '12/09/2026'
 * - Date object -> '12/09/2026'
 */
export function formatDate(dateInput?: string | Date | null): string {
  if (!dateInput) return ''

  if (typeof dateInput === 'string') {
    // Kiểm tra định dạng YYYY-MM-DD
    const isoMatch = dateInput.match(/^(\d{4})-(\d{2})-(\d{2})/)
    if (isoMatch) {
      const [, year, month, day] = isoMatch
      return `${day}/${month}/${year}`
    }

    // Kiểm tra định dạng DD/MM/YYYY (đã chuẩn hóa)
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateInput)) {
      return dateInput
    }
  }

  const d = new Date(dateInput)
  if (isNaN(d.getTime())) {
    return String(dateInput)
  }

  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()

  return `${day}/${month}/${year}`
}

/**
 * Formats a date string or Date object into 'dd/mm/yyyy HH:MM' format.
 */
export function formatDateTime(dateInput?: string | Date | null): string {
  const dateObj = dateInput ? (typeof dateInput === 'string' ? new Date(dateInput) : dateInput) : new Date()
  const validDate = isNaN(dateObj.getTime()) ? new Date() : dateObj

  const dateStr = formatDate(validDate)
  const hours = String(validDate.getHours()).padStart(2, '0')
  const minutes = String(validDate.getMinutes()).padStart(2, '0')

  return `${dateStr} ${hours}:${minutes}`
}

/**
 * Returns today's date formatted as 'dd/mm/yyyy'.
 */
export function getTodayFormattedDate(): string {
  return formatDate(new Date())
}
