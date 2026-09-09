import { Check } from 'lucide-react'
import { cn } from '@/utils/cn'
type Props = { steps: string[]; currentStep: number }
export function ProgressStepper({ steps, currentStep }: Props) {
  return <ol aria-label="Tiến độ" className="grid gap-2 sm:grid-flow-col sm:auto-cols-fr">{steps.map((step, index) => { const complete = index < currentStep; const current = index === currentStep; return <li key={step} aria-current={current ? 'step' : undefined} className={cn('flex min-h-12 items-center gap-3 rounded-sm border px-3 text-xs font-semibold', current && 'border-brand-500 bg-error-50 text-brand-500', complete && 'border-emerald-200 bg-emerald-50 text-success-500', !current && !complete && 'border-surface-400 bg-white text-text-600')}><span className={cn('flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px]', complete ? 'bg-success-500 text-white' : current ? 'bg-brand-500 text-white' : 'bg-surface-200')}>{complete ? <Check className="h-3.5 w-3.5" /> : index + 1}</span><span>{step}</span></li>})}</ol>
}
