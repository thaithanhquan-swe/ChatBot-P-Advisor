import { RotateCcw, Search, SlidersHorizontal } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function ConsultationRequestFilter({ filters, onChange, onReset }) {
  const setValue = (key, value) => {
    onChange((current) => ({ ...current, [key]: value }));
  };

  const handleInputChange = (key) => (event) => {
    setValue(key, event.target.value);
  };

  return (
    <Card className='mt-5 rounded-xl border-slate-200 bg-white shadow-none'>
      <CardContent className='p-4'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-[15px] font-bold text-slate-900'>Bộ lọc yêu cầu tư vấn</h2>

          <SlidersHorizontal size={18} className='text-slate-500' />
        </div>

        <div className='grid grid-cols-1 items-end gap-3 md:grid-cols-2 xl:grid-cols-[1.6fr_1fr_1fr_1fr_1fr_0.8fr_auto]'>
          <FilterLabel label='Tìm kiếm'>
            <div className='relative flex items-center'>
              <Input
                value={filters.keyword}
                onChange={handleInputChange('keyword')}
                placeholder='Câu hỏi, email, SĐT...'
                className='h-9 w-full rounded-lg pr-8 text-[11px]'
              />

              <Search
                size={14}
                className='pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400'
              />
            </div>
          </FilterLabel>

          <FilterLabel label='Trạng thái'>
            <Select
              value={filters.status || 'ALL'}
              onValueChange={(val) => setValue('status', val === 'ALL' ? '' : val)}
            >
              <SelectTrigger className='h-9 w-full rounded-lg text-[11px]'>
                <SelectValue placeholder='Tất cả trạng thái' />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value='ALL' className='text-[11px]'>
                  Tất cả trạng thái
                </SelectItem>

                <SelectItem value='PENDING' className='text-[11px]'>
                  Chờ tiếp nhận
                </SelectItem>

                <SelectItem value='IN_PROGRESS' className='text-[11px]'>
                  Đang xử lý
                </SelectItem>

                <SelectItem value='RESOLVED' className='text-[11px]'>
                  Đã hoàn thành
                </SelectItem>
              </SelectContent>
            </Select>
          </FilterLabel>

          <FilterLabel label='Từ ngày'>
            <Input
              type='date'
              value={filters.createdFrom || ''}
              onChange={handleInputChange('createdFrom')}
              className='h-9 w-full rounded-lg px-2 text-[11px]'
            />
          </FilterLabel>

          <FilterLabel label='Đến ngày'>
            <Input
              type='date'
              value={filters.createdTo || ''}
              onChange={handleInputChange('createdTo')}
              className='h-9 w-full rounded-lg px-2 text-[11px]'
            />
          </FilterLabel>

          <FilterLabel label='Sắp xếp theo'>
            <Select
              value={filters.sortBy || 'createdAt'}
              onValueChange={(val) => setValue('sortBy', val)}
            >
              <SelectTrigger className='h-9 w-full rounded-lg text-[11px]'>
                <SelectValue placeholder='Ngày tạo' />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value='createdAt' className='text-[11px]'>
                  Ngày tạo
                </SelectItem>

                <SelectItem value='updatedAt' className='text-[11px]'>
                  Ngày cập nhật
                </SelectItem>

                <SelectItem value='status' className='text-[11px]'>
                  Trạng thái
                </SelectItem>

                <SelectItem value='resolvedAt' className='text-[11px]'>
                  Ngày hoàn thành
                </SelectItem>
              </SelectContent>
            </Select>
          </FilterLabel>

          <FilterLabel label='Thứ tự'>
            <Select
              value={filters.sortDirection || 'DESC'}
              onValueChange={(val) => setValue('sortDirection', val)}
            >
              <SelectTrigger className='h-9 w-full rounded-lg text-[11px]'>
                <SelectValue placeholder='Mới nhất' />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value='DESC' className='text-[11px]'>
                  Mới nhất
                </SelectItem>

                <SelectItem value='ASC' className='text-[11px]'>
                  Cũ nhất
                </SelectItem>
              </SelectContent>
            </Select>
          </FilterLabel>

          <div className='flex justify-end'>
            <Button
              type='button'
              variant='outline'
              onClick={onReset}
              title='Xóa bộ lọc'
              size='icon'
              className='h-9 w-9 shrink-0 rounded-lg border-slate-200'
            >
              <RotateCcw size={14} className='text-slate-500' />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function FilterLabel({ label, children }) {
  return (
    <div>
      <span className='mb-1.5 block text-[11px] font-medium text-slate-700'>{label}</span>
      {children}
    </div>
  );
}

export default ConsultationRequestFilter;
