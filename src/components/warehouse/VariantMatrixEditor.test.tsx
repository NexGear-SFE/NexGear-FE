import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { VariantMatrixEditor, type VariantDraft } from '@/components/warehouse/VariantMatrixEditor'

const defaultVariant: VariantDraft = { sku: 'ASU-G16', skuSource: 'AUTO', optionValues: [], barcode: '', gtin: '', serialTracking: false, reorderLevel: 0, status: 'ACTIVE', skuLocked: false }

function Harness({ initial = [defaultVariant], onAudit = vi.fn() }: { initial?: VariantDraft[]; onAudit?: (action: 'MANUAL_OVERRIDE' | 'REGENERATE' | 'DEACTIVATE', sku: string) => void }) {
  const [variants, setVariants] = useState(initial)
  return <VariantMatrixEditor brandCode="ASU" modelCode="G16" variants={variants} onChange={setVariants} onAudit={onAudit} />
}

describe('VariantMatrixEditor', () => {
  it('generates a cartesian matrix from stable option and value codes', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.click(screen.getByRole('button', { name: /thêm option/i }))
    await user.type(screen.getByLabelText('Tên option 1'), 'Màu')
    await user.type(screen.getByLabelText('Code option 1'), 'CLR')
    await user.type(screen.getByLabelText('Giá trị 1-1'), 'Đen')
    await user.type(screen.getByLabelText('Code 1-1'), 'BLK')
    await user.click(screen.getByText('+ Thêm value'))
    await user.type(screen.getByLabelText('Giá trị 1-2'), 'Trắng')
    await user.type(screen.getByLabelText('Code 1-2'), 'WHT')
    expect(screen.getByText((_, element) => element?.textContent === '2 combinations dự kiến')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /generate matrix/i }))
    expect(screen.getByDisplayValue('ASU-G16-BLK')).toBeInTheDocument()
    expect(screen.getByDisplayValue('ASU-G16-WHT')).toBeInTheDocument()
  })

  it('confirms before overwriting a manual SKU with regenerate all', async () => {
    const user = userEvent.setup()
    const onAudit = vi.fn()
    render(<Harness initial={[{ ...defaultVariant, sku: 'CUSTOM-001', skuSource: 'MANUAL' }]} onAudit={onAudit} />)
    await user.click(screen.getByRole('button', { name: /regenerate all/i }))
    expect(screen.getByRole('alertdialog')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /tiếp tục/i }))
    expect(screen.getByDisplayValue('ASU-G16')).toBeInTheDocument()
    expect(onAudit).toHaveBeenCalledWith('REGENERATE', 'CUSTOM-001')
  })

  it('marks a user-edited SKU as manual and writes an audit event', async () => {
    const user = userEvent.setup()
    const onAudit = vi.fn()
    render(<Harness onAudit={onAudit} />)
    const skuInput = screen.getByLabelText('SKU 1')
    await user.clear(skuInput)
    await user.type(skuInput, 'custom sku')
    expect(screen.getByText('MANUAL')).toBeInTheDocument()
    expect(screen.getByDisplayValue('CUSTOM-SKU')).toBeInTheDocument()
    expect(onAudit).toHaveBeenLastCalledWith('MANUAL_OVERRIDE', 'CUSTOM-SKU')
  })

  it('prevents editing and regenerating a locked SKU', () => {
    render(<Harness initial={[{ ...defaultVariant, skuLocked: true }]} />)
    expect(screen.getByLabelText('SKU 1')).toBeDisabled()
    expect(screen.getByRole('button', { name: /regenerate sku 1/i })).toBeDisabled()
  })

  it('preserves configuration for an unchanged combination when adding a value', async () => {
    const user = userEvent.setup()
    const configured: VariantDraft = { ...defaultVariant, sku: 'ASU-G16-BLK', optionValues: [{ option: 'Màu', optionCode: 'CLR', value: 'Đen', code: 'BLK' }], reorderLevel: 9, serialTracking: true }
    render(<Harness initial={[configured]} />)
    await user.click(screen.getByText('+ Thêm value'))
    await user.type(screen.getByLabelText('Giá trị 1-2'), 'Trắng')
    await user.type(screen.getByLabelText('Code 1-2'), 'WHT')
    await user.click(screen.getByRole('button', { name: /generate matrix/i }))
    expect(screen.getByLabelText('Reorder level 1')).toHaveValue(9)
    expect(screen.getByLabelText('Serial tracking 1')).toBeChecked()
    expect(screen.getByDisplayValue('ASU-G16-WHT')).toBeInTheDocument()
  })
})
