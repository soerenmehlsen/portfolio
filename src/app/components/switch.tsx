import React from 'react';
import {useState} from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SwitchProps {
    activeButton: React.ReactNode;
    hiddenButton: React.ReactNode;
    setActiveButton: () => void;
}

export default function Switch({
    activeButton,
        hiddenButton,
        setActiveButton,
}: SwitchProps) {
    const [isHovered, setIsHovered] = useState(false);

    const switchVariants = {
        hover : { scale: 1.2 },
        hidden: { opacity: 0, y: 50, scale: 0.5 },
        visible: { opacity: 0.7, y: 0, scale: 1 },
    }

    return (
        <div>
            <AnimatePresence>
                {isHovered && (
                    <motion.button
                        key="languageSwitcher"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={switchVariants}
                        transition={{duration: 0.3}}
                        className="hidden md:flex items-center justify-center w-[2rem] h-[2rem] bg-white dark:bg-gray-800 drop-shadow backdrop-blur-[0.5rem] rounded-full absolute bottom-16 right-3 "
                    >
                        <p className="text-sm font-semibold">{hiddenButton}</p>
                    </motion.button>
                )}
            </AnimatePresence>
            <motion.button
                className="bg-white dark:bg-gray-800 w-[3rem] h-[3rem] drop-shadow backdrop-blur-[0.5rem] rounded-full flex items-center justify-center"
                variants={switchVariants}
                initial="visible"
                whileHover="hover"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={setActiveButton}
            >
                <p className="font-semibold">{activeButton}</p>
            </motion.button>
        </div>
    );
}