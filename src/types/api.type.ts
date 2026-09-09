export type ApiResponse<T> = {
  success: boolean
  message: string
  data: T
  statusCode: number
}

export type PaginatedResponse<T> = {
  items: T[]
  meta: {
    page: number
    limit: number
    totalItems: number
    totalPages: number
  }
}
