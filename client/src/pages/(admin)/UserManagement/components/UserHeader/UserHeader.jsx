import { Download, UserPlus } from 'lucide-react';
import AdminBreadcrumb from '@/components/AdminBreadcrumb/AdminBreadcrumb';

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
        <button
          type='button'
          className='flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-[12px] font-medium text-slate-700 transition hover:border-red-200 hover:text-[#D71920]'
        >
          <Download size={16} />
          Xuất danh sách
        </button>
        <button
          type='button'
          className='flex h-10 items-center gap-2 rounded-lg bg-[#D71920] px-4 text-[12px] font-semibold text-white transition hover:bg-[#b9151b] hover:shadow-sm'
        >
          <UserPlus size={16} />
          Thêm người dùng
        </button>
      </div>
    </div>
  );
};

export default UserHeader;
