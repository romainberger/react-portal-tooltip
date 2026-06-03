import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "react-portal-tooltip-upgraded — Live Demo",
  description: "Interactive demo for react-portal-tooltip-upgraded. React 18 compatible tooltip library with SSR support and TypeScript types.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.className}>
      <body className="min-h-screen" style={{ background: "#0f172a", color: "#f1f5f9" }}>
        {children}
      </body>
    </html>
  );
}
