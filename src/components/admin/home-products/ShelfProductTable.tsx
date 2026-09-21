import React from 'react'
import type { ShelfProductTableProps } from '@/types/admin/homeProductsConfig.type'
import { formatVND } from '@/constants/homeProductsConstants'

export const ShelfProductTable: React.FC<ShelfProductTableProps> = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-slate-400">
        Chưa có sản phẩm nào trong shelf này.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/50">
            <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider w-12 text-center">
              #
            </th>
            <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              SẢN PHẨM
            </th>
            <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              MÃ SKU
            </th>
            <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              GIÁ BÁN
            </th>
            <th className="py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              TỒN KHO
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {products.map((product) => (
            <tr
              key={product.id}
              className="hover:bg-slate-50/80 transition-colors"
            >
              {/* Cột # */}
              <td className="py-3.5 px-4 text-center">
                <span className="w-2 h-2 rounded-full bg-red-500 inline-block shadow-xs" />
              </td>

              {/* Cột SẢN PHẨM */}
              <td className="py-3.5 px-4">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-800 hover:text-red-600 transition-colors cursor-pointer">
                    {product.name}
                  </span>
                  <span className="text-xs text-slate-400 mt-0.5">
                    {product.category}
                  </span>
                </div>
              </td>

              {/* Cột MÃ SKU */}
              <td className="py-3.5 px-4">
                <span className="text-xs text-slate-500 font-mono bg-slate-100 px-2 py-1 rounded">
                  {product.sku}
                </span>
              </td>

              {/* Cột GIÁ BÁN */}
              <td className="py-3.5 px-4">
                <span className="text-sm font-bold text-red-600">
                  {formatVND(product.price)}
                </span>
              </td>

              {/* Cột TỒN KHO */}
              <td className="py-3.5 px-4">
                <span
                  className={`text-sm font-medium inline-flex items-center gap-1.5 ${
                    product.stock > 5 ? 'text-emerald-600' : 'text-amber-600'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      product.stock > 5 ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                  />
                  <span>{product.stock} cái</span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
