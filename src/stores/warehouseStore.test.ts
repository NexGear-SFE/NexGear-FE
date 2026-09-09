import { afterEach, describe, expect, it } from 'vitest'
import { initialCategories, initialInventory, initialProducts, initialVariants } from '@/constants/warehouseMockData'
import { useWarehouseStore } from '@/stores/warehouseStore'

afterEach(() => useWarehouseStore.setState({ categories: initialCategories, products: initialProducts, variants: initialVariants, inventory: initialInventory }))

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
})
