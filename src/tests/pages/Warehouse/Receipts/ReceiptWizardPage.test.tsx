import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ReceiptWizardPage } from '@/pages/Warehouse/Receipts/ReceiptWizardPage'

function renderWizard() {
  return render(<MemoryRouter initialEntries={['/admin/warehouse/receipts/new']}><Routes><Route path="/admin/warehouse/receipts/new" element={<ReceiptWizardPage />} /></Routes></MemoryRouter>)
}

describe('ReceiptWizardPage', () => {
  it('navigates four steps, preserves data and focuses validation errors', async () => {
    const user = userEvent.setup()
    renderWizard()
    await user.type(screen.getByLabelText('Nhà cung cấp'), 'Nhà cung cấp Test')
    await user.click(screen.getByRole('button', { name: /Tiếp tục/i }))
    expect(screen.getByLabelText('Tìm Product hoặc SKU')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /Tiếp tục/i }))
    await user.click(screen.getByRole('button', { name: /Tiếp tục/i }))
    await user.click(screen.getByRole('button', { name: 'Xác nhận phiếu nhập' }))
    expect(screen.getByRole('alert')).toHaveTextContent(/vấn đề cần xử lý/i)
    await user.click(screen.getByRole('button', { name: /mã hóa đơn/i }))
    await waitFor(() => expect(screen.getByLabelText('Mã hóa đơn/chứng từ')).toHaveFocus())
    expect(screen.getByLabelText('Nhà cung cấp')).toHaveValue('Nhà cung cấp Test')
  })
})
