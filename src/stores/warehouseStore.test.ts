import { afterEach, describe, expect, it } from 'vitest'
import { initialCategories, initialInventory, initialMovements, initialOrders, initialProducts, initialReceipts, initialSerials, initialVariants } from '@/constants/warehouseMockData'
import { useWarehouseStore } from '@/stores/warehouseStore'
import { buildCategoryBreadcrumb } from '@/utils/buildCategoryTree'

afterEach(() => useWarehouseStore.setState({ categories: initialCategories, products: initialProducts, variants: initialVariants, inventory: initialInventory, movements: initialMovements, orders: initialOrders, receipts: initialReceipts, serials: initialSerials, skuAudit: [] }))

describe('warehouse category store', () => {
  it('deactivates a referenced category without deleting it or its relation', () => {
    const categoryId = 'cat-gaming-laptop'
    expect(useWarehouseStore.getState().products.some((product) => product.categoryId === categoryId)).toBe(true)
    useWarehouseStore.getState().toggleCategoryStatus(categoryId)
    const category = useWarehouseStore.getState().categories.find((item) => item.id === categoryId)
    expect(category).toMatchObject({ id: categoryId, parentId: 'cat-laptop', status: 'INACTIVE' })
  })

  it('reorders categories only between siblings', () => {
    useWarehouseStore.getState().moveCategory('cat-ultrabook', 'up')
    const state = useWarehouseStore.getState()
    expect(state.categories.find((item) => item.id === 'cat-ultrabook')?.sortOrder).toBe(1)
    expect(state.categories.find((item) => item.id === 'cat-gaming-laptop')?.sortOrder).toBe(2)
    expect(state.categories.find((item) => item.id === 'cat-peripheral')?.sortOrder).toBe(2)
  })
})

describe('warehouse product lifecycle', () => {
  it('creates a draft with a default variant, activates and deactivates without deleting history', () => {
    const state = useWarehouseStore.getState()
    const id = state.saveProduct({ name: 'Test Product', slug: 'test-product', productCode: 'PTEST', modelCode: 'T1', brand: 'Test', brandCode: 'TST', categoryId: 'cat-mouse', shortDescription: '', specifications: [], warrantyMonths: 12, unit: 'Chiếc', origin: '', weightGrams: 0, dimensions: { lengthMm: 0, widthMm: 0, heightMm: 0 }, status: 'DRAFT' }, [{ sku: 'TST-T1', skuSource: 'AUTO', optionValues: [], serialTracking: false, reorderLevel: 0, status: 'ACTIVE', skuLocked: false }])
    expect(useWarehouseStore.getState().products.find((product) => product.id === id)?.status).toBe('DRAFT')
    expect(useWarehouseStore.getState().variants.filter((variant) => variant.productId === id)).toHaveLength(1)
    useWarehouseStore.getState().toggleProductStatus(id)
    expect(useWarehouseStore.getState().products.find((product) => product.id === id)?.status).toBe('ACTIVE')
    useWarehouseStore.getState().toggleProductStatus(id)
    expect(useWarehouseStore.getState().products.find((product) => product.id === id)?.status).toBe('INACTIVE')
    expect(useWarehouseStore.getState().variants.filter((variant) => variant.productId === id)).toHaveLength(1)
  })

  it('locks SKU after confirming the first stock movement and keeps an audit trail', () => {
    useWarehouseStore.setState((state) => ({ variants: state.variants.map((variant) => variant.id === 'V001' ? { ...variant, skuLocked: false } : variant) }))
    expect(useWarehouseStore.getState().variants.find((variant) => variant.id === 'V001')?.skuLocked).toBe(false)
    useWarehouseStore.getState().confirmReceipt('PN-20260831-004')
    expect(useWarehouseStore.getState().variants.find((variant) => variant.id === 'V001')?.skuLocked).toBe(true)
    useWarehouseStore.getState().logSkuAudit('MANUAL_OVERRIDE', 'CUSTOM-SKU', 'V001')
    expect(useWarehouseStore.getState().skuAudit.at(-1)).toMatchObject({ action: 'MANUAL_OVERRIDE', sku: 'CUSTOM-SKU', variantId: 'V001' })
  })

  it('archives a locked variant instead of rewriting its movement history', () => {
    const product = useWarehouseStore.getState().products.find((item) => item.id === 'P001')!
    useWarehouseStore.getState().saveProduct({ name: product.name, slug: product.slug, productCode: product.productCode, modelCode: product.modelCode, brand: product.brand, brandCode: product.brandCode, categoryId: product.categoryId, shortDescription: product.shortDescription, specifications: product.specifications, warrantyMonths: product.warrantyMonths, unit: product.unit, origin: product.origin, weightGrams: product.weightGrams, dimensions: product.dimensions, status: product.status }, [{ sku: 'ASU-G16-NEW', skuSource: 'MANUAL', optionValues: [{ option: 'CPU', value: 'New', code: 'NEW' }], serialTracking: true, reorderLevel: 3, status: 'ACTIVE', skuLocked: false }], product.id)
    expect(useWarehouseStore.getState().variants.find((variant) => variant.id === 'V001')).toMatchObject({ sku: 'ASU-G16-I9-4080', status: 'INACTIVE' })
    expect(useWarehouseStore.getState().movements.some((movement) => movement.variantId === 'V001')).toBe(true)
    expect(useWarehouseStore.getState().variants.some((variant) => variant.sku === 'ASU-G16-NEW')).toBe(true)
  })
})

describe('warehouse serial allocation', () => {
  it('assigns only available matching serials and cannot assign one twice', () => {
    useWarehouseStore.getState().assignOrderSerials('#GG-20260830-0177', ['S004'])
    expect(useWarehouseStore.getState().orders.find((order) => order.id === '#GG-20260830-0177')).toMatchObject({ state: 'READY_TO_PACK', items: [{ assignedSerialIds: ['S004'] }] })
    expect(useWarehouseStore.getState().serials.find((serial) => serial.id === 'S004')?.status).toBe('RESERVED')

    useWarehouseStore.setState((state) => ({ orders: [...state.orders, { ...initialOrders[2], id: 'SECOND-ORDER' }] }))
    useWarehouseStore.getState().assignOrderSerials('SECOND-ORDER', ['S004'])
    expect(useWarehouseStore.getState().orders.find((order) => order.id === 'SECOND-ORDER')?.state).toBe('WAITING_SERIAL')
  })
})

describe('stock receipt transaction', () => {
  it('saves an incomplete draft without changing inventory', () => {
    const before = useWarehouseStore.getState().inventory
    useWarehouseStore.getState().saveReceipt({ id: 'DRAFT-EMPTY', supplier: '', warehouseName: 'Kho trung tâm TP.HCM', receiptDate: '', invoiceCode: '', notes: '', creator: 'Tester', status: 'DRAFT', lines: [], createdAt: '', updatedAt: '' })
    expect(useWarehouseStore.getState().receipts.find((receipt) => receipt.id === 'DRAFT-EMPTY')?.status).toBe('DRAFT')
    expect(useWarehouseStore.getState().inventory).toEqual(before)
  })

  it('rejects invalid serial count without partial updates', () => {
    const draft = initialReceipts[0]
    useWarehouseStore.setState((state) => ({ receipts: state.receipts.map((receipt) => receipt.id === draft.id ? { ...draft, lines: [{ ...draft.lines[0], quantity: 6 }] } : receipt) }))
    const inventoryBefore = useWarehouseStore.getState().inventory
    expect(useWarehouseStore.getState().confirmReceipt(draft.id)).toBe(false)
    expect(useWarehouseStore.getState().inventory).toEqual(inventoryBefore)
    expect(useWarehouseStore.getState().receipts.find((receipt) => receipt.id === draft.id)?.status).toBe('DRAFT')
  })

  it('confirms once, creates movements and serials, and locks the SKU', () => {
    const receiptId = initialReceipts[0].id
    const beforeStock = useWarehouseStore.getState().inventory.find((item) => item.variantId === 'V001')?.onHand ?? 0
    expect(useWarehouseStore.getState().confirmReceipt(receiptId)).toBe(true)
    const afterFirst = useWarehouseStore.getState()
    expect(afterFirst.inventory.find((item) => item.variantId === 'V001')?.onHand).toBe(beforeStock + 5)
    expect(afterFirst.movements.filter((movement) => movement.reference === receiptId)).toHaveLength(1)
    expect(afterFirst.serials.filter((serial) => serial.receiptId === receiptId)).toHaveLength(5)
    expect(afterFirst.variants.find((variant) => variant.id === 'V001')?.skuLocked).toBe(true)
    expect(afterFirst.receipts.find((receipt) => receipt.id === receiptId)).toMatchObject({ status: 'CONFIRMED', confirmedBy: 'Nguyễn Bảo' })
    expect(useWarehouseStore.getState().confirmReceipt(receiptId)).toBe(false)
    expect(useWarehouseStore.getState().inventory.find((item) => item.variantId === 'V001')?.onHand).toBe(beforeStock + 5)
  })
})

describe('order fulfillment state machine', () => {
  it('accepts, fully picks and routes a serial-tracked order to serial assignment', () => {
    const orderId = '#GG-20260831-0182'
    useWarehouseStore.getState().acceptOrder(orderId)
    expect(useWarehouseStore.getState().orders.find((order) => order.id === orderId)).toMatchObject({ state: 'PICKING', assignee: 'Nguyễn Bảo' })
    useWarehouseStore.getState().completePicking(orderId)
    expect(useWarehouseStore.getState().orders.find((order) => order.id === orderId)?.state).toBe('PICKING')
    useWarehouseStore.getState().setPickedQuantity(orderId, 'OI001', 1)
    useWarehouseStore.getState().completePicking(orderId)
    const order = useWarehouseStore.getState().orders.find((item) => item.id === orderId)
    expect(order).toMatchObject({ state: 'WAITING_SERIAL', pickedBy: 'Nguyễn Bảo' })
    expect(order?.timeline.map((event) => event.label)).toEqual(['Đã tạo đơn hàng', 'Đã giữ hàng', 'Bắt đầu soạn hàng', 'Đã soạn đủ hàng'])
  })

  it('skips serial assignment for a non-tracked order', () => {
    const orderId = '#GG-20260830-0178'
    useWarehouseStore.getState().setPickedQuantity(orderId, 'OI002', 1)
    useWarehouseStore.getState().completePicking(orderId)
    expect(useWarehouseStore.getState().orders.find((order) => order.id === orderId)?.state).toBe('READY_TO_PACK')
  })

  it('stores issue resume state and retries packing deterministically', () => {
    const orderId = '#GG-20260830-0176'
    const parcel = { weightGrams: 1000, lengthCm: 20, widthCm: 15, heightCm: 10, pickupAddress: 'Kho' }
    useWarehouseStore.getState().packOrder(orderId, true, parcel)
    expect(useWarehouseStore.getState().orders.find((order) => order.id === orderId)).toMatchObject({ state: 'ISSUE', issue: { resumeState: 'READY_TO_PACK' } })
    useWarehouseStore.getState().packOrder(orderId, false, parcel)
    const order = useWarehouseStore.getState().orders.find((item) => item.id === orderId)
    expect(order).toMatchObject({ state: 'WAITING_GHTK_PICKUP', issue: undefined })
    expect(order?.parcel?.trackingCode).toMatch(/^GHTK-/)
  })

  it('rejects invalid transitions', () => {
    const completedId = '#GG-20260828-0173'
    useWarehouseStore.getState().acceptOrder(completedId)
    useWarehouseStore.getState().packOrder(completedId)
    expect(useWarehouseStore.getState().orders.find((order) => order.id === completedId)?.state).toBe('COMPLETED')
  })

  it('completes only after GHTK pickup', () => {
    const orderId = '#GG-20260830-0176'
    const parcel = { weightGrams: 1000, lengthCm: 20, widthCm: 15, heightCm: 10, pickupAddress: 'Kho' }
    useWarehouseStore.getState().completeOrder(orderId)
    expect(useWarehouseStore.getState().orders.find((order) => order.id === orderId)?.state).toBe('READY_TO_PACK')
    useWarehouseStore.getState().packOrder(orderId, false, parcel)
    useWarehouseStore.getState().completeOrder(orderId)
    const order = useWarehouseStore.getState().orders.find((item) => item.id === orderId)
    expect(order?.state).toBe('COMPLETED')
    expect(order?.timeline.at(-1)?.label).toBe('GHTK đã lấy hàng')
  })
})

describe('cross-module inventory integration', () => {
  it('propagates category renames and new product variants through the shared store', () => {
    const category = useWarehouseStore.getState().categories.find((item) => item.id === 'cat-mouse')!
    useWarehouseStore.getState().updateCategory(category.id, { name: 'Chuột Gaming', code: category.code, slug: category.slug, description: category.description, parentId: category.parentId, sortOrder: category.sortOrder, status: category.status })
    expect(buildCategoryBreadcrumb(useWarehouseStore.getState().categories, category.id)).toContain('Chuột Gaming')
    const productId = useWarehouseStore.getState().saveProduct({ name: 'Integrated Product', slug: 'integrated-product', productCode: 'INT-1', modelCode: 'INT', brand: 'Test', brandCode: 'TST', categoryId: category.id, shortDescription: '', specifications: [], warrantyMonths: 12, unit: 'Chiếc', origin: '', weightGrams: 1, dimensions: { lengthMm: 1, widthMm: 1, heightMm: 1 }, status: 'ACTIVE' }, [{ sku: 'TST-INT-ONE', skuSource: 'AUTO', optionValues: [], serialTracking: false, reorderLevel: 1, status: 'ACTIVE', skuLocked: false }])
    const variant = useWarehouseStore.getState().variants.find((item) => item.productId === productId)
    expect(useWarehouseStore.getState().products.some((product) => product.id === productId)).toBe(true)
    expect(useWarehouseStore.getState().inventory.find((item) => item.variantId === variant?.id)).toMatchObject({ onHand: 0, reserved: 0 })
  })

  it('reserves available stock exactly once for a new order', () => {
    const order = { ...initialOrders[0], id: 'RESERVE-TEST', reservationApplied: false, timeline: [], items: [{ ...initialOrders[0].items[0], id: 'RESERVE-LINE', variantId: 'V004', quantity: 2 }] }
    useWarehouseStore.setState((state) => ({ orders: [...state.orders, order] }))
    const before = useWarehouseStore.getState().inventory.find((item) => item.variantId === 'V004')!
    expect(useWarehouseStore.getState().reserveOrder(order.id)).toBe(true)
    expect(useWarehouseStore.getState().inventory.find((item) => item.variantId === 'V004')?.reserved).toBe(before.reserved + 2)
    expect(useWarehouseStore.getState().reserveOrder(order.id)).toBe(false)
    expect(useWarehouseStore.getState().inventory.find((item) => item.variantId === 'V004')?.reserved).toBe(before.reserved + 2)
  })

  it('commits stock and movement once when GHTK picks up', () => {
    const order = { ...initialOrders[0], id: 'COMPLETE-TEST', state: 'WAITING_GHTK_PICKUP' as const, reservationApplied: true, inventoryCommitted: false, timeline: [], items: [{ ...initialOrders[0].items[0], id: 'COMPLETE-LINE', variantId: 'V004', quantity: 2 }] }
    useWarehouseStore.setState((state) => ({ orders: [...state.orders, order], inventory: state.inventory.map((item) => item.variantId === 'V004' ? { ...item, reserved: item.reserved + 2 } : item) }))
    const before = useWarehouseStore.getState().inventory.find((item) => item.variantId === 'V004')!
    useWarehouseStore.getState().completeOrder(order.id)
    const after = useWarehouseStore.getState()
    expect(after.inventory.find((item) => item.variantId === 'V004')).toMatchObject({ onHand: before.onHand - 2, reserved: before.reserved - 2 })
    expect(after.movements.filter((movement) => movement.reference === order.id)).toHaveLength(1)
    useWarehouseStore.getState().completeOrder(order.id)
    expect(useWarehouseStore.getState().movements.filter((movement) => movement.reference === order.id)).toHaveLength(1)
  })
})
