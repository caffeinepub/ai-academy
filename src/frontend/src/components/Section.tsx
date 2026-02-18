import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
}

export default function Section({ children, className }: SectionProps) {
  return (
    <section className={cn('container mx-auto px-4 max-w-7xl', className)}>
      {children}
    </section>
  );
}
