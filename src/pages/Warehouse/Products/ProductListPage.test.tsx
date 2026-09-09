import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import * as productApi from '@/apis/product.api'
import { initialProducts } from '@/constants/warehouseMockData'
import { ProductListPage } from '@/pages/Warehouse/Products/ProductListPage'
import { useWarehouseStore } from '@/stores/warehouseStore'

function renderList(entry = '/admin/warehouse/products') {
  return render(<MemoryRouter initialEntries={[entry]}><Routes><Route path="/admin/warehouse/products" element={<ProductListPage />} /></Routes></MemoryRouter>)
}

afterEach(() => {
  vi.restoreAllMocks()
  useWarehouseStore.setState({ products: initialProducts })
})

describe('ProductListPage', () => {
  it('shows a matching product from URL-backed search filters', async () => {
    renderList('/admin/warehouse/products?q=Logitech')
    expect(screen.getByRole('status', { name: /đang tải dữ liệu/i })).toBeInTheDocument()
    expect(await screen.findByText('Logitech G Pro X2 Superlight')).toBeInTheDocument()
    expect(screen.queryByText('ASUS ROG Strix G16 (2024)')).not.toBeInTheDocument()
  })

  it('distinguishes an empty catalog from filtered no-results', async () => {
    useWarehouseStore.setState({ products: [] })
    renderList()
    expect(await screen.findByText('Chưa có sản phẩm')).toBeInTheDocument()
  })

  it('renders a retryable error state when the mock request fails', async () => {
    vi.spyOn(productApi, 'getProducts').mockRejectedValueOnce(new Error('offline'))
    renderList()
    await waitFor(() => expect(screen.getByRole('heading', { name: /không tải được sản phẩm/i })).toBeInTheDocument())
    expect(screen.getByRole('button', { name: /thử lại/i })).toBeInTheDocument()
  })
})
