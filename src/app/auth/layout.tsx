
export default function LoginLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <main className="mn-h-screen bg-gray-600">
      {children}
    </main>
  );
}