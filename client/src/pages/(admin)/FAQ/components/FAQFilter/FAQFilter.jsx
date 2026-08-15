import { CalendarDays, ChevronDown, RotateCcw, Search } from 'lucide-react';

function FAQFilter() {
  return (
    <aside className='h-fit rounded-xl border border-slate-200 bg-white p-4'>
      <h2 className='mb-5 text-[15px] font-bold text-slate-900'>Bộ lọc</h2>

      {/* Search */}
      <div className='mb-4'>
        <label className='mb-2 block text-[11px] font-medium text-slate-700'>Tìm kiếm</label>

        <div className='relative'>
          <input
            type='text'
            placeholder='Nhập từ khóa...'
            className='h-9 w-full rounded-lg border border-slate-200 pl-3 pr-9 text-[10px] outline-none focus:border-red-300'
          />

          <Search size={14} className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400' />
        </div>
      </div>

      {/* Category */}
      <FilterSelect label='Danh mục' />

      {/* Status */}
      <FilterSelect label='Trạng thái' />

      {/* Type */}
      <FilterSelect label='Loại tài liệu' />

      {/* Date */}
      <div className='mb-5'>
        <label className='mb-2 block text-[11px] font-medium text-slate-700'>Ngày cập nhật</label>

        <div className='grid grid-cols-2 gap-2'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Từ ngày'
              className='h-9 w-full rounded-lg border border-slate-200 px-2 pr-7 text-[9px] outline-none focus:border-red-300'
            />

            <CalendarDays
              size={13}
              className='absolute right-2 top-1/2 -translate-y-1/2 text-slate-400'
            />
          </div>

          <div className='relative'>
            <input
              type='text'
              placeholder='Đến ngày'
              className='h-9 w-full rounded-lg border border-slate-200 px-2 pr-7 text-[9px] outline-none focus:border-red-300'
            />

            <CalendarDays
              size={13}
              className='absolute right-2 top-1/2 -translate-y-1/2 text-slate-400'
            />
          </div>
        </div>
      </div>

      <button
        type='button'
        className='flex h-9 w-full items-center justify-center rounded-lg bg-[#D71920] text-[11px] font-semibold text-white hover:bg-[#b9151b]'
      >
        Áp dụng bộ lọc
      </button>

      <button
        type='button'
        className='mt-2 flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-slate-200 text-[11px] text-slate-600 hover:border-red-200 hover:text-[#D71920]'
      >
        <RotateCcw size={13} />
        Xóa bộ lọc
      </button>

      {/* Categories */}
      <div className='mt-6 border-t border-slate-100 pt-5'>
        <h3 className='mb-4 text-[13px] font-bold text-slate-900'>Danh mục tài liệu</h3>

        <div className='space-y-3 text-[10px]'>
          <CategoryItem color='bg-[#D71920]' label='Tuyển sinh' value='128' />

          <CategoryItem color='bg-orange-500' label='Học phí – Học bổng' value='96' />

          <CategoryItem color='bg-blue-500' label='Ngành học' value='84' />

          <CategoryItem color='bg-slate-400' label='Khác' value='50' />
        </div>
      </div>
    </aside>
  );
}

function FilterSelect({ label }) {
  return (
    <div className='mb-4'>
      <label className='mb-2 block text-[11px] font-medium text-slate-700'>{label}</label>

      <button
        type='button'
        className='flex h-9 w-full items-center justify-between rounded-lg border border-slate-200 px-3 text-[10px] text-slate-600'
      >
        <span>Tất cả {label.toLowerCase()}</span>

        <ChevronDown size={14} />
      </button>
    </div>
  );
}

function CategoryItem({ color, label, value }) {
  return (
    <div className='flex items-center gap-2'>
      <span className={`h-2 w-2 rounded-full ${color}`} />

      <span className='flex-1 text-slate-600'>{label}</span>

      <span className='font-medium text-slate-500'>{value}</span>
    </div>
  );
}

export default FAQFilter;
