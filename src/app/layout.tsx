import type { Metadata } from "next";
import "./../appstyles/css/globals.css";
import Navbar from "@/components/navbar/navbar";
import "@/css/astetics.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "Muizz N Wali",
  description: "Main Website — Built with Next.js, Tailwind, TS, Turbopack",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <meta name="fc1279abd204ac51eb717a7fed308fbe12f00504" content="fc1279abd204ac51eb717a7fed308fbe12f00504" />
        {/*{process.env.NODE_ENV === "production" && (
 <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8243831335530194"
     crossOrigin="anonymous"></script>)
        }*/}
        {/*<meta name="google-adsense-account" content="ca-pub-8243831335530194">*/}
      </head>
      <body className="bg-gray-50 text-gray-900 antialiased">
        <Navbar />
        <SpeedInsights/>
        <Analytics />
        <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
