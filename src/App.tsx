import React from "react";
import TodoBoard from "./components/TodoBoard";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { TodoProvider } from "./context/TodoProvider";

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <TodoProvider>
        <div className="p-5">
          <h1 className="text-center text-2xl font-bold mb-4 text-white">
            Trello-Style Todo Board
          </h1>
          <TodoBoard />
        </div>
      </TodoProvider>
    </ErrorBoundary>
  );
};

export default App;
