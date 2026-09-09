import { afterEach, describe, expect, it } from 'vitest'
import { initialCategories } from '@/constants/warehouseMockData'
import { useWarehouseStore } from '@/stores/warehouseStore'

afterEach(() => useWarehouseStore.setState({ categories: initialCategories }))

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
