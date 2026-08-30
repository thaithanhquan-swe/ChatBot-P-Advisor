import { Ban, Check, Clock3, MessageCircle } from 'lucide-react';

function ConsultationRequestStatistics({ counts }) {
  const statistics = [
    ['Tổng yêu cầu', counts.total, MessageCircle, 'bg-red-50 text-[#D71920]'],
    ['Chờ tiếp nhận', counts.PENDING, Clock3, 'bg-orange-50 text-orange-500'],
    ['Đang xử lý', counts.IN_PROGRESS, MessageCircle, 'bg-blue-50 text-blue-600'],
    ['Đã hoàn thành', counts.RESOLVED, Check, 'bg-emerald-50 text-emerald-600'],
    ['Đã hủy', counts.CANCELLED, Ban, 'bg-slate-100 text-slate-600'],
  ];
  return (
    <section className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5'>
      {statistics.map(([label, value, Icon, tone]) => (
        <div key={label} className='flex min-h-28 items-center gap-4 rounded-xl border border-slate-200 bg-white p-4'>
          <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${tone}`}><Icon size={25} /></div>
          <div><p className='text-[22px] font-bold leading-none text-slate-900'>{value}</p><p className='mt-2 text-[11px] text-slate-700'>{label}</p></div>
        </div>
      ))}
    </section>
  );
}
export default ConsultationRequestStatistics;
