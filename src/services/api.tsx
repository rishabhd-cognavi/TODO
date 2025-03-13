import axios, { AxiosError } from "axios";
import { ApiResponse, ApiTodo, ApiError } from "../types/api";

const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) {
  throw new Error("API_URL is not defined in environment variables");
}

const api = axios.create({ baseURL: API_URL });

interface TodoUpdate {
  todo?: string;
  completed?: boolean;
}

export const todoApi = {
  getTodos: async (): Promise<ApiResponse<ApiTodo[]>> => {
    try {
      const { data } = await api.get("/");
      return { data: data.todos, status: 200 };
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      throw new Error(err.response?.data.message || "Failed to fetch todos");
    }
  },

  addTodo: async (todo: Omit<ApiTodo, "id">): Promise<ApiResponse<ApiTodo>> => {
    try {
      const { data } = await api.post("/add", todo);
      return { data, status: 201 };
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      throw new Error(err.response?.data.message || "Failed to add todo");
    }
  },

  updateTodo: async (
    id: number,
    update: TodoUpdate
  ): Promise<ApiResponse<ApiTodo>> => {
    try {
      const { data } = await api.put(`/${id}`, update);
      return { data, status: 200 };
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      throw new Error(err.response?.data.message || "Failed to update todo");
    }
  },

  deleteTodo: async (id: number): Promise<ApiResponse<void>> => {
    try {
      await api.delete(`/${id}`);
      return { data: undefined, status: 200 };
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      throw new Error(err.response?.data.message || "Failed to delete todo");
    }
  },
};
