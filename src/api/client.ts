/**
 * Base API Client for AEGIS-IPsec
 * 
 * Supports switching between Mock Mode and live Backend REST/WebSocket endpoints.
 * All React components interact exclusively with Typed Services, keeping Docker/Linux
 * and networking daemon internals completely separated from the UI.
 */

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface ApiClientConfig {
  baseUrl: string;
  useMock: boolean;
  timeoutMs: number;
}

export const defaultClientConfig: ApiClientConfig = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  useMock: import.meta.env.VITE_USE_MOCKS !== 'false', // Defaults to true initially
  timeoutMs: 8000,
};

class ApiClient {
  private config: ApiClientConfig;

  constructor(config: ApiClientConfig = defaultClientConfig) {
    this.config = config;
  }

  public getConfig(): ApiClientConfig {
    return { ...this.config };
  }

  public setConfig(newConfig: Partial<ApiClientConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  public async get<T>(endpoint: string, mockFallback: () => Promise<T>): Promise<T> {
    if (this.config.useMock) {
      // Simulate realistic SOC network latency (80ms - 220ms)
      await new Promise((resolve) => setTimeout(resolve, 120));
      return mockFallback();
    }

    try {
      const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API error ${response.status}: ${response.statusText}`);
      }

      const json = await response.json();
      return json.data ?? json;
    } catch (err) {
      console.warn(`[ApiClient] Live endpoint ${endpoint} failed, falling back to mock:`, err);
      return mockFallback();
    }
  }

  public async post<T, B = unknown>(endpoint: string, body: B, mockFallback: () => Promise<T>): Promise<T> {
    if (this.config.useMock) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return mockFallback();
    }

    try {
      const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`API error ${response.status}: ${response.statusText}`);
      }

      const json = await response.json();
      return json.data ?? json;
    } catch (err) {
      console.warn(`[ApiClient] Live endpoint ${endpoint} failed, falling back to mock:`, err);
      return mockFallback();
    }
  }
}

export const apiClient = new ApiClient();
