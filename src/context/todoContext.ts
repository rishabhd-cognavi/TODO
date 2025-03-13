import { createContext } from "react";
import { type Todo, TodoLoadingState, Message } from "../types";
import { TodoStatus } from "../constants/todo";

interface TodoContextType {
  todos: Todo[];
  loadingState: TodoLoadingState;
  loadTodos: () => Promise<void>;
  addTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  moveTodo: (id: number, status: TodoStatus) => void;
  deleteTodo: (id: number) => void;
  message: Message | null;
  clearMessage: () => void;
}

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  loadingState: {
    isLoading: false,
    isAdding: false,
    updatingIds: [],
    movingIds: [],
    deletingIds: [],
  },
  loadTodos: async () => {},
  addTodo: () => {},
  updateTodo: () => {},
  moveTodo: () => {},
  deleteTodo: () => {},
  message: null,
  clearMessage: () => {},
});
