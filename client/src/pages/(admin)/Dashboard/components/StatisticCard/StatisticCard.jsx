import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

function StatisticCard({ title, value, change, description, icon: Icon, positive = true }) {
  return (
    <div className='rounded-xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm'>
      <div className='flex h-11 w-11 items-center justify-center rounded-full border border-red-100 bg-red-50 text-[#D71920]'>
        <Icon size={22} strokeWidth={1.8} />
      </div>

      <div className='mt-5'>
        <p className='text-[28px] font-bold leading-none tracking-tight text-slate-900'>{value}</p>

        <p className='mt-2 text-[13px] font-medium text-slate-700'>{title}</p>

        <div className='mt-3 flex items-center gap-1.5 text-[11px]'>
          {positive ? (
            <ArrowUpRight size={13} className='text-emerald-600' />
          ) : (
            <ArrowDownRight size={13} className='text-red-600' />
          )}

          <span className='font-semibold text-emerald-600'>{change}</span>

          <span className='text-slate-400'>{description}</span>
        </div>
      </div>
    </div>
  );
}

export default StatisticCard;
