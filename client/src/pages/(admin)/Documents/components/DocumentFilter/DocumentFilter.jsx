import { RotateCcw, Search, SlidersHorizontal } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';

import { DOCUMENT_FILE_TYPES, DOCUMENT_STATUS_OPTIONS } from '../../constants/document';

function DocumentFilter({ filters, onChange, onReset }) {
  const set = (key, value) => {
    onChange((current) => ({
      ...current,
      [key]: value,
    }));
  };

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

            <Input
              value={filters.search}
              onChange={(event) => set('search', event.target.value)}
              placeholder='Tên tài liệu, tên file...'
              className='h-10 pl-9 text-[11px]'
            />
          </div>
        </div>

        <FilterSelect
          label='Trạng thái'
          value={filters.status}
          onChange={(value) => set('status', value)}
        >
          <SelectItem value='ALL'>Tất cả trạng thái</SelectItem>

          {DOCUMENT_STATUS_OPTIONS.map((status) => (
            <SelectItem key={status} value={status}>
              {getStatusLabel(status)}
            </SelectItem>
          ))}
        </FilterSelect>

        <FilterSelect
          label='Loại file'
          value={filters.fileType}
          onChange={(value) => set('fileType', value)}
          displayValue={
            filters.fileType === 'ALL'
              ? 'Tất cả loại file'
              : DOCUMENT_FILE_TYPES.find((type) => type.value === filters.fileType)?.label
          }
        >
          <SelectItem value='ALL'>Tất cả loại file</SelectItem>

          {DOCUMENT_FILE_TYPES.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </FilterSelect>

        <FilterSelect
          label='Sắp xếp theo'
          value={filters.sortBy}
          onChange={(value) => set('sortBy', value)}
        >
          <SelectItem value='updatedAt'>Cập nhật lần cuối</SelectItem>

          <SelectItem value='createdAt'>Ngày tạo</SelectItem>

          <SelectItem value='title'>Tên tài liệu</SelectItem>

          <SelectItem value='fileName'>Tên file</SelectItem>

          <SelectItem value='fileType'>Loại file</SelectItem>

          <SelectItem value='status'>Trạng thái</SelectItem>
        </FilterSelect>

        <FilterSelect
          label='Thứ tự sắp xếp'
          value={filters.sortOrder}
          onChange={(value) => set('sortOrder', value)}
        >
          <SelectItem value='DESC'>DESC - Giảm dần</SelectItem>

          <SelectItem value='ASC'>ASC - Tăng dần</SelectItem>
        </FilterSelect>

        <Button type='button' variant='outline' onClick={onReset} className='h-10 text-[11px]'>
          <RotateCcw size={14} />
          Xóa bộ lọc
        </Button>
      </div>
    </aside>
  );
}

function FilterSelect({ label, value, onChange, children, displayValue }) {
  return (
    <div>
      <label className='mb-2 block text-[11px] font-medium text-slate-600'>{label}</label>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className='h-10 w-full min-w-0 overflow-hidden text-[11px]'>
          <span className='truncate'>{displayValue || value}</span>
        </SelectTrigger>

        <SelectContent>{children}</SelectContent>
      </Select>
    </div>
  );
}

function getStatusLabel(status) {
  switch (status) {
    case 'DRAFT':
      return 'Bản nháp';

    case 'PUBLISHED':
      return 'Đã xuất bản';

    case 'ARCHIVED':
      return 'Đã lưu trữ';

    default:
      return status;
  }
}

export default DocumentFilter;
