// no "use client";
import type { Metadata } from "next"; 
import DownloadsPageClient from "./DownloadClient"
export const revalidate = 10; // ISR works here
export const metadata: Metadata = {
  title: "Downloads | Muizz N Wali",
  description: "Page for downloadable files for Muizz N Wali website",
};



export default function DownloadPage() {
  return <DownloadsPageClient/>;
}
