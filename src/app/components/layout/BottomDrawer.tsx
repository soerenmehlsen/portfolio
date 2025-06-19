import { useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

interface BottomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function BottomDrawer({
  isOpen,
  onClose,
  children,
}: BottomDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // lock scroll
    } else {
      document.body.style.overflow = ""; //. reset scroll
    }
  }, [isOpen]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 100) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed bottom-0 left-0 z-50 flex h-[80vh] sm:h-[90vh] w-full flex-col rounded-t-2xl bg-white shadow-lg"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 200,
              mass: 0.8,
            }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
            {/* Handle/drag indicator */}
            <div className="flex justify-center p-2">
              <div className="h-1 w-12 rounded-full bg-gray-300"></div>
            </div>

            {/* Scrollable content */}
            <div className="mx-auto w-full max-w-4xl overflow-y-auto">
              <div className="px-4">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
