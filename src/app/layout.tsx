import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@components/common/Header";
import SideBar from "@components/common/SideBar";
import { ThemeProvider } from "@components/common/ThemeProvider";
import StoreProvider from "@context/StoreProvider";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Postboy",
  description: "An easy way to make HTTP requests.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} w-screen max-h-screen flex`}>
          <StoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              disableTransitionOnChange
            >
              <SideBar />
              <div className="flex flex-col w-full items-stretch overflow-x-auto">
                <Header />
                <main className="h-full p-2 bg-primary-foreground overflow-y-auto">
                  {children}
                </main>
              </div>
            </ThemeProvider>
          </StoreProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
