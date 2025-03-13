import { Component, ErrorInfo, ReactNode } from "react";
import { TodoError } from "../utils/errorUtils";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <h2 className="text-red-800 text-lg font-medium">
            Something went wrong
          </h2>
          <p className="text-red-600 mt-1">
            {this.state.error instanceof TodoError
              ? this.state.error.message
              : "An unexpected error occurred"}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
