import Header from '@/src/components/Header';

export default async function RSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-4xl w-full">
      <Header />
      <div className="px-4 py-2">{children}</div>
    </div>
  );
}
