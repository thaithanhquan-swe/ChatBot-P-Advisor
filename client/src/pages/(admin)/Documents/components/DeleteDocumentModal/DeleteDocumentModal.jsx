import { AlertTriangle } from 'lucide-react';
import ModalShell from '../ModalShell/ModalShell';

function DeleteDocumentModal({ document, onClose, onConfirm }) {
  return (
    <ModalShell open={Boolean(document)} onClose={onClose} title='Xóa tài liệu' size='max-w-md'>
      {document && (
        <div className='p-6'>
          <div className='flex gap-3 rounded-xl border border-red-100 bg-red-50 p-4'>
            <AlertTriangle size={21} className='mt-0.5 shrink-0 text-[#D71920]' />
            <div>
              <p className='text-sm font-semibold text-slate-900'>
                Bạn có chắc chắn muốn xóa tài liệu này không?
              </p>
              <p className='mt-1 text-xs leading-5 text-slate-500'>
                “{document.title}” sẽ bị loại khỏi danh sách tài liệu của hệ thống.
              </p>
            </div>
          </div>

          <div className='mt-5 flex justify-end gap-2'>
            <button
              type='button'
              onClick={onClose}
              className='h-10 rounded-lg border border-slate-200 px-4 text-xs font-semibold text-slate-600 hover:bg-slate-50'
            >
              Hủy
            </button>
            <button
              type='button'
              onClick={() => onConfirm(document)}
              className='h-10 rounded-lg bg-[#D71920] px-5 text-xs font-semibold text-white hover:bg-[#b9151b]'
            >
              Xóa
            </button>
          </div>
        </div>
      )}
    </ModalShell>
  );
}

export default DeleteDocumentModal;
