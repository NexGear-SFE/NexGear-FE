import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ReceiptWizardPage } from '@/pages/Warehouse/Receipts/ReceiptWizardPage'

function renderWizard() {
  return render(<MemoryRouter initialEntries={['/admin/warehouse/receipts/new']}><Routes><Route path="/admin/warehouse/receipts/new" element={<ReceiptWizardPage />} /></Routes></MemoryRouter>)
}

describe('ReceiptWizardPage', () => {
  it('gates each step and selects an SKU through the dedicated dialog', async () => {
    const user = userEvent.setup()
    renderWizard()
    const nextButton = screen.getByRole('button', { name: /tiếp tục/i })
    expect(nextButton).toBeDisabled()
    await user.type(screen.getByLabelText('Nhà cung cấp'), 'Nhà cung cấp Test')
    await user.type(screen.getByLabelText('Mã hóa đơn/chứng từ'), 'INV-TEST-01')
    expect(nextButton).toBeEnabled()
    await user.click(nextButton)

    await user.click(screen.getByRole('button', { name: 'Chọn SKU' }))
    expect(screen.getByRole('dialog', { name: 'Chọn SKU' })).toBeInTheDocument()
    await user.click(screen.getAllByRole('option')[0]!)
    await user.click(screen.getByRole('button', { name: 'Xác nhận lựa chọn' }))
    expect(screen.getByText('Đã thêm SKU vào phiếu.')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /tiếp tục/i }))

    expect(screen.getByLabelText('Giá nhập')).toHaveValue(40000000)
    expect(screen.getByRole('button', { name: /tiếp tục/i })).toBeDisabled()
    await user.click(screen.getByRole('button', { name: /nhập \/ quét serial/i }))
    await user.type(screen.getByLabelText(/quét hoặc paste serial/i), 'SERIAL-TEST-NEW')
    await user.click(screen.getByRole('button', { name: 'Lưu serial' }))
    expect(screen.getByRole('button', { name: /tiếp tục/i })).toBeEnabled()
  })
})
