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
          Theo dõi tài khoản, vai trò, trạng thái xác thực và lịch sử sử dụng trong hệ thống.
        </p>
      </div>
    </div>
  );
};

export default UserHeader;
