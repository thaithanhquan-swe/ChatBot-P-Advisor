import { RotateCcw, Search, SlidersHorizontal } from 'lucide-react';

function FAQFilter({ filters, categories, onChange, onReset }) {
  const set = (key, value) => onChange((current) => ({ ...current, [key]: value }));
  const inputClass =
    'h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-[11px] text-slate-700 outline-none focus:border-red-300 focus:ring-2 focus:ring-red-50';
  return (
    <aside className='h-fit rounded-xl border border-slate-200 bg-white p-4 xl:sticky xl:top-24'>
      <div className='mb-5 flex items-center gap-2'>
        <SlidersHorizontal size={16} className='text-[#D71920]' />
        <h2 className='text-[14px] font-bold text-slate-900'>Bộ lọc FAQ</h2>
      </div>
      <div className='space-y-4'>
        <div>
          <label className='mb-2 block text-[11px] font-medium text-slate-600'>Tìm kiếm</label>
          <div className='relative'>
            <Search size={14} className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' />
            <input
              className={`${inputClass} pl-9`}
              value={filters.search}
              onChange={(e) => set('search', e.target.value)}
              placeholder='Nhập nội dung câu hỏi...'
            />
          </div>
        </div>
        <Select
          label='Trạng thái'
          value={filters.status}
          onChange={(value) => set('status', value)}
          options={[
            ['ALL', 'Tất cả trạng thái'],
            ['PUBLISHED', 'PUBLISHED'],
            ['DRAFT', 'DRAFT'],
            ['HIDDEN', 'HIDDEN'],
          ]}
        />
        <Select
          label='Danh mục'
          value={filters.categoryId}
          onChange={(value) => set('categoryId', value)}
          options={[
            ['ALL', 'Tất cả danh mục'],
            ...categories.map((item) => [String(item.id), item.name]),
          ]}
        />
        <div>
          <label className='mb-2 block text-[11px] font-medium text-slate-600'>Ngày cập nhật</label>
          <div className='grid grid-cols-1 gap-2'>
            <input
              type='date'
              className={inputClass}
              value={filters.fromDate}
              onChange={(e) => set('fromDate', e.target.value)}
            />
            <input
              type='date'
              className={inputClass}
              value={filters.toDate}
              onChange={(e) => set('toDate', e.target.value)}
            />
          </div>
        </div>
        <Select
          label='Sắp xếp theo'
          value={filters.sortBy}
          onChange={(value) => set('sortBy', value)}
          options={[
            ['updatedAt', 'Cập nhật lần cuối'],
            ['createdAt', 'Ngày tạo'],
            ['question', 'Câu hỏi'],
            ['status', 'Trạng thái'],
            ['category', 'Danh mục'],
            ['creator', 'Người tạo'],
          ]}
        />
        <Select
          label='Thứ tự sắp xếp'
          value={filters.sortOrder}
          onChange={(value) => set('sortOrder', value)}
          options={[
            ['DESC', 'DESC - Giảm dần'],
            ['ASC', 'ASC - Tăng dần'],
          ]}
        />
        <button
          type='button'
          onClick={onReset}
          className='flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-slate-200 text-[11px] font-semibold text-slate-600 hover:border-red-200 hover:text-[#D71920]'
        >
          <RotateCcw size={14} /> Xóa bộ lọc
        </button>
      </div>
    </aside>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div>
      <label className='mb-2 block text-[11px] font-medium text-slate-600'>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-[11px] text-slate-700 outline-none focus:border-red-300'
      >
        {options.map(([key, text]) => (
          <option key={key} value={key}>
            {text}
          </option>
        ))}
      </select>
    </div>
  );
}
export default FAQFilter;
