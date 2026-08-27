import { MessageCircle } from 'lucide-react';
import AdminBreadcrumb from '@/components/AdminBreadcrumb/AdminBreadcrumb';
import { Button } from '@/components/ui/button';

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

      <Button>
        <MessageCircle size={16} />
        Trả lời hàng loạt
      </Button>
    </div>
  );
}

export default PendingHeader;
