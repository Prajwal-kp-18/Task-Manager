import "@/app/globals.css";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

import { Archivo } from "next/font/google";
import { Libre_Franklin } from "next/font/google";
import { Providers } from "./providers";
import { Toaster as SonarToster } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "./_header/header";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});
const libre_franklin = Libre_Franklin({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-libre_franklin",
});

export const metadata: Metadata = {
  title: "Task Manager",
  description:
    "A simple and efficient task management application to organize, track, and prioritize your tasks seamlessly.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          archivo.variable + " " + libre_franklin.variable,
        )}
      >
        <Providers>
          <NextTopLoader />
          <div className="flex min-h-screen">
            <Header />
            <div className="flex flex-1 flex-col">
              <div className="container mx-auto flex-1 px-4 py-6 md:px-6 md:py-8">
                {children}
              </div>
            </div>
          </div>
          <Toaster />
          <SonarToster />
        </Providers>
      </body>
    </html>
  );
}
