# HƯỚNG DẪN ĐÓNG GÓP & QUY TRÌNH LÀM VIỆC (CONTRIBUTING)

**Dự án:** NexGear-SFE  
**Áp dụng:** Toàn bộ thành viên phát triển Frontend & AI Coding Agents

Tài liệu này quy định quy trình làm việc chuẩn cho dự án NexGear-SFE, bao gồm thiết lập môi trường, quy chuẩn nhánh Git, Jira Smart Commit message và quy trình kiểm thử/review Pull Request (PR).

---

## 1. Thiết lập Môi trường Phát triển (Setup Environment)

### Yêu cầu Tiên quyết
- **Node.js:** Phiên bản `>= 18.x` hoặc `>= 20.x LTS` (Khuyến nghị sử dụng `nvm`).
- **Package Manager:** Thống nhất sử dụng **`npm`**. Tuyệt đối không commit các file lockfile khác (`yarn.lock`, `pnpm-lock.yaml`) vào repository.

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
3. Tạo file biến môi trường local (nếu có):
   ```bash
   cp .env.example .env.local
   ```
4. Khởi chạy máy chủ phát triển (Development Server):
   ```bash
   npm run dev
   ```
5. Kiểm tra Build & Linting tiêu chuẩn:
   ```bash
   npx tsc --noEmit
   npm run lint
   npm run build
   ```

---

## 2. Quy trình Git & Phân nhánh (Git & Jira Workflow)

Nhóm áp dụng quy trình **Jira Issue + Feature Branch Workflow**. Nhánh `main` chứa mã nguồn sản phẩm chính thức, nhánh `staging` dùng tích hợp.

### Quy chuẩn Đặt tên Nhánh (Branch Naming)
Tên nhánh BẮT BỘC đính kèm Jira Issue Key (ví dụ: `NXG-1`):

- `feature/NXG-[id]-[short-description]`: Nhánh phát triển tính năng mới (vd: `feature/NXG-12-cart-drawer`).
- `bugfix/NXG-[id]-[short-description]`: Nhánh sửa lỗi (vd: `bugfix/NXG-15-order-total-calc`).
- `refactor/NXG-[id]-[short-description]`: Nhánh tái cấu trúc mã nguồn (vd: `refactor/NXG-1-folder-structure-and-routing`).
- `docs/NXG-[id]-[short-description]`: Nhánh cập nhật tài liệu (vd: `docs/NXG-8-architecture-alignment`).

### Quy tắc Thao tác Hàng ngày
1. Trước khi tạo nhánh mới, luôn pull mã nguồn mới nhất từ `staging`:
   ```bash
   git checkout staging
   git pull origin staging
   git checkout -b feature/NXG-20-product-filter
   ```
2. Khi hoàn thành công việc trên nhánh feature:
   - Chạy đầy đủ bộ lệnh kiểm tra baseline:
     ```bash
     npx tsc --noEmit
     npm run lint
     npm run build
     ```
   - Stage các file liên quan nhiệm vụ và tạo commit theo chuẩn Jira Smart Commit.
   - Push code lên remote và tạo **Pull Request (PR)** vào nhánh `staging`.

---

## 3. Quy chuẩn Đặt tên Commit (Jira Smart Commit)

Commit message BẮT BỘC tuân thủ cú pháp Jira Smart Commit để tự động đồng bộ trạng thái lên bảng điều khiển Jira:

### Cú pháp
```text
NXG-[id] #[status] <Mô tả công việc bằng tiếng Anh hoặc tiếng Việt rõ nghĩa>
```

### Danh sách các `#status` Hợp lệ:
- `#in-progress`: Đang trong tiến trình thực hiện công việc.
- `#review`: Đã hoàn thành code, sẵn sàng cho công đoạn Code Review.
- `#done`: Công việc đã hoàn tất và vượt qua kiểm thử.

### Ví dụ Commit Hợp lệ:
```text
NXG-1 #in-progress Phase 2: Standardize toast notifications and order data access
NXG-1 #in-progress Phase 3 & 4: Refactor PasswordSection & WarrantyTab God components
NXG-5 #review Implement product detail specs table
NXG-12 #done Fix cart quantity update bug
```

---

## 4. Quy định Quy chuẩn Mã nguồn & Kiến trúc

Để bảo đảm tính nhất quán, các tài liệu chuyên trách quy định cụ thể bao gồm:
- **Quy chuẩn Code React/TypeScript:** Xem tại [`agent-docs/code_conventions.md`](./agent-docs/code_conventions.md).
- **Cấu trúc Thư mục & Phân vùng:** Xem tại [`agent-docs/FOLDER_STRUCTURE.md`](./agent-docs/FOLDER_STRUCTURE.md).
- **Kiến trúc Hệ thống & Data Flow:** Xem tại [`agent-docs/ARCHITECTURE.md`](./agent-docs/ARCHITECTURE.md).
- **Chuẩn Tương tác API & Mock Data:** Xem tại [`agent-docs/API_CONVENTIONS.md`](./agent-docs/API_CONVENTIONS.md).
- **Quy chuẩn UI/UX & Design Tokens:** Xem tại [`agent-docs/UI_UX_GUIDELINES.md`](./agent-docs/UI_UX_GUIDELINES.md).
- **Chiến lược Kiểm thử & Validation:** Xem tại [`agent-docs/testing.md`](./agent-docs/testing.md).

---

## 5. Quy trình Review & Merge Pull Request (PR)

- Tiêu đề PR phải định dạng: `[NXG-[id]] Tên công việc/tính năng`.
- Mô tả PR (Description) cần liệt kê danh sách thay đổi và hướng dẫn kiểm thử thủ công (Behavior Check).
- **Quy tắc Review:** PR BẮT BỘC phải được ít nhất 1 thành viên khác review và Approve trước khi merge vào `staging`.
- Sau khi PR được duyệt, tiến hành merge và xóa nhánh feature tạm thời.
- Tuyệt đối KHÔNG dùng `git push --force` lên các nhánh chung (`main`, `staging`).
