import { useState } from 'react';
import { KANBAN_COLUMNS, TICKETS } from '@/mocks/techstaff/ticket.mock';
import { IcTechSearch } from '@/components/common/Icons';
import type { KanbanStatus } from '@/types/ticket.type';
import { KanbanTicketCard } from '@/components/techstaff/KanbanTicketCard';
import { FileText, Zap, Wrench, MessageSquare, AlertCircle, CheckCircle2 } from 'lucide-react';

export function TechStaffDashboard() {
  const [searchQ, setSearchQ] = useState("")
  const [kpiFilter, setKpiFilter] = useState<string | null>(null)

  const filteredTickets = TICKETS.filter((t) => {
    const matchSearch =
      searchQ === "" ||
      t.device.toLowerCase().includes(searchQ.toLowerCase()) ||
      t.customer.toLowerCase().includes(searchQ.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQ.toLowerCase()) ||
      t.serialNumber.toLowerCase().includes(searchQ.toLowerCase())
    const matchKpi =
      kpiFilter === null ||
      (kpiFilter === "needs_attention" &&
        (t.slaStatus === "overdue" ||
          t.slaStatus === "due_today" ||
          t.status === "needs_inspection" ||
          t.status === "waiting_customer")) ||
      (kpiFilter === "in_progress" &&
        (t.status === "repairing" || t.status === "checking_warranty")) ||
      (kpiFilter === "waiting_customer" && t.status === "waiting_customer") ||
      (kpiFilter === "overdue" && t.slaStatus === "overdue") ||
      (kpiFilter === "completed" && t.status === "completed")
    return matchSearch && matchKpi
  })

  const getColumnTickets = (status: KanbanStatus) =>
    filteredTickets.filter((t) => t.status === status)

  return (
    <div className="flex-1 overflow-hidden flex flex-col bg-[#F4F5F7] h-full">
      {/* Page title bar */}
      <div className="pt-5 px-6 shrink-0">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <div>
            <h1 className="m-0 text-[22px] font-heading font-bold text-[#040004] tracking-[-0.02em] leading-none">
              Dashboard Nhân viên kỹ thuật
            </h1>
            <p className="m-0 mt-1 text-[13px] text-[#636363]">
              Quản lý hàng đợi sửa chữa & bảo hành
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Search */}
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#9E9E9E] flex">
                <IcTechSearch />
              </span>
              <input
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                placeholder="Tìm kiếm ticket, thiết bị, khách hàng..."
                className="w-[280px] h-9 pl-8 pr-3 bg-white border border-[#E0E0E0] rounded-md font-body text-[13px] text-[#040004] outline-none transition-colors duration-100 focus:border-[#E30019]"
              />
            </div>
          </div>
        </div>

        {/* KPI cards — clickable to filter board */}
        {(() => {
          const needsAttention = TICKETS.filter(
            (t) =>
              t.slaStatus === "overdue" ||
              t.slaStatus === "due_today" ||
              t.status === "needs_inspection" ||
              t.status === "waiting_customer",
          ).length
          const inProgress = TICKETS.filter(
            (t) =>
              t.status === "repairing" ||
              t.status === "checking_warranty",
          ).length
          const waitingCust = TICKETS.filter(
            (t) => t.status === "waiting_customer",
          ).length
          const overdue = TICKETS.filter(
            (t) => t.slaStatus === "overdue",
          ).length
          const completed = TICKETS.filter(
            (t) => t.status === "completed",
          ).length
          
          const kpis = [
            {
              key: null,
              label: "Tổng ticket",
              value: TICKETS.length,
              color: "#1E88E5",
              accent: "rgba(30,136,229,0.08)",
              Icon: FileText,
              desc: "Tất cả hồ sơ",
            },
            {
              key: "needs_attention",
              label: "Cần xử lý",
              value: needsAttention,
              color: "#FB8C00",
              accent: "rgba(251,140,0,0.10)",
              Icon: Zap,
              desc: "Mới + quá hạn + chờ khách",
            },
            {
              key: "in_progress",
              label: "Đang xử lý",
              value: inProgress,
              color: "#8B5CF6",
              accent: "rgba(139,92,246,0.10)",
              Icon: Wrench,
              desc: "Đang kiểm tra + sửa",
            },
            {
              key: "waiting_customer",
              label: "Chờ khách",
              value: waitingCust,
              color: "#FB8C00",
              accent: "rgba(251,140,0,0.10)",
              Icon: MessageSquare,
              desc: "Chờ xác nhận báo giá",
            },
            {
              key: "overdue",
              label: "Quá hạn SLA",
              value: overdue,
              color: "#E30019",
              accent: "rgba(227,0,25,0.08)",
              Icon: AlertCircle,
              desc: "Vượt thời hạn cam kết",
            },
            {
              key: "completed",
              label: "Hoàn thành",
              value: completed,
              color: "#00A859",
              accent: "rgba(0,168,89,0.10)",
              Icon: CheckCircle2,
              desc: "Đã bàn giao",
            },
          ]
          return (
            <div className="flex gap-2 mb-5 flex-wrap">
              {kpis.map(
                ({ key, label, value, color, accent, Icon, desc }) => {
                  const isActive = kpiFilter === key
                  return (
                    <button
                      key={label}
                      onClick={() => setKpiFilter(isActive ? null : key)}
                      className="flex-1 basis-[120px] rounded-lg p-[12px_14px] cursor-pointer text-left transition-all duration-120 outline-none"
                      style={{
                        background: isActive ? accent : "#FFFFFF",
                        border: `1px solid ${isActive ? color + "55" : "#E0E0E0"}`,
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.borderColor = color + "99"
                          e.currentTarget.style.background = accent
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.borderColor = "#E0E0E0"
                          e.currentTarget.style.background = "#FFFFFF"
                        }
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon size={18} style={{ color }} />
                      </div>
                      <div
                        className="text-2xl font-black font-heading leading-none tracking-[-0.02em]"
                        style={{ color }}
                      >
                        {value}
                      </div>
                      <div className="text-[12px] font-semibold text-[#040004] mt-1">
                        {label}
                      </div>
                      <div className="text-[11px] text-[#636363] mt-0.5">
                        {desc}
                      </div>
                    </button>
                  )
                },
              )}
            </div>
          )
        })()}
      </div>

      {/* ── KANBAN ── */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden px-6 pb-6 flex gap-3 items-start">
        {KANBAN_COLUMNS.map((col) => {
          const colTickets = getColumnTickets(col.key)
          return (
            <div
              key={col.key}
              className="w-[268px] min-w-[268px] flex flex-col bg-white border border-[#E0E0E0] rounded-lg overflow-hidden shrink-0 max-h-[calc(100vh-295px)]"
            >
              {/* Column header */}
              <div className="py-2.5 px-[13px] border-b border-black/5 shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[7px]">
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: col.accentColor }}
                    />
                    <span className="text-[#040004] font-bold text-[11.5px] font-heading tracking-[0.01em]">
                      {col.label}
                    </span>
                  </div>
                  <span
                    className="font-bold text-[11px] py-[2px] px-[7px] rounded-[20px] min-w-[22px] text-center"
                    style={{
                      background: col.color,
                      color: col.accentColor,
                      border: `1px solid ${col.accentColor}33`,
                    }}
                  >
                    {colTickets.length}
                  </span>
                </div>
                <div className="text-[10px] text-[#636363] mt-[3px] pl-[15px]">
                  {col.desc}
                </div>
              </div>

              {/* Cards scroll area */}
              <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-2">
                {colTickets.length === 0 ? (
                  <div className="text-center py-7 px-3 text-[#9E9E9E] text-[11px]">
                    Không có ticket nào
                  </div>
                ) : (
                  colTickets.map((ticket) => (
                    <KanbanTicketCard key={ticket.id} ticket={ticket} colAccentColor={col.accentColor} />
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
