// app/not-found.tsx
export default function NotFoundPage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-5xl font-bold text-red-500">404</h1>
      <p className="mt-4 text-lg text-gray-600">The page you’re looking for doesn’t exist.</p>
    </section>
  );
}
