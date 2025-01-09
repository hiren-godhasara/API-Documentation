export interface ApiResponse {
  status: any;
  body: string;
  description?: string;
}

export interface Api {
  apiId: string;
  name: string;
  endpoint: string;
  method: string;
  curl: string;
  payload: any;
  responses: {
    success: ApiResponse;
    failure: ApiResponse[];
  };
  description: string[];
}

export interface ApiData {
  password: string;
  masterPassword: string;
  apis: Api[];
}

export interface AuthState {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}