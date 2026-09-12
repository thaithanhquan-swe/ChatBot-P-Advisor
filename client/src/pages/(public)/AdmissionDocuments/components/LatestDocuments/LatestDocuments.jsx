import { FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate, getFileTypeLabel } from '../../constants/documents';

const typeColor = {
  PDF: 'text-red-600 bg-red-50',
  DOCX: 'text-blue-600 bg-blue-50',
  TXT: 'text-slate-600 bg-slate-100',
};

const LatestDocuments = ({ documents = [], onSelect }) => {
  return (
    <Card className='rounded-xl border-gray-200 bg-white shadow-none'>
      <CardHeader className='p-4 pb-2'>
        <CardTitle className='flex items-center gap-2 text-[14px] font-bold text-gray-950'>
          <FileText size={17} className='text-(--primary-color)' />
          Tài liệu mới nhất
        </CardTitle>
      </CardHeader>

      <CardContent className='p-4 pt-0 divide-y divide-gray-100'>
        {documents.length > 0 ? (
          documents.slice(0, 5).map((document) => {
            const typeLabel = document.type || getFileTypeLabel(document.fileType);
            const formattedDate = document.date || formatDate(document.updatedAt || document.createdAt);

            return (
              <button
                key={document.id}
                type='button'
                onClick={() => onSelect(document)}
                className='flex w-full items-start gap-3 py-3 text-left transition hover:bg-gray-50/70'
              >
                <span
                  className={`mt-0.5 flex h-8 w-7 shrink-0 items-center justify-center rounded ${
                    typeColor[typeLabel] || typeColor.TXT
                  }`}
                >
                  <FileText size={16} />
                </span>
                <span className='min-w-0'>
                  <span className='block line-clamp-2 text-[12px] leading-4.5 font-medium text-gray-900'>
                    {document.title}
                  </span>
                  <span className='mt-0.5 block text-[10.5px] text-gray-500'>{formattedDate}</span>
                </span>
              </button>
            );
          })
        ) : (
          <div className='py-6 text-center text-[12px] text-gray-400'>Chưa có tài liệu mới</div>
        )}
      </CardContent>
    </Card>
  );
};

export default LatestDocuments;


