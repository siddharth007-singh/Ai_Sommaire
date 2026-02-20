import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { ensureUserInDb } from "./actions/upload-action";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sommaire -Ai-Powered Summary Generator",
  description: "Generate concise summaries of articles, documents, and web pages using AI technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative flex min-h-screen flex-col">
          <Header/>
        <main className="flex-1">{children}</main>
        </div>
        <Toaster/>
      </body>
    </html>
    </ClerkProvider>
  );
}
