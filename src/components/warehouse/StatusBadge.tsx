import { cn } from '@/utils/cn'
type Props = { label: string; tone?: 'success' | 'warning' | 'error' | 'info' | 'neutral' }
const tones = { success: 'bg-success-50 text-success-700 ring-success-200', warning: 'bg-warning-50 text-warning-700 ring-warning-200', error: 'bg-error-50 text-error-700 ring-error-200', info: 'bg-info-50 text-info-700 ring-info-200', neutral: 'bg-surface-200 text-text-600 ring-surface-400' }
export function StatusBadge({ label, tone = 'neutral' }: Props) { return <span className={cn('inline-flex items-center rounded-xs px-2 py-1 text-[11px] font-semibold ring-1 ring-inset', tones[tone])}>{label}</span> }
