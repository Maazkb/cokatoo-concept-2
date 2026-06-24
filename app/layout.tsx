import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Cokatoo — Shop International. A Traveler Brings It.",
  description:
    "Cokatoo is the peer-to-peer crowdshipping marketplace that connects shoppers with verified travelers who carry items from anywhere in the world — safely, affordably, and directly to your door.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className={`min-h-full flex flex-col ${poppins.className}`}>{children}</body>
    </html>
  );
}
