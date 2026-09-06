# CHUẨN TƯƠNG TÁC API (API CONVENTIONS)

**Dự án:** NexGear-SFE
**Vị trí tài liệu:** `agent-docs/API_CONVENTIONS.md`  
**Vai trò:** Single Source of Truth duy nhất quy định cấu trúc gọi API, quản lý HTTP Client, định dạng Request/Response và xử lý lỗi tập trung cho toàn bộ ứng dụng Frontend.

---

## 1. Mô hình Kiến trúc API (API Layer Architecture)

Toàn bộ các yêu cầu gửi request HTTP tới backend microservices MUST được tổ chức tập trung, tuyệt đối không phân tán trong các React Component UI.

```text
React Component / Custom Hook
         │
         ▼
src/apis/<domain>.api.ts (ví dụ: product.api.ts)
         │
         ▼
src/lib/axios.ts (Axios Instance với Interceptors & BaseURL)
         │
         ▼
Backend RESTful Microservices API
```

---

## 2. Tổ chức Thư mục & Domain Modules (`src/apis/`)

Các hàm gọi API MUST được nhóm theo từng domain nghiệp vụ tương ứng với backend dịch vụ:

- `src/apis/auth.api.ts`: API Đăng nhập, Đăng ký, Refresh Token, Đăng xuất.
- `src/apis/product.api.ts`: API Lấy danh sách sản phẩm, chi tiết sản phẩm, bộ lọc thông số kỹ thuật.
- `src/apis/cart.api.ts`: API Thêm, sửa, xóa items trong giỏ hàng, đồng bộ giỏ hàng.
- `src/apis/order.api.ts`: API Tạo đơn hàng, tra cứu lịch sử đơn hàng.
- `src/apis/user.api.ts`: API Lấy thông tin cá nhân, cập nhật thông tin cá nhân.


---

## 3. Cấu hình HTTP Client (`src/lib/axios.ts`)

Mọi lời gọi API MUST sử dụng Axios Client Instance được khởi tạo tập trung tại `src/lib/axios.ts`:

- **Base URL:** Đọc từ biến môi trường `import.meta.env.VITE_API_BASE_URL`.
- **Headers:** Tự động đính kèm `Content-Type: application/json`.
- **Auth Interceptor:** Tự động gắn header `Authorization: Bearer <token>` nếu có token khả dụng trong bộ nhớ/storage.
- **Error Interceptor:** Bắt các mã lỗi HTTP chung (401 Unauthorized, 403 Forbidden, 500 Internal Error) để xử lý tập trung (ví dụ: redirect về trang đăng nhập hoặc tự động refresh token).

---

## 4. Quy định Chuẩn hóa Request / Response Types (`src/types/`)

### 4.1. Struct Response Chuẩn (`ApiResponse<T>`)
Mọi hàm API MUST trả về Promise chứa kiểu dữ liệu phản hồi được định nghĩa tại `src/types/api.type.ts`:

```typescript
export type ApiResponse<T> = {
  success: boolean
  message: string
  data: T
  statusCode: number
}

export type PaginatedResponse<T> = {
  items: T[]
  meta: {
    page: number
    limit: number
    totalItems: number
    totalPages: number
  }
}
```

### 4.2. Quy ước Đặt tên Hàm API
- **Lấy dữ liệu:** Dùng tiền tố `get` (ví dụ: `getProducts`, `getProductBySlug`).
- **Tạo mới:** Dùng tiền tố `create` (ví dụ: `createOrder`).
- **Cập nhật:** Dùng tiền tố `update` (ví dụ: `updateCartItem`).
- **Xóa:** Dùng tiền tố `delete` hoặc `remove` (ví dụ: `removeCartItem`).

---

## 5. Quy trình Xử lý Lỗi & UI States

### 5.1. Xử lý Lỗi Async
Trong Custom Hooks hoặc Page khi gọi hàm API:
- MUST bọc lời gọi trong khối `try...catch`.
- Bắt lỗi API error response từ Axios và hiển thị thông báo lỗi thân thiện qua Toast/Notification UI.

### 5.2. Loading States
- UI MUST hiển thị trạng thái `isLoading` khi request đang được thực thi để ngăn người dùng bấm lặp lại (double submit).

---

## 6. Hiện trạng Mã nguồn & Ghi chú Đánh giá (Implementation Reality)

### Current Implementation
- Thư mục `src/apis/` và `src/lib/` đã được thiết lập trong cấu trúc thư mục với file khởi tạo sẵn sàng.
- Dự án chuẩn bị tích hợp gói `axios` cho việc giao tiếp microservices theo định hướng thiết kế.

### Ghi chú điểm kết nối Backend (Unknowns)
- Các endpoint cụ thể (URL routes backend), cấu trúc chi tiết của Token Refresh payload chưa được xác định cố định từ mã nguồn Frontend ở giai đoạn này.
- **Quy tắc:** Lập trình viên khi kết nối backend cụ thể MUST khai báo endpoint trong `src/constants/` hoặc file `.env.example`.
