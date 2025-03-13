import React, {
  useState,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { motion } from "framer-motion";
import Lane from "./Lane";
import { type Todo } from "../types";
import TodoModal from "./TodoModal";
import BoardHeader from "./BoardHeader";
import { TODO_STATUSES } from "../constants/todo";
import { TodoContext } from "../context/todoContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const TodoBoard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const {
    todos,
    loadingState: { isLoading, updatingIds, deletingIds },
    loadTodos,
    addTodo,
    updateTodo,
    moveTodo,
    deleteTodo,
  } = useContext(TodoContext);

  useEffect(() => {
    const controller = new AbortController();
    loadTodos();
    return () => controller.abort();
  }, []);

  const handleEditClick = useCallback((todo: Todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  }, []);

  const todosWithLoadingState = useMemo(
    () =>
      todos.map((todo) => ({
        ...todo,
        isUpdating: updatingIds.includes(todo.id),
        isDeleting: deletingIds.includes(todo.id),
      })),
    [todos, updatingIds, deletingIds]
  );

  const lanesByStatus = useMemo(
    () =>
      TODO_STATUSES.map((status) => ({
        status,
        todos: todosWithLoadingState.filter((t) => t.status === status),
      })),
    [todosWithLoadingState]
  );

  if (isLoading) {
    return (
      <div className="text-center text-white h-screen w-full flex justify-center items-center">
        <AiOutlineLoading3Quarters className=" text-primary size-8 animate-spin mx-5" />
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white p-4 sm:p-6">
      <BoardHeader setIsModalOpen={setIsModalOpen} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row gap-4 lg:gap-5">
        {lanesByStatus.map(({ status, todos }, index) => (
          <Lane
            key={status}
            status={status}
            laneIndex={index}
            todos={todos}
            moveTodo={moveTodo}
            onUpdateTodo={updateTodo}
            onEditClick={handleEditClick}
            onDeleteTodo={deleteTodo}
          />
        ))}
      </motion.div>

      {isModalOpen && (
        <TodoModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTodo(null);
          }}
          onSave={editingTodo ? updateTodo : addTodo}
          initialData={editingTodo || undefined}
          title={editingTodo ? "Edit Todo" : "Add New Todo"}
        />
      )}

      {todos.length === 0 && !isLoading && (
        <p className="text-center text-gray-500 my-4">
          No todos in this board yet. Add your first todo!
        </p>
      )}
    </div>
  );
};

export default React.memo(TodoBoard);
