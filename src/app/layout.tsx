// import Navbar from "@/components/navbar";
// import Footer from "@/components/footer";
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
  title: "BikinAcara - Main",
  description: "BikinAcara Management Event Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <Navbar /> */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="pt-16">{children}</main>
      </body>
      {/* <Footer /> */}
    </html>
  );
}
