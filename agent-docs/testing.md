# HƯỚNG DẪN KIỂM THỬ VÀ VALIDATION (TESTING & VALIDATION GUIDE)

**Dự án:** NexGear-SFE  
**Vị trí tài liệu:** `agent-docs/testing.md`  
**Vai trò:** Single Source of Truth duy nhất quy định quy trình validation mã nguồn, quy chuẩn kiểm thử thủ công và định hướng tích hợp khung kiểm thử tự động cho dự án NexGear-SFE.

---

## 1. Trạng thái Validation Baseline Hiện tại (Current Validation Suite)

Dự án NexGear-SFE hiện tại sử dụng quy trình **3-Tier Baseline Validation** làm tiêu chuẩn kiểm tra chất lượng mã nguồn bắt buộc cho lập trình viên và AI Coding Agents:

```text
[ Step 1: TypeScript Static Type Checking ]
          npx tsc --noEmit
                 │
                 ▼
[ Step 2: ESLint Code Quality & Style Check ]
          npm run lint
                 │
                 ▼
[ Step 3: Production Build Compilation Check ]
          npm run build
```

---

## 2. Quy trình Kiểm thử Thủ công (Manual Behavior Check)

Sau khi hoàn thành refactor hoặc phát triển tính năng mới, lập trình viên/AI Agent MUST kiểm tra các luồng hành vi giao diện người dùng chính:

| Khu vực Tính năng | Các kịch bản Kiểm tra Cần thiết (Behavior Check) |
|---|---|
| **Toast Notifications** | • Thêm sản phẩm vào giỏ hàng hiển thị Toast thành công dạng `useToast().success`.<br>• Gửi yêu cầu hủy đơn hàng hiển thị Toast thành công.<br>• Không còn bất kỳ local toast overlay bị duplicate. |
| **Order Detail Flow** | • Truy cập đơn hàng theo ID hợp lệ hiển thị đúng thông tin sản phẩm, phí giao hàng, địa chỉ.<br>• Truy cập đơn hàng không tồn tại hiển thị trạng thái "Không tìm thấy đơn hàng".<br>• Hiển thị trạng thái loading khi đang tải thông tin. |
| **Password Section** | • Đổi mật khẩu hiện tại với validation độ dài, chữ hoa, chữ thường, chữ số.<br>• Modal Quên mật khẩu: Nhập email, đếm ngược OTP 60s, kiểm tra OTP sai (`0000`), đặt lại mật khẩu mới thành công. |
| **Warranty Tab** | • Hiển thị bảng nhà cung cấp bảo hành chính hãng.<br>• Bộ lọc theo từ khóa và trạng thái (Tất cả, Đang hoạt động, Vô hiệu).<br>• Modal xem chi tiết, Modal thêm/sửa nhà sản xuất kèm kiểm tra URL HTTPS, Modal xác nhận vô hiệu hóa. |
| **Cart & Navigation** | • Thêm sản phẩm cập nhật ngay số lượng trên icon Giỏ hàng.<br>• Chuyển hướng các đường dẫn bằng hằng số `ROUTES`. |

---

## 3. Lệnh Kiểm tra Baseline (Execution Commands)

Trước khi coi công việc hoàn tất hay tạo Pull Request, BẮT BỘC chạy bộ lệnh:

```bash
# 1. Kiểm tra An toàn Kiểu dữ liệu TypeScript
npx tsc --noEmit

# 2. Kiểm tra Cú pháp & Quy chuẩn Code Linter
npm run lint

# 3. Kiểm tra Biên dịch Sản phẩm
npm run build
```

---

## 4. Định hướng Kiểm thử Tự động (Future Automated Testing Strategy)

Khi bước vào giai đoạn viết test tự động, dự án định hướng sử dụng **Vitest** kết hợp với **React Testing Library**:

1. **Co-location (Vị trí đặt file test):**
   - File test được đặt cùng thư mục với file mã nguồn cần test (ví dụ: `ProductCard.test.tsx` đi kèm `ProductCard.tsx`).
2. **Behavioral Testing:**
   - Test những gì người dùng nhìn thấy và tương tác, KHÔNG test chi tiết cài đặt nội bộ.
3. **Mocking External APIs:**
   - Mock các hàm trong `src/apis/` và `react-router` để các bộ test chạy nhanh và độc lập.
