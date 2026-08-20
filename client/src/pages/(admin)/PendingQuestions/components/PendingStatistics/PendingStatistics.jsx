import { Check, Clock3, MessageCircle, ThumbsUp } from 'lucide-react';

const statistics = [
  {
    label: 'Tổng số câu hỏi tồn đọng',
    value: '86',
    change: '+12',
    icon: MessageCircle,
    tone: 'bg-red-50 text-[#D71920]',
  },
  {
    label: 'Chưa xử lý',
    value: '24',
    change: '28%',
    icon: Clock3,
    tone: 'bg-orange-50 text-orange-500',
  },
  {
    label: 'Đang xử lý',
    value: '52',
    change: '60%',
    icon: MessageCircle,
    tone: 'bg-blue-50 text-blue-600',
  },
  {
    label: 'Đã trả lời',
    value: '10',
    change: '12%',
    icon: Check,
    tone: 'bg-emerald-50 text-emerald-600',
  },
  {
    label: 'Tỷ lệ hài lòng (30 ngày)',
    value: '92%',
    change: '+3.4%',
    icon: ThumbsUp,
    tone: 'bg-violet-50 text-violet-600',
  },
];

function PendingStatistics() {
  return (
    <section className='grid grid-cols-5 gap-4'>
      {statistics.map(({ label, value, change, icon: Icon, tone }) => (
        <div
          key={label}
          className='flex min-h-28 items-center gap-4 rounded-xl border border-slate-200 bg-white p-4'
        >
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${tone}`}
          >
            <Icon size={25} />
          </div>

          <div>
            <p className='text-[22px] font-bold leading-none text-slate-900'>{value}</p>
            <p className='mt-2 text-[11px] text-slate-700'>{label}</p>
            <p className='mt-2 text-[10px] text-emerald-600'>
              <b>{change}</b> so với hôm qua
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default PendingStatistics;
