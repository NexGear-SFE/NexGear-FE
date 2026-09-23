# CẤU TRÚC THƯ MỤC DỰ ÁN (FOLDER STRUCTURE)

**Dự án:** NexGear-SFE  
**Vị trí tài liệu:** `agent-docs/FOLDER_STRUCTURE.md`  
**Vai trò:** Single Source of Truth duy nhất quy định vị trí đặt file, phân chia trách nhiệm thư mục và cấu hình đường dẫn cho toàn bộ dự án Frontend NexGear-SFE.

---

## 1. Sơ đồ Tổng quan Thư mục (`src/`)

```text
src/
├── apis/          # Hàm bất đồng bộ truy xuất dữ liệu theo domain nghiệp vụ (Data Access Layer)
├── assets/        # Tài nguyên tĩnh nội bộ (images, icons, fonts)
├── components/    # Components giao diện tái sử dụng và extracted subcomponents
│   ├── admin/     # Components cấu hình trang Admin / Store Manager
│   ├── auth/      # Components dành riêng cho luồng Đăng nhập / Đăng ký
│   ├── common/    # Components dùng chung (PasswordSection, Header, Footer, AccountDropdown)
│   │   └── password/ # Subcomponents được tách từ PasswordSection (PwInput, ForgotPasswordModal...)
│   ├── customer/  # Components dành riêng cho khách hàng (ProductCard, OrderItemList...)
│   ├── techstaff/ # Components dành cho kỹ thuật viên (WarrantyTab, SerialCheck)
│   │   └── warranty/ # Subcomponents được tách từ WarrantyTab (WarrantyFilterBar, WarrantyProviderTable...)
│   └── ui/        # Dumb UI primitives (Button, PasswordField...)
├── constants/     # Hằng số toàn cục (routes.ts, roles.ts, storageKeys.ts, UI constants)
├── hooks/         # Custom React Hooks chứa logic tái sử dụng (useToast, useAuth, useProductDetail...)
├── layouts/       # Khung bố cục trang (MainLayout, AuthLayout, TechStaffLayout, StoreManagerLayout)
├── lib/           # Cấu hình thư viện bên thứ 3 (axios.ts - DEFERRED)
├── mocks/         # Dữ liệu mock phân vùng theo domain
│   ├── auth/          # Mock dữ liệu xác thực & người dùng
│   ├── customer/      # Mock dữ liệu khách hàng (sản phẩm, đơn hàng, bảo hành...)
│   ├── storemanager/  # Mock dữ liệu cấu hình trang quản lý
│   └── techstaff/     # Mock dữ liệu kỹ thuật viên
├── pages/         # Màn hình giao diện ứng với từng Route sản phẩm/tính năng
├── providers/     # React Context Providers (AuthProvider.tsx, ToastProvider.tsx)
├── schemas/       # Zod validation schemas cho forms và payloads
├── stores/        # State toàn cục (cartStore.ts - Custom Pub-Sub Store)
├── styles/        # CSS/SCSS toàn cục, Tailwind directives
├── types/         # Định nghĩa TypeScript Types, Interfaces toàn cục theo domain
├── utils/         # Hàm tiện ích thuần túy (Pure Functions - format money, dates...)
├── App.tsx        # Root component khởi chạy Router và Provider wrappers
├── routes.tsx     # Cấu hình bảng định tuyến Route chính
├── main.tsx       # Entry point kết nối với HTML DOM (`index.html`)
└── index.css      # Custom styles và Tailwind directives toàn ứng dụng
```

---

## 2. Chi tiết Trách nhiệm & Quy tắc Phân chia File

### `src/apis/`
- **Nhiệm vụ:** Định nghĩa các hàm bất đồng bộ (`async`) truy xuất dữ liệu theo domain nghiệp vụ (`order.api.ts`, `product.api.ts`, `warranty.api.ts`).
- **Nguồn dữ liệu hiện tại:** Đọc dữ liệu mẫu từ `src/mocks/`. Trả về `Promise<ApiResponse<T>>`.
- **Quy ước tên file:** `camelCase` với hậu tố `.api.ts` (ví dụ: `order.api.ts`).

### `src/assets/`
- **Nhiệm vụ:** Chứa các tài nguyên tĩnh nội bộ không thay đổi qua API.
- **Cấu trúc:**
  - `assets/images/`: Logo (`logo.png`, `Avatar.jpg`), banner mặc định, placeholder hình ảnh sản phẩm.
  - `assets/icons/`: SVG icon assets.
  - `assets/fonts/`: Font chữ web custom.

### `src/components/`
- **Nhiệm vụ:** Chứa các UI components dùng chung và các subcomponents được phân tách từ God Components.
- **Quy tắc phân vùng:**
  - `components/ui/`: UI primitives thuần túy hiển thị (Button, PasswordField).
  - `components/common/`: Common feature components (Header, Footer, ProfileSection, PasswordSection).
  - `components/customer/`: Components dành riêng cho trang khách hàng (ProductCard, ProductInfo, OrderItemList).
  - `components/techstaff/`: Components dành cho kỹ thuật viên.
  - `components/admin/`: Components cho trang quản trị/cấu hình.
- **Quy ước tên file:** `PascalCase` (ví dụ: `ProductCard.tsx`, `ForgotPasswordModal.tsx`). Tên thư mục chứa subcomponents viết chữ thường (`password/`, `warranty/`).

### `src/constants/`
- **Nhiệm vụ:** Lưu trữ hằng số bất biến, giá trị cấu hình cố định nhằm tránh magic strings/numbers.
- **Ví dụ:** `routes.ts` (đối tượng `ROUTES`), `roles.ts`, `storageKeys.ts`, `customerAccount.constant.ts`.
- **Quy ước tên file:** `camelCase` hoặc `kebab-case` (ví dụ: `routes.ts`).

### `src/hooks/`
- **Nhiệm vụ:** Chứa các Custom Hooks đóng gói React state logic và side-effects.
- **Ví dụ:** `useToast.ts` (Hiển thị toast notification), `useAuth.ts`, `useProductDetail.ts`, `useCartCount`.
- **Quy tắc:** Tên file và tên function BẮT BỘC có tiền tố `use` (ví dụ: `useToast.ts`).

### `src/layouts/`
- **Nhiệm vụ:** Chứa khung bố cục trang (Header, Footer, Navigation, Sidebar).
- **Các Layout tiêu chuẩn:**
  - `MainLayout.tsx`: Header, Footer + Bố cục trang khách hàng chính.
  - `AuthLayout.tsx`: Khung cho Đăng nhập / Đăng ký.
  - `TechStaffLayout.tsx`: Bố cục trang dành cho Kỹ thuật viên.
  - `StoreManagerLayout.tsx`: Bố cục trang Quản lý cửa hàng.

### `src/mocks/`
- **Nhiệm vụ:** Chứa dữ liệu mẫu được phân vùng theo domain nghiệp vụ:
  - `mocks/auth/`: Mock thông tin xác thực.
  - `mocks/customer/`: Mock sản phẩm, danh mục, đơn hàng, bảo hành khách hàng.
  - `mocks/storemanager/`: Mock cấu hình trang chủ & footer.
  - `mocks/techstaff/`: Mock danh sách trang tra cứu bảo hành kỹ thuật viên.

### `src/providers/`
- **Nhiệm vụ:** Chứa các React Context Providers bọc ở cấp ứng dụng.
- **Các Providers hiện có:**
  - `AuthProvider.tsx`: Cung cấp thông tin phiên đăng nhập.
  - `ToastProvider.tsx`: Cung cấp hệ thống Toast notification nổi toàn cục.

### `src/stores/`
- **Nhiệm vụ:** Quản lý Shared Client State toàn cục.
- **File hiện có:** `cartStore.ts` (Custom Pub-Sub Store cho giỏ hàng sử dụng `useSyncExternalStore`).

### `src/types/`
- **Nhiệm vụ:** Định nghĩa kiểu dữ liệu TypeScript (Interfaces, Types, Enums) dùng chung toàn hệ thống.
- **Quy tắc phân vùng:** `types/common/` (api, auth), `types/customer/` (product, order, category), `types/admin/` (staff).

### `src/utils/`
- **Nhiệm vụ:** Chứa các hàm tiện ích thuần túy (Pure Functions), nhận input trả về output, không phụ thuộc vào React Component/Hooks.
- **Ví dụ:** `formatCurrency.ts` (định dạng tiền VND).

---

## 3. Cấu hình Đường dẫn Tuyệt đối (Path Aliases)

Dự án cấu hình Path Alias `@/` trỏ trực tiếp về thư mục `src/` (thông qua `vite.config.ts` và `tsconfig.app.json`):

```typescript
// ✅ Chuẩn (Dùng Path Alias)
import { ProductCard } from '@/components/customer/product/ProductCard'
import { ROUTES } from '@/constants/routes'
import { useToast } from '@/hooks/useToast'

// ❌ Không dùng đường dẫn tương đối dài dòng
import { ProductCard } from '../../../components/customer/product/ProductCard'
```

---

## 4. Quy tắc khi Thêm File Mới

1. **Kiểm tra trước khi tạo:** Xác định xem thư mục chuyên trách đã có file tương tự hay chưa.
2. **Một trách nhiệm - Một vị trí:**
   - Cần format tiền/ngày? -> `src/utils/`
   - Cần phương thức lấy dữ liệu? -> `src/apis/`
   - Cần UI component dùng chung? -> `src/components/`
   - Cần custom hook logic? -> `src/hooks/`
3. **Không tạo thư mục cấp 1 mới trong `src/`** nếu chưa có sự thống nhất của nhóm.
