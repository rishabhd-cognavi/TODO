export interface TodoItem {
  id: string;
  content: string;
  checked: boolean;
}

export interface Todo {
  id: number;
  title: string;
  description: string;
  status: string;
  items: TodoItem[];
  isDeleting?: boolean;
  isUpdating?: boolean;
  isMoving?: boolean;
}

export interface TodoLoadingState {
  isLoading: boolean;
  isAdding: boolean;
  updatingIds: number[];
  movingIds: number[];
  deletingIds: number[];
}

export type MessageType = "success" | "error" | "warning";

export interface Message {
  type: MessageType;
  text: string;
}
