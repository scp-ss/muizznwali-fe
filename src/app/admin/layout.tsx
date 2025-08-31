import AdminLayoutClient from './adminLayoutClient';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The middleware already handles authentication,
  // so we just need to provide the layout
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
