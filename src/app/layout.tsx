import type { Metadata } from "next";
import { Baloo_2, Cormorant_Garamond, Noto_Serif } from "next/font/google";
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

const candy = Baloo_2({
  subsets: ["latin", "latin-ext"],
  variable: "--font-candy",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mój poranek",
  description: "Małe kroki do wielkich przygód — poranna rutyna dla dzieci.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${heading.variable} ${body.variable} ${candy.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
