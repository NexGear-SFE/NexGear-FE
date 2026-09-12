import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { DataState } from '@/components/warehouse/DataState'

describe('DataState', () => {
  it('renders an empty state without retry action', () => {
    render(<DataState type="empty" title="Không có dữ liệu" description="Hãy tạo bản ghi đầu tiên." />)
    expect(screen.getByText('Không có dữ liệu')).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('renders an error state with retry action', () => {
    const onRetry = vi.fn()
    render(<DataState type="error" title="Không tải được dữ liệu" description="Thử lại sau." onRetry={onRetry} />)
    screen.getByRole('button', { name: /Thử lại/i }).click()
    expect(onRetry).toHaveBeenCalledOnce()
  })
})
