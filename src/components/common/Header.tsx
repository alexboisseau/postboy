"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@components/ui/button";
import { Skeleton } from "@components/ui/skeleton";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Header() {
  const { setTheme, theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="py-3 px-8 flex flex-row-reverse items-center gap-3 border-b-[1px]">
      {isMounted ? (
        <>
          {theme === "dark" ? (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme("light")}
            >
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          ) : (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme("dark")}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            </Button>
          )}
          <SignedIn>
            <UserButton
              appearance={{
                baseTheme: theme === "dark" ? dark : undefined,
              }}
              userProfileProps={{
                appearance: {
                  baseTheme: theme === "dark" ? dark : undefined,
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </SignedOut>
        </>
      ) : (
        <>
          <Button variant={"ghost"} size="icon" className="rounded-full">
            <Skeleton className="h-[1.2rem] w-[1.2rem]" />
          </Button>
          <Button variant={"ghost"} size="icon">
            <Skeleton className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </>
      )}
    </header>
  );
}
