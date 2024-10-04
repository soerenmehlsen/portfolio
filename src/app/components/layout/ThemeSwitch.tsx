"use client";

import Switch from "./Switch";
import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/app/containers/theme-context";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="fixed bottom-5 right-5">
      <Switch
        activeButton={theme === "light" ? <Sun /> : <Moon />}
        hiddenButton={
          theme === "light" ? <Moon size={14} /> : <Sun size={14} />
        }
        setActiveButton={toggleTheme}
      />
    </div>
  );
}
