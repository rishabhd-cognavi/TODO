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
}
