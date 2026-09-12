import type { SlaStatus } from '@/types/ticket.type';

export function getSlaColorClass(s: SlaStatus): string {
  if (s === 'ok') return 'text-[#00A859]';
  if (s === 'due_soon') return 'text-[#F59E0B]';
  if (s === 'due_today') return 'text-[#F97316]';
  return 'text-[#DC2626]';
}

export function getSlaLabel(slaDaysLeft: number, s: SlaStatus): string {
  if (s === 'overdue') return `Quá hạn ${Math.abs(slaDaysLeft)} ngày`;
  if (s === 'due_today') return 'Đến hạn hôm nay';
  if (s === 'due_soon') return `Còn ${slaDaysLeft} ngày`;
  return `Còn ${slaDaysLeft} ngày`;
}
