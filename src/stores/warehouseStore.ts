import { create } from 'zustand'
import {
  initialCategories,
  initialInventory,
  initialMovements,
  initialOrders,
  initialProducts,
  initialReceipts,
  initialSerials,
  initialVariants,
} from '@/constants/warehouseMockData'
import type { Category } from '@/types/category.type'
import type { InventoryMovement, ProductSerial, VariantInventory } from '@/types/inventory.type'
import type { Product, ProductVariant, SkuAuditEntry } from '@/types/product.type'
import type { StockReceipt } from '@/types/receipt.type'
import type { WarehouseOrder, WarehouseOrderState } from '@/types/warehouseOrder.type'
import { getReceiptValidationIssues } from '@/utils/receipt'

type CategoryDraft = Omit<Category, 'id' | 'createdAt' | 'updatedAt'>
type ProductDraft = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
type VariantDraft = Omit<ProductVariant, 'id' | 'productId' | 'createdAt' | 'updatedAt'>

interface WarehouseState {
  categories: Category[]
  products: Product[]
  variants: ProductVariant[]
  skuAudit: SkuAuditEntry[]
  inventory: VariantInventory[]
  serials: ProductSerial[]
  movements: InventoryMovement[]
  receipts: StockReceipt[]
  orders: WarehouseOrder[]
  createCategory: (draft: CategoryDraft) => string
  updateCategory: (categoryId: string, draft: CategoryDraft) => void
  toggleCategoryStatus: (categoryId: string) => void
  moveCategory: (categoryId: string, direction: 'up' | 'down') => void
  saveProduct: (draft: ProductDraft, variants: VariantDraft[], productId?: string) => string
  toggleProductStatus: (productId: string) => void
  logSkuAudit: (action: SkuAuditEntry['action'], sku: string, variantId?: string) => void
  saveReceipt: (receipt: StockReceipt) => void
  confirmReceipt: (receiptId: string) => boolean
  reserveOrder: (orderId: string) => boolean
  acceptOrder: (orderId: string) => void
  setPickedQuantity: (orderId: string, itemId: string, quantity: number) => void
  completePicking: (orderId: string) => void
  assignOrderSerials: (orderId: string, serialIds: string[]) => void
  packOrder: (orderId: string, shouldFail?: boolean, parcel?: WarehouseOrder['parcel']) => void
  completeOrder: (orderId: string) => void
}

function timestamp(): string {
  return new Date().toISOString()
}

function nextCode(prefix: string, count: number): string {
  return `${prefix}${String(count + 1).padStart(3, '0')}`
}

function addTimeline(order: WarehouseOrder, label: string): WarehouseOrder {
  return {
    ...order,
    timeline: [...order.timeline, { id: crypto.randomUUID(), label, occurredAt: timestamp(), actor: 'Nguyễn Bảo' }],
  }
}

export const useWarehouseStore = create<WarehouseState>((set, get) => ({
  categories: initialCategories,
  products: initialProducts,
  variants: initialVariants,
  skuAudit: [],
  inventory: initialInventory,
  serials: initialSerials,
  movements: initialMovements,
  receipts: initialReceipts,
  orders: initialOrders,

  createCategory: (draft) => {
    const id = `cat-${crypto.randomUUID()}`
    const createdAt = timestamp()
    set((state) => ({ categories: [...state.categories, { ...draft, id, createdAt, updatedAt: createdAt }] }))
    return id
  },

  updateCategory: (categoryId, draft) => set((state) => ({
    categories: state.categories.map((category) =>
      category.id === categoryId ? { ...category, ...draft, updatedAt: timestamp() } : category,
    ),
  })),

  toggleCategoryStatus: (categoryId) => set((state) => ({
    categories: state.categories.map((category) => category.id === categoryId
      ? { ...category, status: category.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE', updatedAt: timestamp() }
      : category),
  })),

  moveCategory: (categoryId, direction) => set((state) => {
    const category = state.categories.find((item) => item.id === categoryId)
    if (!category) return state
    const siblings = state.categories
      .filter((item) => item.parentId === category.parentId)
      .sort((first, second) => first.sortOrder - second.sortOrder)
    const currentIndex = siblings.findIndex((item) => item.id === categoryId)
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    const target = siblings[targetIndex]
    if (!target) return state
    return {
      categories: state.categories.map((item) => {
        if (item.id === category.id) return { ...item, sortOrder: target.sortOrder, updatedAt: timestamp() }
        if (item.id === target.id) return { ...item, sortOrder: category.sortOrder, updatedAt: timestamp() }
        return item
      }),
    }
  }),

  saveProduct: (draft, variantDrafts, productId) => {
    const current = get()
    const id = productId ?? nextCode('P', current.products.length)
    const changedAt = timestamp()
    const existingProduct = current.products.find((product) => product.id === id)
    const product: Product = existingProduct
      ? { ...existingProduct, ...draft, updatedAt: changedAt }
      : { ...draft, id, createdAt: changedAt, updatedAt: changedAt }

    const submittedSkus = new Set(variantDrafts.map((variant) => variant.sku))
    const retainedVariants = current.variants
      .filter((variant) => variant.productId !== id)
    const archivedLockedVariants = current.variants
      .filter((variant) => variant.productId === id && variant.skuLocked && !submittedSkus.has(variant.sku))
      .map((variant) => ({ ...variant, status: 'INACTIVE' as const, updatedAt: changedAt }))
    const variants = variantDrafts.map<ProductVariant>((variant, index) => {
      const existingVariant = current.variants.find((candidate) => candidate.productId === id && candidate.sku === variant.sku)
      return existingVariant
        ? { ...existingVariant, ...variant, updatedAt: changedAt }
        : { ...variant, id: `${id}-V${index + 1}`, productId: id, createdAt: changedAt, updatedAt: changedAt }
    })
    const knownInventory = new Set(current.inventory.map((item) => item.variantId))
    const newInventory = variants
      .filter((variant) => !knownInventory.has(variant.id))
      .map<VariantInventory>((variant) => ({ variantId: variant.id, onHand: 0, reserved: 0 }))

    const createdAudit = variants.filter((variant) => !current.variants.some((item) => item.id === variant.id)).map<SkuAuditEntry>((variant) => ({ id: crypto.randomUUID(), action: 'CREATE', sku: variant.sku, variantId: variant.id, actor: 'Nguyễn Bảo', occurredAt: changedAt }))
    set({
      products: existingProduct
        ? current.products.map((candidate) => candidate.id === id ? product : candidate)
        : [...current.products, product],
      variants: [...retainedVariants, ...archivedLockedVariants, ...variants],
      inventory: [...current.inventory, ...newInventory],
      skuAudit: [...current.skuAudit, ...createdAudit],
    })
    return id
  },

  toggleProductStatus: (productId) => set((state) => ({
    products: state.products.map((product) => product.id === productId
      ? { ...product, status: product.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE', updatedAt: timestamp() }
      : product),
  })),

  logSkuAudit: (action, sku, variantId) => set((state) => ({ skuAudit: [...state.skuAudit, { id: crypto.randomUUID(), action, sku, variantId, actor: 'Nguyễn Bảo', occurredAt: timestamp() }] })),

  saveReceipt: (receipt) => set((state) => ({
    receipts: state.receipts.some((item) => item.id === receipt.id)
      ? state.receipts.map((item) => item.id === receipt.id ? receipt : item)
      : [receipt, ...state.receipts],
  })),

  confirmReceipt: (receiptId) => {
    const state = get()
    const receipt = state.receipts.find((item) => item.id === receiptId)
    if (!receipt || receipt.status === 'CONFIRMED' || getReceiptValidationIssues(receipt, state.variants, state.serials).length > 0) return false
    const confirmedAt = timestamp()
    const quantityByVariant = new Map(receipt.lines.map((line) => [line.variantId, line.quantity]))
    const existingVariantIds = new Set(state.inventory.map((item) => item.variantId))
    const inventory = state.inventory.map((item) => ({
      ...item,
      onHand: item.onHand + (quantityByVariant.get(item.variantId) ?? 0),
    })).concat(receipt.lines.filter((line) => !existingVariantIds.has(line.variantId)).map((line) => ({ variantId: line.variantId, onHand: line.quantity, reserved: 0 })))
    const serials = receipt.lines.flatMap((line) => line.serials.map<ProductSerial>((value) => ({
      id: crypto.randomUUID(), variantId: line.variantId, value, receiptId, status: 'AVAILABLE', receivedAt: confirmedAt,
    })))
    const movements = receipt.lines.map<InventoryMovement>((line) => ({
      id: crypto.randomUUID(), variantId: line.variantId, reason: 'STOCK_RECEIPT', quantityDelta: line.quantity, reference: receiptId, occurredAt: confirmedAt,
    }))
    set({
      receipts: state.receipts.map((item) => item.id === receiptId ? { ...item, status: 'CONFIRMED', updatedAt: confirmedAt, confirmedAt, confirmedBy: 'Nguyễn Bảo' } : item),
      inventory,
      serials: [...state.serials, ...serials],
      movements: [...state.movements, ...movements],
      variants: state.variants.map((variant) => quantityByVariant.has(variant.id) ? { ...variant, skuLocked: true } : variant),
    })
    return true
  },

  reserveOrder: (orderId) => {
    const state = get()
    const order = state.orders.find((item) => item.id === orderId)
    if (!order || order.reservationApplied || order.inventoryCommitted) return false
    const canReserve = order.items.every((item) => {
      const stock = state.inventory.find((candidate) => candidate.variantId === item.variantId)
      return (stock?.onHand ?? 0) - (stock?.reserved ?? 0) >= item.quantity
    })
    if (!canReserve) {
      set({ orders: state.orders.map((candidate) => candidate.id === orderId ? addTimeline({ ...candidate, state: 'ISSUE', issue: { code: 'INSUFFICIENT_STOCK', title: 'Không đủ tồn kho', message: 'Một hoặc nhiều SKU không đủ available để giữ hàng.', occurredAt: timestamp(), resumeState: 'WAITING_ACCEPTANCE', retryable: true } }, 'Giữ hàng thất bại') : candidate) })
      return false
    }
    set({
      inventory: state.inventory.map((stock) => ({ ...stock, reserved: stock.reserved + (order.items.find((item) => item.variantId === stock.variantId)?.quantity ?? 0) })),
      orders: state.orders.map((candidate) => candidate.id === orderId ? addTimeline({ ...candidate, reservationApplied: true }, 'Đã giữ hàng') : candidate),
    })
    return true
  },

  acceptOrder: (orderId) => set((state) => ({
    orders: state.orders.map((order) => order.id === orderId && order.state === 'WAITING_ACCEPTANCE'
      ? addTimeline({ ...order, state: 'PICKING', assignee: 'Nguyễn Bảo' }, 'Bắt đầu soạn hàng')
      : order),
  })),

  setPickedQuantity: (orderId, itemId, quantity) => set((state) => ({
    orders: state.orders.map((order) => order.id === orderId && order.state === 'PICKING'
      ? { ...order, items: order.items.map((item) => item.id === itemId ? { ...item, pickedQuantity: Math.min(item.quantity, Math.max(0, quantity)) } : item) }
      : order),
  })),

  completePicking: (orderId) => set((state) => ({
    orders: state.orders.map((order) => {
      if (order.id !== orderId || order.state !== 'PICKING') return order
      if (order.items.some((item) => item.pickedQuantity !== item.quantity)) return order
      const requiresSerial = order.items.some((item) => state.variants.find((variant) => variant.id === item.variantId)?.serialTracking)
      const nextState: WarehouseOrderState = requiresSerial ? 'WAITING_SERIAL' : 'READY_TO_PACK'
      const pickedAt = timestamp()
      return addTimeline({ ...order, state: nextState, pickedAt, pickedBy: 'Nguyễn Bảo' }, 'Đã soạn đủ hàng')
    }),
  })),

  assignOrderSerials: (orderId, serialIds) => set((state) => {
    const order = state.orders.find((item) => item.id === orderId)
    const uniqueIds = new Set(serialIds)
    if (!order || order.state !== 'WAITING_SERIAL' || uniqueIds.size !== serialIds.length) return state
    const selected = state.serials.filter((serial) => uniqueIds.has(serial.id))
    const requiredItems = order.items.filter((item) => state.variants.find((variant) => variant.id === item.variantId)?.serialTracking)
    const validSelection = selected.length === serialIds.length
      && selected.every((serial) => serial.status === 'AVAILABLE')
      && requiredItems.every((item) => selected.filter((serial) => serial.variantId === item.variantId).length === item.quantity)
      && selected.every((serial) => requiredItems.some((item) => item.variantId === serial.variantId))
    if (!validSelection) return state
    return {
      orders: state.orders.map((candidate) => candidate.id === orderId
        ? addTimeline({ ...candidate, state: 'READY_TO_PACK', assignedAt: timestamp(), assignedBy: 'Nguyễn Bảo', items: candidate.items.map((item) => ({ ...item, assignedSerialIds: selected.filter((serial) => serial.variantId === item.variantId).map((serial) => serial.id) })) }, 'Đã gán serial')
        : candidate),
      serials: state.serials.map((serial) => uniqueIds.has(serial.id) ? { ...serial, status: 'RESERVED' } : serial),
    }
  }),

  packOrder: (orderId, shouldFail = false, parcel) => set((state) => ({
    orders: state.orders.map((order) => {
      const canPack = order.id === orderId && (order.state === 'READY_TO_PACK' || order.state === 'ISSUE')
      if (!canPack) return order
      if (shouldFail) return addTimeline({ ...order, parcel, state: 'ISSUE', issue: { code: 'GHTK_REJECTED', title: 'GHTK từ chối vận đơn', message: 'Kiểm tra lại kích thước kiện hàng.', occurredAt: timestamp(), resumeState: 'READY_TO_PACK', retryable: true } }, 'Tạo vận đơn thất bại')
      return addTimeline({ ...order, parcel: parcel ? { ...parcel, trackingCode: `GHTK-${order.id.replace(/\D/g, '').slice(-8)}` } : order.parcel, state: 'WAITING_GHTK_PICKUP', issue: undefined }, 'Đã tạo vận đơn GHTK')
    }),
  })),

  completeOrder: (orderId) => set((state) => {
    const order = state.orders.find((item) => item.id === orderId)
    if (!order || order.state !== 'WAITING_GHTK_PICKUP' || order.inventoryCommitted) return state
    const quantities = new Map(order.items.map((item) => [item.variantId, item.quantity]))
    return {
      orders: state.orders.map((candidate) => candidate.id === orderId ? addTimeline({ ...candidate, state: 'COMPLETED', inventoryCommitted: true }, 'GHTK đã lấy hàng') : candidate),
      inventory: state.inventory.map((stock) => {
        const quantity = quantities.get(stock.variantId) ?? 0
        return { ...stock, onHand: Math.max(0, stock.onHand - quantity), reserved: Math.max(0, stock.reserved - (order.reservationApplied ? quantity : 0)) }
      }),
      serials: state.serials.map((serial) => order.items.some((item) => item.assignedSerialIds.includes(serial.id)) ? { ...serial, status: 'SOLD' } : serial),
      movements: [...state.movements, ...order.items.map((item) => ({ id: crypto.randomUUID(), variantId: item.variantId, reason: 'ORDER_FULFILLED' as const, quantityDelta: -item.quantity, reference: order.id, occurredAt: timestamp() }))],
    }
  }),
}))

export function getProductTotal(products: Product[], variants: ProductVariant[], productId: string): number {
  return products.some((product) => product.id === productId)
    ? variants.filter((variant) => variant.productId === productId).length
    : 0
}

export const warehouseSelectors = {
  categories: (state: WarehouseState) => state.categories,
  products: (state: WarehouseState) => state.products,
  variants: (state: WarehouseState) => state.variants,
  inventory: (state: WarehouseState) => state.inventory,
  receipts: (state: WarehouseState) => state.receipts,
  orders: (state: WarehouseState) => state.orders,
}
