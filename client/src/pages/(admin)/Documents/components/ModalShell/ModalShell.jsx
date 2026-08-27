import { X } from 'lucide-react';

function ModalShell({ open, title, description, children, onClose, size = 'max-w-2xl' }) {
  if (!open) return null;

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-[2px]'>
      <div className={`max-h-[92vh] w-full overflow-hidden rounded-2xl bg-white shadow-2xl ${size}`}>
        <div className='flex items-start justify-between border-b border-slate-100 px-6 py-5'>
          <div>
            <h2 className='text-lg font-bold text-slate-900'>{title}</h2>
            {description && <p className='mt-1 text-xs text-slate-500'>{description}</p>}
          </div>
          <button
            type='button'
            onClick={onClose}
            className='rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700'
            aria-label='Đóng modal'
          >
            <X size={18} />
          </button>
        </div>
        <div className='max-h-[calc(92vh-82px)] overflow-y-auto'>{children}</div>
      </div>
    </div>
  );
}

export default ModalShell;
