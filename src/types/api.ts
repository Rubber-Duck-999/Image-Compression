export interface ApiResponse<T = any> {
  data?: T
  error?: string
  status: number
}

export interface HealthCheckResponse {
  status: string
  timestamp: string
} 