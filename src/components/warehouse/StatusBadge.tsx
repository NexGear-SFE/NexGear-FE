import { cn } from '@/utils/cn'
type Props = { label: string; tone?: 'success' | 'warning' | 'error' | 'info' | 'neutral' }
const tones = { success: 'bg-emerald-50 text-success-500 ring-emerald-200', warning: 'bg-amber-50 text-warning-500 ring-amber-200', error: 'bg-error-50 text-error-700 ring-red-200', info: 'bg-blue-50 text-info-500 ring-blue-200', neutral: 'bg-surface-200 text-text-600 ring-surface-400' }
export function StatusBadge({ label, tone = 'neutral' }: Props) { return <span className={cn('inline-flex items-center rounded-xs px-2 py-1 text-[11px] font-semibold ring-1 ring-inset', tones[tone])}>{label}</span> }
