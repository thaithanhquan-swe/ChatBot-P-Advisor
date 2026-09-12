import { Ban, Check, Clock3, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

function ConsultationRequestStatistics({ counts = {} }) {
  const statistics = [
    ['Tổng yêu cầu', counts.total ?? 0, MessageCircle, 'bg-red-50 text-[#D71920]'],
    ['Chờ tiếp nhận', counts.PENDING ?? 0, Clock3, 'bg-orange-50 text-orange-500'],
    ['Đang xử lý', counts.IN_PROGRESS ?? 0, MessageCircle, 'bg-blue-50 text-blue-600'],
    ['Đã hoàn thành', counts.RESOLVED ?? 0, Check, 'bg-emerald-50 text-emerald-600'],
    ['Đã hủy', counts.CANCELLED ?? 0, Ban, 'bg-slate-100 text-slate-600'],
  ];

  return (
    <section className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5'>
      {statistics.map(([label, value, Icon, tone]) => (
        <Card key={label} className='rounded-xl border-slate-200 bg-white shadow-none'>
          <CardContent className='flex min-h-28 items-center gap-4 p-4'>
            <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${tone}`}>
              <Icon size={25} />
            </div>
            <div>
              <p className='text-[22px] font-bold leading-none text-slate-900'>{value}</p>
              <p className='mt-2 text-[11px] font-medium text-slate-600'>{label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

export default ConsultationRequestStatistics;

