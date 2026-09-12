import { useState, type ReactNode } from "react";
import type { WarrantyProvider } from "@/mocks/techstaff/warranty.mock";
import { Info, Search, Plus, Eye, Pencil, ExternalLink, Ban, CheckCircle, X, AlertTriangle, Check } from "lucide-react";

export function WarrantyTab({
  providers,
  setProviders,
}: {
  providers: WarrantyProvider[];
  setProviders: React.Dispatch<React.SetStateAction<WarrantyProvider[]>>;
}) {
  type ProviderModal =
    | { type: "add" }
    | { type: "edit"; provider: WarrantyProvider }
    | { type: "disable"; provider: WarrantyProvider }
    | null;
  const [modal, setModal] = useState<ProviderModal>(null);
  const [formName, setFormName] = useState("");
  const [formUrl, setFormUrl] = useState("");
  const [formActive, setFormActive] = useState(true);
  const [warrantySuccess, setWarrantySuccess] = useState("");
  const [urlError, setUrlError] = useState(false);
  const [providerSearch, setProviderSearch] = useState("");
  const [providerStatusFilter, setProviderStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [viewingProvider, setViewingProvider] = useState<WarrantyProvider | null>(null);

  function isValidUrl(s: string) {
    try {
      new URL(s);
      return true;
    } catch {
      return false;
    }
  }

  function openAdd() {
    setFormName("");
    setFormUrl("");
    setFormActive(true);
    setUrlError(false);
    setModal({ type: "add" });
  }

  function openEdit(p: WarrantyProvider) {
    setFormName(p.name);
    setFormUrl(p.url);
    setFormActive(p.active);
    setUrlError(false);
    setModal({ type: "edit", provider: p });
  }

  function saveAdd() {
    if (!formName.trim() || !formUrl.trim()) return;
    if (!isValidUrl(formUrl.trim())) {
      setUrlError(true);
      return;
    }
    const colors = ["#1E88E5", "#34D399", "#F472B6", "#A78BFA", "#FBBF24", "#FB923C"];
    const c = colors[providers.length % colors.length];
    const newP: WarrantyProvider = {
      id: Date.now().toString(),
      name: formName.trim(),
      pageName: "Warranty Lookup",
      url: formUrl.trim(),
      active: formActive,
      color: c,
      bg: c + "15",
    };
    setProviders((prev) => [...prev, newP]);
    setModal(null);
    setWarrantySuccess("✓ Đã thêm nhà cung cấp thành công");
    setTimeout(() => setWarrantySuccess(""), 3000);
  }

  function saveEdit() {
    if (modal?.type !== "edit") return;
    if (!formName.trim() || !formUrl.trim()) return;
    if (!isValidUrl(formUrl.trim())) {
      setUrlError(true);
      return;
    }
    setProviders((prev) =>
      prev.map((p) =>
        p.id === modal.provider.id
          ? {
              ...p,
              name: formName.trim(),
              url: formUrl.trim(),
              active: formActive,
            }
          : p
      )
    );
    setModal(null);
    setWarrantySuccess("✓ Đã cập nhật nhà cung cấp thành công");
    setTimeout(() => setWarrantySuccess(""), 3000);
  }

  function confirmDisable() {
    if (modal?.type !== "disable") return;
    setProviders((prev) =>
      prev.map((p) => (p.id === modal.provider.id ? { ...p, active: false } : p))
    );
    setModal(null);
    setWarrantySuccess("✓ Đã vô hiệu hóa nhà cung cấp");
    setTimeout(() => setWarrantySuccess(""), 3000);
  }

  function enableProvider(id: string) {
    setProviders((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: true } : p))
    );
    setWarrantySuccess("Đã kích hoạt lại nhà cung cấp");
    setTimeout(() => setWarrantySuccess(""), 3000);
  }

  const filtered = providers.filter((p) => {
    const matchSearch =
      !providerSearch.trim() ||
      p.name.toLowerCase().includes(providerSearch.toLowerCase());
    const matchStatus =
      providerStatusFilter === "all" ||
      (providerStatusFilter === "active" ? p.active : !p.active);
    return matchSearch && matchStatus;
  });

  const iconBtn = (title: string, icon: ReactNode, onClick: () => void, hoverClass: string) => (
    <button
      title={title}
      onClick={onClick}
      className={`w-[30px] h-[30px] border border-[var(--surface-400)] rounded-md bg-transparent cursor-pointer flex items-center justify-center text-[var(--text-600)] transition-colors duration-100 ${hoverClass} hover:text-[var(--text-900)]`}
    >
      {icon}
    </button>
  );

  return (
    <div className="max-w-[780px]">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold tracking-[0.1em] text-[var(--text-400)] uppercase font-body mb-1">
            Cấu hình hệ thống
          </div>
          <h2 className="m-0 text-[20px] font-bold text-[var(--text-900)] font-heading tracking-[-0.02em]">
            Bảo hành & Cấu hình hệ thống
          </h2>
          <p className="m-0 mt-1 text-[13px] text-[var(--text-600)] font-body">
            Quản lý các trang web tra cứu bảo hành chính hãng được sử dụng trong tính năng Kiểm tra Serial.
          </p>
        </div>
        <button
          className="shrink-0 h-10 px-5 bg-[var(--brand-500)] text-white border-none rounded-md text-[13px] font-bold font-body flex items-center gap-[7px] cursor-pointer hover:bg-[var(--brand-600)] transition-colors"
          onClick={openAdd}
        >
          <Plus size={16} /> Thêm nhà cung cấp
        </button>
      </div>

      {/* Info note */}
      <div className="flex gap-3 px-4 py-3 bg-blue-50 border border-blue-200/50 rounded-lg mb-5">
        <Info className="text-blue-500 shrink-0 mt-0.5" size={16} />
        <div className="text-[12px] text-[var(--text-600)] font-body leading-[1.6]">
          GearGo không tích hợp trực tiếp với API của nhà sản xuất. Kỹ thuật viên tra cứu bảo hành thủ công trên website chính hãng bằng cách nhập Serial Number.
        </div>
      </div>

      {warrantySuccess && (
        <div className="flex items-center gap-2.5 px-4 py-3 bg-green-50 border border-green-200/50 rounded-lg mb-5">
          <Check className="text-green-500" size={16} />
          <span className="text-green-500 text-[13px] font-body font-semibold">
            {warrantySuccess}
          </span>
        </div>
      )}

      {/* Search + filter bar */}
      {providers.length > 0 && (
        <div className="flex gap-2.5 mb-4 items-center">
          <div className="relative flex-1">
            <input
              value={providerSearch}
              onChange={(e) => setProviderSearch(e.target.value)}
              placeholder="Tìm nhà sản xuất..."
              className="w-full h-9 pl-8 pr-3 bg-white border border-[var(--surface-400)] rounded-md text-[13px] font-body outline-none transition-colors focus:border-[var(--brand-500)]"
            />
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-400)]" size={14} />
          </div>
          {(["all", "active", "inactive"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setProviderStatusFilter(f)}
              className={`h-9 px-3.5 rounded-lg border text-[12px] font-semibold font-body cursor-pointer transition-all duration-100 ${
                providerStatusFilter !== f
                  ? "border-[var(--surface-400)] bg-transparent text-[var(--text-600)] hover:bg-[var(--surface-200)]"
                  : f === "all"
                  ? "border-[var(--brand-500)] bg-[var(--brand-50)] text-[var(--brand-400)]"
                  : f === "active"
                  ? "border-green-500 bg-green-50 text-green-600"
                  : "border-red-500 bg-red-50 text-red-600"
              }`}
            >
              {f === "all" ? "Tất cả" : f === "active" ? "Đang hoạt động" : "Vô hiệu"}
            </button>
          ))}
        </div>
      )}

      {providers.length === 0 ? (
        <div className="text-center py-[60px] px-6 bg-white rounded-xl border border-black/5">
          <div className="text-[36px] mb-4">📭</div>
          <div className="text-[var(--text-600)] text-[15px] font-semibold font-heading">
            Chưa có nhà cung cấp nào.
          </div>
          <div className="text-[var(--text-400)] text-[13px] mt-1.5 mb-5 font-body">
            Thêm nhà cung cấp để hiển thị trên trang Kiểm tra Serial.
          </div>
          <button
            className="h-10 px-5 bg-[var(--brand-500)] text-white border-none rounded-md text-[13px] font-bold font-body cursor-pointer hover:bg-[var(--brand-600)] transition-colors inline-flex items-center gap-1.5"
            onClick={openAdd}
          >
            <Plus size={16} /> Thêm nhà cung cấp
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-10 px-6 bg-white rounded-xl border border-black/5">
          <div className="text-[28px] mb-3">🔍</div>
          <div className="text-[var(--text-600)] text-[14px] font-body">
            Không tìm thấy kết quả phù hợp.
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-black/5 overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[40px_1fr_1fr_100px_130px] gap-0 px-4 py-2.5 bg-black/5 border-b border-[var(--surface-400)]">
            {["", "Nhà sản xuất", "URL tra cứu", "Trạng thái", "Thao tác"].map((h) => (
              <div
                key={h}
                className="text-[10px] font-bold text-[var(--text-400)] uppercase tracking-[0.08em] font-body"
              >
                {h}
              </div>
            ))}
          </div>
          {/* Table rows */}
          {filtered.map((p, i) => (
            <div
              key={p.id}
              className={`grid grid-cols-[40px_1fr_1fr_100px_130px] gap-0 px-4 py-[13px] items-center transition-colors duration-100 hover:bg-black/5 ${
                i < filtered.length - 1 ? "border-b border-[var(--surface-400)]" : ""
              } ${p.active ? "opacity-100" : "opacity-[0.65]"}`}
            >
              {/* Brand mark */}
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center border"
                style={{ backgroundColor: p.bg, borderColor: `${p.color}33` }}
              >
                <span
                  className="text-[9px] font-black font-heading leading-none"
                  style={{ color: p.color }}
                >
                  {p.name.slice(0, 4)}
                </span>
              </div>
              {/* Name + description */}
              <div>
                <div className="text-[var(--text-900)] text-[13px] font-bold font-heading">
                  {p.name}
                </div>
                <div className="text-[var(--text-600)] text-[11px] font-body mt-[1px]">
                  {p.pageName}
                </div>
              </div>
              {/* URL */}
              <div className="text-[var(--text-400)] text-[11px] font-mono overflow-hidden text-ellipsis whitespace-nowrap pr-3">
                {p.url}
              </div>
              {/* Status */}
              <div>
                <div
                  className={`inline-flex items-center gap-[5px] px-2 py-[3px] rounded-full border ${
                    p.active
                      ? "bg-green-50 border-green-200/50"
                      : "bg-red-50 border-red-500"
                  }`}
                >
                  <div
                    className={`w-[5px] h-[5px] rounded-full ${p.active ? "bg-green-500" : "bg-red-600"}`}
                  />
                  <span
                    className={`text-[10px] font-semibold font-body ${
                      p.active ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {p.active ? "Hoạt động" : "Vô hiệu"}
                  </span>
                </div>
              </div>
              {/* Actions */}
              <div className="flex gap-1">
                {iconBtn("Xem chi tiết", <Eye size={14} />, () => setViewingProvider(p), "hover:bg-blue-50 hover:border-blue-200")}
                {iconBtn("Chỉnh sửa", <Pencil size={13} />, () => openEdit(p), "hover:bg-[var(--surface-400)]")}
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Mở website"
                  className="w-[30px] h-[30px] border border-[var(--surface-400)] rounded-md bg-transparent flex items-center justify-center text-[var(--text-600)] no-underline transition-colors duration-100 hover:bg-[var(--surface-400)] hover:text-[var(--text-900)]"
                >
                  <ExternalLink size={13} />
                </a>
                {p.active
                  ? iconBtn("Vô hiệu hóa", <Ban size={13} />, () => setModal({ type: "disable", provider: p }), "hover:bg-orange-50 hover:border-orange-200 hover:text-orange-500")
                  : iconBtn("Kích hoạt", <CheckCircle size={13} />, () => enableProvider(p.id), "hover:bg-green-50 hover:border-green-200 hover:text-green-500")
                }
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ══ MODALS ════════════════════════════════════════════════════════════ */}

      {/* View provider detail modal */}
      {viewingProvider && (
        <>
          <div
            onClick={() => setViewingProvider(null)}
            className="fixed inset-0 z-[300] bg-black/65 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[301] flex items-center justify-center p-5">
            <div className="bg-white border border-[var(--surface-400)] rounded-2xl p-7 w-full max-w-[460px] shadow-[0_24px_64px_rgba(0,0,0,0.6)]">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-[52px] h-[52px] rounded-xl flex items-center justify-center border-[1.5px]"
                  style={{ backgroundColor: viewingProvider.bg, borderColor: `${viewingProvider.color}33` }}
                >
                  <span
                    className="text-[13px] font-black font-heading"
                    style={{ color: viewingProvider.color }}
                  >
                    {viewingProvider.name}
                  </span>
                </div>
                <div>
                  <h3 className="m-0 text-[18px] font-bold text-[var(--text-900)] font-heading">
                    {viewingProvider.name}
                  </h3>
                  <div className="text-[12px] text-[var(--text-600)] font-body mt-0.5">
                    {viewingProvider.pageName}
                  </div>
                </div>
                <button
                  onClick={() => setViewingProvider(null)}
                  className="ml-auto w-8 h-8 border-none bg-[var(--surface-400)] rounded-md cursor-pointer text-[var(--text-600)] flex items-center justify-center hover:bg-[var(--surface-500)] transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="flex flex-col gap-3.5">
                {[
                  {
                    label: "Trạng thái",
                    value: (
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full inline-block ${viewingProvider.active ? "bg-green-500" : "bg-red-600"}`}
                        />
                        <span className={`font-semibold ${viewingProvider.active ? "text-green-500" : "text-red-600"}`}>
                          {viewingProvider.active ? "Đang hoạt động" : "Vô hiệu"}
                        </span>
                      </span>
                    ),
                  },
                  {
                    label: "URL tra cứu",
                    value: (
                      <span className="font-mono text-[11px] text-[var(--text-600)] break-all">
                        {viewingProvider.url}
                      </span>
                    ),
                  },
                  {
                    label: "Mô tả",
                    value: "Trang tra cứu bảo hành chính hãng — kỹ thuật viên nhập Serial Number trực tiếp trên website.",
                  },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div className="text-[11px] font-semibold text-[var(--text-400)] uppercase tracking-[0.05em] font-body mb-1">
                      {label}
                    </div>
                    <div className="text-[13px] text-[var(--text-900)] font-body">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-6 pt-5 border-t border-black/5">
                <button
                  className="h-10 px-5 bg-white text-[var(--text-900)] border border-[var(--surface-400)] rounded-md text-[13px] font-semibold font-body cursor-pointer hover:bg-[var(--surface-400)] transition-colors"
                  onClick={() => {
                    setViewingProvider(null);
                    openEdit(viewingProvider);
                  }}
                >
                  Chỉnh sửa
                </button>
                <a
                  href={viewingProvider.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 px-5 bg-white text-[var(--text-900)] border border-[var(--surface-400)] rounded-md text-[13px] font-semibold font-body flex items-center gap-1.5 no-underline hover:bg-[var(--surface-400)] transition-colors"
                >
                  Mở website <ExternalLink size={14} />
                </a>
                {viewingProvider.active ? (
                  <button
                    className="ml-auto h-10 px-5 bg-white text-orange-500 border border-orange-200 rounded-md text-[13px] font-semibold font-body cursor-pointer hover:bg-orange-50 transition-colors"
                    onClick={() => {
                      setViewingProvider(null);
                      setModal({ type: "disable", provider: viewingProvider });
                    }}
                  >
                    Vô hiệu hóa
                  </button>
                ) : (
                  <button
                    className="ml-auto h-10 px-5 bg-white text-green-500 border border-green-200 rounded-md text-[13px] font-semibold font-body cursor-pointer hover:bg-green-50 transition-colors"
                    onClick={() => {
                      enableProvider(viewingProvider.id);
                      setViewingProvider(null);
                    }}
                  >
                    Kích hoạt lại
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Add / Edit modal */}
      {(modal?.type === "add" || modal?.type === "edit") && (
        <>
          <div
            onClick={() => setModal(null)}
            className="fixed inset-0 z-[300] bg-black/65 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[301] flex items-center justify-center p-5">
            <div className="bg-white border border-[var(--surface-400)] rounded-2xl p-7 w-full max-w-[480px] shadow-[0_24px_64px_rgba(0,0,0,0.6)]">
              <div className="text-[11px] font-bold tracking-[0.1em] text-[var(--text-400)] uppercase font-body mb-1">
                {modal.type === "add" ? "Thêm nhà cung cấp" : "Chỉnh sửa nhà cung cấp"}
              </div>
              <h3 className="m-0 mb-6 text-[18px] font-bold text-[var(--text-900)] font-heading">
                {modal.type === "add" ? "Thêm nhà sản xuất" : `Chỉnh sửa: ${(modal as { provider: WarrantyProvider }).provider.name}`}
              </h3>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-[12px] font-bold font-body text-[var(--text-600)] mb-1.5 tracking-[0.02em]">Tên nhà sản xuất *</label>
                  <input
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Ví dụ: ASUS"
                    className="w-full h-[42px] px-3.5 bg-white border border-[var(--surface-400)] rounded-md text-[var(--text-900)] text-[14px] font-body outline-none transition-colors focus:border-[var(--brand-500)]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold font-body text-[var(--text-600)] mb-1.5 tracking-[0.02em]">URL tra cứu bảo hành *</label>
                  <input
                    value={formUrl}
                    onChange={(e) => {
                      setFormUrl(e.target.value);
                      setUrlError(false);
                    }}
                    placeholder="https://..."
                    className={`w-full h-[42px] px-3.5 bg-white border rounded-md text-[var(--text-900)] text-[14px] font-body outline-none transition-colors focus:border-[var(--brand-500)] ${urlError ? "border-red-400" : "border-[var(--surface-400)]"}`}
                  />
                  {urlError && (
                    <div className="text-[12px] text-red-400 mt-1.5 font-body flex items-center gap-1.5">
                      <AlertTriangle size={14} /> URL không hợp lệ. Vui lòng nhập URL bắt đầu bằng https://
                    </div>
                  )}
                  {!urlError && formUrl && !isValidUrl(formUrl) && (
                    <div className="text-[12px] text-amber-500 mt-1.5 font-body flex items-center gap-1.5">
                      <AlertTriangle size={14} /> Nên dùng URL HTTPS
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-[12px] font-bold font-body text-[var(--text-600)] mb-1.5 tracking-[0.02em]">Trạng thái</label>
                  <div className="flex gap-2.5">
                    {[
                      { v: true, label: "Đang hoạt động" },
                      { v: false, label: "Vô hiệu" },
                    ].map(({ v, label }) => (
                      <button
                        key={String(v)}
                        onClick={() => setFormActive(v)}
                        className={`flex-1 h-[38px] rounded-lg border text-[13px] font-semibold font-body cursor-pointer transition-colors ${
                          formActive !== v
                            ? "bg-transparent border-[var(--surface-400)] text-[var(--text-600)] hover:bg-[var(--surface-200)]"
                            : v === true
                            ? "bg-green-50 border-green-500 text-green-600"
                            : "bg-red-50 border-red-500 text-red-600"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-2.5 mt-6 justify-end">
                <button
                  className="h-10 px-5 bg-white text-[var(--text-900)] border border-[var(--surface-400)] rounded-md text-[13px] font-semibold font-body cursor-pointer hover:bg-[var(--surface-400)] transition-colors"
                  onClick={() => setModal(null)}
                >
                  Hủy
                </button>
                <button
                  className={`h-10 px-5 bg-[var(--brand-500)] text-white border-none rounded-md text-[13px] font-bold font-body transition-colors
                    ${!formName.trim() || !formUrl.trim() ? "opacity-50 cursor-not-allowed" : "opacity-100 cursor-pointer hover:bg-[var(--brand-600)]"}
                  `}
                  onClick={modal.type === "add" ? saveAdd : saveEdit}
                >
                  {modal.type === "add" ? "Thêm nhà cung cấp" : "Lưu thay đổi"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Disable confirmation modal */}
      {modal?.type === "disable" && (
        <>
          <div
            onClick={() => setModal(null)}
            className="fixed inset-0 z-[300] bg-black/65 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[301] flex items-center justify-center p-5">
            <div className="bg-white border border-[var(--surface-400)] rounded-2xl p-7 w-full max-w-[400px] shadow-[0_24px_64px_rgba(0,0,0,0.6)]">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-[22px] text-orange-500 mb-4 border border-orange-100">
                <AlertTriangle size={24} />
              </div>
              <h3 className="m-0 mb-2 text-[17px] font-bold text-[var(--text-900)] font-heading">
                Vô hiệu hóa {modal.provider.name}?
              </h3>
              <p className="m-0 mb-6 text-[13px] text-[var(--text-600)] font-body leading-[1.6]">
                <strong style={{ color: modal.provider.color }}>
                  {modal.provider.name}
                </strong>{" "}
                sẽ không còn xuất hiện trên trang Kiểm tra Serial. Bạn có thể kích hoạt lại bất cứ lúc nào.
              </p>
              <div className="flex gap-2.5 justify-end">
                <button
                  className="h-10 px-5 bg-white text-[var(--text-900)] border border-[var(--surface-400)] rounded-md text-[13px] font-semibold font-body cursor-pointer hover:bg-[var(--surface-400)] transition-colors"
                  onClick={() => setModal(null)}
                >
                  Hủy
                </button>
                <button
                  className="h-10 px-5 bg-orange-600 text-white border-none rounded-md text-[13px] font-bold font-body cursor-pointer hover:bg-orange-700 transition-colors"
                  onClick={confirmDisable}
                >
                  Vô hiệu hóa
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
