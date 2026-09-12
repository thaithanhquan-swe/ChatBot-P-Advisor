import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DocumentPagination = ({ page, totalPages, onChange }) => {
  if (!totalPages || totalPages < 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1).filter(
    (item) => item === 1 || item === totalPages || Math.abs(item - page) <= 1
  );

  return (
    <div className='mt-8 flex items-center justify-center gap-1.5'>
      <Button
        type='button'
        variant='outline'
        size='icon'
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className='h-9 w-9 rounded-xl border-gray-200 text-gray-700'
      >
        <ChevronLeft size={16} />
      </Button>

      {pages.map((item, index) => {
        const previous = pages[index - 1];

        return (
          <div key={item} className='flex items-center gap-1.5'>
            {previous && item - previous > 1 && (
              <span className='px-1 text-xs text-gray-400 font-medium'>...</span>
            )}

            <Button
              type='button'
              variant={page === item ? 'default' : 'outline'}
              onClick={() => onChange(item)}
              className={`h-9 min-w-9 rounded-xl text-[12.5px] font-semibold ${
                page === item
                  ? 'bg-(--primary-color) text-white hover:bg-[#b10e28] shadow-sm'
                  : 'border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {item}
            </Button>
          </div>
        );
      })}

      <Button
        type='button'
        variant='outline'
        size='icon'
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className='h-9 w-9 rounded-xl border-gray-200 text-gray-700'
      >
        <ChevronRight size={16} />
      </Button>
    </div>
  );
};

export default DocumentPagination;

