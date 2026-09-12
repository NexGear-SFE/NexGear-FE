import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { CategorySelect } from '@/components/warehouse/CategorySelect'
import type { Category } from '@/types/category.type'

const base = { description: '', sortOrder: 1, createdAt: '', updatedAt: '' } as const
const categories: Category[] = [
  { ...base, id: 'root', code: 'ROOT', name: 'Linh kiện', slug: 'linh-kien', parentId: null, status: 'ACTIVE' },
  { ...base, id: 'cpu', code: 'CPU', name: 'CPU', slug: 'cpu', parentId: 'root', status: 'ACTIVE' },
  { ...base, id: 'hidden', code: 'HIDDEN', name: 'Ẩn', slug: 'an', parentId: null, status: 'INACTIVE' },
]

describe('CategorySelect', () => {
  it('searches active categories and supports keyboard selection', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<MemoryRouter><CategorySelect categories={categories} value="" onChange={onChange} /></MemoryRouter>)
    await user.click(screen.getByRole('button', { name: /chọn danh mục/i }))
    const search = screen.getByRole('combobox')
    await user.type(search, 'CPU')
    expect(screen.getByRole('option', { name: /Linh kiện \/ CPU/i })).toBeInTheDocument()
    expect(screen.queryByText('Ẩn')).not.toBeInTheDocument()
    await user.keyboard('{Enter}')
    expect(onChange).toHaveBeenCalledWith('cpu')
  })

  it('closes the list with Escape', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><CategorySelect categories={categories} value="" onChange={vi.fn()} /></MemoryRouter>)
    await user.click(screen.getByRole('button', { name: /chọn danh mục/i }))
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('shows a newly created active category after refresh', async () => {
    const user = userEvent.setup()
    const { rerender } = render(<MemoryRouter><CategorySelect categories={categories} value="" onChange={vi.fn()} /></MemoryRouter>)
    const created: Category = { ...base, id: 'gpu', code: 'GPU', name: 'Card đồ họa', slug: 'card-do-hoa', parentId: 'root', status: 'ACTIVE' }
    rerender(<MemoryRouter><CategorySelect categories={[...categories, created]} value="" onChange={vi.fn()} /></MemoryRouter>)
    await user.click(screen.getByRole('button', { name: /chọn danh mục/i }))
    expect(screen.getByRole('option', { name: /Card đồ họa/i })).toBeInTheDocument()
  })
})
