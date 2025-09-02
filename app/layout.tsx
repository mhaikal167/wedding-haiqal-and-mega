import type React from "react";
import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Pengumuman Nikah - Haiqal & Mega",
  description: "Alhamdulillah, kami telah resmi menjadi suami istri",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${playfairDisplay.variable} ${dmSans.variable} antialiased`}
    >
      <body className="watercolor-bg">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
