export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
  statusCode: number
}

export interface PaginatedResponse<T> {
  items: T[]
  meta: {
    page: number
    limit: number
    totalItems: number
    totalPages: number
  }
}
