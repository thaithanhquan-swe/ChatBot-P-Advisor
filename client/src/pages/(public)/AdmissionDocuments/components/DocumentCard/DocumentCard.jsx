import { CalendarDays, Download, Eye, FileText } from 'lucide-react';

const typeStyle = {
  PDF: 'bg-red-50 text-red-600 border-red-100',
  DOCX: 'bg-blue-50 text-blue-600 border-blue-100',
  TXT: 'bg-slate-100 text-slate-600 border-slate-200',
};

const DocumentCard = ({ document, onPreview, onDownload }) => {
  return (
    <article className='flex min-h-[164px] flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-[0_8px_28px_rgba(15,23,42,0.06)]'>
      <div className='flex gap-4'>
        <div className={`flex h-14 w-12 shrink-0 flex-col items-center justify-center rounded-lg border ${typeStyle[document.type] || typeStyle.TXT}`}>
          <FileText size={24} strokeWidth={1.8} />
          <span className='mt-0.5 text-[9px] font-extrabold'>{document.type}</span>
        </div>

        <div className='min-w-0'>
          <h3 className='line-clamp-2 text-[15px] leading-5 font-bold text-gray-950'>{document.title}</h3>
          <p className='mt-1.5 line-clamp-2 text-[12.5px] leading-5 text-gray-500'>{document.description}</p>
        </div>
      </div>

      <div className='mt-5 flex flex-wrap items-center justify-between gap-3'>
        <div className='flex items-center gap-2 text-[11.5px] text-gray-500'>
          <span className='inline-flex items-center gap-1.5'><CalendarDays size={14} />{document.date}</span>
          <span>•</span><span>{document.type}</span><span>•</span><span>{document.size}</span>
        </div>

        <div className='flex items-center gap-2'>
          <button type='button' onClick={() => onPreview(document)} className='inline-flex h-9 items-center gap-1.5 rounded-lg border border-gray-200 px-3 text-[12px] font-semibold text-gray-800 transition hover:bg-gray-50'>
            <Eye size={15} /> Xem
          </button>
          <button type='button' onClick={() => onDownload(document)} className='inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#e6b6be] px-3 text-[12px] font-semibold text-(--primary-color) transition hover:bg-red-50'>
            <Download size={15} /> Tải xuống
          </button>
        </div>
      </div>
    </article>
  );
};

export default DocumentCard;
