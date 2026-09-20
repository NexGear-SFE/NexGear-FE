/**
  * Hằng số đường dẫn Route và Hàm khởi tạo URL động
  */
export const ROUTES = {
   // Đường dẫn công khai / Khách hàng
   HOME: '/',
   PRODUCTS: '/products',
   PRODUCT_DETAIL: (slug: string = ':slug') => `/products/${slug}`,
   BLOGS: '/blogs',
   BLOG_DETAIL: (id: string = ':id') => `/blogs/${id}`,
   NOT_FOUND: '/404',
   UNDER_DEVELOPMENT: '/under-development',
 
   // Đường dẫn Xác thực tài khoản
   AUTH: {
     LOGIN: '/login',
     REGISTER: '/register',
   },
 
   // Đường dẫn Tài khoản khách hàng
   ACCOUNT: {
     ROOT: '/account',
     SETTINGS: '/account/settings',
     ORDERS: '/account/orders',
     ORDER_DETAIL: (id: string = ':id') => `/account/orders/${id}`,
   },
 
   // Đường dẫn Quản lý cửa hàng (Admin / Store Manager)
   STORE_MANAGER: {
     ROOT: '/storemanager',
     HOME_CONTENT: '/storemanager/home-content',
     HOME_CONFIG: '/storemanager/home-config',
     DASHBOARD: '/storemanager/dashboard',
     CATEGORIES: '/storemanager/categories',
     PRODUCTS: '/storemanager/products',
     CONTACT: '/storemanager/contact',
     BLOGS: '/storemanager/blogs',
     SETTINGS: '/storemanager/settings',
     SUB_PATHS: {
       HOME_CONTENT: 'home-content',
       HOME_CONFIG: 'home-config',
       DASHBOARD: 'dashboard',
       BLOGS: 'blogs',
       SETTINGS: 'settings',
     },
   },
 
   // Đường dẫn Nhân viên kỹ thuật
   TECH_STAFF: {
     ROOT: '/tech-staff',
     DASHBOARD: '/tech-staff',
     SERIAL: '/tech-staff/serial',
     SETTINGS: '/tech-staff/settings',
     SUB_PATHS: {
       SERIAL: 'serial',
       SETTINGS: 'settings',
     },
   },
 } as const
