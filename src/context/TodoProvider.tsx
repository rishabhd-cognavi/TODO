import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { TodoContext } from "./todoContext";
import { Todo, TodoLoadingState, Message } from "../types";
import { TodoStatus } from "../constants/todo";
import { todoApi } from "../services/api";
import { handleApiError } from "../utils/errorUtils";
import { ApiTodo } from "../types/api";

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingState, setLoadingState] = useState<TodoLoadingState>({
    isLoading: false,
    isAdding: false,
    updatingIds: [],
    movingIds: [],
    deletingIds: [],
  });
  const [message, setMessage] = useState<Message | null>(null);

  const clearMessage = useCallback(() => {
    setMessage(null);
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(clearMessage, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, clearMessage]);

  // Add cleanup on unmount
  useEffect(() => {
    return () => {
      setTodos([]);
      setMessage(null);
    };
  }, []);

  // Improve error handling
  const handleError = (err: unknown, customMessage?: string) => {
    const error = handleApiError(err);
    setMessage({
      type: "error",
      text: customMessage || error.message,
    });
  };

  // Add debouncing ref
  const loadingRef = useRef(false);

  const loadTodos = useCallback(async () => {
    // Prevent duplicate calls while loading
    if (loadingRef.current) return;

    loadingRef.current = true;
    setLoadingState((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await todoApi.getTodos();
      const transformedTodos = response.data.map((apiTodo: ApiTodo) => ({
        id: apiTodo.id,
        title: apiTodo.todo,
        description: apiTodo.todo,
        todo: apiTodo.todo,
        status: apiTodo.completed ? "Completed" : "Pending",
        items: [
          {
            id: crypto.randomUUID(),
            content: apiTodo.todo,
            checked: apiTodo.completed,
          },
        ],
      }));
      setTodos(transformedTodos);
      setMessage({ type: "success", text: "Todos loaded successfully" });
    } catch (err) {
      handleError(err);
    } finally {
      setLoadingState((prev) => ({ ...prev, isLoading: false }));
      loadingRef.current = false;
    }
  }, []);

  const addTodo = useCallback(async (todo: Todo) => {
    if (!todo.title?.trim()) {
      setMessage({ type: "warning", text: "Title is required" });
      return;
    }
    setLoadingState((prev) => ({ ...prev, isAdding: true }));
    try {
      const response = await todoApi.addTodo({
        todo: todo.title,
        completed: false,
        userId: 26,
      });

      const newTodo: Todo = {
        id: response.data.id,
        title: todo.title || "",
        description: todo.description || "",
        status: "Pending",
        items: todo.items || [],
      };

      setTodos((prev) => [...prev, newTodo]);
      setMessage({ type: "success", text: "Todo added successfully" });
    } catch (err) {
      handleError(err);
    } finally {
      setLoadingState((prev) => ({ ...prev, isAdding: false }));
    }
  }, []);

  const updateTodo = useCallback(
    async (updatedTodo: Todo) => {
      setLoadingState((prev) => ({
        ...prev,
        updatingIds: [...prev.updatingIds, updatedTodo.id],
      }));
      const previousTodos = todos;
      setTodos((prev) =>
        prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      );

      try {
        await todoApi.updateTodo(updatedTodo.id, {
          todo: updatedTodo.title,
          completed: updatedTodo.status === "Completed",
        });
        setMessage({ type: "success", text: "Todo updated successfully" });
      } catch (err) {
        handleError(err);
        setTodos(previousTodos);
      } finally {
        setLoadingState((prev) => ({
          ...prev,
          updatingIds: prev.updatingIds.filter((id) => id !== updatedTodo.id),
        }));
      }
    },
    [todos]
  );

  const moveTodo = useCallback(
    async (id: number, newStatus: TodoStatus) => {
      setLoadingState((prev) => ({
        ...prev,
        movingIds: [...prev.movingIds, id],
      }));
      const previousTodos = todos;
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, status: newStatus } : todo
        )
      );

      try {
        await todoApi.updateTodo(id, {
          completed: newStatus === "Completed",
        });
        setMessage({ type: "success", text: `Todo moved to ${newStatus}` });
      } catch (err) {
        handleError(err);
        setTodos(previousTodos);
      } finally {
        setLoadingState((prev) => ({
          ...prev,
          movingIds: prev.movingIds.filter((moveId) => moveId !== id),
        }));
      }
    },
    [todos]
  );

  const deleteTodo = useCallback(async (id: number) => {
    setLoadingState((prev) => ({
      ...prev,
      deletingIds: [...prev.deletingIds, id],
    }));
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isDeleting: true } : todo
      )
    );

    try {
      await todoApi.deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      setMessage({ type: "success", text: "Todo deleted successfully" });
    } catch (err) {
      handleError(err);
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, isDeleting: false } : todo
        )
      );
    } finally {
      setLoadingState((prev) => ({
        ...prev,
        deletingIds: prev.deletingIds.filter((deleteId) => deleteId !== id),
      }));
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      todos,
      loadingState,
      message,
      clearMessage,
      loadTodos,
      addTodo,
      updateTodo,
      moveTodo,
      deleteTodo,
    }),
    [
      todos,
      loadingState,
      message,
      clearMessage,
      loadTodos,
      addTodo,
      updateTodo,
      moveTodo,
      deleteTodo,
    ]
  );

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};
