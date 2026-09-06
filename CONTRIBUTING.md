# HƯỚNG DẪN ĐÓNG GÓP & QUY TRÌNH LÀM VIỆC (CONTRIBUTING)

**Dự án:** NexGear-SFE  
**Áp dụng:** Toàn bộ thành viên đội ngũ phát triển Frontend

Tài liệu này quy định quy trình làm việc cho các nhà phát triển (human developers), cách thiết lập môi trường, quy chuẩn nhánh Git, commit message và quy trình duyệt Pull Request (PR).

---

## 1. Thiết lập Môi trường Phát triển (Setup Environment)

### Yêu cầu Tiên quyết
- **Node.js:** Phiên bản `>= 18.x` hoặc `>= 20.x LTS` (Khuyến nghị dùng `nvm` để quản lý phiên bản Node).
- **Package Manager:** Thống nhất sử dụng **`npm`**. Tuyệt đối không commit đồng thời các file lockfile khác (`yarn.lock`, `pnpm-lock.yaml`) vào repository.

### Các Bước Khởi chạy Dự án
1. Clone mã nguồn về máy:
   ```bash
   git clone <URL_REPO_NEXGEAR_SFE>
   cd NexGear-SFE
   ```
2. Cài đặt các gói phụ thuộc (dependencies):
   ```bash
   npm install
   ```
3. Tạo file biến môi trường local:
   ```bash
   cp .env.example .env.local
   ```
4. Khởi chạy máy chủ phát triển (Development Server):
   ```bash
   npm run dev
   ```
5. Kiểm tra Build & Linting:
   ```bash
   npm run lint
   npm run build
   ```

---

## 2. Quy trình Git & Phân nhánh (Git Workflow)

Nhóm áp dụng mô hình **Git Feature Branch Workflow**. Nhánh `main` chứa mã nguồn sản phẩm ổn định, nhánh `staging` là nhánh tích hợp.

### Phân cấp Nhánh
- `main`: Chứa mã nguồn ổn định nhất, sẵn sàng demo hoặc triển khai production.
- `staging`: Nhánh làm việc chung, nơi toàn bộ tính năng mới được merge vào để kiểm thử tích hợp.
- `feature/<tên-tính-năng>`: Nhánh phát triển tính năng mới (ví dụ: `feature/product-filter`, `feature/cart-drawer`).
- `fix/<tên-lỗi>`: Nhánh sửa lỗi phát hiện trong quá trình test (ví dụ: `fix/checkout-price-calculation`).
- `refactor/<nội-dung>`: Nhánh tái cấu trúc mã nguồn mà không làm thay đổi hành vi người dùng.

### Quy tắc Thao tác Hàng ngày
1. Trước khi tạo nhánh mới, luôn pull mã nguồn mới nhất từ `staging`:
   ```bash
   git checkout staging
   git pull origin staging
   git checkout -b feature/product-card
   ```
2. Khi hoàn thành công việc trên nhánh feature:
   - Rebase hoặc merge mã mới nhất từ `staging` về nhánh cá nhân để giải quyết xung đột (conflict) tại local.
   - Kiểm tra không có lỗi lint hoặc build:
     ```bash
     npm run lint
     npm run build
     ```
   - Push code lên remote và tạo **Pull Request (PR)** vào nhánh `staging`.

---

## 3. Quy chuẩn Đặt tên Commit (Conventional Commits)

Commit message rõ ràng giúp cả nhóm dễ dàng theo dõi lịch sử thay đổi:

### Cú pháp
```text
<type>(<scope>): <mô tả ngắn gọn bằng tiếng Anh hoặc tiếng Việt rõ nghĩa>
```

### Danh sách các `type` Hợp lệ:
- `feat`: Thêm tính năng mới (ví dụ: `feat(cart): tích hợp UI giỏ hàng dạng drawer`).
- `fix`: Sửa lỗi (ví dụ: `fix(auth): sửa lỗi không lưu token sau khi reload`).
- `docs`: Thêm hoặc chỉnh sửa tài liệu markdown (ví dụ: `docs: cập nhật API_CONVENTIONS.md`).
- `style`: Sửa format code, khoảng trắng, không ảnh hưởng logic.
- `refactor`: Tái cấu trúc code (ví dụ: `refactor(apis): chuẩn hóa hàm xử lý response axios`).
- `perf`: Cải thiện hiệu năng (ví dụ: `perf(images): thêm lazy loading cho danh sách sản phẩm`).
- `chore`: Cập nhật cấu hình, package.json, gitignore (ví dụ: `chore: cấu hình path aliases tsconfig`).

---

## 4. Quy định Quy chuẩn Mã nguồn & Kiểm thử

Để tránh trùng lặp thông tin, quy chuẩn chi tiết về mã nguồn, vị trí thư mục và kiểm thử đã được lưu trữ tại các tài liệu chuyên trách:
- **Quy chuẩn Code React/TypeScript:** Xem tại [`agent-docs/CODE_CONVENTIONS.md`](./agent-docs/CODE_CONVENTIONS.md).
- **Vị trí Đặt File & Thư mục:** Xem tại [`agent-docs/FOLDER_STRUCTURE.md`](./agent-docs/FOLDER_STRUCTURE.md).
- **Kiến trúc Hệ thống & State:** Xem tại [`agent-docs/ARCHITECTURE.md`](./agent-docs/ARCHITECTURE.md).
- **Hướng dẫn Kiểm thử:** Xem tại [`agent-docs/testing.md`](./agent-docs/testing.md).

---

## 5. Quy trình Review & Merge Pull Request (PR)

- Tiêu đề PR phải ngắn gọn, nêu rõ tính năng/lỗi được xử lý.
- Mô tả PR (Description) cần liệt kê các thay đổi và hướng dẫn kiểm thử giao diện/logic.
- **Quy tắc Review:** Mỗi PR cần **ít nhất 1 thành viên khác trong nhóm review và Approve** trước khi được phép merge vào `staging`.
- Tuyệt đối KHÔNG dùng `git push --force` lên các nhánh chung (`main`, `staging`).
