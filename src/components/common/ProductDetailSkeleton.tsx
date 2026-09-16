export function ProductDetailSkeleton() {
  return (
    <div className="bg-[#F4F5F7] min-h-screen py-8 font-body">
      <div className="max-w-7xl mx-auto px-4 space-y-8 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-64" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 aspect-square bg-gray-200 rounded-xl" />
          <div className="lg:col-span-7 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-12 bg-gray-200 rounded w-1/2" />
            <div className="h-24 bg-gray-200 rounded w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
