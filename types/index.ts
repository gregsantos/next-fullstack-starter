export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface ApiResponse<T> {
  data: T;
  error: string | null;
} 