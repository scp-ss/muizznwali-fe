// no "use client";
import Download from "./DownloadClient";
import type { Metadata } from "next"; 

export const revalidate = 10; // ISR works here
export const metadata: Metadata = {
  title: "Downloads | Muizz N Wali",
  description: "Page for downloadable files for Muizz N Wali website",
};
export default function HeavyDutyCalculatorPage() {
  return <Download />;
}
