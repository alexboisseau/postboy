import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/shared/Header";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Postman Like",
  description: "An easy way to make HTTP requests.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-zinc-50 dark:bg-zinc-950 flex flex-col min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <Separator />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
