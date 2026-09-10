import { ArrowRight, FileText } from 'lucide-react';

const typeColor = {
  PDF: 'text-red-600 bg-red-50',
  DOCX: 'text-blue-600 bg-blue-50',
  TXT: 'text-slate-600 bg-slate-100',
};

const LatestDocuments = ({ documents, onSelect }) => {
  return (
    <aside className='rounded-xl border border-gray-200 bg-white p-4'>
      <div className='mb-3 flex items-center justify-between gap-3'>
        <h2 className='flex items-center gap-2 text-[14px] font-bold text-gray-950'>
          <FileText size={17} className='text-(--primary-color)' />
          Tài liệu mới nhất
        </h2>
        <button type='button' className='inline-flex items-center gap-1 text-[11px] font-semibold text-(--primary-color)'>
          Xem tất cả <ArrowRight size={13} />
        </button>
      </div>

      <div className='divide-y divide-gray-100'>
        {documents.slice(0, 5).map((document) => (
          <button key={document.id} type='button' onClick={() => onSelect(document)} className='flex w-full items-start gap-3 py-3 text-left transition hover:bg-gray-50/70'>
            <span className={`mt-0.5 flex h-8 w-7 shrink-0 items-center justify-center rounded ${typeColor[document.type] || typeColor.TXT}`}>
              <FileText size={16} />
            </span>
            <span className='min-w-0'>
              <span className='block line-clamp-2 text-[12px] leading-4.5 font-medium text-gray-900'>{document.title}</span>
              <span className='mt-0.5 block text-[10.5px] text-gray-500'>{document.date}</span>
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default LatestDocuments;
