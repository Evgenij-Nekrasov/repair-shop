import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-home bg-cover bg-center min-h-screen">
      <main className="flex items-center justify-center min-h-screen">
        <div
          className="
      bg-black/80
      px-10 py-12 
      rounded 
      text-center 
      max-w-md
      text-white
      leading-relaxed
    "
        >
          <h1 className="text-4xl font-bold mb-6">
            Dan&apos;s Computer
            <br />
            Repair Shop
          </h1>

          <address>
            555 Gateway Lane
            <br />
            Kansas City, KS 55555
          </address>

          <p className="mb-6">Open Daily: 9am to 5pm</p>

          <Link href="tel:5555555555" className="hover:underline">
            555-555-5555
          </Link>
        </div>
      </main>
    </div>
  );
}
