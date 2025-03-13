export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiTodo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface ApiError {
  message: string;
  status: number;
}
