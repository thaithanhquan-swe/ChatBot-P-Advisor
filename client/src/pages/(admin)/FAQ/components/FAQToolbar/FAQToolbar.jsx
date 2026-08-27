import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

function FAQToolbar() {
  return (
    <div className='mb-4'>
      <h2 className='mb-4 text-[15px] font-bold text-slate-900'>Danh sách FAQ / Tài liệu</h2>

      <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4'>
        {/* Search */}
        <div className='relative'>
          <Search size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' />

          <Input
            placeholder='Tìm kiếm tiêu đề, từ khóa...'
            className='pl-9 text-[11px]'
          />
        </div>
        <Select aria-label='Danh mục'><option>Tất cả danh mục</option></Select>
        <Select aria-label='Trạng thái'><option>Tất cả trạng thái</option></Select>
        <Select aria-label='Sắp xếp'><option>Sắp xếp mới nhất</option></Select>
      </div>
    </div>
  );
}

export default FAQToolbar;
