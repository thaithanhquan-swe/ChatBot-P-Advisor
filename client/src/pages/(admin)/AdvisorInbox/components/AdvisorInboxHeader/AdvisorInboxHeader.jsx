import { Clock3, RefreshCw } from 'lucide-react';
import AdminBreadcrumb from '@/components/AdminBreadcrumb/AdminBreadcrumb';

function AdvisorInboxHeader({ waitingCount, loading, onRefresh }) {
  return (
    <div className='mb-2 flex min-h-8 shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-1'>
      <div className='[&>div]:mb-0'>
        <AdminBreadcrumb pageTitle='Tin nhắn người dùng' />
      </div>
      <div className='flex items-center gap-2'>
        <div
          className='flex items-center gap-1.5 rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700'
          role='status'
        >
          <Clock3 size={14} /> {waitingCount} cuộc chat đang chờ
        </div>
        <button
          type='button'
          onClick={onRefresh}
          disabled={loading}
          title='Làm mới danh sách'
          aria-label='Làm mới danh sách tin nhắn'
          className='rounded-md border border-slate-200 bg-white p-1.5 text-slate-500 hover:bg-slate-50 disabled:cursor-wait disabled:opacity-50'
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>
    </div>
  );
}

export default AdvisorInboxHeader;
