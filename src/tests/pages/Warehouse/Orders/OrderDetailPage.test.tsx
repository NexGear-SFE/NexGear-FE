import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import { initialInventory, initialOrders, initialSerials } from '@/constants/warehouseMockData'
import { OrderDetailPage } from '@/pages/Warehouse/Orders/OrderDetailPage'
import { useWarehouseStore } from '@/stores/warehouseStore'

afterEach(() => useWarehouseStore.setState({ orders: initialOrders, inventory: initialInventory, serials: initialSerials }))

describe('OrderDetailPage', () => {
  it('walks from acceptance through inline serial scan and packing creation', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter initialEntries={['/admin/warehouse/orders/%23GG-20260831-0182']}><Routes><Route path="/admin/warehouse/orders/:orderId" element={<OrderDetailPage />} /></Routes></MemoryRouter>)
    expect(screen.getByText('Tiếp nhận')).toBeInTheDocument()
    expect(screen.getByText('Chuẩn bị & Đóng gói')).toBeInTheDocument()

    // Accept order
    await user.click(screen.getByRole('button', { name: /bắt đầu chuẩn bị hàng/i }))

    // Pick item
    const pickCheckbox = screen.getByRole('checkbox')
    await user.click(pickCheckbox)

    // Scan available serial
    const scanInput = screen.getByPlaceholderText(/quét mã vạch \/ serial/i)
    await user.type(scanInput, 'ROG16-4080-0002')
    await user.click(screen.getByRole('button', { name: 'Quét' }))

    // Now packing button should be enabled
    const packButton = screen.getByRole('button', { name: /đóng gói & tạo vận đơn/i })
    expect(packButton).toBeEnabled()
    await user.click(packButton)

    // Verify transition to awaiting pickup
    expect(await screen.findByRole('button', { name: /in phiếu giao hàng/i })).toBeInTheDocument()
  })
})
