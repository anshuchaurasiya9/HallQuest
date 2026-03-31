
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string | null;
  role: string;
  phone?: string | null;
  deleted_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  success: boolean;
  status: number;
  message: string;
  data: {
    user: User;
    token: string;
  };
  errors?: Record<string, string[]>;
}

const API_BASE_URL = 'https://bookmyfunctionhall.spryzen.in/api/v1';

export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.message || 'Registration failed');
  }

  return result;
};

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    // Handle validation errors or invalid credentials
    if (response.status === 422 && result.errors) {
      const firstError = Object.values(result.errors)[0] as string[];
      throw new Error(firstError[0] || result.message || 'Login failed');
    }
    throw new Error(result.message || 'Login failed');
  }

  return result;
};
