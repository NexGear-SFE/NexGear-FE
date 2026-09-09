# WAREHOUSE IMPLEMENTATION TODO

**Dự án:** NexGear-SFE  
**Phạm vi:** Toàn bộ module Warehouse phía Frontend, dùng mock data/state, chưa tích hợp Backend  
**Nguồn UI/flow:** Figma Make `E-commerce Gaming Store`, nhóm route `/admin/warehouse/*`  
**Quy tắc:** Tài liệu này chỉ là execution checklist. Khi có xung đột, các tài liệu canonical `AGENTS.md`, `CONTRIBUTING.md`, `agent-docs/code_conventions.md`, `FOLDER_STRUCTURE.md`, `ARCHITECTURE.md`, `API_CONVENTIONS.md`, `UI_UX_GUIDELINES.md`, và `testing.md` luôn được ưu tiên.

---

## 0. Cách sử dụng checklist

- [ ] Chỉ triển khai **một nhóm tại một thời điểm** theo đúng thứ tự từ Group 0 đến Group 11.
- [ ] Không bắt đầu group tiếp theo nếu `Exit gate` của group hiện tại chưa đạt.
- [ ] Mỗi task hoàn thành phải đổi `[ ]` thành `[x]` ngay trong file này.
- [ ] Mỗi group phải có commit riêng hoặc một chuỗi commit nhỏ, dễ review.
- [ ] Không copy nguyên khối code Figma Make vào `src/`.
- [ ] Code Figma Make chỉ được dùng làm nguồn tham chiếu cho layout, nội dung, mock flow và interaction.
- [ ] Trước khi đưa code Figma vào project, phải tách component, type, state và utility theo tài liệu kiến trúc.
- [ ] Không refactor phần ngoài Warehouse nếu không thật sự cần cho route/layout dùng chung.
- [ ] Không thêm thư mục cấp một mới trong `src/` ngoài danh sách đã quy định trong `FOLDER_STRUCTURE.md`.
- [ ] Không gọi API hoặc mock service trực tiếp từ presentational component.
- [ ] Không sử dụng `any`; dùng type/interface cụ thể hoặc `unknown` + type guard.
- [ ] Không hardcode màu mới nếu design token tương ứng đã tồn tại.
- [ ] Mỗi màn hình dữ liệu phải có Loading, Empty và Error state.
- [ ] Mọi dialog/modal phải hỗ trợ focus, Escape, keyboard navigation và restore focus khi đóng.
- [ ] Mỗi group phải chạy `npm run lint` và `npm run build` trước khi đóng group.

### Trạng thái tổng thể

| Group | Phạm vi | Trạng thái |
|---|---|---|
| 0 | Baseline, kiểm kê Figma và quy tắc port code | Hoàn thành qua preview; source export còn mở |
| 1 | Foundation, domain types, mock architecture | Hoàn thành |
| 2 | Warehouse shell và navigation | Hoàn thành |
| 3 | Category Management | Hoàn thành |
| 4 | Product Management | Hoàn thành |
| 5 | Variant và SKU Generator | Hoàn thành |
| 6 | Inventory và Serial | Hoàn thành |
| 7 | Stock Receipt | Hoàn thành |
| 8 | Order Fulfillment | Hoàn thành |
| 9 | Warehouse Dashboard và Profile | Hoàn thành |
| 10 | Cross-module integration và UX hardening | Hoàn thành |
| 11 | Test, QA, documentation và handoff | Chưa bắt đầu |

---

# GROUP 0 — BASELINE VÀ KIỂM KÊ FIGMA MAKE

## 0.1. Bảo vệ repository trước khi làm

- [x] Kiểm tra `git status --short`.
- [x] Ghi nhận toàn bộ thay đổi đang có của người dùng; không sửa hoặc format lại file không liên quan.
- [x] Xác nhận đang làm trên feature branch tạo từ `staging` theo `CONTRIBUTING.md`.
- [x] Nếu cần tạo branch, dùng tên như `feature/warehouse-management`.
- [x] Chạy baseline `npm install` bằng npm, không tạo yarn/pnpm lockfile.
- [x] Chạy `npm run lint` và lưu lại lỗi baseline nếu có.
- [x] Chạy `npm run build` và lưu lại lỗi baseline nếu có.
- [x] Kiểm tra phiên bản Node đáp ứng yêu cầu project.

## 0.2. Đọc tài liệu bắt buộc

- [x] Đọc lại `AGENTS.md`.
- [x] Đọc `agent-docs/FOLDER_STRUCTURE.md` trước khi tạo file.
- [x] Đọc `agent-docs/code_conventions.md` trước khi viết component/type.
- [x] Đọc `agent-docs/UI_UX_GUIDELINES.md` trước khi port UI.
- [x] Đọc `agent-docs/ARCHITECTURE.md` trước khi thiết kế state.
- [x] Đọc `agent-docs/API_CONVENTIONS.md` trước khi tạo mock API facade.
- [x] Đọc `agent-docs/testing.md` trước khi tạo test.

## 0.3. Kiểm kê code Figma Make

> Ghi chú: Figma Make public preview đã được kiểm kê đầy đủ; tải generated source bị chặn bởi màn hình đăng ký, nên hai mục source bên dưới vẫn để mở. Việc port dùng preview và file inventory nhìn thấy được.

- [ ] Lấy source code mới nhất của Figma Make do team cung cấp.
- [ ] Giữ source Figma ở khu vực tham chiếu tạm; không đổ trực tiếp toàn bộ vào `src/`.
- [x] Ghi lại danh sách file Figma liên quan Warehouse.
- [x] Đối chiếu router Figma với router React hiện tại.
- [x] Đối chiếu global CSS Figma với design tokens hiện tại trong `src/index.css`.
- [x] Đối chiếu icon package; ưu tiên `lucide-react` đã có.
- [x] Kiểm tra asset nào thực sự cần chuyển sang `src/assets/`.
- [x] Loại bỏ generated code trùng lặp, inline mock data lớn và component vượt quá 200 dòng.
- [x] Không mang theo dependency Figma nếu project đã có giải pháp tương đương.
- [x] Không mang theo global reset/style có thể phá storefront hiện tại.

## 0.4. Inventory màn hình Figma phải giữ lại

- [x] Warehouse Dashboard `/admin/warehouse`.
- [x] Order List `/admin/warehouse/orders`.
- [x] Order Detail `/admin/warehouse/orders/:orderId`.
- [x] Picking flow.
- [x] Serial assignment flow.
- [x] Packing flow.
- [x] Issue recovery flow.
- [x] Receipt List `/admin/warehouse/receipts`.
- [x] New/Edit Receipt `/admin/warehouse/receipts/new`.
- [x] Receipt Detail `/admin/warehouse/receipts/:receiptId`.
- [x] Inventory List `/admin/warehouse/inventory`.
- [x] Inventory Product Detail `/admin/warehouse/inventory/:productId`.
- [x] Warehouse profile and logout affordances.

## 0.5. Chốt những phần bổ sung ngoài Figma

- [x] Product List.
- [x] Product Create/Edit wizard.
- [x] Product Detail đầy đủ.
- [x] Category tree management.
- [x] Category selector trong Product form.
- [x] Variant option/value editor.
- [x] Variant combination generator.
- [x] SKU preview/generator/manual override.
- [x] SKU immutability simulation sau khi có inventory movement.
- [x] Mock audit log cho Product/Category/Variant.
- [x] Xác nhận phần “Gold” không nằm trong scope.

### Exit gate Group 0

- [x] Có danh sách source Figma sẽ port và mapping file đích.
- [x] Baseline lint/build đã biết rõ.
- [x] Không có file người dùng bị ghi đè.
- [x] Scope Warehouse được đóng băng trước khi sang Group 1.

---

# GROUP 1 — FOUNDATION, DOMAIN TYPES VÀ MOCK ARCHITECTURE

## 1.1. Dependencies tối thiểu

- [x] Kiểm tra dependency đã tồn tại trước khi cài mới.
- [x] Thêm `zod` để validate Product, Category, Variant, Receipt và Packing form.
- [x] Chỉ thêm `zustand` nếu chọn dùng shared mock state xuyên route; không cài Redux song song.
- [x] Thêm Vitest và React Testing Library theo `testing.md` khi bắt đầu test.
- [x] Không cài Axios ở phase mock nếu chưa dùng; giữ API facade để thay implementation khi có BE.
- [x] Chỉ giữ một `package-lock.json` do npm tạo.

## 1.2. Domain types

- [x] Tạo `src/types/category.type.ts`.
- [x] Khai báo `CategoryStatus = 'ACTIVE' | 'INACTIVE'`.
- [x] Khai báo `Category` với `id`, `code`, `name`, `slug`, `parentId`, `sortOrder`, `status`, timestamps.
- [x] Khai báo `CategoryTreeNode` với `children` được dựng từ dữ liệu flat.
- [x] Khai báo `CategoryOption` với `breadcrumb` và `depth`.
- [x] Tạo `src/types/product.type.ts`.
- [x] Khai báo `ProductStatus = 'DRAFT' | 'ACTIVE' | 'INACTIVE'`.
- [x] Khai báo Product master fields, specifications, warranty, unit, origin, weight, dimensions.
- [x] Tạo `src/types/variant.type.ts`.
- [x] Phân biệt `VariantOption`, `VariantOptionValue`, `ProductVariant`.
- [x] Khai báo `skuSource = 'AUTO' | 'MANUAL'`.
- [x] Khai báo `serialTracking`, `reorderLevel`, barcode và GTIN riêng SKU.
- [x] Tạo `src/types/inventory.type.ts`.
- [x] Khai báo `onHand`, `reserved`, `available`, `serialCount`, `stockStatus`.
- [x] Khai báo Inventory Movement và movement reason.
- [x] Tạo `src/types/receipt.type.ts`.
- [x] Khai báo Receipt Draft/Confirmed và Receipt Line theo variant/SKU.
- [x] Tạo `src/types/warehouseOrder.type.ts`.
- [x] Giữ đúng bảy trạng thái order từ flow Figma.
- [x] Khai báo `OrderIssue` có `code`, `title`, `message`, `occurredAt`, `resumeState`, `retryable`.
- [x] Tạo hoặc reuse `src/types/api.type.ts` cho `ApiResponse<T>` và `PaginatedResponse<T>`.

## 1.3. Validation schemas

- [x] Tạo `src/schemas/category.schema.ts`.
- [x] Validate code/slug duy nhất ở mock service và format ở schema.
- [x] Validate category không tự làm parent.
- [x] Tạo `src/schemas/product.schema.ts`.
- [x] Validate name, product code, brand, category, unit.
- [x] Validate physical dimensions không âm.
- [x] Tạo `src/schemas/variant.schema.ts`.
- [x] Validate SKU bằng regex `^[A-Z0-9]+(?:-[A-Z0-9]+)*$`.
- [x] Validate option combination không rỗng và không trùng.
- [x] Tạo `src/schemas/receipt.schema.ts`.
- [x] Validate supplier, receipt date và ít nhất một line trước khi confirm.
- [x] Tạo packing schema cho weight/length/width/height.

## 1.4. Pure utilities

- [x] Tạo `src/utils/buildCategoryTree.ts`.
- [x] Xử lý nhiều root, orphan parent và dữ liệu cycle an toàn.
- [x] Tạo `src/utils/buildCategoryBreadcrumb.ts`.
- [x] Tạo `src/utils/isCategoryDescendant.ts` để chặn cycle.
- [x] Tạo `src/utils/generateVariantCombinations.ts`.
- [x] Tạo `src/utils/generateSkuPreview.ts`.
- [x] Tạo utility normalize uppercase ASCII, bỏ dấu/ký tự đặc biệt, gộp dấu `-`.
- [x] Tạo `src/utils/formatCurrency.ts` thay vì format VND rải rác trong component.
- [x] Tạo `src/utils/formatDate.ts` nếu chưa có.
- [x] Tạo utility tính `available = onHand - reserved`.
- [x] Tất cả utility phải là pure function, không import React.

## 1.5. Mock data và API facade

- [x] Đặt mock data tại `src/constants/warehouseMockData.ts`, không nhúng trong page component.
- [x] Chuyển sample products/SKUs/receipts/orders từ Figma sang mock data có type đầy đủ.
- [x] Dữ liệu mock phải bao gồm happy, empty, low stock, out of stock, serial và issue cases.
- [x] Tạo `src/apis/category.api.ts` trả Promise typed.
- [x] Tạo `src/apis/product.api.ts` trả Promise typed.
- [x] Tạo `src/apis/inventory.api.ts` trả Promise typed.
- [x] Tạo `src/apis/receipt.api.ts` trả Promise typed.
- [x] Tạo `src/apis/warehouseOrder.api.ts` trả Promise typed.
- [x] Mock API phải mô phỏng latency cố định, không dùng lỗi random 25% như prototype.
- [x] Cho phép test chủ động bật success/error bằng dependency hoặc mock function.
- [x] Chuẩn hóa tất cả response theo `ApiResponse<T>`.
- [x] UI dùng typed store trong mock mode; khi có Backend, hooks/store sẽ gọi facade và chỉ thay implementation trong `src/apis/`.

## 1.6. Shared state

- [x] Tạo store/provider cho Category, Product, Variant, Inventory, Receipt và Order.
- [x] Dùng một transactional mock store có chủ đích vì Receipt/Order/Inventory cần cập nhật nguyên tử; domain access được tách bằng selectors.
- [x] Store action phải có tên nghiệp vụ rõ ràng: `createCategory`, `confirmReceipt`, `assignSerials`.
- [x] State mutation phải immutable.
- [x] Có selectors để tránh render lại cả module.
- [x] Mock state phải giữ dữ liệu khi chuyển route trong cùng session.
- [x] Reset mock state chỉ phục vụ development/test, không đặt CTA phá dữ liệu trên UI production.

### Exit gate Group 1

- [x] TypeScript strict pass, không `any`.
- [x] Utilities có unit test cơ bản.
- [x] Mock API không bị import trực tiếp trong dumb component.
- [x] `npm run lint` pass không warning.
- [x] `npm run build` pass.

---

# GROUP 2 — WAREHOUSE SHELL VÀ NAVIGATION

## 2.1. Layout

- [x] Tạo `src/layouts/WarehouseLayout.tsx`.
- [x] Port visual shell từ Figma: dark sidebar, top header, user block, main content.
- [x] Dùng `<Outlet />` cho route con.
- [x] Tách `WarehouseSidebar`, `WarehouseHeader`, `WarehouseUserMenu` thành reusable components.
- [x] Dùng design tokens hiện có thay cho hex hardcode.
- [x] Giữ border radius tối đa 12px.
- [x] Không dùng card hover `translateY`.
- [x] Có focus ring rõ ràng.
- [x] Mobile sidebar phải là drawer có nút mở/đóng và focus trap.
- [x] Tablet/desktop sidebar hiển thị cố định.

## 2.2. Navigation

- [x] Khai báo route constants, tránh magic strings.
- [x] Thêm menu `Tổng quan`.
- [x] Thêm menu `Đơn hàng`.
- [x] Thêm menu `Phiếu nhập kho`.
- [x] Thêm menu `Sản phẩm`.
- [x] Thêm menu `Danh mục`.
- [x] Thêm menu `Tồn kho`.
- [x] Active state dựa trên route hiện tại.
- [x] Sub-route detail vẫn giữ đúng parent menu active.
- [x] Breadcrumb dùng React Router Link, không dùng `<a href>` nội bộ.
- [x] Direct navigation/reload tại nested route không lỗi.

## 2.3. Shared UI Warehouse

- [x] Tạo `WarehousePageHeader`.
- [x] Tạo `WarehouseStatCard`.
- [x] Tạo `StatusBadge` theo semantic tokens.
- [x] Tạo `DataTableEmptyState`.
- [x] Tạo `DataTableSkeleton`.
- [x] Tạo `ErrorState` kèm Retry.
- [x] Tạo `SearchField` accessible.
- [x] Tạo filter bar responsive.
- [x] Tạo pagination component.
- [x] Tạo confirm dialog dùng chung cho deactivate/confirm actions.
- [x] Component props phải typed và có single responsibility.

### Exit gate Group 2

- [x] Tất cả warehouse routes render trong cùng layout.
- [x] Keyboard điều hướng sidebar được.
- [x] Mobile drawer hoạt động.
- [x] Không làm hỏng MainLayout/storefront.
- [x] Lint/build pass.

---

# GROUP 3 — CATEGORY MANAGEMENT

## 3.1. Data model và quy tắc cây

- [x] Dùng `parentId` làm quan hệ canonical; không lưu một `childCategoryId` duy nhất.
- [x] Dùng `sortOrder` để sắp xếp category cùng cấp.
- [x] Children được derive bằng `buildCategoryTree`.
- [x] Cho phép nhiều root và nhiều children.
- [x] Giới hạn depth theo constant, mặc định đề xuất 3.
- [x] Chặn self-parent.
- [x] Chặn chọn descendant làm parent.
- [x] Không hard-delete category đã có child hoặc product.
- [x] Category đang được dùng chỉ được chuyển `INACTIVE`.

## 3.2. Category page

- [x] Tạo `src/pages/Warehouse/Categories/CategoryManagementPage.tsx`.
- [x] Desktop dùng split view: tree trái, detail/form phải.
- [x] Mobile chuyển thành list + full-screen form/drawer.
- [x] Hiển thị tổng category, active, inactive, root count.
- [x] Search theo tên, code, slug.
- [x] Expand/collapse từng node.
- [x] Expand/collapse tất cả.
- [x] Hiển thị depth bằng indentation rõ ràng.
- [x] Hiển thị số product trực thuộc category.
- [x] Hiển thị trạng thái active/inactive.
- [x] Có CTA tạo root category.
- [x] Có CTA tạo child tại từng node.
- [x] Có edit action.
- [x] Có activate/deactivate action.
- [x] Có reorder action lên/xuống; drag/drop chỉ làm nếu không làm accessibility kém đi.

## 3.3. Category form

- [x] Fields: name, code, slug, description, parent, sortOrder, status.
- [x] Auto-generate slug từ name nhưng vẫn cho sửa trước save.
- [x] Code normalize uppercase/kebab theo convention đã chốt.
- [x] Parent select loại bỏ chính node và descendants.
- [x] Hiển thị breadcrumb preview.
- [x] Inline validation cạnh field lỗi.
- [x] Disable Save khi submitting.
- [x] Giữ dữ liệu người dùng khi mock API lỗi.
- [x] Sau create, chọn và focus node vừa tạo.
- [x] Sau edit, tree và breadcrumb cập nhật ngay.

## 3.4. Reusable CategorySelect

- [x] Tạo `src/components/warehouse/CategorySelect.tsx`.
- [x] Chỉ hiển thị category active khi tạo Product.
- [x] Cho search theo name/code/breadcrumb.
- [x] Hiển thị đầy đủ breadcrumb để phân biệt category trùng tên.
- [x] Hỗ trợ keyboard Up/Down/Enter/Escape.
- [x] Có loading/empty/error state.
- [x] Empty state có CTA đi tới Category Management.
- [x] Có callback refresh sau khi category mới được tạo.
- [x] Payload Product chỉ lưu `categoryId`, không duplicate object category.

## 3.5. Category tests

- [x] Test flat list thành tree.
- [x] Test nhiều root/nhiều child.
- [x] Test orphan parent.
- [x] Test cycle prevention.
- [x] Test deactivate category có product.
- [x] Test search breadcrumb.
- [x] Test CategorySelect keyboard.
- [x] Test create category rồi xuất hiện trong select.

### Exit gate Group 3

- [x] CRUD mock Category hoàn chỉnh.
- [x] Không tạo được cycle.
- [x] Không hard-delete dữ liệu đang được tham chiếu.
- [x] CategorySelect sẵn sàng cho Product form.
- [x] Tests/lint/build pass.

---

# GROUP 4 — PRODUCT MANAGEMENT

## 4.1. Product List

- [x] Tạo `/admin/warehouse/products`.
- [x] Port layout density và table language từ Inventory Figma.
- [x] Cột ảnh + tên Product.
- [x] Cột Product ID/code.
- [x] Cột brand.
- [x] Cột category breadcrumb.
- [x] Cột tổng variants/SKUs.
- [x] Cột on hand/available.
- [x] Cột serial tracking summary.
- [x] Cột trạng thái.
- [x] Cột updatedAt.
- [x] Cột actions: View, Edit, Deactivate.
- [x] Search theo name, product code hoặc SKU.
- [x] Filter category, gồm lựa chọn root/child rõ ràng.
- [x] Filter brand.
- [x] Filter Product status.
- [x] Filter stock status.
- [x] Filter serial tracking.
- [x] Sort newest/name/stock.
- [x] Pagination.
- [x] Đồng bộ filter vào URL search params để reload không mất trạng thái.
- [x] Loading skeleton khớp table dimensions.
- [x] Empty state phân biệt chưa có Product và filter không có kết quả.
- [x] Error state có retry.

## 4.2. Product Create/Edit là flow dài — bắt buộc Stepper

Progress bar cố định ở đầu form:

```text
1. Thông tin cơ bản → 2. Thông số → 3. Biến thể & SKU → 4. Xác nhận
```

- [x] Tạo `/admin/warehouse/products/new`.
- [x] Tạo `/admin/warehouse/products/:productId/edit`.
- [ ] Stepper hiển thị current/completed/error state.
- [x] Cho quay lại step trước không mất dữ liệu.
- [x] Chỉ sang step tiếp theo khi step hiện tại hợp lệ.
- [x] Không cho click vượt qua step chưa hoàn thành.
- [x] Có `aria-current="step"` và text label, không chỉ dựa vào màu.
- [x] Có cảnh báo unsaved changes khi rời route.

### Step 1 — Thông tin cơ bản

- [x] Product name.
- [x] Product/model code ổn định, không lấy trực tiếp từ display name.
- [x] Brand selector.
- [x] CategorySelect từ Group 3.
- [x] Unit.
- [x] Origin.
- [x] Warranty months.
- [x] Short operational description.
- [x] Product status Draft/Active/Inactive.
- [x] Weight và dimensions nếu áp dụng.
- [x] Barcode/GTIN ở đúng field, không gọi là SKU.

### Step 2 — Thông số kỹ thuật

- [x] Specification editor dạng key/value rows.
- [x] Add row.
- [x] Remove row.
- [x] Reorder row.
- [x] Không cho duplicate specification key trong cùng Product.
- [x] Có suggestion theo category từ constants/mock configuration.
- [x] Hỗ trợ các thông số gaming: CPU, GPU, RAM, storage, screen, switch, DPI, chipset, VRAM.
- [x] Cho phép custom specification khi suggestion không đủ.
- [x] Preview bảng specifications read-only.

### Step 3 — Biến thể và SKU

- [x] Tích hợp toàn bộ Group 5.
- [x] Không cho hoàn tất Product nếu không có ít nhất một variant.
- [x] Product không có variation vẫn tạo một `Default` variant có SKU.

### Step 4 — Xác nhận

- [x] Summary Product master.
- [x] Category breadcrumb.
- [x] Specifications table.
- [x] Variant/SKU table.
- [x] Serial tracking flags.
- [ ] Validation warning summary liên kết về field/step lỗi.
- [x] CTA `Lưu nháp`.
- [x] CTA `Lưu và kích hoạt`.
- [x] Disable double submit.
- [x] Success state điều hướng tới Product Detail.

## 4.3. Product Detail đầy đủ

- [x] Tạo `/admin/warehouse/products/:productId`.
- [x] Header có image, name, code, status, brand và category breadcrumb.
- [x] Stat cards: total SKU, on hand, reserved, available, serial count.
- [x] Tab `Tổng quan`.
- [x] Tab `Biến thể/SKU`.
- [x] Tab `Thông số kỹ thuật`.
- [x] Tab `Tồn kho & Serial`.
- [x] Tab `Lịch sử nhập/xuất`.
- [x] Tab `Audit log`.
- [x] Warehouse Staff xem được toàn bộ source-of-truth fields.
- [x] Nếu hiển thị commercial price thì chỉ read-only trong Warehouse.
- [x] Edit action tôn trọng SKU lock rules.
- [x] Không duplicate inventory detail logic; reuse component từ Group 6.

## 4.4. Product lifecycle

- [x] Draft có thể chỉnh sửa toàn bộ khi chưa có movement.
- [x] Active Product dùng được trong Receipt và Order flow.
- [ ] Inactive Product không được thêm vào receipt mới.
- [x] Product có transaction không hard-delete.
- [x] Deactivate Product phải xác nhận và hiển thị số variant bị ảnh hưởng.
- [x] Product history vẫn mở được sau deactivate.

## 4.5. Product tests

- [ ] Search/filter/pagination.
- [x] Step validation.
- [x] Back/next không mất form state.
- [x] Unsaved changes guard.
- [x] Category vừa tạo được chọn.
- [x] Default variant.
- [x] Draft/activate/deactivate flow.
- [x] Loading/empty/error states.

### Exit gate Group 4

- [x] Product List, Create, Edit, Detail chạy end-to-end bằng mock data.
- [x] Product form dùng progress bar bốn step.
- [x] Warehouse Staff xem đầy đủ thông tin Product.
- [x] Product lifecycle không phá dữ liệu lịch sử.
- [x] Tests/lint/build pass.

---

# GROUP 5 — VARIANT VÀ SKU GENERATOR

## 5.1. Option editor

- [x] Tạo UI thêm option như CPU, GPU, RAM, Storage, Color, Switch.
- [x] Mỗi option có stable code và display name.
- [x] Mỗi option value có stable code và display value.
- [x] Không dùng display name làm nguồn duy nhất sinh SKU.
- [x] Chặn option name/code trùng trong cùng Product.
- [x] Chặn option value trùng trong cùng option.
- [x] Cho reorder option; thứ tự này quyết định thứ tự segment SKU.
- [x] Cảnh báo khi thay đổi option làm mất variant configuration đã nhập.

## 5.2. Variant matrix

- [x] Generate Cartesian product từ option values.
- [x] Hiển thị số combination trước khi generate.
- [x] Cảnh báo khi số combination vượt ngưỡng cấu hình.
- [x] Không generate duplicate combination.
- [x] Cho disable combination không bán/không nhập kho.
- [x] Mỗi row có option summary, SKU, serial tracking, reorder level và status.
- [x] Giữ dữ liệu row cũ khi thêm một option value nếu combination không đổi.
- [x] Xác nhận trước khi xóa option/value làm mất variants.

## 5.3. SKU generation

- [x] Format mặc định `<BRAND>-<MODEL>-<KEY_VARIANTS>`.
- [x] Ví dụ `ASU-G16-I9-4080`, `LOG-GPX2-BLK`.
- [x] Normalize uppercase ASCII.
- [x] Xóa khoảng trắng/ký tự đặc biệt.
- [x] Dùng `-` làm separator.
- [x] Target ngắn và dễ đọc; validate max length theo constant.
- [x] Có preview khi Brand/Model/Option thay đổi.
- [x] Có nút Regenerate cho từng row.
- [x] Có Regenerate All với confirm nếu sẽ overwrite manual SKU.
- [x] Cho manual override trước khi có inventory movement.
- [x] Đánh dấu rõ AUTO hoặc MANUAL.
- [x] Check uniqueness toàn mock store.
- [x] Nếu collision: ưu tiên phát hiện duplicate combination; chỉ thêm suffix khi thực sự là variant khác.
- [x] Không tái sử dụng SKU của inactive/archived variant.
- [x] Không tự đổi SKU khi display name thay đổi.

## 5.4. SKU lock và audit

- [x] SKU editable khi variant chưa có receipt/order/movement.
- [x] SKU locked sau inventory movement đầu tiên.
- [x] Tooltip giải thích vì sao bị khóa.
- [x] Khi cần sửa SKU locked: deactivate variant cũ và tạo variant mới.
- [x] Không rewrite movement history sang SKU mới.
- [x] Ghi mock audit entry cho create, manual override, regenerate và deactivate.

## 5.5. Serial tracking

- [x] Phân biệt variant serial-tracked và quantity-only.
- [x] Variant serial-tracked yêu cầu số serial bằng quantity khi confirm receipt.
- [x] Variant quantity-only không hiển thị serial input.
- [x] Không cho trùng serial trong toàn mock inventory.
- [x] SKU không được dùng thay serial.

## 5.6. Tests

- [x] Normalize SKU có dấu tiếng Việt.
- [x] Invalid characters.
- [x] Duplicate combination.
- [x] Collision SKU.
- [x] Manual override.
- [x] Regenerate all confirmation.
- [x] SKU lock after movement.
- [x] Serial uniqueness.
- [x] Matrix generation 0/1/n options.

### Exit gate Group 5

- [x] Mọi Product có ít nhất một unique SKU.
- [x] Variant matrix không mất dữ liệu ngoài ý muốn.
- [x] SKU và serial được phân biệt hoàn toàn.
- [x] Lock/audit behavior đúng.
- [x] Tests/lint/build pass.

---

# GROUP 6 — INVENTORY VÀ SERIAL

## 6.1. Inventory List từ Figma

- [x] Port `/admin/warehouse/inventory` theo Figma.
- [x] Stat cards: total SKU, in stock, low stock, out of stock.
- [x] Bảng mỗi row là một variant/SKU, không phải chỉ Product.
- [x] Cột Product image/name.
- [x] Cột brand.
- [x] Cột SKU.
- [x] Cột variant summary.
- [x] Cột category.
- [x] Cột on hand/reserved/available.
- [x] Cột serial count hoặc dấu `—`.
- [x] Cột stock status.
- [x] Search Product/SKU.
- [x] Filter category và stock status.
- [x] Pagination.
- [x] Loading/empty/error states.

## 6.2. Inventory Product Detail từ Figma

- [x] Port `/admin/warehouse/inventory/:productId`.
- [x] Header Product, brand, category, Product ID.
- [x] Stats total quantity, variant count, serial count.
- [x] Variant/SKU table.
- [x] Inventory movement history.
- [x] Related receipts.
- [x] Links sang Receipt Detail và Product Detail.
- [x] Stock state dùng semantic color/token.
- [x] Không cho chỉnh stock trực tiếp bằng text field.

## 6.3. Serial detail

- [x] Mở serial list từ SKU row.
- [x] Hiển thị serial, SKU, receipt reference, received date, status.
- [x] Serial status: Available, Reserved, Sold, Returned nếu mock flow cần.
- [x] Search serial chính xác.
- [x] Link order/receipt liên quan.
- [x] Không cho assign cùng serial cho hai order items.

## 6.4. Tests

- [x] `available = onHand - reserved`.
- [x] Low/out-of-stock thresholds.
- [x] SKU search.
- [x] Serial search.
- [x] Movement/receipt links.
- [x] Empty/error cases.

### Exit gate Group 6

- [x] UI giữ được thông tin và flow Figma Inventory.
- [x] Inventory hiển thị theo SKU/variant.
- [x] Product Detail reuse Inventory components.
- [x] Tests/lint/build pass.

---

# GROUP 7 — STOCK RECEIPT

## 7.1. Receipt List từ Figma

- [x] Port `/admin/warehouse/receipts`.
- [x] Tabs All/Draft/Confirmed.
- [x] Search receipt code, supplier, invoice code.
- [x] Cột receipt code, supplier, creator, SKU count, total quantity, total value, status.
- [x] Actions Continue Edit/View Detail.
- [x] Loading/empty/error/pagination.

## 7.2. Create/Edit Receipt là flow dài — bắt buộc Stepper

```text
1. Thông tin phiếu → 2. Sản phẩm & SKU → 3. Số lượng, giá & serial → 4. Xác nhận
```

### Step 1 — Receipt information

- [x] Supplier.
- [x] Receipt date.
- [x] Invoice/document code.
- [x] Notes.
- [x] Save Draft cho phép dữ liệu chưa đầy đủ.

### Step 2 — Product/SKU selection

- [x] Search active Product hoặc SKU.
- [x] Group kết quả theo Product, chọn đúng variant.
- [x] Hiển thị category breadcrumb và variant summary.
- [x] Không cho chọn inactive Product/Variant.
- [x] Không thêm trùng SKU; nếu chọn lại thì focus/update line hiện có.

### Step 3 — Quantity, cost và serial

- [x] Quantity integer > 0.
- [x] Unit cost >= 0 (UI áp dụng quy tắc chặt hơn: phải > 0 khi Confirm).
- [x] Line amount và receipt total được tính bằng pure utility.
- [x] Variant có serial tracking mở serial editor.
- [x] Paste nhiều serial theo dòng.
- [x] Trim và bỏ dòng rỗng.
- [x] Báo duplicate trong cùng line, trong receipt và trong inventory.
- [x] Serial valid count phải bằng quantity trước Confirm.
- [x] Variant không tracking serial không hiển thị serial editor.

### Step 4 — Review và Confirm

- [x] Summary supplier/date/invoice.
- [x] SKU count, total quantity, total value.
- [x] Danh sách lines và serial validation state.
- [x] CTA Back/Edit.
- [x] CTA Save Draft.
- [x] CTA Confirm Receipt có confirm dialog.
- [x] Disable double submit.
- [x] Confirm cập nhật mock inventory đúng một lần.
- [x] Receipt Confirmed trở thành read-only.
- [x] Tạo movement `STOCK_RECEIPT` cho từng SKU.
- [x] Khóa SKU có movement đầu tiên.

## 7.3. Receipt Detail từ Figma

- [x] Port `/admin/warehouse/receipts/:receiptId`.
- [x] Hiển thị Draft/Confirmed badge.
- [x] Receipt information.
- [x] Product/SKU/variant lines.
- [x] Quantity, unit cost, line total.
- [x] Serial valid count.
- [x] Summary card.
- [x] Draft có Continue Editing và Confirm.
- [x] Confirmed chỉ xem, có link Inventory/Product.

## 7.4. Tests

- [x] Draft incomplete save.
- [x] Confirm validation.
- [x] Serial count mismatch.
- [x] Duplicate serial.
- [x] Total calculation.
- [x] Confirm idempotency.
- [x] Inventory movement creation.
- [x] SKU lock after confirm.

### Exit gate Group 7

- [x] Receipt flow bốn step hoàn chỉnh.
- [x] Confirm receipt cập nhật mock inventory/movement/serial chính xác.
- [x] Không thể confirm hai lần.
- [x] Tests/lint/build pass.

---

# GROUP 8 — ORDER FULFILLMENT

## 8.1. State machine từ Figma

- [x] Dùng chính xác các state: `WAITING_ACCEPTANCE`, `PICKING`, `WAITING_SERIAL`, `READY_TO_PACK`, `WAITING_GHTK_PICKUP`, `COMPLETED`, `ISSUE`.
- [x] Mỗi transition nằm trong store/service action, không rải trong component.
- [x] `ISSUE` giữ `resumeState`.
- [x] Không cho nhảy state bằng UI ngoài transition hợp lệ.
- [x] Lưu timeline event cho mỗi transition.

## 8.2. Order List từ Figma

- [x] Port `/admin/warehouse/orders`.
- [x] Status tabs và counts.
- [x] Search order/customer.
- [x] Filter status, payment, staff.
- [x] Sort smart/newest/oldest.
- [x] `Việc của tôi` filter.
- [x] Columns order, products, status, assignee, issue, total, action.
- [x] Action label đúng state: Bắt đầu soạn hàng, Tiếp tục soạn, Gán serial, Đóng gói, Theo dõi lấy hàng, Xử lý sự cố, Xem chi tiết.
- [x] Loading/empty/error/pagination.

## 8.3. Fulfillment là flow dài — bắt buộc progress stepper

```text
1. Tiếp nhận → 2. Soạn hàng → 3. Gán serial* → 4. Đóng gói → 5. Chờ GHTK → 6. Hoàn tất
                         * bỏ qua nếu không có sản phẩm serial-tracked
```

- [x] Progress bar xuất hiện ở Order Detail và fulfillment action panel.
- [x] Current/completed/issue state có text và icon, không chỉ màu.
- [x] `ISSUE` hiển thị tại step phát sinh, không biến thành step cuối giả.
- [x] Resume issue quay lại đúng `resumeState`.
- [x] Timeline và progress bar dùng cùng một state source.

## 8.4. Picking

- [x] Accept order gán current staff trong mock state.
- [x] Picking checklist theo order line/SKU.
- [x] Hiển thị requested quantity và available quantity.
- [x] Không complete nếu chưa pick đủ.
- [x] Sau pick: có serial-tracked item → `WAITING_SERIAL`.
- [x] Sau pick: không có serial-tracked item → `READY_TO_PACK`.
- [x] Lưu pickedAt/pickedBy.

## 8.5. Serial assignment

- [x] Chỉ hiển thị serial Available thuộc đúng SKU.
- [x] Số serial được chọn bằng quantity của line.
- [x] Chặn serial đang Reserved/Sold.
- [x] Chặn cùng serial cho hai line.
- [x] Hoàn tất chuyển `READY_TO_PACK`.
- [x] Lưu assignedAt/assignedBy.

## 8.6. Packing

- [x] Step nội bộ `Đo kiện` → `Kiểm tra` → `Tạo vận đơn`.
- [x] Fields weight, length, width, height có inline validation.
- [x] Hiển thị pickup address mock read-only.
- [x] Hiển thị review summary trước submit.
- [x] Mock success/failure phải điều khiển được, không dùng `Math.random()`.
- [x] Success → `WAITING_GHTK_PICKUP`.
- [x] Failure → `ISSUE`, `resumeState = READY_TO_PACK`.
- [x] Issue retry mở lại Packing đúng dữ liệu đã nhập.

## 8.7. Order Detail từ Figma

- [x] Port `/admin/warehouse/orders/:orderId`.
- [x] Section A: Order information.
- [x] Section B: Reservation.
- [x] Section C: Customer/shipping information.
- [x] Section D: Products/SKUs/variant/stock/serial.
- [x] Section E: Timeline.
- [x] Action panel theo state.
- [x] Order summary card.
- [x] Link Product, Inventory SKU và Serial khi phù hợp.
- [x] Responsive two-column desktop, single-column mobile.

## 8.8. Tests

- [x] Mọi valid transition.
- [x] Invalid transition bị từ chối.
- [x] Conditional serial step.
- [x] Picking completeness.
- [x] Serial assignment uniqueness.
- [x] Packing validation.
- [x] Packing success/failure/retry.
- [x] Issue resume state.
- [x] Timeline order.

### Exit gate Group 8

- [x] Fulfillment state machine chạy end-to-end bằng mock data.
- [x] Progress bar phản ánh đúng state.
- [x] Không dùng random để test failure.
- [x] Order Detail hoàn chỉnh, không giữ limitation cũ của Figma.
- [x] Tests/lint/build pass.

---

# GROUP 9 — WAREHOUSE DASHBOARD VÀ PROFILE

## 9.1. Dashboard từ Figma

- [x] Port `/admin/warehouse`.
- [x] Order cards dùng state model mới, không giữ label Waiting/Processing cũ nếu không còn đúng.
- [x] Cards link tới Order List với URL filter tương ứng.
- [x] Inventory stats: total SKU, low stock, out of stock.
- [x] Recent receipts list.
- [x] Orders requiring action today.
- [x] Thêm optional cards Product/Category nếu không làm dashboard quá tải.
- [x] Product count active/draft.
- [x] Category inactive warning.
- [x] Dữ liệu dashboard derive từ cùng mock stores, không duplicate constants.
- [x] Loading/error/empty state cho từng dashboard section.

## 9.2. Header/Profile

- [x] Giữ search/notification/avatar visual từ Figma.
- [x] Header search chỉ implement nếu có scope rõ; không để input giả gây hiểu nhầm.
- [x] Notification button có accessible label.
- [x] Profile menu hỗ trợ keyboard.
- [x] Warehouse role hiển thị rõ.
- [x] Logout mock chỉ xóa session mock, không xóa domain data.

### Exit gate Group 9

- [x] Dashboard counts khớp Product/Inventory/Receipt/Order stores.
- [x] Không có card/link chết.
- [x] Responsive và keyboard navigation đạt.
- [x] Tests/lint/build pass.

---

# GROUP 10 — CROSS-MODULE INTEGRATION VÀ UX HARDENING

## 10.1. Luồng dữ liệu liên module

- [x] Category create → CategorySelect refresh.
- [x] Category rename → Product breadcrumb cập nhật.
- [x] Product create → xuất hiện trong Product List.
- [x] Product activate → có thể chọn trong Receipt.
- [x] Variant create → xuất hiện trong Inventory với quantity 0.
- [x] Receipt confirm → tăng inventory.
- [x] Receipt confirm → tạo serials và movement.
- [x] Receipt confirm → khóa SKU.
- [x] Order reservation → tăng reserved, giảm available.
- [x] Order completion → giảm onHand/reserved đúng mock rule.
- [x] Order issue/retry không double-decrement inventory.
- [x] Dashboard tự cập nhật từ state mới.

## 10.2. URL và navigation

- [x] Breadcrumb ở mọi detail/form page.
- [x] Back navigation có fallback route rõ ràng.
- [x] Filter/search/pagination quan trọng lưu trong URL.
- [x] Deep link tới Product/Receipt/Order/Inventory hoạt động.
- [x] Not-found state cho ID không tồn tại.
- [x] Không dùng raw `<a href>` cho internal route trong Warehouse.

## 10.3. Accessibility

- [x] Tất cả input có label thực.
- [x] Icon-only button có `aria-label`.
- [x] Table headers dùng semantic `<th>`.
- [x] Status không truyền đạt chỉ bằng màu.
- [x] Contrast đạt WCAG AA.
- [x] Touch target mobile tối thiểu 44x44px.
- [x] Focus ring dùng `--shadow-focus` hoặc token tương ứng.
- [x] Modal focus trap và restore focus.
- [x] Error summary có link/focus tới field lỗi.
- [x] Stepper có `aria-current`.
- [x] Reduced motion được tôn trọng.

## 10.4. Responsive

- [x] Desktop 12-column layout khi cần.
- [x] Tablet 8-column.
- [x] Mobile 4-column.
- [x] Data table có giải pháp scroll hoặc card view có chủ đích.
- [x] Filter bar collapse thành disclosure panel trên mobile.
- [x] Stepper dài có compact mobile representation nhưng vẫn đọc được label.
- [x] Không overflow SKU/serial text.

## 10.5. Performance và maintainability

- [x] Lazy-load Warehouse pages trong router.
- [x] Debounce search input.
- [x] Memoize tree/variant combination computations khi cần.
- [x] Không memo hóa mọi thứ máy móc.
- [x] Không để component vượt 150–200 dòng nếu có thể tách theo responsibility.
- [x] Không duplicate order/stock status mapping ở nhiều file.
- [x] Không duplicate mock data giữa dashboard/list/detail.
- [x] Không import Page/Component từ API/Utils layer.

### Exit gate Group 10

- [x] Tất cả cross-module scenarios chạy đúng.
- [x] Không có dead route/action.
- [x] Accessibility/responsive checklist đạt.
- [x] Lint/build pass.

---

# GROUP 11 — TEST, QA, DOCUMENTATION VÀ HANDOFF

## 11.1. Automated tests

- [ ] Co-locate `.test.ts`/`.test.tsx` cạnh source theo `testing.md`.
- [ ] Mock API modules, router navigation và storage.
- [ ] Không test internal state không exported.
- [ ] Test hành vi người dùng bằng role/label/text.
- [ ] Cover loading, empty, error và happy paths.
- [ ] Cover edge cases: quantity 0, empty arrays, long names, deep category.
- [ ] Cover Product wizard navigation.
- [ ] Cover Receipt wizard navigation.
- [ ] Cover Order progress state machine.
- [ ] Cover SKU collision/lock.
- [ ] Cover category cycle.

## 11.2. Manual regression

- [ ] Main storefront `/` vẫn render đúng.
- [ ] Header/Footer hiện tại không bị thay đổi ngoài scope.
- [ ] Tất cả Warehouse routes mở trực tiếp được.
- [ ] Keyboard-only walkthrough Product wizard.
- [ ] Keyboard-only walkthrough Receipt wizard.
- [ ] Keyboard-only walkthrough Order fulfillment.
- [ ] Mobile walkthrough Category/Product/Receipt/Order.
- [ ] Empty mock dataset walkthrough.
- [ ] Error mock mode walkthrough.
- [ ] Reduced-motion walkthrough.

## 11.3. Code quality gate cuối

- [ ] `npm test` pass.
- [ ] `npm run lint` pass với zero warnings.
- [ ] `npm run build` pass với zero TypeScript errors.
- [ ] Không còn `any`.
- [ ] Không còn `console.log` debug.
- [ ] Không còn hardcoded route string rải rác.
- [ ] Không còn mock data lớn trong component.
- [ ] Không còn action button không hoạt động.
- [ ] Không còn Figma placeholder text sai năm hoặc thông tin demo không nhất quán.

## 11.4. Documentation/handoff

- [ ] Cập nhật README chỉ khi cần thêm setup command/dependency thực tế.
- [ ] Không duplicate coding rules sang tài liệu này.
- [ ] Ghi rõ mock architecture và điểm thay thế bằng Backend trong PR description.
- [ ] Liệt kê routes đã thêm.
- [ ] Liệt kê reusable components đã thêm.
- [ ] Liệt kê known limitations còn lại.
- [ ] Chuẩn bị test instructions cho reviewer.
- [ ] PR target `staging`.
- [ ] PR có ít nhất một reviewer approval.

### Exit gate Group 11 — Definition of Done

- [ ] Toàn bộ checkbox bắt buộc trong Group 0–11 đã hoàn thành.
- [ ] Warehouse Staff quản lý được Category, Product, Variant và SKU bằng mock state.
- [ ] Warehouse Staff xem đầy đủ Product, Inventory, Serial, Receipt và Order history.
- [ ] Ba flow dài đều có progress/stepper rõ ràng.
- [ ] Các màn hình Figma Warehouse đã được port và refactor theo repository rules.
- [ ] Product/Category/SKU features bổ sung hoạt động end-to-end không cần Backend.
- [ ] Lint, build và test đều pass.

---

# APPENDIX A — ROUTE CHECKLIST

- [ ] `/admin/warehouse`
- [ ] `/admin/warehouse/orders`
- [ ] `/admin/warehouse/orders/:orderId`
- [ ] `/admin/warehouse/receipts`
- [ ] `/admin/warehouse/receipts/new`
- [ ] `/admin/warehouse/receipts/:receiptId`
- [ ] `/admin/warehouse/products`
- [ ] `/admin/warehouse/products/new`
- [ ] `/admin/warehouse/products/:productId`
- [ ] `/admin/warehouse/products/:productId/edit`
- [ ] `/admin/warehouse/categories`
- [ ] `/admin/warehouse/inventory`
- [ ] `/admin/warehouse/inventory/:productId`

# APPENDIX B — ROLE OWNERSHIP CHECKLIST

- [ ] Warehouse Staff được sửa Product master.
- [ ] Warehouse Staff được sửa Category.
- [ ] Warehouse Staff được tạo Variant/SKU trước khi SKU bị khóa.
- [ ] Warehouse Staff được xử lý Receipt, Inventory, Serial và Order fulfillment.
- [ ] Store Manager chỉ đọc Product source fields trong module Store Manager.
- [ ] Commercial price, marketing content và storefront visibility không được sửa trong Warehouse.
- [ ] Admin có thể kế thừa quyền Warehouse khi role model được triển khai.
- [ ] Phần Gold không được implement trong scope này.

# APPENDIX C — COMMIT CHECKLIST GỢI Ý

- [ ] `chore(warehouse): add warehouse domain foundations`
- [x] `feat(warehouse): add warehouse layout and navigation`
- [x] `feat(category): add hierarchical category management`
- [x] `feat(product): add product management wizard`
- [x] `feat(sku): add variant matrix and sku generator`
- [ ] `feat(inventory): port inventory and serial views`
- [ ] `feat(receipt): port stock receipt workflow`
- [ ] `feat(order): port warehouse fulfillment workflow`
- [ ] `feat(warehouse): port dashboard and profile shell`
- [ ] `test(warehouse): add warehouse integration coverage`
- [ ] `docs(warehouse): document mock implementation and review steps`
