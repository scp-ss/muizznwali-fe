import type { Metadata } from "next";
import "./../appstyles/css/globals.css";
import Navbar from "@/components/navbar/navbar";
import "@/css/astetics.css";


export const metadata: Metadata = {
  title: "Muizz N Wali",
  description: "Main Website — Built with Next.js, Tailwind, TS, Turbopack",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
