import { LucideIcon } from 'lucide-react';

import { Button } from '@/src/components/ui/button';
import Link from 'next/link';

type NavButtonProps = {
  icon: LucideIcon;
  label: string;
  href?: string;
};

export default function NavButton({ icon: Icon, label, href }: NavButtonProps) {
  return (
    <Button
      asChild
      aria-label={label}
      title={label}
      className="rounded-full"
      variant="ghost"
      size="icon-lg"
    >
      {href ? (
        <Link href={href || ''}>
          <Icon />
        </Link>
      ) : (
        <Icon />
      )}
    </Button>
  );
}
