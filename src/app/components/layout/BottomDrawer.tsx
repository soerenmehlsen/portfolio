import { useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

interface BottomDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function BottomDrawer({ isOpen, onClose, children }: BottomDrawerProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"; // lock scroll
        } else {
            document.body.style.overflow = ""; //. reset scroll
        }
    }, [isOpen]);

    const handleDragEnd = (_: any, info: PanInfo) => {
        if (info.offset.y > 100) {
            onClose();
        }
    };

    return (
         <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop overlay with fade animation */}
                    <motion.div 
                        className="fixed inset-0 z-40 bg-black bg-opacity-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7 }}
                        onClick={onClose}
                    />
                    
                    {/* Drawer with slide-up animation */}
                    <motion.div 
                        className="fixed bottom-0 left-0 w-full h-[90vh] bg-white rounded-t-2xl shadow-lg z-50 flex flex-col"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ 
                            type: "spring", 
                            damping: 30, 
                            stiffness: 200,
                            mass: 0.8
                        }}
                         drag="y"
                        dragConstraints={{ top: 0 }}
                        dragElastic={0.2}
                        onDragEnd={handleDragEnd}
                    >
                        {/* Handle/drag indicator */}
                        <div className="p-2 flex justify-center">
                            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
                        </div>
                        
                        {/* Scrollable content */}
                        <div className="flex-1 overflow-y-auto px-4 pb-4">
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );   
}