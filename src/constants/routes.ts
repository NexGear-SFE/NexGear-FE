export const ROUTES = {
  home: '/',
  warehouse: '/admin/warehouse',
  warehouseOrders: '/admin/warehouse/orders',
  warehouseReceipts: '/admin/warehouse/receipts',
  warehouseNewReceipt: '/admin/warehouse/receipts/new',
  warehouseProducts: '/admin/warehouse/products',
  warehouseNewProduct: '/admin/warehouse/products/new',
  warehouseCategories: '/admin/warehouse/categories',
  warehouseInventory: '/admin/warehouse/inventory',
} as const

export function warehouseOrderDetailPath(orderId: string): string {
  return `${ROUTES.warehouseOrders}/${encodeURIComponent(orderId)}`
}

export function warehouseReceiptDetailPath(receiptId: string): string {
  return `${ROUTES.warehouseReceipts}/${encodeURIComponent(receiptId)}`
}

export function warehouseReceiptEditPath(receiptId: string): string {
  return `${warehouseReceiptDetailPath(receiptId)}/edit`
}

export function warehouseProductDetailPath(productId: string): string {
  return `${ROUTES.warehouseProducts}/${encodeURIComponent(productId)}`
}

export function warehouseProductEditPath(productId: string): string {
  return `${warehouseProductDetailPath(productId)}/edit`
}

export function warehouseInventoryDetailPath(productId: string): string {
  return `${ROUTES.warehouseInventory}/${encodeURIComponent(productId)}`
}
