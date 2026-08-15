import { CalendarDays } from 'lucide-react';
import AdminBreadcrumb from '@/components/AdminBreadcrumb/AdminBreadcrumb';

function DashboardHeader() {
  return (
    <div className='mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
      <div>
        <AdminBreadcrumb pageTitle='Dashboard (Tổng quan)' />
        <h1 className='text-[24px] font-bold tracking-tight text-slate-900 sm:text-[26px]'>
          Dashboard (Tổng quan)
        </h1>

        <p className='mt-1 text-[13px] text-slate-500'>Chào mừng bạn quay trở lại hệ thống</p>
      </div>

      <button
        type='button'
        className='flex h-10 items-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-3.5 text-[12px] font-medium text-slate-600 shadow-sm transition-colors hover:border-red-200 hover:text-[#D71920]'
      >
        <span>Hôm nay: 15/05/2025</span>

        <CalendarDays size={15} />
      </button>
    </div>
  );
}

export default DashboardHeader;
