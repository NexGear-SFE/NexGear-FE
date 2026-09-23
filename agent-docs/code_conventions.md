# QUY CHUẨN MÃ NGUỒN (CODE CONVENTIONS)

**Dự án:** NexGear-SFE  
**Vị trí tài liệu:** `agent-docs/code_conventions.md`  
**Vai trò:** Single Source of Truth duy nhất cho các quy định viết mã nguồn React, TypeScript, Tailwind CSS, quy ước đặt tên và xử lý lỗi trong dự án NexGear-SFE.

---

## 1. Mức độ Quy tắc (Rule Levels)

- **MUST (BẮT BỘC):** Quy định bắt buộc phải tuân thủ. Vi phạm sẽ không được duyệt PR hoặc bị linter/compiler chặn build.
- **SHOULD (KHUYẾN NGHỊ):** Tiêu chuẩn khuyến khích áp dụng cao nhằm duy trì tính nhất quán.
- **MAY (TÙY CHỌN):** Lựa chọn bổ sung tùy thuộc vào ngữ cảnh cụ thể.

---

## 2. Quy tắc React & Component Design

### Bắt buộc (MUST)
- **Functional Components:** MUST sử dụng 100% Functional Components kết hợp với React Hooks.
- **Single Responsibility & Component Extraction:** Mỗi component MUST chỉ giữ một trách nhiệm duy nhất.
  > [!NOTE]
  > **Quy tắc Tách Component:** Tách component khi component có responsibility độc lập, reusable boundary hoặc UI/logic boundary rõ ràng (ví dụ: Modal phức tạp, Form nhiều bước). Không áp dụng các con số quy định dòng cứng nhắc.
- **Prop Interface/Type:** Mọi Component MUST khai báo type tường minh cho Props.
- **No Direct Mock/API Logic in Presentation Components:** Presentation UI Components KHÔNG ĐƯỢC tự đọc dữ liệu mock từ bên ngoài mà MUST nhận dữ liệu và callbacks qua `props`.

### Khuyến nghị (SHOULD)
- **Reusable UI Components:** Đưa các UI component có khả năng tái sử dụng (Button, Input, Modal, ProductCard) vào `src/components/ui/` hoặc `src/components/common/`.
- **Custom Hooks Isolation:** Khi component có logic state hoặc side-effect phức tạp, SHOULD tách logic đó ra Custom Hook tại `src/hooks/`.

---

## 3. Quy tắc TypeScript

### Bắt buộc (MUST)
- **Strict Mode:** MUST tuân thủ strict mode (`strict: true` trong `tsconfig.json`).
- **Cấm `any`:** BẮT BUỘC KHÔNG sử dụng kiểu `any`. Trong trường hợp chưa xác định rõ kiểu dữ liệu, MUST dùng `unknown` kết hợp với Type Narrowing hoặc Type Guards.
- **Props & Models Typing:** Ưu tiên sử dụng `type` cho Props và State cục bộ của Component; dùng `interface` khi định nghĩa Data Models (sản phẩm, đơn hàng, người dùng, API responses).

### Khuyến nghị (SHOULD)
- **Union Types:** Giữ union types gọn gàng, rõ nghĩa (ví dụ: `type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled'`).
- **Exporting Types:** Types/Interfaces dùng chung toàn app MUST được định nghĩa tập trung tại `src/types/` phân chia theo domain (`customer/`, `admin/`, `common/`).

---

## 4. Quy ước Đặt tên (Naming Conventions)

### Bắt buộc (MUST)
- **React Components & Files:** MUST dùng **PascalCase** cho tên component và tên file (ví dụ: `ProductCard.tsx`, `OrderDetailPage.tsx`, `ForgotPasswordModal.tsx`).
- **Thư mục (Directories):** Tất cả các tên thư mục nằm trong `src/` MUST dùng chữ viết thường (**lowercase** hoặc **kebab-case** nếu có từ ghép như `home-content`, `footer-config`, `quick-access`, `password`). KHÔNG dùng PascalCase cho tên thư mục.
- **Biến, Hàm, Utils, API files:** MUST dùng **camelCase** (ví dụ: `formatCurrency.ts`, `order.api.ts`, `calculateTotal`).
- **Custom Hooks:** MUST bắt đầu bằng tiền tố `use` theo chuẩn **camelCase** (ví dụ: `useToast.ts`, `useAuth.ts`, `useProductDetail.ts`).
- **Sự kiện Handler:** Props nhận callback handler SHOULD có tiền tố `on` (ví dụ: `onClick`, `onClose`, `onSelectCategory`); hàm xử lý sự kiện trong component SHOULD có tiền tố `handle` (ví dụ: `handleClick`, `handleSubmit`, `handleReorder`).

### Khuyên dùng đối với Tên nghiệp vụ (SHOULD)
- **Tránh tên chung chung:** KHÔNG dùng tên biến vô nghĩa như `data`, `item`, `temp`, `info`. MUST dùng tên gắn liền với nghiệp vụ e-commerce (ví dụ: `cartItem`, `productSpecs`, `shippingInfo`, `orderCode`).

---

## 5. Quy tắc Định tuyến & Route Constants (Routing Conventions)

### Bắt buộc (MUST)
- **Khai báo Tập trung:** Tất cả các URL paths toàn ứng dụng MUST được định nghĩa tập trung trong `src/constants/routes.ts` dưới dạng đối tượng `ROUTES`.
- **Cấm Magic Strings trong Router:** Bảng định tuyến `src/routes.tsx` và các nút điều hướng KHÔNG ĐƯỢC viết chuỗi cứng trực tiếp mà MUST sử dụng hằng số từ `ROUTES` (ví dụ: `navigate(ROUTES.PRODUCT_DETAIL(slug))`).

---

## 6. Quy tắc Thông báo (Global Toast System)

### Bắt buộc (MUST)
- **Sử dụng `useToast()`:** Mọi thông báo nổi (Toast notification) phục vụ phản hồi người dùng (Thêm vào giỏ thành công, Đổi mật khẩu thành công, Gửi yêu cầu hủy đơn thành công) MUST sử dụng hook global `useToast()` từ `@/hooks/useToast`.
- **Cấm Duplicate Local Toast State:** Tuyệt đối KHÔNG tự tạo state local `toastMessage` hoặc tự render JSX toast floating riêng rẽ trong component/page.

---

## 7. Quy tắc Styling (Tailwind CSS)

### Bắt buộc (MUST)
- **Utility Classes:** MUST sử dụng Tailwind CSS cho layout, spacing và styling thông thường.
- **Theme Tokens:** Sử dụng các token màu sắc thương hiệu (`#E30019`), font chữ (`font-heading`, `font-body`) và spacing chuẩn từ cấu hình Tailwind thay vì hardcode mảng màu hex/rgb ngẫu nhiên trong code.

---

## 8. Quy trình Kiểm tra Code trước khi Hoàn thành (Working Checklist)

Trước khi coi công việc đã hoàn tất, lập trình viên/AI Agent MUST thực hiện bộ lệnh kiểm tra baseline:
```bash
npx tsc --noEmit
npm run lint
npm run build
```
Bảo đảm không còn bất kỳ lỗi TypeScript, linter warning hay build failure nào.
