import { CalendarDays, Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate, formatFileSize, getFileTypeLabel } from '../../constants/documents';

const typeStyle = {
  PDF: 'bg-red-50 text-red-600 border-red-100',
  DOCX: 'bg-blue-50 text-blue-600 border-blue-100',
  TXT: 'bg-slate-100 text-slate-600 border-slate-200',
};

const DocumentCard = ({ document, onPreview, onDownload }) => {
  const typeLabel = document.type || getFileTypeLabel(document.fileType);
  const formattedDate = document.date || formatDate(document.updatedAt || document.createdAt);
  const formattedSize = document.size || formatFileSize(document.fileSize);

  return (
    <article className='flex min-h-[164px] flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-[0_8px_28px_rgba(15,23,42,0.06)]'>
      <div className='flex gap-4 cursor-pointer' onClick={() => onPreview && onPreview(document)}>
        <div
          className={`flex h-14 w-12 shrink-0 flex-col items-center justify-center rounded-lg border ${
            typeStyle[typeLabel] || typeStyle.TXT
          }`}
        >
          <FileText size={24} strokeWidth={1.8} />
          <span className='mt-0.5 text-[9px] font-extrabold'>{typeLabel}</span>
        </div>

        <div className='min-w-0'>
          <h3 className='line-clamp-2 text-[15px] leading-5 font-bold text-gray-950 hover:text-(--primary-color) transition-colors'>
            {document.title}
          </h3>
          <p className='mt-1.5 line-clamp-2 text-[12.5px] leading-5 text-gray-500'>
            {document.description || 'Không có mô tả.'}
          </p>
        </div>
      </div>

      <div className='mt-5 flex flex-wrap items-center justify-between gap-3'>
        <div className='flex items-center gap-2 text-[11.5px] text-gray-500'>
          <span className='inline-flex items-center gap-1.5'>
            <CalendarDays size={14} />
            {formattedDate}
          </span>
          <span>•</span>
          <Badge variant='outline' className='text-[10px] px-1.5 py-0 font-semibold'>
            {typeLabel}
          </Badge>
          <span>•</span>
          <span>{formattedSize}</span>
        </div>

        <div>
          <Button
            type='button'
            onClick={() => onDownload(document)}
            variant='outline'
            size='sm'
            className='h-9 gap-1.5 rounded-lg border-[#e6b6be] text-[12px] font-semibold text-(--primary-color) hover:bg-red-50 hover:text-(--primary-color)'
          >
            <Download size={15} /> Tải xuống
          </Button>
        </div>
      </div>
    </article>
  );
};

export default DocumentCard;


