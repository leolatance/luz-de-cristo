// Cliente API seguro para comunicação com backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface ApiResponse<T> {
  data?: T;
  error?: string;
  errors?: Array<{ msg: string; param: string }>;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.loadToken();
  }

  private loadToken() {
    this.token = localStorage.getItem('auth_token');
  }

  private saveToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  private removeToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
      };

      if (this.token) {
        headers.Authorization = `Bearer ${this.token}`;
      }

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || 'Erro na requisição' };
      }

      return { data };
    } catch (error) {
      console.error('Erro na API:', error);
      return { error: 'Erro de conexão com o servidor' };
    }
  }

  // Autenticação
  async login(email: string, password: string) {
    const response = await this.request<{
      token: string;
      user: {
        id: string;
        email: string;
        name: string;
        isPremium: boolean;
        trialEndsAt?: string;
        premiumEndsAt?: string;
        role: string;
      };
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.data?.token) {
      this.saveToken(response.data.token);
    }

    return response;
  }

  async register(email: string, password: string, name: string) {
    const response = await this.request<{
      token: string;
      user: {
        id: string;
        email: string;
        name: string;
        isPremium: boolean;
        trialEndsAt?: string;
        premiumEndsAt?: string;
      };
    }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });

    if (response.data?.token) {
      this.saveToken(response.data.token);
    }

    return response;
  }

  async getMe() {
    return this.request<{
      user: {
        id: string;
        email: string;
        name: string;
        isPremium: boolean;
        trialEndsAt?: string;
        premiumEndsAt?: string;
        role: string;
      };
    }>('/auth/me');
  }

  logout() {
    this.removeToken();
  }

  // Admin
  async getUsers() {
    return this.request<{
      users: Array<{
        _id: string;
        email: string;
        name: string;
        isPremium: boolean;
        trialEndsAt?: string;
        createdAt: string;
        lastLoginAt?: string;
        loginAttempts: number;
        lockedUntil?: string;
        role: string;
      }>;
    }>('/admin/users');
  }

  async createUser(userData: {
    email: string;
    password: string;
    name: string;
    isPremium?: boolean;
    role?: string;
  }) {
    return this.request<{
      user: {
        id: string;
        email: string;
        name: string;
        isPremium: boolean;
        role: string;
        createdAt: string;
      };
    }>('/admin/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(userId: string, updates: {
    email?: string;
    name?: string;
    isPremium?: boolean;
    password?: string;
    role?: string;
  }) {
    return this.request<{
      user: {
        _id: string;
        email: string;
        name: string;
        isPremium: boolean;
        role: string;
      };
    }>(`/admin/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteUser(userId: string) {
    return this.request<{ message: string }>(`/admin/users/${userId}`, {
      method: 'DELETE',
    });
  }

  async activatePremium(userId: string) {
    return this.request<{
      user: {
        _id: string;
        email: string;
        name: string;
        isPremium: boolean;
      };
    }>(`/admin/users/${userId}/premium`, {
      method: 'POST',
    });
  }

  async makeFree(userId: string) {
    return this.request<{
      user: {
        _id: string;
        email: string;
        name: string;
        isPremium: boolean;
        trialEndsAt?: string;
        premiumEndsAt?: string;
      };
    }>(`/admin/users/${userId}/free`, {
      method: 'POST',
    });
  }

  async getStats() {
    return this.request<{
      totalUsers: number;
      premiumUsers: number;
      trialUsers: number;
      freeUsers: number;
      todayRegistrations: number;
    }>('/admin/stats');
  }
}

export const apiClient = new ApiClient(API_URL); 