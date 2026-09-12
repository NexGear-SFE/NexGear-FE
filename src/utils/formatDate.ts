/**
 * Formats a date string or Date object into 'dd/mm/yyyy' format.
 * Examples:
 * - '2026-09-12' -> '12/09/2026'
 * - Date object -> '12/09/2026'
 */
export function formatDate(dateInput?: string | Date | null): string {
  if (!dateInput) return ''

  if (typeof dateInput === 'string') {
    // Check for YYYY-MM-DD pattern
    const isoMatch = dateInput.match(/^(\d{4})-(\d{2})-(\d{2})/)
    if (isoMatch) {
      const [, year, month, day] = isoMatch
      return `${day}/${month}/${year}`
    }

    // Check for DD/MM/YYYY pattern (already formatted)
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
