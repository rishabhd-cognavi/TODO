import React, { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toast } from "./Toast/Toast";
import { TodoContext } from "../context/todoContext";
import { Message } from "../types";

const MAX_TOASTS = 3;

export const ToastContainer: React.FC = () => {
  const { message, clearMessage } = useContext(TodoContext);
  const [toasts, setToasts] = useState<Message[]>([]);

  useEffect(() => {
    if (message) {
      setToasts((prev) => {
        const newToasts = [...prev, message];
        // Keep only the last MAX_TOASTS messages
        return newToasts.slice(-MAX_TOASTS);
      });
    }
  }, [message]);

  const handleClose = (index: number) => {
    setToasts((prev) => prev.filter((_, i) => i !== index));
    if (toasts.length === 1) {
      clearMessage();
    }
  };

  return (
    <div className="fixed top-0 right-0 z-50 p-4 flex flex-col-reverse gap-3">
      <AnimatePresence mode="sync">
        {toasts.map((toast, index) => (
          <motion.div
            key={`${toast.text}-${index}`}
            layout
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.2 }}>
            <Toast
              message={toast}
              onClose={() => handleClose(index)}
              duration={3000 + index * 1000} // Stagger duration for older messages
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
