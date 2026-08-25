import { AlertTriangle, FileCheck2, Files, LoaderCircle } from 'lucide-react';

function DocumentStatistics({ documents }) {
  const cards = [
    {
      label: 'Tổng tài liệu',
      value: documents.length,
      icon: Files,
      iconClass: 'bg-slate-100 text-slate-600',
    },
    {
      label: 'Đang hoạt động',
      value: documents.filter((item) => item.status === 'ACTIVE').length,
      icon: FileCheck2,
      iconClass: 'bg-emerald-50 text-emerald-600',
    },
    {
      label: 'Đang xử lý',
      value: documents.filter((item) => item.status === 'PROCESSING').length,
      icon: LoaderCircle,
      iconClass: 'bg-amber-50 text-amber-600',
    },
    {
      label: 'Lỗi xử lý',
      value: documents.filter((item) => item.status === 'FAILED').length,
      icon: AlertTriangle,
      iconClass: 'bg-red-50 text-[#D71920]',
    },
  ];

  return (
    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4'>
      {cards.map(({ label, value, icon: Icon, iconClass }) => (
        <div key={label} className='rounded-xl border border-slate-200 bg-white p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-[11px] font-medium text-slate-500'>{label}</p>
              <p className='mt-1 text-2xl font-bold text-slate-900'>{value}</p>
            </div>
            <div className={`rounded-xl p-3 ${iconClass}`}>
              <Icon size={20} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DocumentStatistics;
