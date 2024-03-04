import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SideBar from "@components/common/SideBar";
import Header from "@components/common/Header";
import { ThemeProvider } from "@components/common/ThemeProvider";
import StoreProvider from "@context/StoreProvider";
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
    <html lang="en">
      <body className={`${inter.className} w-screen`}>
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            <div className="flex">
              <SideBar />
              <div className="w-full flex flex-col items-stretch">
                <Header />
                <main className="h-full p-2 bg-primary-foreground">
                  {children}
                </main>
              </div>
            </div>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
