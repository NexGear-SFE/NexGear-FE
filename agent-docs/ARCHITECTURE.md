# KIẾN TRÚC HỆ THỐNG (ARCHITECTURE)

**Dự án:** NexGear-SFE
**Vị trí tài liệu:** `agent-docs/ARCHITECTURE.md`  
**Vai trò:** Single Source of Truth giải thích cấu trúc kiến trúc ứng dụng Frontend, luồng dữ liệu, phân tầng trách nhiệm và định hướng nơi đặt logic cho lập trình viên và AI Coding Agents.

---

## 1. Tổng quan Kiến trúc Frontend

NexGear-SFE được xây dựng theo mô hình **Layered Component-Driven Architecture** trên nền tảng React 19, TypeScript và Vite. 

Sơ đồ phân tầng và luồng dữ liệu từ giao diện tới dịch vụ backend:

```text
[ User Interface Layer ]
       ├── Pages (src/pages/)
       ├── Layouts (src/layouts/)
       └── Components (src/components/)
              │
              ▼
[ Application & Business Logic Layer ]
       ├── Custom Hooks (src/hooks/)
       ├── Client State / Stores (src/stores/)
       ├── Validation Schemas (src/schemas/)
       └── Utility Helpers (src/utils/)
              │
              ▼
[ Data Access & Infrastructure Layer ]
       ├── Domain APIs (src/apis/)
       └── Library Clients (src/lib/axios.ts)
              │
              ▼
[ External Backend Microservices ]
```

---

## 2. Trách nhiệm các Tầng trong Hệ thống

### 2.1. Routing & Layout Layer (`src/routes.tsx`, `src/layouts/`)
- **Routing:** File `src/routes.tsx` định nghĩa danh sách các tuyến đường (routes), lazy loading cho các trang và gắn kết Layout tương ứng.
- **Layouts:** `src/layouts/` định nghĩa bố cục khung ngoài (Header, Footer, Navigation Bar, Cart Icon Drawer entry) giúp nhất quán giao diện qua các trang.

### 2.2. View Tier (`src/pages/`, `src/components/`)
- **Pages:** Đóng vai trò orchestrator, kết nối Custom Hooks, Stores và Render UI cho một Route cụ thể (ví dụ: `HomePage`, `ProductDetailPage`, `CartPage`).
- **Components:** Các UI components tái sử dụng (Dumb Components), tập trung vào hiển thị và nhận props/callbacks.

### 2.3. Logic & State Tier (`src/hooks/`, `src/stores/`, `src/schemas/`, `src/utils/`)
- **Custom Hooks:** Đóng gói logic giao diện tái sử dụng và side-effects (ví dụ: `useDebounce`, `useLocalStorage`).
- **Global Stores:** Quản lý state toàn cục xuyên suốt nhiều route (ví dụ: state giỏ hàng, thông tin phiên làm việc).
- **Validation Schemas:** Đóng gói luật kiểm tra tính hợp lệ của dữ liệu đầu vào (Zod schemas).
- **Utils:** Hàm tiện ích thuần túy (Pure Functions) như format tiền tệ VND, xử lý chuỗi.

### 2.4. Data Access Tier (`src/apis/`, `src/lib/`)
- **APIs:** Định nghĩa các hàm giao tiếp HTTP API theo từng domain (`product.api.ts`, `auth.api.ts`).
- **Lib:** Cấu hình instance HTTP Client (Axios) đính kèm token và interceptor xử lý lỗi tập trung.

---

## 3. Điều tra Kiến trúc Quản lý State (State Management Architecture)

Dựa trên việc kiểm tra thực tế repository và tài liệu hướng dẫn:

### 3.1. Current Implementation (Thực tế Mã nguồn Hiện tại)
- **Local UI State:** Sử dụng React primitive hooks (`useState`, `useReducer`) cho các trạng thái cục bộ trong từng component/page (ví dụ: toggle modal, active tab, input value).
- **Package Manifest:** `package.json` hiện tại đang cài đặt gói cơ sở `react` (^19.2.8) và `react-dom` (^19.2.8).

### 3.2. Recommendations & Planned Stack (Định hướng Mở rộng)
- **Shared Client State (Giỏ hàng, Auth):** Theo tài liệu thiết kế dự án (`AGENTS.md`), khi phát triển các tính năng giỏ hàng (`cartStore`) và người dùng (`authStore`), nhóm định hướng áp dụng **Zustand** (hoặc Redux Toolkit) tại `src/stores/`.
- **Server / API State:** Việc gọi API được tập trung qua các hàm trong `src/apis/` kết hợp với custom hooks trong `src/hooks/` hoặc giải pháp caching/query client (`src/lib/`).

---

## 4. Hướng dẫn Quyết định: "Logic mới nên đặt ở đâu?"

Khi xây dựng một tính năng mới, AI Agent hoặc Developer MUST tra cứu bảng sau để đặt code đúng vị trí:

| Loại Logic | Vị trí Quy định | Ví dụ |
|---|---|---|
| Khai báo Route mới | `src/routes.tsx` | Đăng ký route `/checkout` |
| Màn hình hiển thị cho Route | `src/pages/` | `ProductDetailPage.tsx` |
| Bố cục chung (Header/Footer) | `src/layouts/` | `MainLayout.tsx` |
| UI Component tái sử dụng | `src/components/` | `ProductCard.tsx`, `Button.tsx` |
| Gọi HTTP request Backend | `src/apis/` | `product.api.ts` -> `getProductDetail()` |
| State toàn cục (Cart, Auth) | `src/stores/` | `cartStore.ts` |
| Logic React dùng lại | `src/hooks/` | `useDebounce.ts`, `useProductFilter.ts` |
| Validation dữ liệu Form | `src/schemas/` | `auth.schema.ts` |
| Types / Interfaces TypeScript | `src/types/` | `product.type.ts` |
| Hàm format thuần túy (No React) | `src/utils/` | `formatCurrency.ts` |
| Cấu hình thư viện ngoài | `src/lib/` | `lib/axios.ts` |

---

## 5. Quy tắc Hướng Phụ thuộc (Dependency Direction)

Để đảm bảo tính độc lập và dễ kiểm thử, luồng phụ thuộc MUST tuân theo chiều sau:

```text
Pages/Components ──► Stores/Hooks ──► APIs ──► Lib (Axios)
     │                     │
     ▼                     ▼
   Types                 Schemas / Utils
```

- **KHÔNG** để tầng thấp hơn (APIs, Utils) import hoặc phụ thuộc vào tầng cao hơn (Pages, Components).
- **KHÔNG** import trực tiếp `axios` trong các React Component UI.
