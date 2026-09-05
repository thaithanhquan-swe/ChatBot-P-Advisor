import { Clock3 } from 'lucide-react';
import AdminBreadcrumb from '@/components/AdminBreadcrumb/AdminBreadcrumb';

function AdvisorInboxHeader({ waitingCount }) {
  return (
    <div className='mb-2 flex min-h-8 shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-1'>
      <div className='[&>div]:mb-0'>
        <AdminBreadcrumb pageTitle='Tin nhắn người dùng' />
      </div>
      <div className='flex items-center gap-1.5 rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700' role='status'>
        <Clock3 size={14} /> {waitingCount} cuộc chat đang chờ
      </div>
    </div>
  );
}

export default AdvisorInboxHeader;
