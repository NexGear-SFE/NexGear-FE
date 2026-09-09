type DataTableSkeletonProps = { columns?: number; rows?: number }

export function DataTableSkeleton({ columns = 5, rows = 5 }: DataTableSkeletonProps) {
  return <div role="status" aria-label="Đang tải dữ liệu" className="overflow-hidden rounded-md border border-surface-400 bg-white">
    <div className="grid min-h-12 animate-pulse gap-4 border-b border-surface-400 bg-surface-200 px-4" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
      {Array.from({ length: columns }, (_, index) => <span key={index} className="my-4 h-3 rounded-xs bg-surface-400" />)}
    </div>
    {Array.from({ length: rows }, (_, row) => <div key={row} className="grid min-h-14 animate-pulse gap-4 border-b border-surface-400 px-4 last:border-0" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
      {Array.from({ length: columns }, (_, column) => <span key={column} className="my-5 h-3 rounded-xs bg-surface-200" />)}
    </div>)}
    <span className="sr-only">Đang tải…</span>
  </div>
}
