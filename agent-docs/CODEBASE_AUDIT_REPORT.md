# BÁO CÁO AUDIT CODEBASE NEXGEAR-SFE

> **Người thực hiện:** Senior Frontend Engineer / Software Architect  
> **Dự án:** NexGear-SFE (Frontend)  
> **Ngày thực hiện:** 20/09/2026  
> **Trạng thái:** Hoàn tất đánh giá (Không thay đổi mã nguồn)

---

## I. TỔNG QUAN VÀ ĐÁNH GIÁ ĐỐI CHIẾU VỚI DOCUMENTATION (SOURCE OF TRUTH)

Báo cáo này đối chiếu thực tế mã nguồn tại `src/` với các tài liệu quy chuẩn trong `agent-docs/` (`AGENTS.md`, `code_conventions.md`, `FOLDER_STRUCTURE.md`, `ARCHITECTURE.md`, `API_CONVENTIONS.md`).

### 1. Điểm tốt đã đạt được
- **Cấu trúc thư mục:** Đã chuẩn hóa 100% tên thư mục trong `src/` thành **lowercase / kebab-case** (ví dụ: `home-content`, `footer-config`, `quick-access`), tuân thủ nghiêm ngặt quy định tại `code_conventions.md`.
- **Hệ thống Route tập trung:** Đã tập trung toàn bộ URL paths vào hằng số `ROUTES` (`src/constants/routes.ts`) và định tuyến không dùng magic strings trong `src/routes.tsx`.
- **Chất lượng Type Safety & Build:** Kiểm tra `npx tsc --noEmit` đạt 0 lỗi TypeScript strict mode; `npm run lint` đạt 0 cảnh báo ESLint.
- **Tính năng UnderDevelopmentPage:** Đã đấu nối thành công tất cả các route/tab chưa hoàn thiện (Store Manager, Tech Staff, Customer Cart) về trang thông báo đồng bộ.

### 2. Các điểm mâu thuẫn giữa Mã nguồn và Documentation
- **Tồn tại thư mục ngoài quy định (`src/contexts/`):**  
  Tài liệu `FOLDER_STRUCTURE.md` chỉ quy định `src/providers/` chịu trách nhiệm quản lý React Context. Hiện tại dự án tồn tại cả `src/contexts/` (`AuthContext.ts`, `ToastContext.ts`) lẫn `src/providers/` (`AuthProvider.tsx`, `ToastProvider.tsx`). Việc chia tách file declaration và component provider vào 2 thư mục gốc riêng làm phân tán kiến trúc Context.
- **Thư mục `src/mocks/` chưa được quy chuẩn hóa trong Documentation:**  
  Trong `FOLDER_STRUCTURE.md` chưa định nghĩa chính thức vị trí và quy ước tên file cho Mock Data. Thực tế `src/mocks/` đang tồn tại 2 phong cách đặt tên song song: `mockHomeProductsConfig.ts` (tiền tố `mock`) và `order.mock.ts` (hậu tố `.mock.ts`).

---

## II. AUDIT CẤU TRÚC THƯ MỤC (FOLDER STRUCTURE)

### 1. Dead Code Files (Mã nguồn rác / Không được sử dụng)
- 🔴 **`src/pages/customer/HomePage.tsx` (4.8KB):**  
  File này hoàn toàn không được import ở bất kỳ đâu trong dự án. Trang chủ active thực sự là `src/pages/customer/home/HomePage.tsx` (13.9KB). Tồn tại file này gây nhầm lẫn nghiêm trọng cho lập trình viên.
- 🔴 **`src/components/common/ProductCard.tsx` (1.4KB):**  
  Component card sản phẩm phiên bản cũ, thiếu các tính năng specs/stock/routing. File này chỉ được import trong file dead code `pages/customer/HomePage.tsx`. Component chuẩn duy nhất đang dùng là `src/components/customer/product/ProductCard.tsx` (4.7KB).

### 2. Sự không nhất quán trong `src/pages/`
- Một số màn hình đặt trực tiếp ở root của nhóm (ví dụ: `src/pages/customer/AccountSettingsPage.tsx`), trong khi các màn hình khác đặt trong folder con (ví dụ: `src/pages/customer/home/HomePage.tsx`, `src/pages/customer/product/ProductDetailPage.tsx`).
- **Đề xuất:** Thống nhất cấu trúc thư mục page theo dạng `src/pages/[domain]/[feature]/[FeaturePage].tsx`.

### 3. Thư mục `src/components/common/` bị quá tải trách nhiệm
- `src/components/common/` hiện chứa các component nghiệp vụ rất lớn như `PasswordSection.tsx` (23.1KB) và `ProfileSection.tsx` (7.3KB).
- **Đề xuất:** Di chuyển các component nghiệp vụ tài khoản cá nhân về đúng domain `src/components/customer/account/` hoặc `src/components/common/account/`.

---

## III. AUDIT COMPONENT & SINGLE RESPONSIBILITY PRINCIPLE (SRP)

### 1. Các Component / Page quá lớn (God Components)

| Component / File | Kích thước | Các trách nhiệm đang bị ôm đơm | Đề xuất Tách Component / Hook |
|---|---|---|---|
| **`src/components/common/PasswordSection.tsx`** | 534 dòng (23.1KB) | 1. Đổi mật khẩu & validate độ mạnh<br>2. Modal Quên mật khẩu 4 bước (Email -> OTP -> Reset -> Done)<br>3. Timer đếm ngược OTP 60s<br>4. Định nghĩa inline component `PwInput` | Tách `ForgotPasswordModal.tsx`<br>Tách `PasswordStrengthIndicator.tsx`<br>Tách `PwInput.tsx`<br>Tách hook `useForgotPassword.ts` |
| **`src/pages/admin/BlogEditorPage.tsx`** | 450 dòng (18.2KB) | 1. Toolbar rich text editing (Bold, Italic, Code, Table, Video...)<br>2. Upload ảnh bìa & preview<br>3. Tạo danh mục mới inline & tag management<br>4. Modal preview bài viết hoàn chỉnh | Tách `BlogToolbar.tsx`<br>Tách `BlogCategorySelector.tsx`<br>Tách `BlogCoverUploader.tsx`<br>Tách `BlogPreviewModal.tsx` |
| **`src/pages/auth/LoginPage.tsx`** | 350 dòng (15.6KB) | 1. Inline SVG vector graphic trang trí dài 30 dòng<br>2. Form state & inline validation<br>3. Quick Google login mock handler<br>4. Dialog hỗ trợ | Tách `AuthBannerDecoration.tsx`<br>Tách `LoginForm.tsx` |
| **`src/pages/auth/RegisterPage.tsx`** | 410 dòng (17.6KB) | 1. Inline SVG vector background<br>2. Form state đăng ký với nhiều trường<br>3. Checkbox điều khoản & popup điều khoản | Tách `RegisterForm.tsx`<br>Tách `TermsModal.tsx` |

### 2. Code bị lặp lại (Duplication)
- **Status Badges:** Khai báo kiểu badge trạng thái (Còn hàng/Hết hàng, Đã giao/Đã hủy, Chờ xử lý) bị viết lặp đi lặp lại với chuỗi Tailwind class cứng ở nhiều trang (`ProductCard`, `OrderDetailPage`, `MyOrdersTab`, `SerialCheck`).  
  **Đề xuất:** Đóng gói thành UI components tái sử dụng `StatusBadge.tsx` tại `src/components/ui/`.

---

## IV. AUDIT TYPESCRIPT & DATA MODELS

### 1. Khai báo Type/Interface rải rác trong Component
- Hiện tại một số file component tự định nghĩa `type` cục bộ thay vì đặt tại `src/types/`:
  - `PasswordSection.tsx`: `type ForgotStep = "email" | "otp" | "reset" | "done"`
  - `AdminLayout.tsx`: `type ViewMode = 'list' | 'create' | 'edit'`
  - `TechStaffLayout.tsx`: `type NavItem = ...`
- **Đề xuất:** Di chuyển toàn bộ các type này về `src/types/admin/` hoặc `src/types/common/` theo đúng `FOLDER_STRUCTURE.md`.

### 2. Loose Types & Safe Narrowing
- Cần rà soát các vị trí gép kiểu trực tiếp như `as CustomerTabKey` hoặc `as string` khi đọc từ URL params để đảm bảo 100% Type Safety qua Type Guard functions.

---

## V. AUDIT STATE MANAGEMENT & CUSTOM HOOKS

### 1. Quản lý Client State Giỏ hàng (`cartStore.ts`)
- `cartStore.ts` hiện dùng mô hình Pub-Sub thủ công (`listeners` array) để phát sự kiện re-render cho React components.
- **Đánh giá:** Hoạt động ổn định nhưng thiếu tính năng middleware persistence (sync LocalStorage tự động) và React 19 concurrent features.
- **Đề xuất:** Chuyển sang **Zustand** theo đúng định hướng kiến trúc nêu tại `ARCHITECTURE.md` (Mục 3.2).

### 2. Custom Hooks quản lý quá nhiều State
- `useBlogEditor.ts` hiện chứa hơn 14 state variables độc lập (`title`, `tags`, `excerpt`, `content`, `coverImage`, `newCategoryName`...).  
  **Đề xuất:** Nhóm state bằng `useReducer` hoặc tách thành các sub-hooks nhỏ hơn (`useBlogForm`, `useBlogCategories`).

---

## VI. AUDIT API & DATA ACCESS TIER

### 1. Hạ tầng HTTP Client Client (`src/lib/axios.ts`)
- Các file trong `src/apis/` (`order.api.ts`, `product.api.ts`, `user.api.ts`, `warranty.api.ts`) hiện tại chủ yếu trả về dữ liệu Mock tĩnh.
- **Đề xuất:** Xây dựng `src/lib/axios.ts` chuẩn với `baseURL` đọc từ `.env` (`VITE_API_BASE_URL`), đính kèm `Authorization: Bearer <token>` và Response Interceptor xử lý lỗi 401/403/500 tập trung.

---

## VII. AUDIT QUY ƯỚC ĐẶT TÊN, COMMENTS & DEAD CODE

### 1. Chuẩn hóa Comment Tiếng Việt
- Dự án có quy định chuyển toàn bộ comment sang Tiếng Việt. Hiện tại đa số file đã tuân thủ, tuy nhiên vẫn còn một số comment Tiếng Anh rải rác trong `TechStaffLayout.tsx`, `PasswordSection.tsx`, `CartDrawer.tsx`.

### 2. Quy ước Tên file Mock Data
- Cần chuẩn hóa toàn bộ file mock data trong `src/mocks/` theo định dạng `[domain].mock.ts` và đặt trong các thư mục tương ứng (`src/mocks/admin/`, `src/mocks/customer/`, `src/mocks/techstaff/`).

---

## VIII. KẾ HOẠCH HÀNH ĐỘNG REFACTOR ĐỀ XUẤT (ACTIONABLE REFACTOR PLAN)

| Pha | Nhiệm vụ | Mục tiêu | Mức độ Ưu tiên | Rủi ro |
|---|---|---|---|---|
| **Pha 1** | **Dọn dẹp Dead Code & Tích hợp Context** | Xóa `src/pages/customer/HomePage.tsx` và `src/components/common/ProductCard.tsx`; gộp `src/contexts/` vào `src/providers/` | High 🔴 | Rất thấp (Safe) |
| **Pha 2** | **Chuẩn hóa Mock Data & Types** | Đổi tên file mock theo dạng `[domain].mock.ts` và di chuyển type rải rác về `src/types/` | Medium 🟡 | Thấp |
| **Pha 3** | **Refactor Component `PasswordSection.tsx`** | Tách `ForgotPasswordModal`, `PasswordStrengthIndicator`, `PwInput` và custom hook `useForgotPassword` | High 🔴 | Trung bình |
| **Pha 4** | **Refactor Component `BlogEditorPage.tsx`** | Tách Toolbar, Category Selector, Cover Uploader, Preview Modal | Medium 🟡 | Trung bình |
| **Pha 5** | **Refactor Pages Auth & Layouts** | Tách Form và SVG Decoration khỏi `LoginPage.tsx` / `RegisterPage.tsx` | Low 🟢 | Thấp |

---
*Báo cáo được khởi tạo tự động bởi AI Coding Agent theo tiêu chuẩn Software Architecture.*
