import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import LiquidBackground from "./components/LiquidBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Connectio Control Panel",
  description: "Manage events, prices, testimonials, and members",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LiquidBackground />
        <div className="dashboard-layout">
          <Sidebar />
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
