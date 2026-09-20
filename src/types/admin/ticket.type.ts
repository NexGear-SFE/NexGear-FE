export type KanbanStatus =
  | 'needs_inspection'
  | 'checking_warranty'
  | 'waiting_customer'
  | 'repairing'
  | 'waiting_payment'
  | 'ready_pickup'
  | 'completed';

export type SlaStatus = 'ok' | 'due_soon' | 'due_today' | 'overdue';

export type TicketType = 'Bảo hành' | 'Dịch vụ sửa chữa';
export type DeviceType = 'Laptop' | 'PC' | 'Linh kiện' | 'Khác';

export interface TicketCard {
  id: string;
  device: string;
  serialNumber: string;
  img: string;
  customer: string;
  status: KanbanStatus;
  nextAction: string;
  slaDaysLeft: number;
  slaStatus: SlaStatus;
  ticketType: TicketType;
  type: DeviceType;
  quoteAmount?: number;
}
