import { FileText, Search, SlidersHorizontal } from 'lucide-react';
import { DOCUMENT_TYPES } from '../../constants/documents';

const DocumentToolbar = ({ search, onSearchChange, type, onTypeChange, sort, onSortChange }) => {
  return (
    <div className='rounded-2xl border border-gray-200 bg-white p-2.5 shadow-[0_8px_30px_rgba(15,23,42,0.06)]'>
      <div className='grid gap-2 md:grid-cols-[minmax(0,1fr)_220px_200px_auto]'>
        <label className='flex h-11 items-center gap-2.5 rounded-xl border border-gray-200 px-3.5 focus-within:border-[#e4a4ae] focus-within:ring-3 focus-within:ring-[#c8102e]/8'>
          <Search size={18} className='shrink-0 text-gray-700' />
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder='Tìm kiếm tài liệu, tên file...'
            className='min-w-0 flex-1 bg-transparent text-[13.5px] text-gray-900 outline-none placeholder:text-gray-400'
          />
        </label>

        <label className='relative flex h-11 items-center rounded-xl border border-gray-200 px-3.5'>
          <FileText size={17} className='mr-2 text-gray-700' />
          <select
            value={type}
            onChange={(event) => onTypeChange(event.target.value)}
            className='h-full min-w-0 flex-1 cursor-pointer appearance-none bg-transparent pr-6 text-[13.5px] font-medium text-gray-800 outline-none'
          >
            {DOCUMENT_TYPES.map((item) => <option key={item}>{item}</option>)}
          </select>
          <span className='pointer-events-none absolute right-3 text-gray-500'>⌄</span>
        </label>

        <label className='relative flex h-11 items-center rounded-xl border border-gray-200 px-3.5'>
          <SlidersHorizontal size={17} className='mr-2 text-gray-700' />
          <select
            value={sort}
            onChange={(event) => onSortChange(event.target.value)}
            className='h-full min-w-0 flex-1 cursor-pointer appearance-none bg-transparent pr-6 text-[13.5px] font-medium text-gray-800 outline-none'
          >
            <option value='newest'>Mới nhất</option>
            <option value='oldest'>Cũ nhất</option>
            <option value='name'>Tên A - Z</option>
          </select>
          <span className='pointer-events-none absolute right-3 text-gray-500'>⌄</span>
        </label>

        <button type='button' className='inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-(--primary-color) px-5 text-[13.5px] font-semibold text-white shadow-sm transition hover:bg-[#b10e28]'>
          <Search size={17} />
          Tìm kiếm
        </button>
      </div>
    </div>
  );
};

export default DocumentToolbar;
