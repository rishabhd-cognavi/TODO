import { createContext } from "react";
import { type Todo } from "../types";
import { TodoStatus } from "../constants/todo";

interface TodoContextType {
  todos: Todo[];
  isLoading: boolean;
  error: Error | null;
  loadTodos: () => Promise<void>;
  addTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  moveTodo: (id: number, status: TodoStatus) => void;
  deleteTodo: (id: number) => void;
}

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  isLoading: false,
  error: null,
  loadTodos: async () => {},
  addTodo: () => {},
  updateTodo: () => {},
  moveTodo: () => {},
  deleteTodo: () => {},
});
