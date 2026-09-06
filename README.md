# NexGear-SFE

Hệ thống giao diện thương mại điện tử chuyên cung cấp thiết bị công nghệ, linh kiện máy tính, PC Gaming và phụ kiện cao cấp (lấy cảm hứng từ mô hình GearVN).

---

## 🚀 Công nghệ sử dụng
* **Core:** [React 18+](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **Bundler & Build Tool:** [Vite](https://vitejs.dev/)
* **Routing:** [React Router](https://reactrouter.com/)
* **HTTP Client:** [Axios](https://axios-http.com/)
* **State Management:** Zustand / Redux Toolkit
* **Validation:** Zod

---

## 📁 Hướng dẫn cấu trúc & Quy định
Trước khi bắt đầu viết code, toàn bộ thành viên nhóm **bắt buộc** phải đọc kỹ các tài liệu chuẩn hóa sau:
1. 📖 [Hướng dẫn cấu trúc thư mục (agent-docs/FOLDER_STRUCTURE.md)](./agent-docs/FOLDER_STRUCTURE.md) - Định vị nơi đặt file chính xác.
2. 🤝 [Quy định đóng góp & Quy trình Git (CONTRIBUTING.md)](./CONTRIBUTING.md) - Tiêu chuẩn nhánh, commit và review code.

---

## 🛠️ Cài đặt & Khởi chạy dự án

```bash
# 1. Clone repo về máy
git clone <URL_REPO_NEXGEAR_SFE>
cd NexGear-SFE

# 2. Cài đặt các thư viện cần thiết
npm install

# 3. Tạo file cấu hình môi trường
cp .env.example .env.local

# 4. Chạy môi trường phát triển (Dev)
npm run dev

# 5. Kiểm tra build sản phẩm
npm run build
```

---

## 📂 Path Aliases
Dự án sử dụng path alias `@/` trỏ đến thư mục `src/` để tránh các đường dẫn tương đối dài dòng:

```typescript
// ✅ Đúng
import { Button } from '@/components'

// ❌ Tránh
import { Button } from '../../../components'
```

---

## 👥 Thành viên nhóm phát triển
Dự án được xây dựng bởi đội ngũ Frontend NexGear-SFE (4 thành viên).
