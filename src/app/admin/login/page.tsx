import { Metadata } from "next";
import AdminLoginClient from "./adminLoginClient";








export const revalidate = 10; // ISR works here
export const metadata: Metadata = {
  title: "Admin Login | Muizz N Wali",
  description: "ADMIN LOGIN PAGE OF MUIZZ 'n WALI",
};

export default function AdminPage() {
    return (
    <AdminLoginClient/>
    )
}