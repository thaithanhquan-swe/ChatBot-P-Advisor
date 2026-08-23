import { CircleSlash2, FilePenLine, HelpCircle, Send } from 'lucide-react';

function FAQStatistics({ faqs }) {
  const cards = [
    { label: 'Tổng FAQ', value: faqs.length, icon: HelpCircle, className: 'bg-blue-50 text-blue-600' },
    { label: 'Đã xuất bản', value: faqs.filter((item) => item.status === 'PUBLISHED').length, icon: Send, className: 'bg-emerald-50 text-emerald-600' },
    { label: 'Bản nháp', value: faqs.filter((item) => item.status === 'DRAFT').length, icon: FilePenLine, className: 'bg-amber-50 text-amber-600' },
    { label: 'Đang ẩn', value: faqs.filter((item) => item.status === 'HIDDEN').length, icon: CircleSlash2, className: 'bg-slate-100 text-slate-600' },
  ];
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
      {cards.map(({ label, value, icon: Icon, className }) => (
        <div key={label} className='rounded-xl border border-slate-200 bg-white p-4'>
          <div className='flex items-center justify-between'>
            <div><p className='text-[11px] font-medium text-slate-500'>{label}</p><p className='mt-1 text-2xl font-bold text-slate-900'>{value}</p></div>
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${className}`}><Icon size={20} /></div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default FAQStatistics;
