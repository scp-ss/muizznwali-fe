// no "use client";
import HeavyDutyCalculatorClient from "./HeavyDutyCalculatorClient";

export const revalidate = 10; // ISR works here

export default function HeavyDutyCalculatorPage() {
  return <HeavyDutyCalculatorClient />;
}
