/**
 * Centralized Application Route Path Constants & Dynamic Generators
 */
export const ROUTES = {
  // Public / Customer Routes
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: (slug: string = ':slug') => `/products/${slug}`,
  BLOGS: '/blogs',
  BLOG_DETAIL: (id: string = ':id') => `/blogs/${id}`,
  NOT_FOUND: '/404',

  // Authentication Routes
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },

  // Customer Account Routes
  ACCOUNT: {
    ROOT: '/account',
    SETTINGS: '/account/settings',
    ORDERS: '/account/orders',
    ORDER_DETAIL: (id: string = ':id') => `/account/orders/${id}`,
  },

  // Store Manager / Admin Routes
  STORE_MANAGER: {
    ROOT: '/storemanager',
    BLOGS: '/storemanager/blogs',
    SETTINGS: '/storemanager/settings',
  },

  // Technical Staff Routes
  TECH_STAFF: {
    ROOT: '/tech-staff',
    DASHBOARD: '/tech-staff',
    SERIAL: '/tech-staff/serial',
    SETTINGS: '/tech-staff/settings',
  },
} as const
