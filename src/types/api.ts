export interface ApiResponse<T> {
  data?: T
  error?: string
  status: number
}

export interface HealthCheckResponse {
  status: string
  timestamp: string
}