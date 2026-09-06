# QUY CHUẨN MÃ NGUỒN (CODE CONVENTIONS)

**Dự án:** NexGear-SFE  
**Vị trí tài liệu:** `agent-docs/CODE_CONVENTIONS.md`  
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
- **Single Responsibility:** Mỗi component MUST chỉ giữ một trách nhiệm duy nhất. Component vượt quá 150-200 dòng code SHOULD được cân nhắc tách nhỏ.
- **Prop Interface/Type:** Mọi Component MUST khai báo type tường minh cho Props.
- **No Direct API calls in UI Components:** Components KHÔNG ĐƯỢC gọi trực tiếp Axios/Fetch hay định nghĩa API endpoints. Logic gọi API MUST đặt tập trung tại `src/apis/`.

### Khuyến nghị (SHOULD)
- **Reusable UI:** Đưa các UI component có khả năng tái sử dụng (Button, Input, Modal, ProductCard) vào `src/components/`.
- **Custom Hooks Isolation:** Khi component có logic state hoặc side-effect phức tạp, SHOULD tách logic đó ra Custom Hook đặt tại `src/hooks/`.

---

## 3. Quy tắc TypeScript

### Bắt buộc (MUST)
- **Strict Mode:** MUST tuân thủ strict mode (`strict: true` trong `tsconfig.json`).
- **Cấm `any`:** BẮT BUỘC KHÔNG sử dụng kiểu `any`. Trong trường hợp chưa xác định rõ kiểu dữ liệu, MUST dùng `unknown` kết hợp với Type Narrowing hoặc Type Guards.
- **Props Typing:** Ưu tiên sử dụng `type` cho Props và State cục bộ của Component; dùng `interface` khi định nghĩa Data Models (sản phẩm, đơn hàng, người dùng).

### Khuyến nghị (SHOULD)
- **Union Types:** Giữ union types gọn gàng, rõ nghĩa (ví dụ: `type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled'`).
- **Exporting Types:** Types/Interfaces dùng chung toàn app MUST được định nghĩa tập trung tại `src/types/`.

---

## 4. Quy ước Đặt tên (Naming Conventions)

### Bắt buộc (MUST)
- **React Components & Files:** MUST dùng **PascalCase** cho tên component và tên file (ví dụ: `ProductCard.tsx`, `CartDrawer.tsx`).
- **Biến, Hàm, Utils, API files:** MUST dùng **camelCase** (ví dụ: `formatCurrency.ts`, `product.api.ts`, `calculateTotal`).
- **Custom Hooks:** MUST bắt đầu bằng tiền tố `use` theo chuẩn **camelCase** (ví dụ: `useDebounce.ts`, `useCartStore.ts`).
- **Sự kiện Handler:** Props nhận callback handler SHOULD có tiền tố `on` (ví dụ: `onClick`, `onSelectCategory`); hàm xử lý sự kiện trong component SHOULD có tiền tố `handle` (ví dụ: `handleClick`, `handleSubmit`).

### Khuyên dùng đối với Tên nghiệp vụ (SHOULD)
- **Tránh tên chung chung:** KHÔNG dùng tên biến vô nghĩa như `data`, `item`, `temp`, `info`. MUST dùng tên gắn liền với nghiệp vụ e-commerce (ví dụ: `cartItem`, `productSpecs`, `shippingAddress`).

---

## 5. Quy tắc Styling (Tailwind CSS)

### Bắt buộc (MUST)
- **Utility Classes:** MUST sử dụng Tailwind CSS cho layout, spacing và styling thông thường.
- **Gọn gàng Class list:** Giữ danh sách Tailwind class gọn gàng, dễ đọc. Khi một tổ hợp class lặp lại quá nhiều lần, MUST đóng gói thành Reusable UI Component.

### Khuyến nghị (SHOULD)
- **Theme Tokens:** Sử dụng các token màu sắc, font chữ và spacing từ cấu hình Tailwind chung thay vì hardcode mảng màu hex/rgb ngẫu nhiên trong code.

---

## 6. Xử lý Lỗi & Trạng thái UI (Error Handling & Loading States)

### Bắt buộc (MUST)
- **Async Error Handling:** Mọi thao tác bất đồng bộ (gọi API) MUST có cơ chế bắt lỗi (`try...catch` hoặc interceptor error handler).
- **Trạng thái UI:** Khi hiển thị danh sách sản phẩm hay form thanh toán, MUST hỗ trợ xử lý 3 trạng thái căn bản:
  1. **Loading State:** Hiển thị skeleton hoặc spinner khi đang tải.
  2. **Empty State:** Hiển thị thông báo thân thiện khi không tìm thấy sản phẩm/dữ liệu rỗng.
  3. **Error State:** Hiển thị thông báo lỗi rõ ràng kèm nút thử lại (retry) nếu gọi API thất bại.

---

## 7. Quy trình Kiểm tra Code trước khi Hoàn thành (Working Checklist)

Trước khi coi công việc đã hoàn tất, lập trình viên/AI Agent MUST thực hiện:
1. Xác định đúng file/folder sở hữu logic theo [`agent-docs/FOLDER_STRUCTURE.md`](./FOLDER_STRUCTURE.md).
2. Kiểm tra type safety (không còn cảnh báo TypeScript).
3. Chạy lệnh kiểm tra Lint & Build:
   ```bash
   npm run lint
   npm run build
   ```
