import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { VariantMatrixEditor, type VariantDraft } from '@/pages/Warehouse/Products/components/VariantMatrixEditor'

const defaultVariant: VariantDraft = { sku: 'ASU-G16', skuSource: 'AUTO', optionValues: [], barcode: '', gtin: '', serialTracking: false, reorderLevel: 0, status: 'ACTIVE', skuLocked: false }

function Harness({ initial = [defaultVariant], onAudit = vi.fn() }: { initial?: VariantDraft[]; onAudit?: (action: 'MANUAL_OVERRIDE' | 'REGENERATE' | 'DEACTIVATE', sku: string) => void }) {
  const [variants, setVariants] = useState(initial)
  return <VariantMatrixEditor brandCode="ASU" modelCode="G16" variants={variants} onChange={setVariants} onAudit={onAudit} />
}

describe('VariantMatrixEditor', () => {
  it('only creates the configuration explicitly selected by the user', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.click(screen.getByRole('radio', { name: /tự ghép từng cấu hình/i }))
    await user.type(screen.getByLabelText('Tên thuộc tính 1'), 'CPU')
    await user.type(screen.getByLabelText('Giá trị 1-1'), 'i9')
    await user.click(screen.getByText('+ Thêm giá trị'))
    await user.type(screen.getByLabelText('Giá trị 1-2'), 'i7')
    await user.selectOptions(screen.getByLabelText('Chọn CPU'), 'I9')
    await user.click(screen.getByRole('button', { name: /thêm cấu hình/i }))
    expect(screen.getByDisplayValue('ASU-G16-I9')).toBeInTheDocument()
    expect(screen.queryByDisplayValue('ASU-G16-I7')).not.toBeInTheDocument()
  })

  it('requires every declared attribute when creating a configuration', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.click(screen.getByRole('radio', { name: /tự ghép từng cấu hình/i }))
    await user.type(screen.getByLabelText('Tên thuộc tính 1'), 'CPU')
    await user.type(screen.getByLabelText('Giá trị 1-1'), 'i9')
    await user.click(screen.getByRole('button', { name: /thêm thuộc tính/i }))
    await user.type(screen.getByLabelText('Tên thuộc tính 2'), 'RAM')
    await user.type(screen.getByLabelText('Giá trị 2-1'), '32GB')
    await user.selectOptions(screen.getByLabelText('Chọn CPU'), 'I9')
    await user.click(screen.getByRole('button', { name: /thêm cấu hình/i }))
    expect(screen.getByText(/mỗi thuộc tính đều phải được chọn/i)).toBeInTheDocument()
    expect(screen.getByText(/chưa có cấu hình/i)).toBeInTheDocument()
  })

  it('switches tracking for unlocked SKUs', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.click(screen.getByRole('radio', { name: /theo từng serial/i }))
    expect(screen.getByText('Theo serial')).toBeInTheDocument()
  })

  it('marks an edited SKU as manual and preserves locked SKU fields', async () => {
    const user = userEvent.setup()
    const onAudit = vi.fn()
    render(<Harness onAudit={onAudit} />)
    const skuInput = screen.getByLabelText('SKU 1')
    await user.clear(skuInput)
    await user.type(skuInput, 'custom sku')
    expect(screen.getByDisplayValue('CUSTOM-SKU')).toBeInTheDocument()
    expect(onAudit).toHaveBeenLastCalledWith('MANUAL_OVERRIDE', 'CUSTOM-SKU')
  })

  it('prevents changing the configuration mode for a locked SKU', () => {
    render(<Harness initial={[{ ...defaultVariant, skuLocked: true }]} />)
    expect(screen.getByRole('radio', { name: /tự ghép từng cấu hình/i })).toBeDisabled()
    expect(screen.getByLabelText('SKU 1')).toBeDisabled()
  })
})
