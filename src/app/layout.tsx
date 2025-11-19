import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SessionAuthProvider } from '@/components/session-auth';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OdontoPro",
  description: "O melhor site de odontologia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionAuthProvider>
          {children}
        </SessionAuthProvider>
      </body>
    </html>
  );
}
