import type { Category } from '@/types/category.type'
import type { InventoryMovement, ProductSerial, VariantInventory } from '@/types/inventory.type'
import type { Product, ProductVariant } from '@/types/product.type'
import type { StockReceipt } from '@/types/receipt.type'
import type { WarehouseOrder } from '@/types/warehouseOrder.type'

const now = '2026-09-09T09:00:00.000Z'

export const initialCategories: Category[] = [
  { id: 'cat-laptop', code: 'LAPTOP', name: 'Laptop', slug: 'laptop', description: 'Máy tính xách tay', parentId: null, sortOrder: 1, status: 'ACTIVE', createdAt: now, updatedAt: now },
  { id: 'cat-gaming-laptop', code: 'GAMING-LAPTOP', name: 'Laptop Gaming', slug: 'gaming-laptop', description: 'Laptop hiệu năng cao dành cho gaming', parentId: 'cat-laptop', sortOrder: 1, status: 'ACTIVE', createdAt: now, updatedAt: now },
  { id: 'cat-ultrabook', code: 'ULTRABOOK', name: 'Ultrabook', slug: 'ultrabook', description: 'Laptop mỏng nhẹ', parentId: 'cat-laptop', sortOrder: 2, status: 'ACTIVE', createdAt: now, updatedAt: now },
  { id: 'cat-peripheral', code: 'PERIPHERAL', name: 'Gaming Peripheral', slug: 'gaming-peripheral', description: 'Thiết bị ngoại vi gaming', parentId: null, sortOrder: 2, status: 'ACTIVE', createdAt: now, updatedAt: now },
  { id: 'cat-mouse', code: 'MOUSE', name: 'Chuột', slug: 'chuot', description: 'Chuột gaming', parentId: 'cat-peripheral', sortOrder: 1, status: 'ACTIVE', createdAt: now, updatedAt: now },
  { id: 'cat-keyboard', code: 'KEYBOARD', name: 'Bàn phím', slug: 'ban-phim', description: 'Bàn phím cơ', parentId: 'cat-peripheral', sortOrder: 2, status: 'ACTIVE', createdAt: now, updatedAt: now },
  { id: 'cat-monitor', code: 'MONITOR', name: 'Màn hình Gaming', slug: 'man-hinh-gaming', description: 'Màn hình tần số quét cao', parentId: null, sortOrder: 3, status: 'ACTIVE', createdAt: now, updatedAt: now },
  { id: 'cat-component', code: 'COMPONENT', name: 'Linh kiện', slug: 'linh-kien', description: 'Linh kiện máy tính', parentId: null, sortOrder: 4, status: 'ACTIVE', createdAt: now, updatedAt: now },
  { id: 'cat-memory', code: 'MEMORY', name: 'RAM', slug: 'ram', description: 'Bộ nhớ máy tính', parentId: 'cat-component', sortOrder: 1, status: 'ACTIVE', createdAt: now, updatedAt: now },
  { id: 'cat-storage', code: 'STORAGE', name: 'SSD', slug: 'ssd', description: 'Ổ cứng thể rắn', parentId: 'cat-component', sortOrder: 2, status: 'ACTIVE', createdAt: now, updatedAt: now },
]

export const initialProducts: Product[] = [
  { id: 'P001', productCode: 'P001', modelCode: 'G16', name: 'ASUS ROG Strix G16 (2024)', slug: 'asus-rog-strix-g16-2024', brand: 'ASUS', brandCode: 'ASU', categoryId: 'cat-gaming-laptop', shortDescription: 'Laptop gaming 16 inch hiệu năng cao.', specifications: [{ key: 'Màn hình', value: '16 inch QHD+ 240Hz' }, { key: 'Tản nhiệt', value: 'ROG Intelligent Cooling' }], warrantyMonths: 24, unit: 'Chiếc', origin: 'Trung Quốc', weightGrams: 2500, dimensions: { lengthMm: 354, widthMm: 264, heightMm: 30 }, status: 'ACTIVE', createdAt: now, updatedAt: now },
  { id: 'P002', productCode: 'P002', modelCode: 'GT77', name: 'MSI Titan GT77 HX', slug: 'msi-titan-gt77-hx', brand: 'MSI', brandCode: 'MSI', categoryId: 'cat-gaming-laptop', shortDescription: 'Desktop replacement cao cấp.', specifications: [{ key: 'Màn hình', value: '17.3 inch 4K 144Hz' }], warrantyMonths: 24, unit: 'Chiếc', origin: 'Trung Quốc', weightGrams: 3300, dimensions: { lengthMm: 397, widthMm: 330, heightMm: 23 }, status: 'ACTIVE', createdAt: now, updatedAt: now },
  { id: 'P003', productCode: 'P003', modelCode: 'GPX2', name: 'Logitech G Pro X2 Superlight', slug: 'logitech-g-pro-x2-superlight', brand: 'Logitech', brandCode: 'LOG', categoryId: 'cat-mouse', shortDescription: 'Chuột gaming không dây siêu nhẹ.', specifications: [{ key: 'Cảm biến', value: 'HERO 2' }, { key: 'DPI', value: '44.000' }], warrantyMonths: 24, unit: 'Chiếc', origin: 'Trung Quốc', weightGrams: 60, dimensions: { lengthMm: 125, widthMm: 64, heightMm: 40 }, status: 'ACTIVE', createdAt: now, updatedAt: now },
  { id: 'P004', productCode: 'P004', modelCode: 'K70', name: 'Corsair K70 RGB TKL', slug: 'corsair-k70-rgb-tkl', brand: 'Corsair', brandCode: 'COR', categoryId: 'cat-keyboard', shortDescription: 'Bàn phím cơ TKL cho thi đấu.', specifications: [{ key: 'Layout', value: 'Tenkeyless' }, { key: 'Kết nối', value: 'USB-C' }], warrantyMonths: 24, unit: 'Chiếc', origin: 'Trung Quốc', weightGrams: 930, dimensions: { lengthMm: 360, widthMm: 164, heightMm: 40 }, status: 'ACTIVE', createdAt: now, updatedAt: now },
  { id: 'P005', productCode: 'P005', modelCode: '27GP950', name: 'LG 27GP950-B UltraGear 4K', slug: 'lg-27gp950-b-ultragear-4k', brand: 'LG', brandCode: 'LG', categoryId: 'cat-monitor', shortDescription: 'Màn hình gaming 4K Nano IPS.', specifications: [{ key: 'Tần số quét', value: '144Hz' }, { key: 'Độ phân giải', value: '3840 × 2160' }], warrantyMonths: 24, unit: 'Chiếc', origin: 'Indonesia', weightGrams: 7900, dimensions: { lengthMm: 609, widthMm: 574, heightMm: 291 }, status: 'ACTIVE', createdAt: now, updatedAt: now },
  { id: 'P006', productCode: 'P006', modelCode: '990P', name: 'Samsung 990 Pro NVMe SSD', slug: 'samsung-990-pro-nvme-ssd', brand: 'Samsung', brandCode: 'SAM', categoryId: 'cat-storage', shortDescription: 'SSD NVMe PCIe 4.0 hiệu năng cao.', specifications: [{ key: 'Chuẩn', value: 'M.2 2280 PCIe 4.0' }], warrantyMonths: 60, unit: 'Chiếc', origin: 'Hàn Quốc', weightGrams: 9, dimensions: { lengthMm: 80, widthMm: 22, heightMm: 2 }, status: 'ACTIVE', createdAt: now, updatedAt: now },
]

export const initialVariants: ProductVariant[] = [
  { id: 'V001', productId: 'P001', sku: 'ASU-G16-I9-4080', skuSource: 'AUTO', optionValues: [{ option: 'CPU', value: 'i9-14900HX', code: 'I9' }, { option: 'GPU', value: 'RTX 4080', code: '4080' }], serialTracking: true, reorderLevel: 3, status: 'ACTIVE', skuLocked: true, createdAt: now, updatedAt: now },
  { id: 'V002', productId: 'P001', sku: 'ASU-G16-I7-4070', skuSource: 'AUTO', optionValues: [{ option: 'CPU', value: 'i7-14700HX', code: 'I7' }, { option: 'GPU', value: 'RTX 4070', code: '4070' }], serialTracking: true, reorderLevel: 3, status: 'ACTIVE', skuLocked: true, createdAt: now, updatedAt: now },
  { id: 'V003', productId: 'P002', sku: 'MSI-GT77-I9-4090', skuSource: 'AUTO', optionValues: [{ option: 'CPU', value: 'i9-13980HX', code: 'I9' }, { option: 'GPU', value: 'RTX 4090', code: '4090' }], serialTracking: true, reorderLevel: 2, status: 'ACTIVE', skuLocked: true, createdAt: now, updatedAt: now },
  { id: 'V004', productId: 'P003', sku: 'LOG-GPX2-BLK', skuSource: 'AUTO', optionValues: [{ option: 'Màu', value: 'Đen', code: 'BLK' }], serialTracking: false, reorderLevel: 5, status: 'ACTIVE', skuLocked: true, createdAt: now, updatedAt: now },
  { id: 'V005', productId: 'P003', sku: 'LOG-GPX2-WHT', skuSource: 'AUTO', optionValues: [{ option: 'Màu', value: 'Trắng', code: 'WHT' }], serialTracking: false, reorderLevel: 5, status: 'ACTIVE', skuLocked: true, createdAt: now, updatedAt: now },
  { id: 'V006', productId: 'P004', sku: 'COR-K70-RD', skuSource: 'AUTO', optionValues: [{ option: 'Switch', value: 'Cherry MX Red', code: 'RD' }], serialTracking: false, reorderLevel: 3, status: 'ACTIVE', skuLocked: true, createdAt: now, updatedAt: now },
  { id: 'V007', productId: 'P004', sku: 'COR-K70-BL', skuSource: 'AUTO', optionValues: [{ option: 'Switch', value: 'Cherry MX Blue', code: 'BL' }], serialTracking: false, reorderLevel: 3, status: 'ACTIVE', skuLocked: true, createdAt: now, updatedAt: now },
  { id: 'V008', productId: 'P005', sku: 'LG-27GP950-BLK', skuSource: 'AUTO', optionValues: [{ option: 'Màu', value: 'Đen', code: 'BLK' }], serialTracking: false, reorderLevel: 3, status: 'ACTIVE', skuLocked: true, createdAt: now, updatedAt: now },
  { id: 'V009', productId: 'P006', sku: 'SAM-990P-2T', skuSource: 'AUTO', optionValues: [{ option: 'Dung lượng', value: '2TB', code: '2T' }], serialTracking: false, reorderLevel: 4, status: 'ACTIVE', skuLocked: true, createdAt: now, updatedAt: now },
]

export const initialInventory: VariantInventory[] = [
  { variantId: 'V001', onHand: 3, reserved: 1 }, { variantId: 'V002', onHand: 2, reserved: 0 },
  { variantId: 'V003', onHand: 1, reserved: 0 }, { variantId: 'V004', onHand: 12, reserved: 0 },
  { variantId: 'V005', onHand: 9, reserved: 0 }, { variantId: 'V006', onHand: 5, reserved: 0 },
  { variantId: 'V007', onHand: 0, reserved: 0 }, { variantId: 'V008', onHand: 4, reserved: 0 },
  { variantId: 'V009', onHand: 2, reserved: 0 },
]

export const initialSerials: ProductSerial[] = [
  { id: 'S001', variantId: 'V001', value: 'ROG16-4080-0001', receiptId: 'PN-20260815-002', status: 'RESERVED', receivedAt: '2026-08-15T09:00:00.000Z' },
  { id: 'S002', variantId: 'V001', value: 'ROG16-4080-0002', receiptId: 'PN-20260815-002', status: 'AVAILABLE', receivedAt: '2026-08-15T09:00:00.000Z' },
  { id: 'S003', variantId: 'V001', value: 'ROG16-4080-0003', receiptId: 'PN-20260815-002', status: 'AVAILABLE', receivedAt: '2026-08-15T09:00:00.000Z' },
  { id: 'S004', variantId: 'V002', value: 'ROG16-4070-0001', receiptId: 'PN-20260815-002', status: 'AVAILABLE', receivedAt: '2026-08-15T09:00:00.000Z' },
  { id: 'S005', variantId: 'V002', value: 'ROG16-4070-0002', receiptId: 'PN-20260815-002', status: 'AVAILABLE', receivedAt: '2026-08-15T09:00:00.000Z' },
]

export const initialMovements: InventoryMovement[] = [
  { id: 'M001', variantId: 'V001', reason: 'STOCK_RECEIPT', quantityDelta: 5, reference: 'PN-20260815-002', occurredAt: '2026-08-15T09:00:00.000Z' },
  { id: 'M002', variantId: 'V001', reason: 'ORDER_FULFILLED', quantityDelta: -1, reference: '#GG-20260825-0170', occurredAt: '2026-08-25T12:00:00.000Z' },
  { id: 'M003', variantId: 'V001', reason: 'ORDER_FULFILLED', quantityDelta: -1, reference: '#GG-20260829-0174', occurredAt: '2026-08-29T14:00:00.000Z' },
]

export const initialReceipts: StockReceipt[] = [
  { id: 'PN-20260831-004', supplier: 'ASUS Vietnam Co., Ltd.', warehouseName: 'Kho trung tâm TP.HCM', receiptDate: '2026-08-31', invoiceCode: 'INV-ASUS-2026-0831', notes: 'Nhập bổ sung ROG Strix G16', creator: 'Nguyễn Bảo', status: 'DRAFT', lines: [{ id: 'RL001', variantId: 'V001', quantity: 5, unitCost: 40000000, serials: ['ROG16-4080-0101', 'ROG16-4080-0102', 'ROG16-4080-0103', 'ROG16-4080-0104', 'ROG16-4080-0105'] }], createdAt: '2026-08-31T09:00:00.000Z', updatedAt: '2026-08-31T09:00:00.000Z' },
  { id: 'PN-20260827-002', supplier: 'Kingston Technology Vietnam', warehouseName: 'Kho trung tâm TP.HCM', receiptDate: '2026-08-27', invoiceCode: 'INV-KING-2026-0827', notes: '', creator: 'Nguyễn Bảo', status: 'CONFIRMED', lines: [{ id: 'RL002', variantId: 'V009', quantity: 20, unitCost: 3000000, serials: [] }], createdAt: '2026-08-27T08:00:00.000Z', updatedAt: '2026-08-27T10:00:00.000Z', confirmedBy: 'Nguyễn Bảo', confirmedAt: '2026-08-27T10:00:00.000Z' },
]

export const initialOrders: WarehouseOrder[] = [
  { id: '#GG-20260831-0182', customerName: 'Nguyễn Minh Tuấn', phone: '0912 345 678', address: '45 Nguyễn Huệ, P. Bến Nghé, Quận 1, TP. Hồ Chí Minh', paymentMethod: 'COD', state: 'WAITING_ACCEPTANCE', assignee: null, items: [{ id: 'OI001', variantId: 'V001', quantity: 1, unitPrice: 45990000, pickedQuantity: 0, assignedSerialIds: [] }], note: 'Giao giờ hành chính, gọi trước 30 phút', timeline: [{ id: 'T001', label: 'Đã tạo đơn hàng', occurredAt: '2026-08-31T08:14:00.000Z', actor: 'Khách hàng' }, { id: 'T002', label: 'Đã giữ hàng', occurredAt: '2026-08-31T08:14:00.000Z', actor: 'Hệ thống' }], createdAt: '2026-08-31T08:14:00.000Z', reservationApplied: true },
  { id: '#GG-20260830-0178', customerName: 'Đỗ Thanh Hương', phone: '0856 234 567', address: '12 Lê Lợi, Quận 1, TP. Hồ Chí Minh', paymentMethod: 'VNPAY', state: 'PICKING', assignee: 'Lê Thu', items: [{ id: 'OI002', variantId: 'V006', quantity: 1, unitPrice: 3590000, pickedQuantity: 0, assignedSerialIds: [] }], note: '', timeline: [], createdAt: '2026-08-30T10:00:00.000Z' },
  { id: '#GG-20260830-0177', customerName: 'Nguyễn Bảo Long', phone: '0912 000 111', address: '88 Võ Văn Tần, Quận 3, TP. Hồ Chí Minh', paymentMethod: 'BANK_TRANSFER', state: 'WAITING_SERIAL', assignee: 'Nguyễn Bảo', items: [{ id: 'OI003', variantId: 'V002', quantity: 1, unitPrice: 38900000, pickedQuantity: 1, assignedSerialIds: [] }], note: '', timeline: [], createdAt: '2026-08-30T09:00:00.000Z' },
  { id: '#GG-20260830-0176', customerName: 'Võ Thị Thu', phone: '0909 222 333', address: '20 Pasteur, Quận 1, TP. Hồ Chí Minh', paymentMethod: 'MOMO', state: 'READY_TO_PACK', assignee: 'Trần Minh', items: [{ id: 'OI004', variantId: 'V008', quantity: 1, unitPrice: 12490000, pickedQuantity: 1, assignedSerialIds: [] }], note: '', timeline: [], createdAt: '2026-08-30T08:00:00.000Z' },
  { id: '#GG-20260829-0175', customerName: 'Hoàng Đức Anh', phone: '0901 444 555', address: '9 Điện Biên Phủ, Bình Thạnh, TP. Hồ Chí Minh', paymentMethod: 'COD', state: 'ISSUE', assignee: 'Trần Minh', items: [{ id: 'OI005', variantId: 'V004', quantity: 2, unitPrice: 3995000, pickedQuantity: 2, assignedSerialIds: [] }], note: '', issue: { code: 'GHTK_REJECTED', title: 'GHTK từ chối vận đơn', message: 'Kiểm tra lại kích thước kiện hàng.', occurredAt: '2026-08-29T11:00:00.000Z', resumeState: 'READY_TO_PACK', retryable: true }, timeline: [], createdAt: '2026-08-29T08:00:00.000Z' },
  { id: '#GG-20260828-0173', customerName: 'Lý Thị Mỹ Hạnh', phone: '0933 777 888', address: '16 Nguyễn Trãi, Quận 5, TP. Hồ Chí Minh', paymentMethod: 'COD', state: 'COMPLETED', assignee: 'Lê Thu', items: [{ id: 'OI006', variantId: 'V006', quantity: 1, unitPrice: 3590000, pickedQuantity: 1, assignedSerialIds: [] }], note: '', timeline: [], createdAt: '2026-08-28T08:00:00.000Z', reservationApplied: true, inventoryCommitted: true },
]
