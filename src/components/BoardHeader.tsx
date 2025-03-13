import React from "react";

type BoardHeaderProps = {
  setIsModalOpen: (open: boolean) => void;
};

const BoardHeader = React.memo(({ setIsModalOpen }: BoardHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-end items-center mb-6">
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full sm:w-auto bg-success text-white px-4 py-2 rounded hover:bg-success-hover">
        Add New Todo
      </button>
    </div>
  );
});

BoardHeader.displayName = "BoardHeader";

export default BoardHeader;
