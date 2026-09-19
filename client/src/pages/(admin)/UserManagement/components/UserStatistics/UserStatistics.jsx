import { motion, useReducedMotion } from 'framer-motion';
import { BadgeCheck, ShieldCheck, UserRoundCog, Users } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';

function UserStatistics({ data, loading }) {
  const prefersReducedMotion = useReducedMotion();
  const total = data?.totalUsers ?? 0;

  const items = [
    {
      label: 'Tổng người dùng',
      value: total,
      description: 'Tất cả tài khoản',
      icon: Users,
      accentClassName: 'border-blue-100 bg-blue-50 text-blue-600',
    },
    {
      label: 'Đã xác thực',
      value: data?.verifiedUsers ?? 0,
      description: total
        ? `${Math.round(((data?.verifiedUsers ?? 0) / total) * 100)}% tổng tài khoản`
        : '0% tổng tài khoản',
      icon: BadgeCheck,
      accentClassName: 'border-emerald-100 bg-emerald-50 text-emerald-600',
    },
    {
      label: 'Tư vấn viên',
      value: data?.advisorCount ?? 0,
      description: 'Tài khoản advisor',
      icon: UserRoundCog,
      accentClassName: 'border-orange-100 bg-orange-50 text-orange-600',
    },
    {
      label: 'Quản trị viên',
      value: data?.adminCount ?? 0,
      description: 'Tài khoản admin',
      icon: ShieldCheck,
      accentClassName: 'border-red-100 bg-red-50 text-red-600',
    },
  ];

  return (
    <section className='grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4'>
      {items.map(({ label, value, description, icon: Icon, accentClassName }, index) => (
        <motion.div
          key={label}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.42, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
          whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.012 }}
          className='rounded-xl border border-slate-200 bg-white p-3.5 shadow-[0_2px_8px_rgba(15,23,42,0.02)] transition-[border-color,box-shadow] duration-300 hover:shadow-[0_10px_28px_rgba(15,23,42,0.07)] sm:p-5'
        >
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full border sm:h-11 sm:w-11 ${accentClassName}`}
          >
            <Icon size={19} strokeWidth={1.8} className='sm:hidden' />
            <Icon size={22} strokeWidth={1.8} className='hidden sm:block' />
          </div>

          <div className='mt-3 sm:mt-5'>
            {loading ? (
              <Skeleton className='h-7 w-16 sm:h-8 sm:w-20' />
            ) : (
              <p className='text-[24px] font-bold leading-none tracking-tight text-slate-900 sm:text-[28px]'>
                {Number(value).toLocaleString('vi-VN')}
              </p>
            )}

            <p className='mt-1.5 text-[12px] font-medium leading-snug text-slate-700 sm:mt-2 sm:text-[13px]'>
              {label}
            </p>
            <p className='mt-1 text-[11px] leading-snug text-slate-400'>{description}</p>
          </div>
        </motion.div>
      ))}
    </section>
  );
}

export default UserStatistics;
