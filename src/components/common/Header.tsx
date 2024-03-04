"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@components/ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return theme === "dark" ? (
    <Button variant="outline" size="icon" onClick={() => setTheme("light")}>
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  ) : (
    <Button variant="outline" size="icon" onClick={() => setTheme("dark")}>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    </Button>
  );
}

export default function Header() {
  return (
    <header className="py-3 px-8 flex flex-row-reverse border-b-[1px]">
      <ModeToggle />
    </header>
  );
}
