import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { WarehouseUserMenu } from '@/components/warehouse/WarehouseUserMenu'

describe('WarehouseUserMenu', () => {
  it('clears only the mock session and navigates home', async () => {
    const user = userEvent.setup()
    window.localStorage.setItem('warehouseSession', 'active')
    window.localStorage.setItem('domainData', 'keep')
    render(<MemoryRouter initialEntries={['/admin/warehouse']}><Routes><Route path="/admin/warehouse" element={<WarehouseUserMenu />} /><Route path="/" element={<p>Storefront home</p>} /></Routes></MemoryRouter>)
    await user.click(screen.getByText('Nguyễn Bảo'))
    await user.click(screen.getByRole('button', { name: 'Đăng xuất' }))
    expect(window.localStorage.getItem('warehouseSession')).toBeNull()
    expect(window.localStorage.getItem('domainData')).toBe('keep')
    expect(screen.getByText('Storefront home')).toBeInTheDocument()
  })
})
