# Warehouse Frontend Handoff

## Phạm vi đã triển khai

Module Warehouse Staff chạy hoàn toàn bằng mock state phía frontend. Dữ liệu Product, Category, Variant/SKU, Inventory, Serial, Stock Receipt và Order dùng chung một Zustand store tại `src/stores/warehouseStore.ts`; các trang không giữ bản sao domain data riêng.

Các nghiệp vụ thay đổi nhiều aggregate được đặt trong store action:

- Xác nhận phiếu nhập validate toàn bộ trước khi tăng tồn, tạo serial/movement và khóa SKU. Action idempotent, phiếu đã xác nhận không thể chạy lần hai.
- Reservation của order tăng `reserved` đúng một lần.
- Bàn giao GHTK giảm `onHand`/`reserved`, chuyển serial sang `SOLD` và tạo movement đúng một lần.
- GHTK failure giữ `resumeState`; retry packing không thay đổi inventory trước khi bàn giao thành công.

Khi tích hợp Backend, thay các module trong `src/apis/` bằng HTTP client theo `agent-docs/API_CONVENTIONS.md`, giữ nguyên domain types, schema validation, route components và query/filter contract. Các transaction xác nhận receipt/reservation/completion phải được enforce lại ở Backend bằng idempotency key hoặc transaction database; frontend validation không thay thế server validation.

## Routes

- `/admin/warehouse`
- `/admin/warehouse/orders`
- `/admin/warehouse/orders/:orderId`
- `/admin/warehouse/receipts`
- `/admin/warehouse/receipts/new`
- `/admin/warehouse/receipts/:receiptId`
- `/admin/warehouse/receipts/:receiptId/edit`
- `/admin/warehouse/products`
- `/admin/warehouse/products/new`
- `/admin/warehouse/products/:productId`
- `/admin/warehouse/products/:productId/edit`
- `/admin/warehouse/categories`
- `/admin/warehouse/inventory`
- `/admin/warehouse/inventory/:productId`

Warehouse pages được lazy-load. Search/filter/pagination quan trọng được lưu trên URL để deep link và back/forward hoạt động ổn định.

## Reusable components và utilities

- Layout/navigation: `WarehouseHeader`, `WarehouseSidebar`, `WarehouseUserMenu`, `WarehousePageHeader`.
- Data feedback: `DataState`, `DataTableSkeleton`, `WarehousePagination`, `WarehouseFilterBar`, `WarehouseStatCard`.
- Workflow: `ProgressStepper`, `ConfirmDialog`, `ReceiptSerialDialog`.
- Catalog/inventory: `CategorySelect`, `VariantMatrixEditor`, `SerialNumberFields`, `ProductInventoryPanel`, `StockStatusBadge`.
- Pure rules: category tree, SKU generation/collision, inventory rows/status, receipt validation/totals, order state labels/progress/parcel validation, dashboard metrics.

## Known limitations

- State hiện ở memory và reset khi reload; chưa có persistence hoặc đồng bộ đa tab.
- API modules chỉ trả mock response; chưa có authentication/authorization thực, optimistic concurrency hoặc server error taxonomy.
- GHTK success/failure là công tắc mock có chủ đích; chưa gọi GHTK API, in nhãn hoặc webhook.
- “Tạo phiếu điều chỉnh” được hiển thị disabled cho Manager/Admin; adjustment, hàng hoàn, warranty và phần Gold nằm ngoài scope.
- Product image dùng brand fallback vì mock chưa có media service.
- Một kho cố định được dùng theo business rule hiện tại.

## Reviewer instructions

1. Checkout branch `feature/warehouse-management` và target PR vào `staging`.
2. Chạy `npm install`, `npm test`, `npm run lint`, `npm run build`.
3. Chạy `npm run dev`, mở `/admin/warehouse`.
4. Walkthrough Product: tạo Product → thêm option/variant → kiểm tra SKU auto/manual → lưu → mở Inventory.
5. Walkthrough Receipt: tạo draft chưa đủ → mở lại → thêm SKU/quantity/cost/serial → review → confirm → kiểm tra Inventory/movement/SKU lock.
6. Walkthrough Order: accept → tick đủ picking → gán đúng serial nếu cần → nhập kiện → mô phỏng GHTK fail/retry → GHTK pickup → kiểm tra inventory movement.
7. Kiểm tra URL filters, deep links, invalid IDs, keyboard Tab/Escape, mobile viewport và reduced-motion.

## QA evidence

- Vitest: 20 test files, 72 tests đều pass.
- ESLint: pass, zero warnings.
- TypeScript project build: pass, zero errors.
- Vite production build: pass; Warehouse pages được tách thành lazy chunks, main chunk khoảng 352 kB trước gzip.
- Browser regression: storefront và toàn bộ Warehouse list/new/detail/edit deep-link đã render; desktop/mobile layout, keyboard focus và invalid-ID state đã được kiểm tra.
- Empty/error/loading states được xác nhận bằng component test harness có mock API kiểm soát được.

Không push hoặc tạo PR từ handoff này. Việc tạo PR và reviewer approval cần chủ repository thực hiện hoặc ủy quyền riêng.
