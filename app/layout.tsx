import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Productivity Tracker",
  description: "Track your daily productivity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
          <div className="mx-auto max-w-5xl px-4 flex items-center justify-between h-14">
            <span className="text-lg font-bold text-gray-900">
              Productivity Tracker
            </span>
            <button className="rounded-lg border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Login
            </button>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
