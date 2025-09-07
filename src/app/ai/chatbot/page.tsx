// no "use client";
import Ai_ChatBotClient from "./Ai-ChatBotClient";
import type { Metadata } from "next"; 

export const revalidate = 10; // ISR works here
export const metadata: Metadata = {
  title: "AI Chatbot | Muizz N Wali",
  description: "Page for AI chatbots for the Muizz N Wali website",
};
export default function AI_Chatbot() {
  return <Ai_ChatBotClient />;
}
