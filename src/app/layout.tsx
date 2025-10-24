import type { Metadata } from "next";
import { Fredoka, Quicksand } from "next/font/google";
import "./globals.css";

const heading = Fredoka({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const body = Quicksand({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Morning Sparkles",
  description: "A playful morning routine tracker designed for little preschool stars.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${heading.variable} ${body.variable} antialiased bg-[#f5f6ff] text-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}
