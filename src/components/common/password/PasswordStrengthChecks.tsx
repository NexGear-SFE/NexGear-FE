export interface PasswordCheckItem {
  label: string
  ok: boolean
}

interface PasswordStrengthChecksProps {
  checks: PasswordCheckItem[]
  columns?: 1 | 2
  textSize?: 'xs' | 'sm'
}

export function PasswordStrengthChecks({
  checks,
  columns = 2,
  textSize = 'xs',
}: PasswordStrengthChecksProps) {
  const isSm = textSize === 'sm'
  const textClass = isSm ? 'text-[11px]' : 'text-[10px]'

  return (
    <div className={`grid ${columns === 2 ? 'grid-cols-2' : 'grid-cols-1'} gap-y-[4px] gap-x-2 mt-2`}>
      {checks.map((c) => (
        <div key={c.label} className="flex items-center gap-1.5">
          <span className={`${textClass} font-bold ${c.ok ? 'text-emerald-500' : 'text-slate-400'}`}>
            {c.ok ? '✓' : '○'}
          </span>
          <span className={`${textClass} font-medium ${c.ok ? 'text-emerald-500' : 'text-slate-500'}`}>
            {c.label}
          </span>
        </div>
      ))}
    </div>
  )
}
