import type { DeviceType } from '@/types/ticket.type';

// Supported badge variants: device types + shortened ticket type labels
type TicketBadgeVariant = DeviceType | 'BH' | 'DV';

type TicketBadgeProps = {
  label: string;
  variant: TicketBadgeVariant;
};

const BADGE_CLASSES: Record<TicketBadgeVariant, string> = {
  Laptop: 'bg-blue-50 text-blue-600',
  PC: 'bg-purple-50 text-purple-600',
  'Linh kiện': 'bg-amber-50 text-amber-600',
  Khác: 'bg-gray-100 text-gray-500',
  BH: 'bg-blue-50 text-blue-600',
  DV: 'bg-purple-50 text-purple-600',
};

export function TicketBadge({ label, variant }: TicketBadgeProps) {
  const classes = BADGE_CLASSES[variant] ?? 'bg-gray-100 text-gray-500';
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold ${classes}`}
    >
      {label}
    </span>
  );
}
