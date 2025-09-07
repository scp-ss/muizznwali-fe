//import { Children } from "react";
import TodoPageClient from "./todoClient";
import { Metadata } from "next";


export const revalidate = 10; // ISR works here
export const metadata: Metadata = {
  title: "Todo Page | Muizz N Wali",
  description: "TaksManager Page",
};


export default function TodoPage() {
  return (
    <TodoPageClient/>
  ) }
