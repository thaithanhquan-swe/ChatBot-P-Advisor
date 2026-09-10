import { ChevronLeft, ChevronRight } from 'lucide-react';

const DocumentPagination = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className='mt-7 flex items-center justify-center gap-1.5'>
      <button disabled={page === 1} onClick={() => onChange(page - 1)} className='flex h-8 w-8 items-center justify-center rounded-full text-gray-500 disabled:opacity-30'>
        <ChevronLeft size={16} />
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((item) => (
        <button key={item} onClick={() => onChange(item)} className={`flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-semibold transition ${page === item ? 'bg-(--primary-color) text-white shadow-sm' : 'text-gray-700 hover:bg-gray-100'}`}>
          {item}
        </button>
      ))}
      <button disabled={page === totalPages} onClick={() => onChange(page + 1)} className='flex h-8 w-8 items-center justify-center rounded-full text-gray-500 disabled:opacity-30'>
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default DocumentPagination;
