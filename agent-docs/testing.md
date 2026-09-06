# HƯỚNG DẪN KIỂM THỬ (TESTING GUIDE)

**Dự án:** NexGear-SFE  
**Vị trí tài liệu:** `agent-docs/testing.md`  
**Vai trò:** Single Source of Truth duy nhất quy định chiến lược kiểm thử, cấu hình test, nguyên tắc viết unit/integration test và cách mock dependencies cho dự án NexGear-SFE.

---

## 1. Khung Kiểm thử & Công cụ (Testing Stack)

Dự án NexGear-SFE định hướng sử dụng **Vitest** kết hợp với **React Testing Library** cho việc kiểm thử Unit Test và Integration Test.

---

## 2. Nguyên tắc Cốt lõi (Core Testing Principles)

1. **Co-location (Vị trí đặt file test):**
   - File test MUST được đặt ngay trong cùng thư mục với file mã nguồn cần test.
   - Quy ước đặt tên: `<Name>.test.tsx` hoặc `<Name>.test.ts` (ví dụ: `ProductCard.tsx` đi kèm `ProductCard.test.tsx`, `formatCurrency.ts` đi kèm `formatCurrency.test.ts`).

2. **Test Hành vi, KHÔNG Test Chi tiết Cài đặt (Behavioral Testing):**
   - Kiểm tra xem Component hiển thị những gì người dùng nhìn thấy khi nhận dữ liệu, hoặc hàm utility trả về kết quả gì khi truyền tham số.
   - KHÔNG can thiệp vào internal state ẩn hoặc kiểm tra các biến nội bộ không exported.

3. **Tính Đơn lẻ & Độc lập:**
   - Mỗi test case chỉ nên verify một hành vi hoặc một kịch bản cụ thể. Mỗi test case phải tự độc lập, không phụ thuộc vào thứ tự chạy của các test trước đó.

4. **Mock Phụ thuộc Bên ngoài (External Mocking):**
   - MUST mock toàn bộ các hàm gọi API tại `src/apis/`, mock router navigation (`react-router`) và `localStorage` để các bộ test chạy nhanh, ổn định và không phụ thuộc mạng.

---

## 3. Các Trường hợp Bắt buộc Kiểm thử (Test Coverage Requirements)

Lập trình viên khi viết unit/integration test MUST bảo đảm kiểm thử các trường hợp sau:
- **Luồng thành công (Happy Path):** Dữ liệu hợp lệ, render thành công.
- **Trạng thái giao diện (UI States):**
  - **Loading State:** Kiểm tra hiển thị skeleton/spinner khi đang tải dữ liệu.
  - **Empty State:** Kiểm tra hiển thị thông báo rỗng khi danh sách sản phẩm hoặc giỏ hàng trống.
  - **Error State:** Kiểm tra hiển thị thông báo lỗi khi API thất bại hoặc bị ngắt mạng.
- **Trường hợp biên (Edge Cases):** Giá sản phẩm bằng 0, chuỗi nhập quá dài, mảng dữ liệu rỗng.
- **Custom Hooks nghiệp vụ:** Custom hook tính toán tiền giỏ hàng, áp mã giảm giá MUST có Unit Test đầy đủ.

---

## 4. Các Lệnh Chạy Test (Test Execution Commands)

Khi các gói kiểm thử được tích hợp trong dự án, các lệnh tiêu chuẩn bao gồm:
- **Chạy toàn bộ test suite:** `npm test`
- **Chạy test ở chế độ theo dõi (Watch Mode):** `npm test -- --watch`
- **Kiểm tra độ phủ mã nguồn (Coverage Report):** `npm test -- --coverage`

---

## 5. Quy trình Kiểm tra trước khi Push Code / Tạo PR

Trước khi tạo Pull Request, lập trình viên MUST chạy quy trình kiểm tra build, lint và test:
```bash
npm run build && npm run lint
```
(Và `npm test` khi bộ test suite khả thi).

---

## 6. Hiện trạng Repository (Implementation Reality)

### Current Implementation
- Nguyên tắc viết test, quy chuẩn đặt file (`.test.tsx`) và chiến lược mock API được định nghĩa sẵn sàng trong tài liệu hướng dẫn này.
- `package.json` hiện tại đang ở dạng khung cơ bản và sẵn sàng bổ sung các devDependencies kiểm thử (`vitest`, `@testing-library/react`) khi bước vào giai đoạn viết test tự động.
