import { CheckCircle2, X } from 'lucide-react';

function DocumentToast({ message, onClose }) {
  if (!message) return null;

  return (
    <div className='fixed right-6 top-6 z-[120] flex min-w-[300px] items-center gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-3 shadow-xl'>
      <CheckCircle2 size={18} className='text-emerald-600' />
      <p className='flex-1 text-xs font-semibold text-slate-700'>{message}</p>
      <button type='button' onClick={onClose} className='text-slate-400 hover:text-slate-700'>
        <X size={15} />
      </button>
    </div>
  );
}

export default DocumentToast;
