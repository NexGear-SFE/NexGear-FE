import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { SerialNumberFields } from '@/pages/Warehouse/Receipts/components/SerialNumberFields'

describe('SerialNumberFields', () => {
  it('does not render serial inputs for quantity-only variants', () => {
    render(<SerialNumberFields variant={{ sku: 'QTY-SKU', serialTracking: false }} quantity={3} serials={[]} inventorySerials={[]} onChange={vi.fn()} />)
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
    expect(screen.getByText(/quản lý theo số lượng/i)).toBeInTheDocument()
  })

  it('renders exactly one serial input per unit and flags inventory duplicates', () => {
    render(<SerialNumberFields variant={{ sku: 'SERIAL-SKU', serialTracking: true }} quantity={2} serials={['EXISTING', 'NEW']} inventorySerials={[{ id: 'S1', variantId: 'V1', value: 'EXISTING', receiptId: 'R1', status: 'AVAILABLE', receivedAt: '' }]} onChange={vi.fn()} />)
    expect(screen.getAllByRole('textbox')).toHaveLength(2)
    expect(screen.getByRole('alert')).toHaveTextContent(/đã tồn tại trong kho/i)
    expect(screen.getByText(/không phải SKU SERIAL-SKU/i)).toBeInTheDocument()
  })
})
