import { HomeIcon, File, UserRound } from 'lucide-react';
import Link from 'next/link';

import NavButton from '@/src/components/NavButton';
import { ModeToggle } from '@/src/components/ModeToggle';

export default function Header() {
  return (
    <header className="animate-slide-from-right bg-background h-12 p-2 border-b sticky top-0 z-50">
      <div className="flex h-8 items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <NavButton href="/home" label="Home" icon={HomeIcon} />

          <Link
            href="home"
            className="flex justify-center items-center gap-2 ml-0"
            title="Home"
          >
            <h1 className="hidden sm:block text-lg font-bold">
              Computer Repair Shop
            </h1>
          </Link>
        </div>

        <div className="flex items-center">
          <NavButton href="/tickets" label="Tickets" icon={File} />

          <NavButton href="/customers" label="Customers" icon={UserRound} />

          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
