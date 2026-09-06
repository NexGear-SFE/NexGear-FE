# CẤU TRÚC THƯ MỤC DỰ ÁN (FOLDER STRUCTURE)

**Dự án:** NexGear-SFE  
**Vị trí tài liệu:** `agent-docs/FOLDER_STRUCTURE.md`  
**Vai trò:** Single Source of Truth duy nhất quy định vị trí đặt file, phân chia trách nhiệm thư mục và cấu hình đường dẫn cho toàn bộ dự án Frontend.

---

## 1. Sơ đồ Tổng quan Thư mục (`src/`)

```text
src/
├── apis/          # Hàm tương tác API backend phân theo từng domain nghiệp vụ
├── assets/        # Tài nguyên tĩnh nội bộ (images, icons, fonts)
├── components/    # Component UI tái sử dụng (Dumb / Presentational components)
├── constants/     # Hằng số toàn cục, regex, route paths, storage keys
├── hooks/         # Custom React Hooks chứa logic tái sử dụng
├── layouts/       # Khung bố cục trang (MainLayout, AuthLayout, CheckoutLayout...)
├── lib/           # Cấu hình & khởi tạo các thư viện bên thứ 3 (Axios client, SDK...)
├── pages/         # Màn hình giao diện ứng với từng Route sản phẩm/tính năng
├── providers/     # React Context Providers bao bọc ứng dụng
├── schemas/       # Zod / Yup validation schemas cho forms và payloads
├── stores/        # State toàn cục (Client state / Shared state)
├── styles/        # CSS/SCSS toàn cục, Tailwind tokens, CSS variables
├── types/         # Định nghĩa TypeScript Types, Interfaces, Enums toàn cục
├── utils/         # Hàm tiện ích thuần túy (Pure Functions - format tiền, ngày...)
├── App.tsx        # Root component khởi chạy Router và Provider wrapper
├── routes.tsx     # Cấu hình bảng định tuyến Route và bọc Layout
├── main.tsx       # Entry point kết nối với HTML DOM (`index.html`)
└── index.css      # Custom styles và Tailwind directives toàn ứng dụng
```

---

## 2. Chi tiết Trách nhiệm & Quy tắc phân chia File

### `src/apis/`
- **Nhiệm vụ:** Định nghĩa các hàm gửi HTTP request (GET, POST, PUT, DELETE) gọi tới backend microservices.
- **Những gì NÊN ở đây:** các hàm API phân theo domain nghiệp vụ (`auth.api.ts`, `product.api.ts`, `cart.api.ts`, `order.api.ts`).
- **Những gì KHÔNG NÊN ở đây:** Logic xử lý UI, React State, hay gọi direct `axios` trong component mà không thông qua file API.
- **Quy ước tên file:** `camelCase` với hậu tố `.api.ts` (ví dụ: `product.api.ts`).

### `src/assets/`
- **Nhiệm vụ:** Chứa các tài nguyên tĩnh nội bộ không thay đổi qua API.
- **Cấu trúc:**
  - `assets/images/`: Logo, banner mặc định, placeholder hình ảnh sản phẩm.
  - `assets/icons/`: SVG icon assets hoặc icon bộ sưu tập.
  - `assets/fonts/`: Font chữ web custom.

### `src/components/`
- **Nhiệm vụ:** Chứa các UI components dùng chung xuất hiện từ 2 vị trí/trang trở lên.
- **Ví dụ:** `Button.tsx`, `Input.tsx`, `Modal.tsx`, `ProductCard.tsx`, `Pagination.tsx`, `Breadcrumb.tsx`.
- **Quy tắc:**
  - Là Presentational / Dumb Component: Nhận dữ liệu qua `props` và phát sự kiện qua callback props.
  - Không gọi trực tiếp API backend.
- **Quy ước tên file:** `PascalCase` (ví dụ: `ProductCard.tsx`).

### `src/constants/`
- **Nhiệm vụ:** Lưu trữ hằng số bất biến, giá trị cấu hình cố định nhằm tránh magic strings/numbers.
- **Ví dụ:** `routes.ts` (URL paths), `storage.ts` (Local/SessionStorage keys), `regex.ts` (Form validation regex patterns).
- **Quy ước tên file:** `camelCase` (ví dụ: `storageKeys.ts`).

### `src/hooks/`
- **Nhiệm vụ:** Chứa các Custom Hooks đóng gói React state logic độc lập với giao diện.
- **Ví dụ:** `useDebounce.ts`, `useLocalStorage.ts`, `useOnClickOutside.ts`, `useCart.ts`.
- **Quy tắc:** Tên file và tên function BẮT BỘC có tiền tố `use` (ví dụ: `useDebounce.ts`).

### `src/layouts/`
- **Nhiệm vụ:** Chứa khung bố cục trang (Header, Footer, Navigation, Sidebar).
- **Các Layout tiêu chuẩn:**
  - `MainLayout.tsx`: Header tìm kiếm, Hotline, Giỏ hàng + Footer + Bố cục chính.
  - `AuthLayout.tsx`: Khung tối giản cho Đăng nhập / Đăng ký.
  - `CheckoutLayout.tsx`: Khung tập trung hoàn tất đơn hàng, hạn chế xao nhãng.

### `src/lib/`
- **Nhiệm vụ:** Khởi tạo và cấu hình các instance thư viện bên thứ 3 trước khi dùng trong app.
- **Ví dụ:** `lib/axios.ts` (Khởi tạo Axios instance, baseURL, interceptors cho Auth token).

### `src/pages/`
- **Nhiệm vụ:** Màn hình hoàn chỉnh gắn liền với từng đường dẫn (Route).
- **Cấu trúc:** Mỗi trang có thể tạo thư mục riêng nếu cần tách sub-components chỉ thuộc riêng trang đó (`pages/Home/`, `pages/ProductDetail/`, `pages/Cart/`, `pages/Checkout/`).
- **Nhiệm vụ chính:** Lắp ráp UI components, sử dụng custom hooks, gọi stores/APIs.

### `src/providers/`
- **Nhiệm vụ:** Chứa các React Context Providers bọc ở cấp ứng dụng.
- **Ví dụ:** `AppProvider.tsx`, `ThemeProvider.tsx`, `AuthProvider.tsx`.

### `src/schemas/`
- **Nhiệm vụ:** Chứa các Zod / Yup validation schemas phục vụ kiểm tra form và payload.
- **Ví dụ:** `auth.schema.ts` (validate Đăng nhập/Đăng ký), `checkout.schema.ts` (validate Địa chỉ giao hàng).

### `src/stores/`
- **Nhiệm vụ:** Quản lý Client State toàn cục dùng chung cho nhiều trang (ví dụ: state giỏ hàng, thông tin tài khoản đăng nhập).
- **Ví dụ:** `cartStore.ts`, `authStore.ts`.

### `src/styles/`
- **Nhiệm vụ:** Chứa các file CSS/SCSS tùy chỉnh, biến CSS, cấu hình style toàn cục không thuộc Tailwind.

### `src/types/`
- **Nhiệm vụ:** Định nghĩa kiểu dữ liệu TypeScript (Interfaces, Types, Enums) dùng chung toàn hệ thống.
- **Ví dụ:** `product.type.ts`, `order.type.ts`, `user.type.ts`, `api.type.ts`.

### `src/utils/`
- **Nhiệm vụ:** Chứa các hàm tiện ích thuần túy (Pure Functions), nhận input trả về output, không phụ thuộc vào React Component/Hooks.
- **Ví dụ:** `formatCurrency.ts` (định dạng giá VND), `formatDate.ts`, `calculateDiscount.ts`.

---

## 3. Cấu hình Đường dẫn Tuyệt đối (Path Aliases)

Dự án cấu hình Path Alias `@/` trỏ trực tiếp về thư mục `src/` (thông qua `vite.config.ts` và `tsconfig.app.json`):

```typescript
// ✅ Chuẩn (Dùng Path Alias)
import { ProductCard } from '@/components/ProductCard'
import { formatCurrency } from '@/utils/formatCurrency'

// ❌ Không dùng đường dẫn tương đối dài dòng
import { ProductCard } from '../../../components/ProductCard'
```

---

## 4. Quy tắc Nguyên tắc Vàng khi Thêm File Mới

1. **Kiểm tra trước khi tạo:** Xác định xem thư mục chuyên trách đã có file tương tự hay chưa.
2. **Một trách nhiệm - Một vị trí:**
   - Cần format tiền/ngày? -> `src/utils/`
   - Cần gọi API backend? -> `src/apis/`
   - Cần validate input form? -> `src/schemas/`
   - Cần tạo UI dùng chung? -> `src/components/`
3. **Không tạo thư mục cấp 1 mới trong `src/`** nếu chưa có sự thống nhất của nhóm.
