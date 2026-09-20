import { useState } from 'react';
import { TICKETS } from '@/mocks/techstaff/ticket.mock';
import type { KanbanStatus } from '@/types/admin/ticket.type';

export function useTechStaffDashboard() {
  const [searchQ, setSearchQ] = useState('');
  const [kpiFilter, setKpiFilter] = useState<string | null>(null);

  const filteredTickets = TICKETS.filter((t) => {
    const matchSearch =
      searchQ === '' ||
      t.device.toLowerCase().includes(searchQ.toLowerCase()) ||
      t.customer.toLowerCase().includes(searchQ.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQ.toLowerCase()) ||
      t.serialNumber.toLowerCase().includes(searchQ.toLowerCase());
    const matchKpi =
      kpiFilter === null ||
      (kpiFilter === 'needs_attention' &&
        (t.slaStatus === 'overdue' ||
          t.slaStatus === 'due_today' ||
          t.status === 'needs_inspection' ||
          t.status === 'waiting_customer')) ||
      (kpiFilter === 'in_progress' &&
        (t.status === 'repairing' || t.status === 'checking_warranty')) ||
      (kpiFilter === 'waiting_customer' && t.status === 'waiting_customer') ||
      (kpiFilter === 'overdue' && t.slaStatus === 'overdue') ||
      (kpiFilter === 'completed' && t.status === 'completed');
    return matchSearch && matchKpi;
  });

  const getColumnTickets = (status: KanbanStatus) =>
    filteredTickets.filter((t) => t.status === status);

  const kpiCounts = {
    total: TICKETS.length,
    needsAttention: TICKETS.filter(
      (t) =>
        t.slaStatus === 'overdue' ||
        t.slaStatus === 'due_today' ||
        t.status === 'needs_inspection' ||
        t.status === 'waiting_customer'
    ).length,
    inProgress: TICKETS.filter(
      (t) => t.status === 'repairing' || t.status === 'checking_warranty'
    ).length,
    waitingCustomer: TICKETS.filter((t) => t.status === 'waiting_customer').length,
    overdue: TICKETS.filter((t) => t.slaStatus === 'overdue').length,
    completed: TICKETS.filter((t) => t.status === 'completed').length,
  };

  return {
    searchQ,
    setSearchQ,
    kpiFilter,
    setKpiFilter,
    filteredTickets,
    getColumnTickets,
    kpiCounts,
  };
}
