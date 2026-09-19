import { cn } from '@/lib/utils';

function Badge({ className, children, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-transparent px-2 py-1 text-[10px] font-semibold whitespace-nowrap',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export { Badge };
