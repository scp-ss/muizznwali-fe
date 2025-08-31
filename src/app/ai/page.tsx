// no "use client";
import AiClient from "./AiClient";
import type { Metadata } from "next"; 

export const revalidate = 10; // ISR works here
export const metadata: Metadata = {
  title: "AI Page | Muizz N Wali",
  description: "Page for an AI's on the Muizz N Wali website",
};
export default function HeavyDutyCalculatorPage() {
  return <AiClient />;
}
