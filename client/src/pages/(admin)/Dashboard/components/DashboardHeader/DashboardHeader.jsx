import { motion } from 'framer-motion';
import { CalendarDays } from 'lucide-react';

import AdminBreadcrumb from '@/components/AdminBreadcrumb/AdminBreadcrumb';

function DashboardHeader() {
  const today = new Intl.DateTimeFormat('vi-VN').format(new Date());

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className='mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center'
    >
      <div>
        <AdminBreadcrumb pageTitle='Dashboard (Tổng quan)' />

        <h1 className='text-[24px] font-bold tracking-tight text-slate-900 sm:text-[26px]'>
          Dashboard (Tổng quan)
        </h1>

        <p className='mt-1 text-[13px] text-slate-500'>Chào mừng bạn quay trở lại hệ thống</p>
      </div>

      <motion.button
        type='button'
        whileHover={{
          y: -2,
          scale: 1.015,
        }}
        whileTap={{
          scale: 0.98,
        }}
        className='flex h-10 items-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-3.5 text-[12px] font-medium text-slate-600 shadow-sm transition-colors hover:border-red-200 hover:text-[#D71920]'
      >
        <span>Hôm nay: {today}</span>

        <CalendarDays size={15} />
      </motion.button>
    </motion.div>
  );
}

export default DashboardHeader;
