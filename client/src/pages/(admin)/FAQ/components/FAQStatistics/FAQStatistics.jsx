import { Archive, CheckCircle2, Clock3, FileText } from 'lucide-react';

const statistics = [
  {
    label: 'Tổng số tài liệu',
    value: '358',
    description: 'Tất cả tài liệu',
    icon: FileText,
    iconClass: 'bg-blue-50 text-blue-600',
  },
  {
    label: 'Đã xuất bản',
    value: '312',
    description: '87.2%',
    icon: CheckCircle2,
    iconClass: 'bg-emerald-50 text-emerald-600',
  },
  {
    label: 'Bản nháp',
    value: '28',
    description: '7.8%',
    icon: Clock3,
    iconClass: 'bg-orange-50 text-orange-500',
  },
  {
    label: 'Đã lưu trữ',
    value: '18',
    description: '5.0%',
    icon: Archive,
    iconClass: 'bg-red-50 text-[#D71920]',
  },
];

function FAQStatistics() {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
      {statistics.map((item) => {
        const Icon = item.icon;

        return (
          <div key={item.label} className='rounded-xl border border-slate-200 bg-white p-4'>
            <div className='flex items-center gap-3'>
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${item.iconClass}`}
              >
                <Icon size={21} strokeWidth={1.8} />
              </div>

              <div>
                <p className='text-[11px] text-slate-500'>{item.label}</p>

                <p className='mt-0.5 text-[23px] font-bold leading-none text-slate-900'>
                  {item.value}
                </p>

                <p className='mt-1 text-[10px] text-slate-400'>{item.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FAQStatistics;
