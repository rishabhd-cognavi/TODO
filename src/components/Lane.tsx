import { AnimatePresence } from "framer-motion";
import React, { useCallback } from "react";
import TodoCard from "./TodoCard";
import { type Todo } from "../types";
import { type TodoStatus, TODO_STATUSES } from "../constants/todo";

interface LaneProps {
  status: TodoStatus;
  todos: Todo[];
  moveTodo: (id: number, newStatus: TodoStatus) => void;
  onUpdateTodo: (updatedTodo: Todo) => void;
  onEditClick: (todo: Todo) => void;
  onDeleteTodo: (id: number) => void;
  laneIndex: number;
}

const Lane: React.FC<LaneProps> = React.memo(
  ({
    status,
    todos,
    moveTodo,
    onUpdateTodo,
    onEditClick,
    onDeleteTodo,
    laneIndex,
  }) => {
    const handleDragEnd = useCallback(
      (todoId: number, dragRect: DOMRect) => {
        const lanes = Array.from(document.querySelectorAll("[data-lane]"));
        const OVERLAP_THRESHOLD = 0.3;

        const targetLane = lanes.find((lane, index) => {
          if (index === laneIndex) return false;

          const laneRect = lane.getBoundingClientRect();
          const overlapX =
            Math.min(dragRect.right, laneRect.right) -
            Math.max(dragRect.left, laneRect.left);
          const overlapY =
            Math.min(dragRect.bottom, laneRect.bottom) -
            Math.max(dragRect.top, laneRect.top);

          if (overlapX <= 0 || overlapY <= 0) return false;

          const overlapArea = overlapX * overlapY;
          const cardArea = dragRect.width * dragRect.height;
          return overlapArea / cardArea > OVERLAP_THRESHOLD;
        });

        if (targetLane) {
          const targetIndex = lanes.indexOf(targetLane);
          moveTodo(todoId, TODO_STATUSES[targetIndex]);
        }
      },
      [laneIndex, moveTodo]
    );

    return (
      <div
        data-lane={status}
        className="w-full lg:w-1/3 p-4 rounded-lg min-h-[200px] bg-white border border-border">
        <h2 className="text-lg font-bold mb-3 text-text-primary flex items-center justify-between">
          <span>{status}</span>
          <span className="text-sm bg-border px-2 py-1 rounded w-10 text-center">
            {todos.length}
          </span>
        </h2>
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {todos.map((todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                onUpdateTodo={onUpdateTodo}
                onEditClick={onEditClick}
                onDeleteTodo={onDeleteTodo}
                onDragEnd={handleDragEnd}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.status === nextProps.status &&
    prevProps.laneIndex === nextProps.laneIndex &&
    prevProps.todos.length === nextProps.todos.length &&
    JSON.stringify(prevProps.todos) === JSON.stringify(nextProps.todos)
);

export default Lane;
