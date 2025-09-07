import { AuthProvider } from "../../../contexts/AuthContext";
import AdminClient from "./adminClient";
import type { Metadata } from "next"; 

export const revalidate = 10; // ISR works here
export const metadata: Metadata = {
  title: "Admin Page | Muizz N Wali",
  description: "Admin page for Muizz N Wali website",
};


export default function AdminPage() {
  return (
    <AuthProvider>
      <AdminClient />
    </AuthProvider>
  );
}