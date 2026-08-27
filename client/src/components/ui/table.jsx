import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const Table = forwardRef(function Table({ className, ...props }, ref) {
  return <table ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props} />;
});
const TableHeader = forwardRef(function TableHeader({ className, ...props }, ref) {
  return <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />;
});
const TableBody = forwardRef(function TableBody({ className, ...props }, ref) {
  return <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />;
});
const TableRow = forwardRef(function TableRow({ className, ...props }, ref) {
  return <tr ref={ref} className={cn('border-b transition-colors hover:bg-slate-50/70', className)} {...props} />;
});
const TableHead = forwardRef(function TableHead({ className, ...props }, ref) {
  return <th ref={ref} className={cn('h-10 px-4 text-left align-middle text-[10px] font-semibold text-slate-600', className)} {...props} />;
});
const TableCell = forwardRef(function TableCell({ className, ...props }, ref) {
  return <td ref={ref} className={cn('p-4 align-middle', className)} {...props} />;
});

export { Table, TableBody, TableCell, TableHead, TableHeader, TableRow };
