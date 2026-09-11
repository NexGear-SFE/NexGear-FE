import { useSyncExternalStore } from 'react'
import type { Product } from '@/types/product.type'
import type { CartItem, CartState } from '@/types/cart.type'
import { mockPcProducts } from '@/mocks/product.mock'

const STORAGE_KEY = 'nexgear_cart_items'

const loadInitialItems = (): CartItem[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed)) return parsed
    }
  } catch (e) {
    console.error('Failed to load cart from localStorage:', e)
  }
  if (mockPcProducts && mockPcProducts.length > 0) {
    return [{ product: mockPcProducts[0], quantity: 1 }]
  }
  return []
}

let state: CartState = {
  items: loadInitialItems(),
  isDrawerOpen: false,
}

const listeners = new Set<() => void>()

const notify = () => {
  listeners.forEach((listener) => listener())
}

const saveItems = (items: CartItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch (e) {
    console.error('Failed to save cart to localStorage:', e)
  }
}

export const cartStore = {
  getSnapshot: () => state,

  subscribe: (listener: () => void) => {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },

  addItem: (product: Product, quantity = 1) => {
    const existingIndex = state.items.findIndex((item) => item.product.id === product.id)
    let newItems: CartItem[]
    if (existingIndex >= 0) {
      newItems = state.items.map((item, idx) =>
        idx === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
      )
    } else {
      newItems = [...state.items, { product, quantity }]
    }
    state = { ...state, items: newItems }
    saveItems(newItems)
    notify()
  },

  removeItem: (productId: string) => {
    const newItems = state.items.filter((item) => item.product.id !== productId)
    state = { ...state, items: newItems }
    saveItems(newItems)
    notify()
  },

  updateQuantity: (productId: string, quantity: number) => {
    if (quantity <= 0) {
      cartStore.removeItem(productId)
      return
    }
    const newItems = state.items.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    )
    state = { ...state, items: newItems }
    saveItems(newItems)
    notify()
  },

  clearCart: () => {
    state = { ...state, items: [] }
    saveItems([])
    notify()
  },

  toggleDrawer: (open?: boolean) => {
    const nextOpen = open !== undefined ? open : !state.isDrawerOpen
    state = { ...state, isDrawerOpen: nextOpen }
    notify()
  },

  openDrawer: () => {
    state = { ...state, isDrawerOpen: true }
    notify()
  },

  closeDrawer: () => {
    state = { ...state, isDrawerOpen: false }
    notify()
  },
}

export function useCartState(): CartState {
  return useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getSnapshot)
}

export function useCartCount(): number {
  const { items } = useCartState()
  return items.reduce((sum, item) => sum + item.quantity, 0)
}

export function useCartTotal(): number {
  const { items } = useCartState()
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
}
