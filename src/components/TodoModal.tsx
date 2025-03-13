import React, { useEffect, useState } from "react";
import { type Todo } from "../types";
import { motion, AnimatePresence } from "framer-motion";

interface TodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (todo: Todo) => void;
  initialData?: Todo;
  title: string;
}

const TodoModal: React.FC<TodoModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  title,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    items: [""],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        items: initialData.items?.map((item) => item.content) || [""],
      });
    } else {
      setFormData({
        title: "",
        description: "",
        items: [""],
      });
    }
  }, [initialData, isOpen]);

  const generateNumericId = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim().length < 3) return;

    onSave({
      id: initialData?.id || generateNumericId(),
      title: formData.title,
      status: initialData?.status || "pending",
      description: formData.description,
      items: formData.items
        .filter((item) => item.trim())
        .map((item) => ({
          id: crypto.randomUUID(),
          content: item,
          checked: false,
        })),
    });
    onClose();
  };

  const addChecklistItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, ""],
    }));
  };

  const removeChecklistItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const updateChecklistItem = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((item, i) => (i === index ? value : item)),
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto text-black">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{title}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Todo Title"
                className="p-2 rounded w-full border border-border placeholder-text-secondary focus:border-primary outline-none"
                minLength={3}
                required
              />

              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Description"
                className="w-full p-2 rounded border border-border placeholder-text-secondary focus:border-primary outline-none"
                rows={3}
              />

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-text-primary">
                    Checklist Items
                  </h3>
                  <button
                    type="button"
                    onClick={addChecklistItem}
                    className="text-sm bg-border text-text-secondary px-3 py-1 rounded border border-border hover:text-primary hover:border-primary">
                    + Add Item
                  </button>
                </div>

                {formData.items.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) =>
                        updateChecklistItem(index, e.target.value)
                      }
                      placeholder="Checklist item"
                      className="flex-1 p-2 rounded border border-border placeholder-text-secondary focus:border-primary outline-none"
                    />

                    <button
                      type="button"
                      onClick={() => removeChecklistItem(index)}
                      className="px-3 py-1 bg-danger text-white rounded hover:bg-danger-hover">
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-text-primary border border-border rounded hover:bg-border">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover disabled:opacity-50"
                  disabled={formData.title.trim().length < 3}>
                  {initialData ? "Save Changes" : "Create Todo"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TodoModal;
