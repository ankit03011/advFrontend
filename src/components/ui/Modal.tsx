import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  // Disable body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-dark/60 backdrop-blur-sm"
          ></motion.div>

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative flex flex-col w-full max-w-lg bg-cream rounded-3xl shadow-2xl border-2 border-secondary z-10 max-h-[90vh] overflow-hidden"
          >
            {/* Fixed Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-primary/10 bg-cream z-20">
              <h3 className="font-heading font-bold text-lg text-primary">
                {title || "Details"}
              </h3>
              <button
                onClick={onClose}
                className="p-2 text-dark/60 hover:text-primary transition-colors duration-300 rounded-full hover:bg-primary/5 focus:outline-none"
              >
                <IoCloseOutline className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-6 md:p-8 overflow-y-auto scrollbar-thin flex-1">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default Modal;
