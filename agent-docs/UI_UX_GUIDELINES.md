# QUY CHUẨN GIAO DIỆN & TRẢI NGHIỆM NGUỜI DÙNG (UI/UX GUIDELINES)

**Dự án:** NexGear-SFE  
**Vị trí tài liệu:** `agent-docs/UI_UX_GUIDELINES.md`  
**Vai trò:** Single Source of Truth duy nhất quy định tiêu chuẩn thiết kế UI/UX, hệ thống thiết kế (Design Tokens), quy chuẩn trải nghiệm người dùng (UX Principles) và mẫu thành phần e-commerce cho hệ thống NexGear-SFE.

---

## 1. TỔNG QUAN & TRIẾT LÝ THIẾT KẾ (DESIGN PHILOSOPHY)

Dự án **NexGear-SFE** được thiết kế theo định hướng **High-contrast, Sharp & Tech-forward**:
- **Tối thiểu hóa tải nhận thức (Minimize Cognitive Load):** Thiết kế hướng tới việc "tự nhiên/vô hình" (invisible design) - giúp người dùng tìm kiếm sản phẩm, so sánh thông số kỹ thuật và hoàn tất mua hàng mà không gặp bất kỳ rào cản nhận thức nào.
- **Phong cách sắc nét & cơ khí (Sharp & Tech-forward):** Thay thế các đường cong mềm mại hay phong cách claymorphism bóng bẩy bằng hình học cơ khí sắc nét, viền rõ ràng (`1px solid #E0E0E0`), góc bo tối đa 12px và độ tương phản cao nhằm tôn vinh hình ảnh sản phẩm linh kiện/gear gaming.
- **Phân biệt UX và UI:**
  - **UX (User Experience):** Luồng hành vi, kiến trúc thông tin, tối ưu hóa journey mua hàng và giảm thiểu rủi ro thao tác sai.
  - **UI (User Interface):** Hệ thống điểm chạm thị giác (Design Tokens, màu sắc thương hiệu `#E30019`, typography, spacing 8-point grid, viền và tương tác phản hồi cơ khí).

---

## 2. NGUYÊN TẮC NỀN TẢNG VỀ TRẢI NGHIỆM NGUỜI DÙNG (CORE UX PRINCIPLES)

### 2.1. Hướng tới Người dùng & Quy tắc 80/20 (User-Centricity & Pareto Principle)
- **Luật:** Mọi quyết định giao diện phải dựa trên hành vi thực tế của khách hàng e-commerce công nghệ.
- **Áp dụng:** Tập trung ưu tiên 80% lưu lượng truy cập cho các luồng chính: Duyệt danh mục sản phẩm, Tìm kiếm kèm bộ lọc thông số kỹ thuật (DPI, Switch, Chipset, VRAM), Thêm giỏ hàng nhanh và Thanh toán.

### 2.2. Tính Nhất quán & Mô hình Tâm lý (Consistency & Jakob's Law)
- **Luật:** Khách hàng dành hầu hết thời gian trên các trang web khác (GearVN, Amazon...), họ mong muốn NexGear-SFE hoạt động theo các nguyên tắc quen thuộc.
- **Áp dụng:** 
  - **Nhất quán bên ngoài:** Đặt Giỏ hàng ở góc trên bên phải Header, Searchbar chính giữa màn hình, Nút "Mua ngay" luôn nổi bật màu thương hiệu `#E30019`.
  - **Nhất quán nội bộ:** Mọi nút bấm, thẻ sản phẩm, nhãn giá và ô nhập liệu phải tuân thủ 100% Design Tokens tại tài liệu này.

### 2.3. Thiết kế theo Ngữ cảnh & Responsive (Contextual Design)
- **Luật:** Khách hàng truy cập từ nhiều thiết bị (Mobile, Tablet, Desktop) với tốc độ và kích thước màn hình khác nhau.
- **Áp dụng:** Giao diện Responsive thích ứng mượt mà. Hệ thống lưới Lưới 12 cột (Desktop), 8 cột (Tablet), 4 cột (Mobile). 

### 2.4. Quyền Tự chủ của Người dùng (User Control & Freedom)
- **Luật:** Người dùng cần cảm thấy luôn kiểm soát được hệ thống và dễ dàng khôi phục khi thao tác nhầm.
- **Áp dụng:** Cung cấp nút thoát hiểm rõ ràng (**Undo, Redo, Hủy thao tác**, Xóa sản phẩm khỏi giỏ hàng kèm nút "Hoàn tác"). KHÔNG tự động phát âm thanh hoặc đè giao diện khi chưa được người dùng cho phép.

### 2.5. Phòng ngừa Lỗi & Phục hồi Thân thiện (Error Prevention & Graceful Recovery)
- **Luật:** Thiết kế tốt nhất là thiết kế ngăn ngừa lỗi trước khi nó xảy ra. Khi có lỗi, hệ thống phải hướng dẫn khắc phục ngay tại chỗ.
- **Áp dụng:**
  - **Ngăn ngừa lỗi:** Giới hạn input (dùng dropdown/date-picker thay vì nhập tay; disable nút thanh toán nếu chưa chọn phương thức vận chuyển).
  - **Phục hồi lỗi:** Sử dụng **Inline Validation** (báo lỗi ngay tại ô input bị sai) kèm câu văn rõ ràng, lưu trữ dữ liệu đã nhập để người dùng không phải nhập lại từ đầu.

### 2.6. Hiển thị Luống cuốn / Tiệm tiến (Progressive Disclosure)
- **Luật:** Tránh làm người dùng quá tải bằng cách hiển thị toàn bộ thông tin cùng một lúc.
- **Áp dụng:** Chia nhỏ luồng thanh toán phức tạp thành các bước rõ ràng (**Multi-step Wizard** với thanh tiến trình). Sử dụng các khối thu gọn (Accordion) cho thông số kỹ thuật chi tiết của sản phẩm.

### 2.7. Khả năng Truy cập (Accessibility - A11y)
- **Luật:** Giao diện phải tiếp cận được cho mọi người dùng theo chuẩn WCAG AA.
- **Áp dụng:**
  - **Tương phản màu sắc:** Tỷ lệ tương phản tối thiểu **4.5:1** cho văn bản thường và **3:1** cho văn bản lớn/biểu tượng.
  - **Điều hướng Bàn phím:** Hỗ trợ đầy đủ điều hướng bằng phím Tab và hiển thị Focus Ring rõ ràng (`--shadow-focus`).
  - **Touch Targets:** Kích thước vùng bấm trên mobile tối thiểu **44x44px** với khoảng cách an toàn tránh bấm nhầm.

---

## 3. HỆ THỐNG THIẾT KẾ VIÊN & DESIGN TOKENS (UI SYSTEM)

### 3.1. Hệ thống Màu sắc (Color System)

#### Core Palette (Gaming Gear Brand Palette)

| Role | Token | Hex | Guidance / Usage |
| :--- | :--- | :--- | :--- |
| **Brand Primary** | `--brand-500` | `#E30019` | Nút hành động chính (Primary CTA), trạng thái Active, Giá bán nổi bật. |
| **Brand Hover** | `--brand-600` | `#B30014` | Trạng thái Hover/Pressed của nút hành động chính. |
| **Button Secondary** | `--btn-secondary` | `#040004` | Nút hành động phụ, các chi tiết viền tối. |
| **Text Primary** | `--text-900` | `#040004` | Tiêu đề, văn bản chính, nội dung quan trọng. |
| **Text Secondary** | `--text-600` | `#636363` | Mô tả phụ, nhãn phụ, thông số mờ. |
| **Border / Divider**| `--surface-400` | `#E0E0E0` | Viền ô input, đường phân cách thẻ sản phẩm. |
| **Main Background** | `--surface-200` | `#F4F5F7` | Nền chung toàn bộ ứng dụng và bố cục chính. |
| **Card / Surface** | `--surface-50` | `#FFFFFF` | Nền thẻ sản phẩm, container, panel nổi. |

#### Semantic Colors

| Role | Token | Hex | Guidance |
| :--- | :--- | :--- | :--- |
| **Success** | `--success-500` | `#00A859` | Trạng thái "Còn hàng", hoàn tất đơn hàng. |
| **Warning** | `--warning-500` | `#FB8C00` | Cảnh báo "Sắp hết hàng", thông báo chú ý. |
| **Info** | `--info-500` | `#1E88E5` | Thông tin cập nhật, thông báo hướng dẫn. |
| **Error Background**| `--error-50` | `#FEECEE` | Nền thông báo lỗi, nền ô input sai. |
| **Error Text/Border**| `--error-700` | `#B70014` | Chữ báo lỗi, viền ô input sai. |

---

### 3.2. Hệ thống Kiểu chữ (Typography Architecture)

Dự án kết hợp 2 font chữGoogle Fonts tối ưu cho tiếng Việt và trải nghiệm e-commerce công nghệ:

```css
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');
```

- **Heading Family:** `Be Vietnam Pro` (600 SemiBold, 700 Bold) - Tạo cấu trúc tiêu đề mạnh mẽ, sắc nét, hỗ trợ hiển thị ký tự tiếng Việt hoàn hảo.
- **Body/UI Family:** `Plus Jakarta Sans` (400 Regular, 500 Medium, 600 SemiBold) - Hình học rõ ràng, cực kỳ dễ đọc khi quét bảng thông số kỹ thuật và các thành phần UI mật độ cao.

#### Typography Scale

| Token | Font Family | Size / Line Height | Weight | Usage |
|---|---|---|---|---|
| `--text-display` | Be Vietnam Pro | 48px / 56px | Bold (700) | Hero Headline Banner |
| `--text-h1` | Be Vietnam Pro | 40px / 48px | Bold (700) | Tiêu đề trang chính (Page Title) |
| `--text-h2` | Be Vietnam Pro | 32px / 40px | SemiBold (600) | Tiêu đề Section |
| `--text-h3` | Be Vietnam Pro | 24px / 32px | SemiBold (600) | Tiêu đề Thẻ sản phẩm, Modal title |
| `--text-body-lg` | Plus Jakarta Sans | 18px / 28px | Regular (400) | Đoạn giới thiệu, mô tả ngắn |
| `--text-body` | Plus Jakarta Sans | 16px / 24px | Regular (400) | Văn bản nội dung chuẩn, mô tả sản phẩm |
| `--text-body-sm` | Plus Jakarta Sans | 14px / 20px | Regular (400) | Metadata, thông số kỹ thuật, label |
| `--text-caption` | Plus Jakarta Sans | 12px / 16px | Medium (500) | Nhãn thông số, nhãn trạng thái |

*Mẹo nâng cao cho Tiêu đề (Pro Heading Tip):* Thu hẹp `letter-spacing` từ **-2% đến -3%** và giảm `line-height` xuống **110% - 120%** đối với các heading lớn để tạo sự gắn kết sắc nét.

---

### 3.3. Hệ thống Khoảng cách & Lưới (Whitespace & 8-Point Grid)

- **8-Point Grid Standard:** Mọi kích thước padding, margin, gap và height MUST là bội số của 8 (hoặc 4 đối với chi tiết nhỏ): `4px, 8px, 16px, 24px, 32px, 48px, 64px`.
- **Luật Tiệm cận (Law of Proximity):** Đặt các yếu tố liên quan gần nhau (ví dụ: Giá bán ngay dưới Tên sản phẩm, gap = 8px) và tách biệt các khối không liên quan bằng khoảng trắng lớn hơn (gap = 32px+).

---

### 3.4. Hệ thống Đổ bóng (Shadow System for Light Neutral Surfaces)

Bổ trợ độ nổi khối cho nền sáng neutral mà không làm mất đi vẻ sắc nét:

| Token | Value | Usage |
|---|---|---|
| `--shadow-clay-sm` | `0px 2px 4px rgba(4, 0, 4, 0.05)` | Inputs, subtle chips |
| `--shadow-clay-md` | `0px 4px 12px rgba(4, 0, 4, 0.08)` | Product cards, standard buttons |
| `--shadow-clay-lg` | `0px 8px 24px rgba(4, 0, 4, 0.12)` | Modals, floating dropdowns |
| `--shadow-focus` | `0 0 0 3px rgba(227, 0, 25, 0.25)` | Keyboard focus ring |

---

### 3.5. Hệ thống Bo góc (Border Radius System - Sharp Mechanical)

Nhằm duy trì ngôn ngữ thiết kế cơ khí sắc nét (sharp/mechanical geometry), KHÔNG sử dụng bo góc tròn quá mức (> 12px):

| Token | Value | Usage |
|---|---|---|
| `--radius-xs` | `2px` | Checkboxes, tags, badge nhỏ |
| `--radius-sm` | `4px` | Inputs, buttons, ô nhập liệu |
| `--radius-md` | `8px` | Cards, dropdown menus |
| `--radius-lg` | `12px` | Modals, drawer containers |

---

### 3.6. Hiệu ứng Tương tác & Phản hồi Cơ khí (Effects & Mechanical Motion)

- **Surface Border:** Sử dụng mặt phẳng high-contrast kèm viền sắc nét: `border: 1px solid var(--surface-400)` (`#E0E0E0`).
- **Hover State:** Sử dụng chuyển màu nhanh hoặc viền sáng nổi bật (`--shadow-focus`). **KHÔNG sử dụng hiệu ứng nâng thẻ lên (`translateY`)** để giữ vẻ vững chắc, sắc nét.
- **Press State:** Phản hồi xúc giác cơ khí bằng hiệu ứng thu nhỏ nhanh (`transform: scale(0.98)`) hoặc đổi màu nền tức thì (`--brand-600`).
- **Transition Default (Fast & Mechanical):**
  - **Chuyển đổi cơ khí (Fast):** `100ms ease-out` (Mô phỏng cảm giác bấm switch bàn phím cơ).
  - **Chuyển đổi tiêu chuẩn:** `200ms cubic-bezier(0.4, 0, 0.2, 1)` (Cho layout shift hoặc accordion).
- **Hỗ trợ Reduced Motion:** Tự động tắt hiệu ứng transform và giảm thời gian transition <= 1ms khi người dùng bật `prefers-reduced-motion`.

---

## 4. QUY CHUẨN MẪU THÀNH PHẦN (COMPONENT-LEVEL RULES)

### 4.1. Nút Bấm (Buttons)
Mọi nút bấm MUST thiết kế đủ 4 trạng thái (*Default, Hover, Active, Disabled*) kèm trạng thái *Loading*:
- **Primary Button:** Nền Đỏ thương hiệu `#E30019`, chữ Trắng, `--radius-sm` (4px). On hover: `#B30014`. On press: `scale(0.98)`.
- **Secondary Button:** Nền Đen Đậm `#040004`, chữ Trắng, `--radius-sm` (4px).
- **Outlined Button:** Nền trong suốt, viền `#E0E0E0`, chữ `#040004`. On hover: viền `#E30019`.

### 4.2. Thẻ Sản phẩm (Product Cards)
- Nền Trắng `#FFFFFF` với `--shadow-clay-md`.
- Viền: `1px solid #E0E0E0` giúp hiển thị lưới sản phẩm sắc nét.
- Bo góc: `--radius-md` (8px).
- **Hình ảnh:** Ảnh sản phẩm linh kiện/gear độ phân giải cao trên nền trắng sạch sẽ.
- **Surface Specs:** Hiển thị trực tiếp các thông số kỹ thuật cốt lõi (ví dụ: Sensor DPI, Switch Type, VRAM, Chipset) ngay trên thẻ mà không bắt người dùng phải bấm vào trang chi tiết.

### 4.3. Ô Nhập liệu (Inputs & Forms)
- **Default:** Nền Trắng `#FFFFFF`, viền `#E0E0E0`, bo góc `--radius-sm` (4px).
- **Focus:** Viền `#E30019` + `--shadow-focus`.
- **Error:** Viền `#B70014` + nền Tint Hồng `#FEECEE`. Văn bản hỗ trợ màu `#B70014`.

### 4.4. Cảnh báo & Thông báo (Alerts & Toast Notifications)
- Nền của Alert là các tông màu nhạt (tints) nhẹ nhàng của màu Semantic tương ứng.
- Icon và Tiêu đề mang màu Semantic; nội dung văn bản giữ màu tối Neutral (`#040004`).

### 4.5. Khung Bố cục Trang (Layout Structures)
- **`MainLayout`:** Header sắc nét với thanh tìm kiếm nổi bật, hotline, nút giỏ hàng dạng Quick Drawer; Footer đầy đủ chính sách bảo hành.
- **`AuthLayout`:** Khung tối giản căn giữa cho Đăng nhập / Đăng ký.
- **`CheckoutLayout`:** Bố cục 2 cột tập trung hoàn tất đơn hàng, không banner quảng cáo.

---

## 5. ANTI-PATTERNS (CÁC ĐIỀU NÊN TRÁNH)

- ❌ **KHÔNG** lạm dụng dải màu RGB chuyển sắc (RGB gradients) tràn lan làm xao nhãng hình ảnh sản phẩm.
- ❌ **KHÔNG** sử dụng hiệu ứng chuyển động nảy (bounce) hoặc animation quá chậm (> 300ms) gây cảm giác trì trệ.
- ❌ **KHÔNG** giấu các nút hành động chính ("Thêm vào giỏ", "Mua ngay") hoặc thông số kỹ thuật quan trọng sâu trong nhiều lớp trang.
- ❌ **KHÔNG** sử dụng bo góc tròn vượt quá 12px cho các container chính để bảo tồn phong cách "Sharp & Mechanical".

---

## 6. KHUNG VẬN HÀNH CHO AI & DEVELOPERS (OPERATIONAL FRAMEWORK)

1. **Chuẩn hóa qua Design Tokens:** AI Coding Agents và Developers khi sinh mã nguồn React/Tailwind MUST sử dụng đúng các biến CSS / Tailwind classes được quy định tại tài liệu này.
2. **Kiểm tra Tương phản & Accessibility:** Luôn kiểm tra giao diện qua Blur Test (đảm bảo Primary CTA nổi bật trong 1 giây) và kiểm tra tương phản màu chữ với nền sáng.
