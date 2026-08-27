import { RotateCcw, Search, SlidersHorizontal } from 'lucide-react';
import { DOCUMENT_FILE_TYPES, DOCUMENT_STATUS_OPTIONS } from '../../constants/document';

function DocumentFilter({ filters, onChange, onReset }) {
  const set = (key, value) => onChange((current) => ({ ...current, [key]: value }));
  const inputClass =
    'h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-[11px] text-slate-700 outline-none focus:border-red-300 focus:ring-2 focus:ring-red-50';

  return (
    <aside className='mt-5 rounded-xl border border-slate-200 bg-white p-4'>
      <div className='mb-4 flex items-center gap-2'>
        <SlidersHorizontal size={16} className='text-[#D71920]' />
        <h2 className='text-[14px] font-bold text-slate-900'>Bộ lọc tài liệu</h2>
      </div>

      <div className='grid grid-cols-1 items-end gap-3 md:grid-cols-2 xl:grid-cols-[minmax(240px,1.6fr)_repeat(4,minmax(150px,1fr))_auto]'>
        <div>
          <label className='mb-2 block text-[11px] font-medium text-slate-600'>Tìm kiếm</label>
          <div className='relative'>
            <Search size={14} className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' />
            <input
              className={`${inputClass} pl-9`}
              value={filters.search}
              onChange={(event) => set('search', event.target.value)}
              placeholder='Tên tài liệu, tên file...'
            />
          </div>
        </div>

        <Select
          label='Trạng thái'
          value={filters.status}
          onChange={(value) => set('status', value)}
          options={[
            ['ALL', 'Tất cả trạng thái'],
            ...DOCUMENT_STATUS_OPTIONS.map((status) => [status, status]),
          ]}
        />

        <Select
          label='Loại file'
          value={filters.fileType}
          onChange={(value) => set('fileType', value)}
          options={[
            ['ALL', 'Tất cả loại file'],
            ...DOCUMENT_FILE_TYPES.map((type) => [type, type]),
          ]}
        />

        <Select
          label='Sắp xếp theo'
          value={filters.sortBy}
          onChange={(value) => set('sortBy', value)}
          options={[
            ['updatedAt', 'Cập nhật lần cuối'],
            ['createdAt', 'Ngày tạo'],
            ['title', 'Tên tài liệu'],
            ['fileName', 'Tên file'],
            ['fileType', 'Loại file'],
            ['status', 'Trạng thái'],
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
          className='flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 text-[11px] font-semibold text-slate-600 transition hover:border-red-200 hover:text-[#D71920] xl:w-auto'
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
        onChange={(event) => onChange(event.target.value)}
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

export default DocumentFilter;
