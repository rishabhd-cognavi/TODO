import React, { useState } from "react";
import { TodoContext } from "./todoContext";
import { Todo } from "../types";
import { TodoStatus } from "../constants/todo";
import { todoApi } from "../services/api";
import { handleApiError } from "../utils/errorUtils";
import { ApiTodo } from "../types/api";

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadTodos = async () => {
    setIsLoading(true);
    setError(null);
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
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setIsLoading(false);
    }
  };

  const addTodo = async (todo: Todo) => {
    const newTodo: Todo = {
      id: Date.now(),
      title: todo.title || "",
      description: todo.description || "",
      status: "Pending",
      items: todo.items || [],
    };
    const previousTodos = todos;
    setTodos((prev) => [...prev, newTodo]);

    try {
      await todoApi.addTodo({
        todo: newTodo.title,
        completed: newTodo.status === "Completed",
        userId: 26,
      });
    } catch (err) {
      // Revert on error
      setTodos(previousTodos);
      setError(handleApiError(err));
    }
  };

  const updateTodo = async (updatedTodo: Todo) => {
    const previousTodos = todos;
    setTodos((prev) =>
      prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );

    try {
      await todoApi.updateTodo(updatedTodo.id, {
        todo: updatedTodo.title,
        completed: updatedTodo.status === "Completed",
      });
    } catch (err) {
      // Revert on error
      setTodos(previousTodos);
      setError(handleApiError(err));
    }
  };

  const moveTodo = async (id: number, newStatus: TodoStatus) => {
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
    } catch (err) {
      // Rollback on error
      setTodos(previousTodos);
      setError(handleApiError(err));
    }
  };

  const deleteTodo = async (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    try {
      await todoApi.deleteTodo(id);
    } catch (err) {
      setError(handleApiError(err));
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        isLoading,
        error,
        loadTodos,
        addTodo,
        updateTodo,
        moveTodo,
        deleteTodo,
      }}>
      {children}
    </TodoContext.Provider>
  );
};
