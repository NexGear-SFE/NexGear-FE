import type { ApiResponse } from '@/types/api.type'

export type MockResponseOptions = { delayMs?: number; shouldFail?: boolean }

export async function mockResponse<T>(data: T, message = 'Thành công', options: MockResponseOptions = {}): Promise<ApiResponse<T>> {
  await new Promise((resolve) => setTimeout(resolve, options.delayMs ?? 120))
  if (options.shouldFail) throw new Error('MOCK_REQUEST_FAILED')
  return Promise.resolve({ success: true, message, data: structuredClone(data), statusCode: 200 })
}
