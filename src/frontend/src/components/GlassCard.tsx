import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl bg-card/40 backdrop-blur-xl border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300',
        className
      )}
    >
      {children}
    </div>
  );
}
