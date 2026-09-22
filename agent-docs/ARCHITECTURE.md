# KIẾN TRÚC HỆ THỐNG (ARCHITECTURE)

**Dự án:** NexGear-SFE  
**Vị trí tài liệu:** `agent-docs/ARCHITECTURE.md`  
**Vai trò:** Single Source of Truth giải thích cấu trúc kiến trúc ứng dụng Frontend, luồng dữ liệu thực tế, phân tầng trách nhiệm và định hướng quản lý state cho lập trình viên và AI Coding Agents.

---

## 1. Tổng quan Kiến trúc Frontend

NexGear-SFE được xây dựng theo mô hình **Layered Component-Driven Architecture** trên nền tảng React 19, TypeScript và Vite.

> [!IMPORTANT]
> **Trạng thái Kiến trúc Hiện tại (Frontend-Only):** Backend microservices hiện CHƯA được triển khai. Tầng Data Access (`src/apis/`) hoạt động như một lớp trừu tượng dữ liệu bất đồng bộ (Asynchronous Data Abstraction) đọc dữ liệu từ Mock Data phân vùng theo domain (`src/mocks/`). Việc tích hợp HTTP Client (Axios) được **tạm hoãn (DEFERRED)** cho tới khi có backend chính thức.

Sơ đồ phân tầng và luồng dữ liệu thực tế:

```text
[ User Interface Layer ]
       ├── Pages (src/pages/)
       ├── Layouts (src/layouts/)
       └── Components (src/components/)
              │
              ▼
[ Application & Business Logic Layer ]
       ├── Custom Hooks (src/hooks/)
       ├── Shared Client Stores (src/stores/cartStore.ts)
       ├── Context Providers (src/providers/ - Auth, Toast)
       └── Utility Helpers (src/utils/)
              │
              ▼
[ Data Access Tier ]
       └── Domain API Abstractions (src/apis/ - order.api, product.api, warranty.api)
              │
              ▼
[ Domain Mock Data Source ]
       └── Mock Data Modules (src/mocks/ - customer, admin, techstaff, auth)
```

---

## 2. Trách nhiệm các Tầng trong Hệ thống

### 2.1. Routing & Layout Tier (`src/routes.tsx`, `src/layouts/`)
- **Routing:** File `src/routes.tsx` cấu hình danh sách tuyến đường (routes), bảo vệ route theo vai trò người dùng (`ProtectedRoute`), lazy loading cho các trang và gán Layout tương ứng.
- **Layouts:** `src/layouts/` định nghĩa khung bố cục trang (`MainLayout`, `AuthLayout`, `TechStaffLayout`, `StoreManagerLayout`) duy trì giao diện nhất quán.

### 2.2. View Tier (`src/pages/`, `src/components/`)
- **Pages:** Đóng vai trò **Orchestrator**, chịu trách nhiệm điều phối UI, quản lý state trang, gọi Custom Hooks/APIs và lắp ráp các components. Page KHÔNG trực tiếp chứa logic mock data khi đã có API abstraction.
- **Components:** Được phân chia rõ ràng thành:
  - `components/ui/`: Dumb UI primitives tái sử dụng (Button, Input, Field).
  - `components/common/`: Common feature components (Header, Footer, AccountDropdown, PasswordSection).
  - `components/customer/`: Components dành riêng cho trang khách hàng (ProductCard, OrderItemList, WarrantyRequestList).
  - `components/techstaff/`: Components dành cho kỹ thuật viên (WarrantyTab, SerialCheck).
  - `components/admin/`: Components quản lý cấu hình hệ thống.

### 2.3. Business Logic & State Tier (`src/hooks/`, `src/stores/`, `src/providers/`, `src/utils/`)
- **Custom Hooks:** Đóng gói logic giao diện tái sử dụng và side-effects (vd: `useToast`, `useAuth`, `useProductDetail`, `useCartCount`).
- **Shared Cart Store (`src/stores/cartStore.ts`):** Quản lý giỏ hàng toàn cục sử dụng cơ chế Pub-Sub và React `useSyncExternalStore`.
- **Context Providers (`src/providers/`):**
  - `AuthProvider.tsx`: Cung cấp thông tin phiên làm việc người dùng và hàm đăng nhập/đăng xuất.
  - `ToastProvider.tsx`: Cung cấp hệ thống thông báo Toast nổi toàn cục (`useToast()`).
- **Utils (`src/utils/`):** Hàm tiện ích thuần túy (Pure Functions) như format tiền tệ VND, định dạng ngày tháng.

### 2.4. Data Access Tier (`src/apis/`, `src/mocks/`)
- **Domain APIs (`src/apis/`):** Cung cấp các phương thức bất đồng bộ (`orderApi`, `productApi`, `warrantyApi`) trả về `Promise<ApiResponse<T>>`.
- **Domain Mock Data (`src/mocks/`):** Chứa dữ liệu mẫu được phân vùng theo domain (`customer/`, `admin/`, `techstaff/`, `auth/`).

---

## 3. Quản lý Notification & Toast System

Dự án đã chuẩn hóa 100% hệ thống Toast notification toàn cục:

- **Provider:** `ToastProvider.tsx` bọc ở cấp ứng dụng trong `App.tsx`.
- **Hook:** `useToast()` cung cấp các phương thức thông báo chuẩn: `showToast`, `success`, `error`, `info`.
- **Quy tắc:** Các component/page khi cần hiển thị thông báo người dùng MUST sử dụng `useToast()`. Tuyệt đối KHÔNG tự tạo local toast state hay JSX overlay riêng biệt trừ khi có yêu cầu UI state đặc thù của component.

---

## 4. Nguyên tắc Tách Component (Component Extraction Guidelines)

Không áp dụng quy tắc cứng nhắc dựa trên số dòng code (như "> 200 dòng phải tách").

### Quy tắc Tách Component Chuẩn:
1. **Responsibility Độc lập:** Tách component khi nó đảm nhận một nhiệm vụ/chức năng riêng biệt có boundary rõ ràng.
2. **Reusable Boundary:** Tách khi phần UI/Logic đó xuất hiện ở từ 2 nơi trở lên.
3. **Complex Flow Isolation:** Tách khi một phần giao diện (như Modal, Form phức tạp) có trạng thái và logic tương tác riêng.

### Tham chiếu Ví dụ Refactor thực tế (Phase 3):
- **`PasswordSection.tsx`** được refactor thành:
  - `password/PwInput.tsx` (UI input có toggle xem mật khẩu).
  - `password/PasswordStrengthChecks.tsx` (Danh sách tiêu chí kiểm tra mật khẩu).
  - `password/ForgotPasswordModal.tsx` (Modal quy trình 4 bước khôi phục mật khẩu).
- **`WarrantyTab.tsx`** được refactor thành:
  - `warranty/WarrantyFilterBar.tsx` (Thanh tìm kiếm & nút lọc trạng thái).
  - `warranty/WarrantyProviderTable.tsx` (Khung bảng & empty states).
  - `warranty/WarrantyProviderRow.tsx` (Dòng hiển thị thông tin nhà sản xuất & thao tác).
  - `warranty/WarrantyProviderDetailModal.tsx` (Modal xem chi tiết).
  - `warranty/WarrantyProviderFormModal.tsx` (Modal Thêm/Sửa nhà sản xuất).
  - `warranty/DisableProviderConfirmModal.tsx` (Modal hộp thoại xác nhận).

---

## 5. Bảng Hướng dẫn Quyết định: "Logic mới nên đặt ở đâu?"

| Loại Logic | Vị trí Quy định | Ví dụ |
|---|---|---|
| Định nghĩa Route mới | `src/routes.tsx` | Đăng ký route `/account/settings` |
| Màn hình hiển thị cho Route | `src/pages/` | `OrderDetailPage.tsx` |
| Khung bố cục chung | `src/layouts/` | `MainLayout.tsx`, `TechStaffLayout.tsx` |
| UI Component tái sử dụng | `src/components/` | `ProductCard.tsx`, `Button.tsx` |
| Extracted Subcomponent | `src/components/<domain>/<feature>/` | `components/common/password/PwInput.tsx` |
| Abstraction lấy dữ liệu | `src/apis/` | `order.api.ts` -> `getOrderById()` |
| Dữ liệu mẫu (Mock Data) | `src/mocks/<domain>/` | `mocks/customer/order.mock.ts` |
| State Giỏ hàng toàn cục | `src/stores/` | `cartStore.ts` |
| Context Provider ứng dụng | `src/providers/` | `ToastProvider.tsx`, `AuthProvider.tsx` |
| Logic React dùng lại | `src/hooks/` | `useToast.ts`, `useProductDetail.ts` |
| Validation dữ liệu Form | `src/schemas/` | `auth.schema.ts` |
| Types / Interfaces TypeScript | `src/types/` | `order.type.ts`, `product.type.ts` |
| Hàm format thuần túy (Pure) | `src/utils/` | `formatCurrency.ts` |
| Hằng số Route & Config | `src/constants/` | `routes.ts`, `customerAccount.constant.ts` |

---

## 6. Quy tắc Hướng Phụ thuộc (Dependency Direction)

```text
Pages/Components ──► Stores/Hooks/Providers ──► APIs ──► Mock Data
      │                        │
      ▼                        ▼
    Types                   Constants / Utils
```

- **KHÔNG** để tầng thấp hơn (APIs, Utils, Mocks) import hoặc phụ thuộc vào tầng cao hơn (Pages, Components).
- **KHÔNG** gọi trực tiếp dữ liệu mock từ Page nếu đã có API abstraction layer (`src/apis/`).
