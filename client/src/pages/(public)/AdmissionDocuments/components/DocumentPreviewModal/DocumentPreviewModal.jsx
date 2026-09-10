import { CalendarDays, FileText, X } from 'lucide-react';

const DocumentPreviewModal = ({ document, onClose }) => {
  if (!document) return null;

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-4' onMouseDown={onClose}>
      <div className='w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl' onMouseDown={(event) => event.stopPropagation()}>
        <div className='flex items-start justify-between gap-4'>
          <div className='flex gap-3'>
            <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-(--primary-color)'>
              <FileText size={24} />
            </div>
            <div>
              <h3 className='text-[18px] font-bold text-gray-950'>{document.title}</h3>
              <div className='mt-1.5 flex flex-wrap items-center gap-2 text-[11.5px] text-gray-500'>
                <span className='inline-flex items-center gap-1'><CalendarDays size={13} />{document.date}</span>
                <span>•</span><span>{document.type}</span><span>•</span><span>{document.size}</span>
              </div>
            </div>
          </div>
          <button type='button' onClick={onClose} className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100'><X size={18} /></button>
        </div>

        <div className='mt-5 rounded-xl border border-dashed border-gray-200 bg-gray-50 p-5'>
          <p className='text-[13px] leading-6 text-gray-600'>{document.description}</p>
          <p className='mt-3 text-[12px] leading-5 text-gray-500'>
            Đây là dữ liệu mẫu để hoàn thiện giao diện trước. Khi có API thật, khu vực này có thể hiển thị file hoặc URL preview trả về từ backend.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreviewModal;
