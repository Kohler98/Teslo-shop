
export default function LoginLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <main className="flex justify-center">
      <div className="w-full sm:w-[550px] px-10">

      {children}
      </div>
    </main>
  );
}