// no "use client";
import HeavyDutyCalculatorClient from "./HeavyDutyCalculatorClient";
import type { Metadata } from "next"; 

export const revalidate = 10; // ISR works here
export const metadata: Metadata = {
  title: "Heavy-Duty Calculator | Muizz N Wali",
  description: "Heavy Duty Calculator page for Muizz N Wali website",
};
export default function HeavyDutyCalculatorPage() {
  return <HeavyDutyCalculatorClient />;
}
