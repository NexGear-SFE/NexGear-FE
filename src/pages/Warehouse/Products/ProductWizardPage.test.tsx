import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ProductWizardPage } from '@/pages/Warehouse/Products/ProductWizardPage'

function renderWizard() {
  return render(<MemoryRouter initialEntries={['/admin/warehouse/products/new']}><Routes><Route path="/admin/warehouse/products/new" element={<ProductWizardPage />} /></Routes></MemoryRouter>)
}

describe('ProductWizardPage', () => {
  it('validates steps and preserves basic data when navigating back', async () => {
    const user = userEvent.setup()
    const { container } = renderWizard()
    await user.click(screen.getByRole('button', { name: /tiếp tục/i }))
    expect(screen.getByRole('alert')).toHaveTextContent(/tên sản phẩm/i)

    await user.type(screen.getByLabelText('Tên sản phẩm'), 'ROG Test Product')
    await user.type(screen.getByLabelText('Product code'), 'PTEST')
    await user.type(screen.getByLabelText('Model code'), 'MODEL1')
    const brandInput = container.querySelector<HTMLInputElement>('input[list="brand-list"]')
    expect(brandInput).not.toBeNull()
    await user.type(brandInput!, 'ASUS')
    await user.type(screen.getByLabelText('Brand code'), 'ASU')
    await user.click(screen.getByRole('button', { name: /danh mục: chọn danh mục/i }))
    await user.click(screen.getByRole('option', { name: /Laptop Gaming/i }))
    await user.click(screen.getByRole('button', { name: /tiếp tục/i }))
    expect(screen.getByRole('heading', { name: /thông số key\/value/i })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /tiếp tục/i }))
    expect(screen.getByRole('heading', { name: /biến thể và sku/i })).toBeInTheDocument()
    expect(screen.getByLabelText('SKU 1')).toHaveValue('ASU-MODEL1')
    await user.click(screen.getByRole('button', { name: /quay lại/i }))
    await user.click(screen.getByRole('button', { name: /quay lại/i }))
    expect(screen.getByLabelText('Tên sản phẩm')).toHaveValue('ROG Test Product')
  })

  it('registers an unsaved changes warning after editing', async () => {
    const user = userEvent.setup()
    renderWizard()
    await user.type(screen.getByLabelText('Tên sản phẩm'), 'Changed')
    const event = new Event('beforeunload', { cancelable: true })
    window.dispatchEvent(event)
    expect(event.defaultPrevented).toBe(true)
  })
})
