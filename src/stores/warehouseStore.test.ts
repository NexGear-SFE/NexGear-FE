import { afterEach, describe, expect, it } from 'vitest'
import { initialCategories, initialInventory, initialMovements, initialOrders, initialProducts, initialReceipts, initialSerials, initialVariants } from '@/constants/warehouseMockData'
import { useWarehouseStore } from '@/stores/warehouseStore'

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
