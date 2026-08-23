import { ShieldCheck, UserCheck, UserRoundCog, Users } from 'lucide-react';

const statistics = [
  {
    label: 'Tổng người dùng',
    value: '1,248',
    description: 'Tất cả tài khoản',
    icon: Users,
    tone: 'bg-blue-50 text-blue-600',
  },
  {
    label: 'Đang hoạt động',
    value: '1,186',
    description: '95% tổng tài khoản',
    icon: UserCheck,
    tone: 'bg-emerald-50 text-emerald-600',
  },
  {
    label: 'Tư vấn viên',
    value: '46',
    description: 'Tài khoản advisor',
    icon: UserRoundCog,
    tone: 'bg-orange-50 text-orange-500',
  },
  {
    label: 'Quản trị viên',
    value: '16',
    description: 'Tài khoản admin',
    icon: ShieldCheck,
    tone: 'bg-red-50 text-[#D71920]',
  },
];

function UserStatistics() {
  return (
    <section className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
      {statistics.map(({ label, value, description, icon: Icon, tone }) => (
        <div key={label} className='rounded-xl border border-slate-200 bg-white p-4'>
          <div className='flex items-center gap-3'>
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${tone}`}>
              <Icon size={21} strokeWidth={1.8} />
            </div>
            <div>
              <p className='text-[11px] text-slate-500'>{label}</p>
              <p className='mt-0.5 text-[23px] font-bold leading-none text-slate-900'>{value}</p>
              <p className='mt-1 text-[10px] text-slate-400'>{description}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default UserStatistics;
