import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import { initialInventory, initialOrders, initialSerials } from '@/constants/warehouseMockData'
import { OrderDetailPage } from '@/pages/Warehouse/Orders/OrderDetailPage'
import { useWarehouseStore } from '@/stores/warehouseStore'

afterEach(() => useWarehouseStore.setState({ orders: initialOrders, inventory: initialInventory, serials: initialSerials }))

describe('OrderDetailPage', () => {
  it('walks from acceptance through complete picking and shows the conditional serial step', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter initialEntries={['/admin/warehouse/orders/%23GG-20260831-0182']}><Routes><Route path="/admin/warehouse/orders/:orderId" element={<OrderDetailPage />} /></Routes></MemoryRouter>)
    expect(screen.getByText('Tiếp nhận')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Bắt đầu soạn hàng' }))
    await user.click(screen.getByRole('checkbox', { name: /ASU-G16-I9-4080/i }))
    await user.click(screen.getByRole('button', { name: 'Hoàn tất soạn hàng' }))
    expect(screen.getByText('Chờ gán serial')).toBeInTheDocument()
    expect(screen.getByText('Gán serial')).toBeInTheDocument()
  })
})
