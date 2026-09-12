import { useState } from 'react';
import type { TicketCard, SlaStatus } from '@/types/ticket.type';
import { getSlaLabel } from '@/utils/ticket.util';
import { Hammer } from 'lucide-react';

function getSlaColor(s: SlaStatus) {
  if (s === "ok") return "#00A859"
  if (s === "due_soon") return "#F59E0B"
  if (s === "due_today") return "#F97316"
  return "#E30019" // Red overdue color
}

export function KanbanTicketCard({ ticket, colAccentColor }: { ticket: TicketCard, colAccentColor: string }) {
  const [devModalOpen, setDevModalOpen] = useState(false);
  const slaColor = getSlaColor(ticket.slaStatus)
  const slaLabel = getSlaLabel(ticket.slaDaysLeft, ticket.slaStatus)
  const isOverdue = ticket.slaStatus === "overdue"
  const typeColor =
    ticket.type === "Laptop" ? "#1E88E5" :
    ticket.type === "PC" ? "#7C3AED" :
    ticket.type === "Linh kiện" ? "#0D9488" : "#636363"
  const typeBg =
    ticket.type === "Laptop" ? "rgba(30,136,229,0.10)" :
    ticket.type === "PC" ? "rgba(124,58,237,0.10)" :
    ticket.type === "Linh kiện" ? "rgba(13,148,136,0.10)" : "rgba(100,116,139,0.10)"
    
  return (
    <>
      <div
        onClick={() => setDevModalOpen(true)}
        className={`bg-white rounded-lg p-[11px_11px_9px] flex flex-col gap-[7px] cursor-pointer transition-all duration-120
        ${isOverdue ? 'border border-[#E30019]/25 shadow-[inset_0_0_0_1px_rgba(220,38,38,0.15)]' : 'border border-[#E0E0E0]'}
        hover:shadow-[0_4px_16px_rgba(0,0,0,0.35)]
      `}
      onMouseEnter={(e) => {
        if (!isOverdue) e.currentTarget.style.borderColor = colAccentColor + '55';
      }}
      onMouseLeave={(e) => {
        if (!isOverdue) e.currentTarget.style.borderColor = '#E0E0E0';
      }}
    >
      {/* Top row: ID + type badge */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-[#636363] font-bold font-mono tracking-[0.04em]">
          {ticket.id}
        </span>
        <div className="flex items-center gap-1">
          <span className="px-1.5 py-[1px] rounded-[3px] font-semibold text-[9px]" style={{ background: typeBg, color: typeColor }}>
            {ticket.type}
          </span>
          <span
            className="px-1.5 py-[1px] rounded-[3px] font-semibold text-[9px]"
            style={{
              background: ticket.ticketType === "Bảo hành" ? "rgba(30,136,229,0.12)" : "rgba(124,58,237,0.10)",
              color: ticket.ticketType === "Bảo hành" ? "#1E88E5" : "#7C3AED",
            }}
          >
            {ticket.ticketType === "Bảo hành" ? "BH" : "DV"}
          </span>
        </div>
      </div>

      {/* Device + thumbnail */}
      <div className="flex items-center gap-2">
        <div className="w-10 h-[30px] rounded overflow-hidden shrink-0 border border-black/5 bg-[#F4F5F7]">
          <img src={ticket.img} alt={ticket.device} className="w-full h-full object-cover" />
        </div>
        <span className="text-[12.5px] font-bold text-[#040004] font-heading leading-tight flex-1 min-w-0 line-clamp-2">
          {ticket.device}
        </span>
      </div>

      {/* Serial number */}
      <div className="flex items-center gap-[5px]">
        <span className="text-[9px] text-[#9E9E9E] tracking-[0.06em] font-bold uppercase">SN</span>
        <span className="font-mono text-[10px] text-[#636363] tracking-[0.02em]">
          {ticket.serialNumber}
        </span>
      </div>

      {/* Customer */}
      <div className="flex items-center gap-1.5">
        <div className="w-[18px] h-[18px] rounded-full bg-[#F4F5F7] flex items-center justify-center shrink-0">
          <span className="text-[8px] text-[#636363] font-bold">
            {ticket.customer[0]}
          </span>
        </div>
        <span className="text-[11.5px] text-[#636363] font-medium">
          {ticket.customer}
        </span>
      </div>

      {/* Next action */}
      <div className="bg-black/2 border border-[#E0E0E0] rounded-[5px] px-2 py-[5px]">
        <div className="text-[9px] font-bold text-[#9E9E9E] tracking-[0.07em] uppercase mb-[2px]">
          Việc cần làm
        </div>
        <div className="text-[11px] text-[#040004] leading-snug">
          {ticket.nextAction}
        </div>
      </div>

      {/* SLA */}
      <div className="border-t border-black/5 pt-[7px] flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: slaColor }} />
          <span className="text-[10px] font-bold font-mono" style={{ color: slaColor }}>
            SLA: {slaLabel}
          </span>
        </div>
        {ticket.quoteAmount && (
          <span className="text-[10px] font-bold text-[#E30019] font-mono">
            {ticket.quoteAmount.toLocaleString("vi-VN")}₫
          </span>
        )}
      </div>
    </div>

    {devModalOpen && (
      <>
        <div
          onClick={(e) => { e.stopPropagation(); setDevModalOpen(false); }}
          className="fixed inset-0 z-[300] bg-black/65 backdrop-blur-[4px]"
        />
        <div className="fixed inset-0 z-[301] flex items-center justify-center p-5 pointer-events-none">
          <div className="bg-white border border-[var(--surface-400)] rounded-2xl p-8 w-full max-w-[360px] shadow-[0_24px_64px_rgba(0,0,0,0.6)] text-center animate-[fade-in_200ms_ease-out] pointer-events-auto">
            <div className="w-16 h-16 rounded-2xl bg-[var(--brand-50)] text-[var(--brand-500)] flex items-center justify-center mx-auto mb-5">
              <Hammer size={32} strokeWidth={1.5} />
            </div>
            <h3 className="m-0 mb-2 text-[18px] font-bold text-[var(--text-900)] font-heading">
              Đang phát triển
            </h3>
            <p className="m-0 mb-6 text-[13.5px] text-[var(--text-600)] font-body leading-[1.6]">
              Tính năng chi tiết phiếu sửa chữa hiện đang trong giai đoạn phát triển.
            </p>
            <button
              onClick={(e) => { e.stopPropagation(); setDevModalOpen(false); }}
              className="btn-primary w-full"
            >
              Đã hiểu
            </button>
          </div>
        </div>
      </>
    )}
    </>
  )
}
