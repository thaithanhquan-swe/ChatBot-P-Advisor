import { MessageCircle } from 'lucide-react';
import AdminBreadcrumb from '@/components/AdminBreadcrumb/AdminBreadcrumb';

function PendingHeader() {
  return (
    <div className='mb-5 flex items-end justify-between'>
      <div>
        <AdminBreadcrumb pageTitle='Câu hỏi tồn đọng' />

        <h1 className='text-[27px] font-bold tracking-tight text-slate-900'>Câu hỏi tồn đọng</h1>
        <p className='mt-1 text-[13px] text-slate-500'>
          Quản lý và xử lý các câu hỏi chưa được giải đáp.
        </p>
      </div>

      <button
        type='button'
        className='flex h-10 items-center gap-2 rounded-lg bg-[#D71920] px-4 text-[12px] font-semibold text-white shadow-sm hover:bg-[#b9151b]'
      >
        <MessageCircle size={16} />
        Trả lời hàng loạt
      </button>
    </div>
  );
}

export default PendingHeader;
