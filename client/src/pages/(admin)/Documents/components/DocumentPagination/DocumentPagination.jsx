import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

function DocumentPagination({ page, totalPages, totalItems, pageSize, onPageChange }) {
  const safeTotalPages = Math.max(totalPages, 1);
  const start = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  const pages = Array.from({ length: safeTotalPages }, (_, index) => index + 1).filter(
    (item) => item === 1 || item === safeTotalPages || Math.abs(item - page) <= 1
  );

  return (
    <div className='flex flex-col gap-3 border-t border-slate-100 px-5 py-3 sm:flex-row sm:items-center sm:justify-between'>
      <p className='text-[10px] text-slate-500'>
        Hiển thị {start}-{end} trên {totalItems} tài liệu · {pageSize} tài liệu/trang
      </p>

      <div className='flex items-center gap-1'>
        <Button
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          variant='outline'
          size='icon'
          className='h-8 w-8'
        >
          <ChevronLeft size={14} />
        </Button>

        {pages.map((item, index) => {
          const previous = pages[index - 1];
          return (
            <div key={item} className='flex items-center gap-1'>
              {previous && item - previous > 1 && <span className='px-1 text-xs text-slate-400'>...</span>}
              <Button
                onClick={() => onPageChange(item)}
                variant={item === page ? 'default' : 'outline'}
                size='sm'
                className='h-8 min-w-8 px-2 text-[10px]'
              >
                {item}
              </Button>
            </div>
          );
        })}

        <Button
          disabled={page >= safeTotalPages}
          onClick={() => onPageChange(page + 1)}
          variant='outline'
          size='icon'
          className='h-8 w-8'
        >
          <ChevronRight size={14} />
        </Button>
      </div>
    </div>
  );
}

export default DocumentPagination;
