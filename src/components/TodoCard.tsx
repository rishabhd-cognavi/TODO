import React, { useState, useCallback, useRef } from "react";
import { type Todo } from "../types";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";

interface TodoCardProps {
  todo: Todo;
  onUpdateTodo: (updatedTodo: Todo) => void;
  onEditClick: (todo: Todo) => void;
  onDeleteTodo: (todoId: number) => void;
  onDragEnd: (todoId: number, dragRect: DOMRect) => void;
}

const TodoCard: React.FC<TodoCardProps> = React.memo(
  ({ todo, onUpdateTodo, onEditClick, onDeleteTodo, onDragEnd }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const dragTimeout = useRef<NodeJS.Timeout>(null);

    const handleToggleItem = useCallback(
      (itemId: string) => {
        if (todo.isUpdating) return;
        onUpdateTodo({
          ...todo,
          items: todo.items.map((item) =>
            item.id === itemId ? { ...item, checked: !item.checked } : item
          ),
        });
      },
      [todo, onUpdateTodo]
    );

    const handleEdit = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if (todo.isUpdating) return;
        onEditClick(todo);
      },
      [todo, onEditClick]
    );

    const handleDelete = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if (todo.isDeleting) return;
        onDeleteTodo(todo.id);
      },
      [todo.id, onDeleteTodo, todo.isDeleting]
    );

    const handleDragStart = () => {
      dragTimeout.current = setTimeout(() => {
        setIsExpanded(false);
      }, 100);
    };

    const handleDragEnd = useCallback((): void => {
      if (dragTimeout.current) {
        clearTimeout(dragTimeout.current);
      }
      if (cardRef.current) {
        // Get the current position of the card
        const rect = cardRef.current.getBoundingClientRect();
        // Pass both the id and the rect
        onDragEnd(todo.id, rect);
      }
    }, [todo.id, onDragEnd]);

    const progress = React.useMemo(
      () =>
        Math.round(
          (todo.items.filter((item) => item.checked).length /
            todo.items.length) *
            100
        ) || 0,
      [todo.items]
    );

    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{
          duration: 0.2,
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        drag
        dragSnapToOrigin
        dragConstraints={{ left: -500, right: 500, top: -500, bottom: 500 }}
        dragElastic={0.7}
        whileDrag={{
          scale: 1.03,
          zIndex: 999,
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ touchAction: "none" }}
        className="p-4 bg-white shadow-lg rounded-lg cursor-move hover:shadow-xl transition-all border border-border">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-text-primary line-clamp-1">
            {todo.title}
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleEdit}
              disabled={todo.isUpdating}
              className="p-1 hover:bg-border rounded disabled:opacity-50 disabled:cursor-not-allowed">
              <CiEdit className="text-text-secondary size-5" />
            </button>
            <button
              onClick={handleDelete}
              disabled={todo.isDeleting}
              className="group p-1 hover:bg-border rounded group disabled:opacity-50 disabled:cursor-not-allowed">
              <MdDelete className="text-text-secondary size-5 group-hover:text-danger" />
            </button>
          </div>
        </div>

        <div className="mb-2">
          <div className="w-full bg-border rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm text-text-secondary">
            {progress}% complete
          </span>
        </div>

        <motion.div
          layout
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isExpanded ? 1 : 0,
            height: isExpanded ? "auto" : 0,
          }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden mt-3 space-y-2">
          <p className="text-text-secondary">{todo.description}</p>

          <div className="space-y-1 mt-3">
            {todo.items.map((item) => (
              <div key={item.id} className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleToggleItem(item.id)}
                  className="w-4 h-4 m-0.5 rounded border-border 
                          accent-primary 
                          checked:bg-primary checked:border-primary 
                          cursor-pointer"
                />
                <span
                  className={`text-sm ${
                    item.checked
                      ? "line-through text-text-secondary"
                      : "text-text-primary"
                  }`}>
                  {item.content}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.todo.id === nextProps.todo.id &&
    prevProps.todo.title === nextProps.todo.title &&
    prevProps.todo.status === nextProps.todo.status &&
    prevProps.todo.isDeleting === nextProps.todo.isDeleting &&
    prevProps.todo.isUpdating === nextProps.todo.isUpdating &&
    JSON.stringify(prevProps.todo.items) ===
      JSON.stringify(nextProps.todo.items)
);

TodoCard.displayName = "TodoCard";

export default TodoCard;
