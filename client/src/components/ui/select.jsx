import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const Select = forwardRef(function Select({ className, children, ...props }, ref) {
  return (
    <select
      ref={ref}
      className={cn(
        'flex h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-9 text-xs text-slate-600 outline-none transition focus-visible:border-red-300 focus-visible:ring-2 focus-visible:ring-red-50 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});

export { Select };
