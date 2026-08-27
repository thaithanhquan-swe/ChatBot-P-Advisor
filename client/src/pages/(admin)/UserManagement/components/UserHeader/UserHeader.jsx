import { Download } from 'lucide-react';
import AdminBreadcrumb from '@/components/AdminBreadcrumb/AdminBreadcrumb';
import { Button } from '@/components/ui/button';

const UserHeader = () => {
  return (
    <div className='mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end'>
      <div>
        <AdminBreadcrumb pageTitle='Quản lý người dùng' />
        <h1 className='text-[24px] font-bold tracking-tight text-slate-900 sm:text-[26px]'>
          Quản lý người dùng
        </h1>
        <p className='mt-1 text-[13px] text-slate-500'>
          Quản lý tài khoản, vai trò và trạng thái hoạt động của người dùng trong hệ thống.
        </p>
      </div>

      <div className='flex flex-wrap gap-2'>
        <Button variant='outline'>
          <Download size={16} />
          Xuất danh sách
        </Button>
      </div>
    </div>
  );
};

export default UserHeader;
