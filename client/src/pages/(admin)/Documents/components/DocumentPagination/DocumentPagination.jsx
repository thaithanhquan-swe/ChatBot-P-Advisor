import { ChevronLeft, ChevronRight } from 'lucide-react';

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
        <button
          type='button'
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className='flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 disabled:cursor-not-allowed disabled:opacity-40'
        >
          <ChevronLeft size={14} />
        </button>

        {pages.map((item, index) => {
          const previous = pages[index - 1];
          return (
            <div key={item} className='flex items-center gap-1'>
              {previous && item - previous > 1 && <span className='px-1 text-xs text-slate-400'>...</span>}
              <button
                type='button'
                onClick={() => onPageChange(item)}
                className={`h-8 min-w-8 rounded-md border px-2 text-[10px] font-semibold ${
                  item === page
                    ? 'border-[#D71920] bg-[#D71920] text-white'
                    : 'border-slate-200 text-slate-500 hover:border-red-200 hover:text-[#D71920]'
                }`}
              >
                {item}
              </button>
            </div>
          );
        })}

        <button
          type='button'
          disabled={page >= safeTotalPages}
          onClick={() => onPageChange(page + 1)}
          className='flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 disabled:cursor-not-allowed disabled:opacity-40'
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

export default DocumentPagination;
