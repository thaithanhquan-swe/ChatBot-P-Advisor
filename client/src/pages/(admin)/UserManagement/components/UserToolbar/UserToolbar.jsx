import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';

function UserToolbar({ value, onChange }) {
  return (
    <div className='mb-5'>
      <h2 className='mb-4 text-base font-semibold'>Danh sách người dùng</h2>

      <div className='relative max-w-2xl'>
        <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />

        <Input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className='pl-9'
          placeholder='Tìm theo tên đăng nhập, email hoặc số điện thoại...'
        />
      </div>
    </div>
  );
}

export default UserToolbar;
