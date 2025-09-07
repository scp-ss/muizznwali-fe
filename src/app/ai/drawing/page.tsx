// no "use client";
import Ai_DrawingClient from "./Ai-DrawingClient";
import type { Metadata } from "next"; 

export const revalidate = 10; // ISR works here
export const metadata: Metadata = {
  title: "AI Drawing Page | Muizz N Wali",
  description: "Page for Drawing",
};
export default function AI_Drawing() {
  return <Ai_DrawingClient />;
}
 