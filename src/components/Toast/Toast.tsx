import React from "react";
import { Message } from "../../types";
import { motion, AnimatePresence } from "framer-motion";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdWarningAmber } from "react-icons/md";
import { IoClose } from "react-icons/io5";

interface ToastProps {
  message: Message;
  onClose: () => void;
  duration?: number;
}

const toastVariants = {
  initial: { x: 300, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 300, opacity: 0, transition: { duration: 0.2 } },
};

const toastStyles = {
  success: "bg-green-500/50 border border-green-500 text-green-800",
  error: "bg-red-500/50 border border-red-500 text-red-800",
  warning: "bg-yellow-500/50 border border-yellow-500 text-yellow-800",
};

const icon = (type: string) => {
  switch (type) {
    case "success":
      return <IoCheckmarkCircleOutline />;
    case "error":
      return <IoMdCloseCircleOutline />;
    case "warning":
      return <MdWarningAmber />;
    default:
      return "";
  }
};

export const Toast: React.FC<ToastProps> = ({
  message,
  onClose,
  duration = 3000,
}) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={`relative p-4 rounded-lg shadow-lg max-w-sm flex items-center text-white justify-between gap-2 ${toastStyles[message.type]}`}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={toastVariants}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        key={message.text}>
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon(message.type)}</span>
          <span>{message.text}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="p-1 hover:bg-black/10 rounded-full transition-colors bg-red-500 -top-2 -right-2 absolute"
          aria-label="Close notification">
          <IoClose className="text-lg" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
