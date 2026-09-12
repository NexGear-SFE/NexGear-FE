import { useState } from "react";
import { INITIAL_WARRANTY_PROVIDERS, type WarrantyProvider } from "@/mocks/warranty.mock";
import { IcTechSearch } from "@/components/Icons";
import { SearchX, Inbox } from "lucide-react";

export function SerialCheck() {
  // Using local state for now until global state is implemented
  const [providers] = useState<WarrantyProvider[]>(INITIAL_WARRANTY_PROVIDERS);
  const [brandSearch, setBrandSearch] = useState("");

  const activeBrands = providers.filter((p) => p.active);
  const BRANDS = brandSearch.trim()
    ? activeBrands.filter((p) =>
        p.name.toLowerCase().includes(brandSearch.toLowerCase()),
      )
    : activeBrands;

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-[var(--surface-200)] min-h-0">
      <div className="max-w-[800px] mx-auto">
        {/* ── Page Header ── */}
        <div className="mb-7">
          <h1 className="text-[24px] text-[var(--text-900)] m-0 font-heading font-bold">
            Kiểm tra Serial
          </h1>
          <p className="text-[13px] text-[var(--text-600)] mt-1.5 mb-0">
            Chọn nhà sản xuất để mở trang tra cứu bảo hành chính hãng. Kỹ thuật
            viên nhập Serial Number trực tiếp trên website của nhà sản xuất.
          </p>
        </div>

        {/* ── Brand Search (chỉ hiện khi có > 4 nhà cung cấp active) ── */}
        {activeBrands.length > 4 && (
          <div className="relative mb-5">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-600)] pointer-events-none">
              <IcTechSearch />
            </div>
            <input
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
              placeholder="Tìm nhà sản xuất..."
              className="w-full h-10 pl-9 pr-3.5 bg-white border border-[var(--surface-400)] rounded-md text-[var(--text-900)] text-[13px] font-body outline-none transition-colors duration-150 focus:border-[var(--brand-500)]"
            />
          </div>
        )}

        {/* ── Brand Grid / Empty States ── */}
        {BRANDS.length === 0 ? (
          <EmptyState activeBrandsCount={activeBrands.length} />
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
            {BRANDS.map((b) => (
              <BrandCard key={b.id} brand={b} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

type BrandCardProps = { brand: WarrantyProvider };

function BrandCard({ brand: b }: BrandCardProps) {
  return (
    <div
      className="bg-white border border-[var(--surface-400)] rounded-[10px] p-6 flex flex-col items-center gap-[14px] transition-colors duration-150 cursor-default hover:shadow-sm"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = b.color + "66";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "#E0E0E0";
      }}
    >
      {/* Brand Logo Badge */}
      <div
        className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center shrink-0"
        style={{
          background: b.bg,
          border: `1.5px solid ${b.color}33`,
        }}
      >
        <span
          className="text-[20px] font-black font-heading tracking-[-0.03em]"
          style={{ color: b.color }}
        >
          {b.name}
        </span>
      </div>

      {/* Brand Info */}
      <div className="text-center flex-1">
        <div className="text-[15px] font-bold text-[var(--text-900)] font-heading">
          {b.name}
        </div>
        <div className="text-[12px] text-[var(--text-600)] mt-[3px] font-body">
          {b.pageName}
        </div>
        <div className="text-[11px] text-[var(--text-500)] mt-1 font-body">
          Trang tra cứu bảo hành chính hãng
        </div>
      </div>

      {/* CTA Link */}
      <a
        href={b.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-[7px] h-9 px-[18px] rounded-lg text-[12px] font-bold font-body no-underline transition-colors duration-100 w-full"
        style={{
          background: b.bg,
          border: `1px solid ${b.color}44`,
          color: b.color,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = b.color + "22")}
        onMouseLeave={(e) => (e.currentTarget.style.background = b.bg)}
      >
        Kiểm tra bảo hành ↗
      </a>
    </div>
  );
}

type EmptyStateProps = { activeBrandsCount: number };

function EmptyState({ activeBrandsCount }: EmptyStateProps) {
  const Icon = activeBrandsCount === 0 ? Inbox : SearchX;
  return (
    <div className="text-center py-16 px-6 bg-[var(--surface-50)] rounded-[10px] border border-[var(--surface-400)]">
      <div className="flex justify-center mb-4 text-[var(--text-400)]">
        <Icon size={40} strokeWidth={1.5} />
      </div>
      <div className="text-[15px] font-bold text-[var(--text-900)] font-heading">
        {activeBrandsCount === 0
          ? "Chưa có nhà cung cấp nào được kích hoạt."
          : "Không tìm thấy nhà sản xuất."}
      </div>
      <div className="text-[13px] text-[var(--text-600)] mt-1.5 font-body">
        {activeBrandsCount === 0
          ? "Vào Cài đặt → Bảo hành & Cấu hình để thêm hoặc kích hoạt nhà cung cấp."
          : "Thử tìm kiếm với từ khóa khác."}
      </div>
    </div>
  );
}
