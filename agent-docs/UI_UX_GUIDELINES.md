# QUY CHUẨN GIAO DIỆN & TRẢI NGHIỆM NGUỜI DÙNG (UI/UX GUIDELINES)

**Dự án:** NexGear-SFE  
**Vị trí tài liệu:** `agent-docs/UI_UX_GUIDELINES.md`  
**Vai trò:** Single Source of Truth duy nhất quy định tiêu chuẩn thiết kế UI, hệ thống thiết kế (Design Tokens), quy chuẩn trải nghiệm người dùng (UX) và mẫu thành phần e-commerce cho hệ thống cửa hàng thiết bị công nghệ PC Gaming NexGear.

---

## 1. Định hướng Thiết kế Thẩm mỹ (Brand & Design Philosophy)

NexGear-SFE lấy cảm hứng từ các nền tảng bán lẻ công nghệ hàng đầu (như GearVN):
- **Phong cách:** Hiện đại, đậm chất Tech & Gaming, độ tương phản cao, tối ưu khả năng quét nhanh thông số sản phẩm.
- **Trải nghiệm cốt lõi:** Nhanh chóng, mượt mà, minh bạch về giá cả/khuyến mãi và luồng mua hàng ngắn gọn.

---

## 2. Hệ thống Thiết kế & Visual Tokens (Tailwind CSS)

### 2.1. Màu sắc Chủ đạo (Color Palette)
- **Primary / Accent (Màu thương hiệu):** Đỏ Tech Gaming (`red-600` / `red-500`) dùng cho nút Mua ngay, nhãn Khuyến mãi, Giá bán nổi bật và các thành phần CTA chính.
- **Neutral / Background:**
  - Background trang: Trắng sáng / Xám nhẹ (`slate-50` / `gray-100`) để tăng độ tập trung cho sản phẩm.
  - Dark Mode Accent / Header bar: Đen Gaming (`slate-900` / `zinc-900`).
- **Status Colors:**
  - Success (Thành công): Xanh lá (`emerald-600`) cho trạng thái "Còn hàng", đặt hàng thành công.
  - Warning (Cảnh báo): Vàng cam (`amber-500`) cho thông báo "Sắp hết hàng", Voucher sắp hết hạn.
  - Danger / Error: Đỏ (`rose-600`) cho lỗi form, trạng thái "Hết hàng".

### 2.2. Typography
- **Font chữ:** Font Sans-serif hiện đại (như Inter, Roboto, hoặc System Sans-serif).
- **Phân cấp Tiêu đề:**
  - `h1`: Page Title (ví dụ: Tên sản phẩm trang chi tiết, Tiêu đề Giỏ hàng) - Bold, 24px - 32px.
  - `h2`: Section Header (ví dụ: Sản phẩm nổi bật, Thông số kỹ thuật) - SemiBold, 20px - 24px.
  - `h3`: Card Title (ví dụ: Tên sản phẩm trên card) - Medium, 14px - 16px, giới hạn tối đa 2 dòng (`line-clamp-2`).

---

## 3. Khung Bố cục Giao diện (Layout Structures)

1. **`MainLayout` (Bố cục chính):**
   - **Header:** Topbar thông tin hotline/hệ thống cửa hàng, Searchbar trung tâm với tìm kiếm gợi ý real-time, nút Giỏ hàng kèm badge đếm số lượng item.
   - **Main Content Container:** Căn giữa màn hình với `max-w-7xl px-4 mx-auto`.
   - **Footer:** Đầy đủ thông tin chính sách bảo hành, tổng đài hỗ trợ, phương thức thanh toán.
2. **`AuthLayout` (Bố cục Đăng nhập/Đăng ký):**
   - Thiết kế tối giản, tập trung vào Form ở trung tâm màn hình, hạn chế các yếu tố điều hướng làm xao nhãng.
3. **`CheckoutLayout` (Bố cục Thanh toán):**
   - Loại bỏ Banner quảng cáo và Menu phụ, tập trung hiển thị 2 cột: Cột nhập thông tin giao hàng & Cột tóm tắt đơn hàng.

---

## 4. Mẫu UI Components Thương mại Điện tử (E-Commerce UI Patterns)

### 4.1. Thẻ Sản phẩm (ProductCard)
- **Tỷ lệ ảnh:** Tỷ lệ vuông `aspect-square`, có background trắng nhẹ để tôn hình ảnh linh kiện.
- **Nhãn Khuyến mãi:** Badge phần trăm giảm giá (ví dụ: `-15%`) đặt góc trên ảnh.
- **Tên Sản phẩm:** Giới hạn 2 dòng, tự động thu gọn với `line-clamp-2`.
- **Hiển thị Giá:** Giá bán hiện tại (đỏ, đậm) nằm cạnh Giá gốc niêm yết (gạch ngang, mờ). Format tiền tệ VND chuẩn (ví dụ: `25.990.000 ₫`).
- **Thông số kỹ thuật tóm tắt:** Nhãn nhỏ hiển thị chip GPU/CPU/RAM đối với Laptop/PC.
- **Thao tác:** Nút "Thêm vào giỏ" nhanh hoặc xem chi tiết khi hover.

### 4.2. Bộ lọc Sản phẩm (Product Filters)
- Tích hợp bộ lọc đa tiêu chí (Thương hiệu, Khoảng giá slider, Nhu cầu sử dụng, Thông số RAM/VGA).
- Hỗ trợ xem dạng sidebar cố định trên Desktop và Slide-over Drawer trên Mobile.

---

## 5. Quy chuẩn Các Trạng thái Giao diện (UI States)

Mọi trang danh sách hoặc màn hình chi tiết MUST đáp ứng 3 trạng thái bắt buộc:

### 5.1. Trạng thái Đang tải (Loading State)
- Sử dụng **Skeleton Loaders** mô phỏng hình dáng của ProductCard hoặc bảng thông số thay vì màn hình trắng.

### 5.2. Trạng thái Dữ liệu Rỗng (Empty State)
- Hiển thị khi Giỏ hàng rỗng hoặc Tìm kiếm không có kết quả.
- MUST chứa: Icon minh họa thân thiện, Thông báo rõ ràng (ví dụ: "Không tìm thấy sản phẩm phù hợp") và Nút hành động CTA (ví dụ: "Tiếp tục mua sắm", "Xóa bộ lọc").

### 5.3. Trạng thái Lỗi (Error State)
- Hiển thị khi bị mất kết nối mạng hoặc lỗi server 500.
- MUST bao gồm thông báo lỗi ngắn gọn và nút "Thử lại" (Retry CTA).

---

## 6. Accessibility & Responsiveness Basics

- **Mobile First Responsive:** Tối ưu mượt mà từ màn hình Mobile (`sm: 640px`), Tablet (`md: 768px`), đến Desktop (`lg: 1024px`, `xl: 1280px`).
- **Interactive States:** Mọi nút bấm và liên kết MUST có hiệu ứng hover, active và focus rõ ràng.
