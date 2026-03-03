import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";
import FloatingChat from "@/components/FloatingChat";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TimeTravelAgency — Traversez les siècles",
  description:
    "Agence de voyage temporel de luxe. De l'ère des dinosaures à la naissance du monde moderne.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${cinzel.variable} ${inter.variable}`}>
      <body className="antialiased bg-[#0a0a0a] text-[#ededed]">
        {children}
        <FloatingChat />
      </body>
    </html>
  );
}
