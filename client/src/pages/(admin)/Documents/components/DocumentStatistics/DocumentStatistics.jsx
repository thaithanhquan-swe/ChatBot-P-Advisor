import { Archive, FileCheck2, FilePenLine, Files } from 'lucide-react';

function DocumentStatistics({ documents, totalItems }) {
  const publishedCount = documents.filter((item) => item.status === 'PUBLISHED').length;

  const draftCount = documents.filter((item) => item.status === 'DRAFT').length;

  const archivedCount = documents.filter((item) => item.status === 'ARCHIVED').length;

  const cards = [
    {
      label: 'Tổng tài liệu',
      value: totalItems,
      icon: Files,
      iconClass: 'bg-slate-100 text-slate-600',
    },
    {
      label: 'Đã xuất bản',
      value: publishedCount,
      icon: FileCheck2,
      iconClass: 'bg-emerald-50 text-emerald-600',
    },
    {
      label: 'Bản nháp',
      value: draftCount,
      icon: FilePenLine,
      iconClass: 'bg-amber-50 text-amber-600',
    },
    {
      label: 'Đã lưu trữ',
      value: archivedCount,
      icon: Archive,
      iconClass: 'bg-slate-100 text-slate-600',
    },
  ];

  return (
    <div className='grid grid-cols-2 gap-3 xl:grid-cols-4'>
      {cards.map(({ label, value, icon: Icon, iconClass }) => (
        <div key={label} className='rounded-xl border border-slate-200 bg-white p-3 sm:p-4'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-[10px] font-medium text-slate-500 sm:text-[11px]'>{label}</p>

              <p className='mt-1 text-xl font-bold text-slate-900 sm:text-2xl'>{value}</p>
            </div>

            <div className={`rounded-xl p-2.5 sm:p-3 ${iconClass}`}>
              <Icon size={18} className='sm:hidden' />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DocumentStatistics;
