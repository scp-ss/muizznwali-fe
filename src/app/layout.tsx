import type { Metadata } from "next";
import "./../appstyles/css/globals.css";
import Navbar from "@/components/navbar/navbar";
import "@/css/astetics.css";
//import { SpeedInsights } from "@vercel/speed-insights/next";
//import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "../../contexts/AuthContext";
import Script from "next/script";
import { Suspense } from "react";
import AdSenseClientComponent from "@/components/adss/adsense/2/AdSenseClientComponent";
export const metadata: Metadata = {
  title: "Muizz N Wali",
  description: "Main Website",
};



// FIND DIFERENCE BETWEEN window.location.hostname AND window.location.host
// FIND DIFFERENCE BETWEEN window.location.origin AND window.location.host
// FIND DIFFERENCE BETWEEN window.location.href AND window.location.host
// FIND DIFFERENCE BETWEEN // and ``

/*
`const isLocalhost = typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
const adBannerHTMLreferral = `
`  <a href="https://hilltopads.com/?ref=330235">
    <img src="//static.hilltopads.com/other/banners/pub/huge_income/728x90.gif?v=1754909802">
  </a>
  <a href="https://hilltopads.com/?ref=330235">
    <img src="//static.hilltopads.com/other/banners/pub/get_high_ecpm/728x90.gif?v=1754909802">
  </a>
  <a href="https://hilltopads.com/?ref=330235">
    <img src="//static.hilltopads.com/other/banners/pub/make_big_money/728x90.gif?v=1754909802">
  </a>
`;`
`*/ 
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
    <html lang="en" className="scroll-smooth">
      
       {/* 
  {!isLocalhost && (
    <>
      <Script id="hilltop-ad-1" strategy="afterInteractive">
        {`(function(qvks){
          var d = document,
              s = d.createElement('script'),
              l = d.scripts[d.scripts.length - 1];
          s.settings = qvks || {};
          s.src = "//flashy-explanation.com/ckD.9j6rb/2/5qlcSAWtQm9uNhj-UC4/MTzRQ/zsNyiM0T2/NCT/g/z/N/D/M/3R";
          s.async = true;
          s.referrerPolicy = 'no-referrer-when-downgrade';
          l.parentNode.insertBefore(s, l);
        })({})`}
      </Script>

      <Script id="hilltop-ad-2" strategy="afterInteractive">
        {`(function(iey){
          var d = document,
              s = d.createElement('script'),
              l = d.scripts[d.scripts.length - 1];
          s.settings = iey || {};
          s.src = "//wry-boss.com/bXXAV.snddGrlF0QYsWwcC/tenmu9fuoZPUYlJkyPZTEYs1yOxDwM_0-NYzSM-twNkjzUk4dMyztQX3ONEAh";
          s.async = true;
          s.referrerPolicy = 'no-referrer-when-downgrade';
          l.parentNode.insertBefore(s, l);
        })({})`}
      </Script>

      <Script id="hilltop-ad-3" strategy="afterInteractive">
        {`(function(ntl){
          var d = document,
              s = d.createElement('script'),
              l = d.scripts[d.scripts.length - 1];
          s.settings = ntl || {};
          s.src = "//wry-boss.com/bNXUVvs.djGslq0GY-Wecu/NeDmj9tuBZaUJltk/PqTfY/1JOHDMUBwDN_jzADtUNejRU/4UN/TVAP2MMuQH";
          s.async = true;
          s.referrerPolicy = 'no-referrer-when-downgrade';
          l.parentNode.insertBefore(s, l);
        })({})`}
      </Script>

      <Script id="hilltop-ad-4" strategy="afterInteractive">
        {`(function(tcphf){
          var d = document,
              s = d.createElement('script'),
              l = d.scripts[d.scripts.length - 1];
          s.settings = tcphf || {};
          s.src = "//wry-boss.com/byXYVIs.daGPlM0wYPWVcy/_eBmU9Ru/ZPU/lkkYPdTNYL2nM/DBE/wRN/THIptaN/j-YWwbMVTWAv1JMUwU";
          s.async = true;
          s.referrerPolicy = 'no-referrer-when-downgrade';
          l.parentNode.insertBefore(s, l);
        })({})`}
      </Script>

      <Script id="hilltop-ad-5" strategy="afterInteractive">
        {`(function(ge){
          var d = document,
              s = d.createElement('script'),
              l = d.scripts[d.scripts.length - 1];
          s.settings = ge || {};
          s.src = "//wry-boss.com/bRXAVIsTd.G-lL0QYoWvcs/Ieim/9juOZRUNlHkMPWTIYE2kMjD/EdwnNsjHI-t/NajgYYwHMZTJAx2kMIwD";
          s.async = true;
          s.referrerPolicy = 'no-referrer-when-downgrade';
          l.parentNode.insertBefore(s, l);
        })({})`}
      </Script>
    </>
  )}
*/}
<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8243831335530194"
  crossOrigin="anonymous"
/>

<head>
          {
        /*<meta name="referrer" content="no-referrer-when-downgrade" />
        <meta name="fc1279abd204ac51eb717a7fed308fbe12f00504" content="fc1279abd204ac51eb717a7fed308fbe12f00504" />
        */}
        <meta name="google-adsense-account" content="ca-pub-8243831335530194"></meta>

        {/* Favicon and Icons */}
        <link rel="icon" type="image/x-icon" href="/assets/icons/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/icons/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/assets/icons/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#0f172a" />
        <meta name="theme-color" content="#0f172a" />

        {process.env.NODE_ENV === "production" && (
          <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8243831335530194"
          crossOrigin="anonymous"
          ></script>
        )}
</head>
      <body className="antialiased">
      



        {/*
        <div dangerouslySetInnerHTML={{ __html: adBannerHTMLreferral }} />
         */}
        <Navbar />
        <Suspense fallback={null}>
          <AdSenseClientComponent />
        </Suspense>
       {/*<SpeedInsights />
        <Analytics />*/}
        <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
    </AuthProvider>
  );
}
