import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { InventoryDetailPage } from '@/pages/Warehouse/Inventory/InventoryDetailPage'

function renderDetail(path: string) {
  const router = createMemoryRouter([{ path: '/admin/warehouse/inventory/:productId', element: <InventoryDetailPage /> }], { initialEntries: [path] })
  return render(<RouterProvider router={router} />)
}

describe('InventoryDetailPage', () => {
  it('shows movement and receipt references as navigation links', () => {
    renderDetail('/admin/warehouse/inventory/P001')
    expect(screen.getAllByRole('link', { name: 'PN-20260815-002' }).length).toBeGreaterThan(0)
    expect(screen.getByRole('link', { name: '#GG-20260825-0170' })).toHaveAttribute('href', '/admin/warehouse/orders/%23GG-20260825-0170')
  })

  it('renders the missing-product empty state', () => {
    renderDetail('/admin/warehouse/inventory/UNKNOWN')
    expect(screen.getByText('Không tìm thấy sản phẩm')).toBeInTheDocument()
  })
})
