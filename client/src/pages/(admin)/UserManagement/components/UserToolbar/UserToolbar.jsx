import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

const UserToolbar = () => {
  return (
    <div className='mb-4'>
      <h2 className='mb-4 text-[15px] font-bold text-slate-900'>Danh sách người dùng</h2>
      <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4'>
        <div className='relative sm:col-span-2'>
          <Search size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' />
        <Input
            className='pl-9 text-[11px]'
          placeholder='Tìm kiếm theo họ tên hoặc email...'
        />
        </div>
        <Select aria-label='Vai trò'><option>Tất cả vai trò</option></Select>
        <Select aria-label='Sắp xếp'><option>Mới nhất</option></Select>
      </div>
    </div>
  );
};

export default UserToolbar;
