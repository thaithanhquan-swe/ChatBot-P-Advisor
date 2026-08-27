import { FileText } from 'lucide-react';
import ModalShell from '../ModalShell/ModalShell';

function DocumentDetailModal({ document, onClose }) {
  return (
    <ModalShell
      open={Boolean(document)}
      onClose={onClose}
      title='Chi tiết tài liệu'
      description='Thông tin file và trạng thái hiện tại của tài liệu.'
    >
      {document && (
        <div className='p-6'>
          <div className='mb-6 flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4'>
            <div className='rounded-xl bg-red-50 p-3 text-[#D71920]'>
              <FileText size={24} />
            </div>
            <div className='min-w-0'>
              <h3 className='text-base font-bold text-slate-900'>{document.title}</h3>
              <p className='mt-1 break-all text-xs text-slate-500'>{document.fileName}</p>
            </div>
          </div>

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <Info label='Loại file' value={document.fileType} />
            <Info label='Trạng thái' value={document.status} />
            <Info label='Ngày tạo' value={document.createdAt} />
            <Info label='Cập nhật lần cuối' value={document.updatedAt} />
          </div>

          <div className='mt-4 rounded-xl border border-slate-200 p-4'>
            <p className='text-[10px] font-semibold uppercase tracking-wide text-slate-400'>Mô tả</p>
            <p className='mt-2 whitespace-pre-wrap text-xs leading-6 text-slate-700'>
              {document.description || 'Chưa có mô tả.'}
            </p>
          </div>

          <div className='mt-5 flex justify-end'>
            <button
              type='button'
              onClick={onClose}
              className='h-10 rounded-lg border border-slate-200 px-4 text-xs font-semibold text-slate-600 hover:bg-slate-50'
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </ModalShell>
  );
}

function Info({ label, value }) {
  return (
    <div className='rounded-xl border border-slate-200 p-4'>
      <p className='text-[10px] font-semibold uppercase tracking-wide text-slate-400'>{label}</p>
      <p className='mt-2 text-xs font-semibold text-slate-700'>{value}</p>
    </div>
  );
}

export default DocumentDetailModal;
