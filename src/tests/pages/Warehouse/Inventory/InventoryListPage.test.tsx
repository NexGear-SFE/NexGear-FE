import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getInventory } from '@/apis/inventory.api'
import { InventoryListPage } from '@/pages/Warehouse/Inventory/InventoryListPage'

vi.mock('@/apis/inventory.api', () => ({ getInventory: vi.fn() }))

function renderList() {
  const router = createMemoryRouter([{ path: '/admin/warehouse/inventory', element: <InventoryListPage /> }], { initialEntries: ['/admin/warehouse/inventory'] })
  return render(<RouterProvider router={router} />)
}

describe('InventoryListPage states', () => {
  beforeEach(() => vi.mocked(getInventory).mockReset())

  it('renders inventory rows after loading', async () => {
    vi.mocked(getInventory).mockResolvedValue({ success: true, message: 'Thành công', data: [], statusCode: 200 })
    renderList()
    expect(await screen.findByText('ASU-G16-I9-4080')).toBeInTheDocument()
  })

})
