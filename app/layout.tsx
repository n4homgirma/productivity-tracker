import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type React from "react";
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
  title: "Trasck",
  description: "Track your daily productivity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full overflow-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full overflow-hidden flex flex-col`}
      >
        {/* Nav */}
        <nav className="flex-shrink-0 bg-[#0d2137] flex items-center justify-between px-6 py-3 w-full z-10">
          <div className="flex items-center gap-4">
            <div className="w-[43px] h-[43px] bg-white/10 border border-white/15 rounded-[10px] flex items-center justify-center">
              <svg className="w-[22px] h-[22px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
            </div>
            <div>
              <p className="text-white text-[28px] font-bold leading-none tracking-tight">
                Trasck
              </p>
              <p className="text-blue-300/70 text-[11px] italic mt-0.5">
                Track your Tasks · Track your Productivity
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-white/90 text-sm font-bold leading-snug">
                &ldquo;Believe you can and you&rsquo;re halfway there.&rdquo;
              </p>
              <p className="text-blue-300/60 text-[11px] italic">-Theodore Roosevelt</p>
            </div>
            <div className="w-[41px] h-[41px] rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-white text-sm font-bold">
              U
            </div>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}
