import { useEffect } from 'react';

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

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50">
        {/* Overlay */}
         <div className="absolute inset-0 bg-black bg-opacity-50"
            onClick={onClose}
         />
        {/* Drawer */}
         <div className="fixed bottom-0 left-0 w-full h-[93vh] bg-white rounded-t-2xl p-4 shadow-lg z-50">
            {/* Drag indicator on top */}
            <div className="flex justify-center">
                    <div className="w-24 h-2 bg-gray-100 rounded-full"></div>
            </div> 
            {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto px-4 pb-4">
                    {children}
                </div>
         </div>
        </div>
    );   
}