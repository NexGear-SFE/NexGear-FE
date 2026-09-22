# NexGear-SFE

Hệ thống giao diện thương mại điện tử Frontend chuyên cung cấp thiết bị công nghệ, linh kiện máy tính, PC Gaming và phụ kiện cao cấp (lấy cảm hứng từ mô hình GearVN).

---

## 🚀 Công nghệ sử dụng (Technology Stack)

* **Core Framework:** [React 19](https://react.dev/) (`^19.2.8`) + [TypeScript](https://www.typescriptlang.org/) (`~6.0.2`)
* **Bundler & Build Tool:** [Vite](https://vitejs.dev/) (`^8.2.2`)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) + Custom CSS Tokens (`src/index.css`)
* **Routing:** [React Router](https://reactrouter.com/) (`^7.2.0`) với hệ thống Route Constants tập trung (`src/constants/routes.ts`)
* **Icons:** [Lucide React](https://lucide.dev/) (`^0.479.0`)
* **State Management:** Custom Pub-Sub Store (`src/stores/cartStore.ts`) với `useSyncExternalStore` & React Context (`AuthContext`, `ToastContext`)
* **Data Access Layer:** Asynchronous Mock API Abstraction Layer (`src/apis/`) bọc dữ liệu mock phân vùng theo domain (`src/mocks/`)

> [!NOTE]
> **Trạng thái kết nối Backend:** Dự án hiện tại ở giai đoạn **Frontend-Only**. HTTP Client (Axios) và kết nối API thật đang được hoãn (DEFERRED) cho đến khi Backend microservices chính thức triển khai.

---

## 📁 Tài liệu Hướng dẫn & Quy định Dự án

Trước khi bắt đầu đóng góp mã nguồn, toàn bộ thành viên nhóm và AI Coding Agents BẮT BỘC đọc kỹ các tài liệu chuẩn hóa sau:

1. 📖 [Hướng dẫn dành cho AI Agents (`AGENTS.md`)](./AGENTS.md) — Nguyên tắc cốt lõi và thứ tự tra cứu tài liệu.
2. 🤝 [Quy trình Git & Jira (`CONTRIBUTING.md`)](./CONTRIBUTING.md) — Tiêu chuẩn đặt tên nhánh, Jira Smart Commit và quy trình PR.
3. 📁 [Cấu trúc Thư mục (`agent-docs/FOLDER_STRUCTURE.md`)](./agent-docs/FOLDER_STRUCTURE.md) — Định vị vị trí đặt file chuẩn xác.
4. 💻 [Quy chuẩn Mã nguồn (`agent-docs/code_conventions.md`)](./agent-docs/code_conventions.md) — Tiêu chuẩn viết code React & TypeScript.
5. 🏗️ [Kiến trúc Hệ thống (`agent-docs/ARCHITECTURE.md`)](./agent-docs/ARCHITECTURE.md) — Luồng dữ liệu và phân tầng ứng dụng.
6. 🔌 [Chuẩn Tương tác API (`agent-docs/API_CONVENTIONS.md`)](./agent-docs/API_CONVENTIONS.md) — Cấu trúc Data Access Layer trên Mock Data.
7. 🎨 [Quy chuẩn UI/UX (`agent-docs/UI_UX_GUIDELINES.md`)](./agent-docs/UI_UX_GUIDELINES.md) — Design tokens và giao diện cơ khí sắc nét.
8. 🧪 [Hướng dẫn Kiểm thử (`agent-docs/testing.md`)](./agent-docs/testing.md) — Bộ lệnh validation baseline.

---

## 🛠️ Cài đặt & Khởi chạy Dự án

```bash
# 1. Clone repo về máy
git clone <URL_REPO_NEXGEAR_SFE>
cd NexGear-SFE

# 2. Cài đặt các gói phụ thuộc
npm install

# 3. Khởi chạy máy chủ phát triển (Dev)
npm run dev

# 4. Kiểm tra TypeScript & Linting
npx tsc --noEmit
npm run lint

# 5. Kiểm tra Build sản phẩm
npm run build
```

---

## 📂 Path Aliases

Dự án cấu hình Path Alias `@/` trỏ trực tiếp về thư mục `src/`:

```typescript
// ✅ Chuẩn (Dùng Path Alias)
import { ProductCard } from '@/components/customer/product/ProductCard'
import { ROUTES } from '@/constants/routes'

// ❌ Tránh (Đường dẫn tương đối dài dòng)
import { ProductCard } from '../../../components/customer/product/ProductCard'
```

---

## 👥 Đội ngũ Phát triển
Dự án được xây dựng và duy trì bởi đội ngũ Frontend Architect & Developers NexGear-SFE.
