import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

import { Aldrich } from "next/font/google";

//👇 Configure our font object
const poppins = Aldrich({
  weight: ["400"],
  style: "normal",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VideoQuality | Admin Panel",
  description: "Powered by XecureCode.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`max-w-7xl bg-dark-bg   mx-auto  `}>
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
