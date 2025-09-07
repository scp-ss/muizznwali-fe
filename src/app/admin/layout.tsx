import AdminLayoutClient from './adminLayoutClient';
//import { AuthProvider } from "../../../contexts/AuthContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The middleware already handles authentication,
  // so we just need to provide the layout
  return(
  //<AuthProvider>
    <AdminLayoutClient>{children}</AdminLayoutClient>
  //</AuthProvider>
  )
}
