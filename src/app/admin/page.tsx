// no "use client";
import AdminClient from "./adminClient";
import type { Metadata } from "next"; 

export const revalidate = 10; // ISR works here
export const metadata: Metadata = {
  title: "AdminPage | Muizz N Wali",
  description: "ADMIN PAGE OF MUIZZ 'n WALI",
};
export default function admin() {
  return <AdminClient />;
}
