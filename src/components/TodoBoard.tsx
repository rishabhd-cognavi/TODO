import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import Lane from "./Lane";
import { type Todo } from "../types";
import TodoModal from "./TodoModal";
import BoardHeader from "./BoardHeader";
import { TODO_STATUSES } from "../constants/todo";
import { TodoContext } from "../context/todoContext";

const TodoBoard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const {
    todos,
    isLoading,
    error,
    loadTodos,
    addTodo,
    updateTodo,
    moveTodo,
    deleteTodo,
  } = useContext(TodoContext);

  useEffect(() => {
    loadTodos();
  }, []);

  const handleEditClick = (todo: Todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  if (isLoading)
    return <div className="text-center text-white">Loading...</div>;

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <h2 className="text-red-800 text-lg font-medium">
          Error Loading Todos
        </h2>
        <p className="text-red-600 mt-1">{error.message}</p>
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
        {TODO_STATUSES.map((status, index) => (
          <Lane
            key={status}
            status={status}
            laneIndex={index}
            todos={todos.filter((t) => t.status === status)}
            moveTodo={moveTodo}
            onUpdateTodo={updateTodo}
            onEditClick={handleEditClick}
            onDeleteTodo={deleteTodo}
          />
        ))}
      </motion.div>

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

      {todos.length === 0 && (
        <p className="text-center text-gray-500 my-4">
          No todos in this board yet. Add your first todo!
        </p>
      )}
    </div>
  );
};

export default TodoBoard;
