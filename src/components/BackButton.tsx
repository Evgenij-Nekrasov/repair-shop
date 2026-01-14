'use client';

import { useRouter } from 'next/navigation';
import { ButtonHTMLAttributes } from 'react';

import { Button } from '@/src/components/ui/button';

type BackButtonProps = {
  title: string;
  className?: string;
  variant?:
    | 'default'
    | 'secondary'
    | 'ghost'
    | 'destructive'
    | 'outline'
    | 'link'
    | null
    | undefined;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function BackButton({
  title,
  className,
  variant = 'default',
  ...props
}: BackButtonProps) {
  const router = useRouter();

  return (
    <Button
      variant={variant}
      className={className}
      onClick={() => router.back()}
      title={title}
      {...props}
    >
      {title}
    </Button>
  );
}
