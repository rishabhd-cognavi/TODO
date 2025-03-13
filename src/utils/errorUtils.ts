export class TodoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TodoError";
  }
}

export const handleApiError = (error: unknown): TodoError => {
  if (error instanceof TodoError) return error;
  if (error instanceof Error) return new TodoError(error.message);
  return new TodoError("An unexpected error occurred");
};
