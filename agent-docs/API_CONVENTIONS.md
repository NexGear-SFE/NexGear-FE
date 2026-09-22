# CHUẨN TƯƠNG TÁC DỮ LIỆU & API (API CONVENTIONS)

**Dự án:** NexGear-SFE  
**Vị trí tài liệu:** `agent-docs/API_CONVENTIONS.md`  
**Vai trò:** Single Source of Truth duy nhất quy định cấu trúc Data Access Layer, định dạng Response/Request, tổ chức Mock Data và định hướng kết nối Backend trong tương lai cho ứng dụng Frontend.

---

## 1. Trạng thái Kiến trúc Dữ liệu Hiện tại (Frontend-Only Baseline)

Dự án **NexGear-SFE** hiện tại ở giai đoạn **Frontend-Only** (chưa có kết nối Backend thật).

> [!IMPORTANT]
> **Data Access Layer Abstraction:** Toàn bộ dữ liệu được truy xuất thông qua các hàm bất đồng bộ tại `src/apis/` bọc dữ liệu mock tại `src/mocks/`. Cấu hình HTTP Client (Axios) và các HTTP request thật được **tạm hoãn (DEFERRED)** cho đến khi dịch vụ Backend chính thức được triển khai.

Sơ đồ truy xuất dữ liệu hiện tại:

```text
React Component / Custom Hook
         │
         ▼
src/apis/<domain>.api.ts (ví dụ: order.api.ts, product.api.ts)
         │
         ▼
src/mocks/<domain>/ (Mock Data phân vùng theo domain)
```

Sơ đồ truy xuất dữ liệu TƯƠNG LAI (khi có Backend):

```text
React Component / Custom Hook
         │
         ▼
src/apis/<domain>.api.ts
         │
         ▼
src/lib/axios.ts (Axios Client - DEFERRED)
         │
         ▼
Backend RESTful Microservices API
```

---

## 2. Tổ chức Thư mục & Domain Modules (`src/apis/` & `src/mocks/`)

Các hàm truy xuất dữ liệu MUST được nhóm theo từng domain nghiệp vụ tập trung tại `src/apis/`:

- `src/apis/order.api.ts`: Hàm lấy danh sách đơn hàng (`getOrders`), chi tiết đơn hàng (`getOrderById`), gửi yêu cầu hủy đơn (`cancelOrder`) làm việc trên `src/mocks/customer/order.mock.ts`.
- `src/apis/product.api.ts`: Hàm lấy danh sách sản phẩm, chi tiết sản phẩm làm việc trên `src/mocks/customer/product.mock.ts`.
- `src/apis/warranty.api.ts`: Hàm lấy và cập nhật thông tin bảo hành làm việc trên `src/mocks/customer/warranty.mock.ts` & `src/mocks/techstaff/warranty.mock.ts`.

---

## 3. Quy định Chuẩn hóa Response Types (`ApiResponse<T>`)

Mọi hàm API trong `src/apis/` MUST là hàm bất đồng bộ (`async`) trả về `Promise<ApiResponse<T>>` với định nghĩa tại `src/types/common/api.type.ts`:

```typescript
export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
  statusCode: number
}

export interface PaginatedResponse<T> {
  items: T[]
  meta: {
    page: number
    limit: number
    totalItems: number
    totalPages: number
  }
}
```

### Ví dụ Implementation chuẩn tại `src/apis/order.api.ts`:
```typescript
import type { Order } from '@/types/customer/order.type'
import type { ApiResponse } from '@/types/common/api.type'
import { MOCK_ORDERS } from '@/mocks/customer/order.mock'

export const orderApi = {
  getOrderById: async (id?: string): Promise<ApiResponse<Order | null>> => {
    const found = id
      ? MOCK_ORDERS.find((o) => o.id === id || o.orderCode === id)
      : MOCK_ORDERS[0]
    const targetOrder = found || MOCK_ORDERS[0]

    return {
      success: Boolean(targetOrder),
      message: targetOrder ? 'Lấy chi tiết đơn hàng thành công' : 'Không tìm thấy đơn hàng',
      data: targetOrder || null,
      statusCode: targetOrder ? 200 : 404,
    }
  },
}
```

---

## 4. Quy ước Đặt tên Hàm API (Naming Conventions)

- **Lấy dữ liệu danh sách:** Dùng tiền tố `get` + số nhiều (ví dụ: `getOrders`, `getProducts`).
- **Lấy chi tiết:** Dùng tiền tố `get` + `ById` hoặc `BySlug` (ví dụ: `getOrderById`, `getProductBySlug`).
- **Tạo mới:** Dùng tiền tố `create` (ví dụ: `createOrder`, `createWarrantyRequest`).
- **Cập nhật:** Dùng tiền tố `update` (ví dụ: `updateCartItem`, `updateStatus`).
- **Xóa / Hủy:** Dùng tiền tố `cancel`, `delete` hoặc `remove` (ví dụ: `cancelOrder`, `removeCartItem`).

---

## 5. Quy tắc cho Lập trình viên & AI Agents

1. **KHÔNG tạo HTTP Request giả:** Tuyệt đối không tự ý khởi tạo `axios.get()`, `fetch()` hay tạo mock HTTP server giả lập trong thời điểm hiện tại.
2. **Tách rời Page khỏi Mock Data:** Component UI và Page KHÔNG ĐƯỢC import trực tiếp các biến mock (như `MOCK_ORDERS`) nếu đã có hàm abstraction tương ứng trong `src/apis/`.
3. **Giữ nguyên Async Contract:** Các hàm API MUST trả về `Promise` để khi thay thế nguồn mock bằng Backend thật sau này, giao diện Page không phải sửa đổi code.
