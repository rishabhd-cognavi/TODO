export const TODO_STATUSES = ["Pending", "In Progress", "Completed"] as const;
export type TodoStatus = (typeof TODO_STATUSES)[number];
