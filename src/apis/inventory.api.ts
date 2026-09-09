import { initialInventory, initialMovements, initialSerials } from '@/constants/warehouseMockData'
import type { InventoryMovement, ProductSerial, VariantInventory } from '@/types/inventory.type'
import { mockResponse } from '@/apis/mockResponse'

export function getInventory() { return mockResponse<VariantInventory[]>(initialInventory) }
export function getInventoryMovements() { return mockResponse<InventoryMovement[]>(initialMovements) }
export function getSerials() { return mockResponse<ProductSerial[]>(initialSerials) }
