import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Serif } from "next/font/google";
import "./globals.css";

const heading = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading",
  weight: ["500", "600", "700"],
  display: "swap",
});

const body = Noto_Serif({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Poranny Kodeks",
  description:
    "Pergaminowa karta porannej rutyny z pełnym wsparciem dla polskich znaków.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${heading.variable} ${body.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
