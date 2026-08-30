import { CheckCircle2, LoaderCircle, UserCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const statusMeta = {
  PENDING: ['Chờ tiếp nhận', 'bg-orange-50 text-orange-600'],
  IN_PROGRESS: ['Đang xử lý', 'bg-blue-50 text-blue-600'],
  RESOLVED: ['Đã hoàn thành', 'bg-emerald-50 text-emerald-600'],
  CANCELLED: ['Đã hủy', 'bg-slate-100 text-slate-600'],
};
const formatDate = (value) => value ? new Intl.DateTimeFormat('vi-VN', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(value)) : '—';

function ConsultationRequestTable({ pageData, loading, actionId, currentUser, onAssign, onResolve, onPageChange }) {
  const items = pageData.content || [];
  const isAdvisor = currentUser?.roles?.some((role) => role.name === 'ADVISOR');
  return (
    <Card className='overflow-hidden'>
      <div className='overflow-x-auto'>
        <table className='w-full min-w-[1000px] border-collapse'>
          <thead><tr className='border-b border-slate-200 bg-slate-50/70 text-left text-[10px] font-semibold text-slate-600'><th className='w-[36%] px-5 py-3'>Nội dung yêu cầu</th><th className='w-[20%] px-3 py-3'>Thông tin liên hệ</th><th className='w-[14%] px-3 py-3'>Trạng thái</th><th className='w-[16%] px-3 py-3'>Thời gian</th><th className='w-[14%] px-3 py-3 text-center'>Thao tác</th></tr></thead>
          <tbody>
            {loading ? <tr><td colSpan='5' className='py-16 text-center text-xs text-slate-500'><LoaderCircle className='mx-auto mb-2 animate-spin' size={20} />Đang tải yêu cầu...</td></tr> : items.length === 0 ? <tr><td colSpan='5' className='py-16 text-center text-xs text-slate-500'>Không tìm thấy yêu cầu tư vấn.</td></tr> : items.map((item) => {
              const [label, tone] = statusMeta[item.status] || [item.status, 'bg-slate-100 text-slate-600'];
              const canAssign = isAdvisor && item.status === 'PENDING';
              const canResolve = isAdvisor && item.status === 'IN_PROGRESS' && item.assignedStaffId === currentUser.id;
              return <tr key={item.id} className='border-b border-slate-100 text-[11px] hover:bg-slate-50/70'><td className='px-5 py-4 align-top'><p className='font-medium leading-5 text-slate-800'>{item.question}</p><p className='mt-1 text-[9px] text-slate-400'>#{item.id}</p></td><td className='px-3 py-4 align-top'><p className='font-medium text-slate-700'>{item.email || 'Không có email'}</p><p className='mt-1 text-slate-500'>{item.phone || 'Không có SĐT'}</p></td><td className='px-3 py-4 align-top'><Badge className={tone}><span className='mr-1.5 h-1.5 w-1.5 rounded-full bg-current' />{label}</Badge>{item.assignedStaffId && <p className='mt-1 text-[9px] text-slate-400'>{item.assignedStaffId === currentUser?.id ? 'Bạn đang phụ trách' : 'Đã có người phụ trách'}</p>}</td><td className='px-3 py-4 align-top'><p className='text-slate-700'>{formatDate(item.createdAt)}</p>{item.resolvedAt && <p className='mt-1 text-emerald-600'>Xong: {formatDate(item.resolvedAt)}</p>}</td><td className='px-3 py-4 text-center align-top'>{canAssign && <Button size='sm' disabled={actionId === item.id} onClick={() => onAssign(item)}><UserCheck size={14} />Nhận tư vấn</Button>}{canResolve && <Button size='sm' disabled={actionId === item.id} onClick={() => onResolve(item)} className='bg-emerald-600 hover:bg-emerald-700'><CheckCircle2 size={14} />Hoàn thành</Button>}{!canAssign && !canResolve && <span className='text-[10px] text-slate-400'>Không có thao tác</span>}</td></tr>;
            })}
          </tbody>
        </table>
      </div>
      <div className='flex items-center justify-between border-t border-slate-100 p-4 text-[10px] text-slate-500'><span>{pageData.totalElements || 0} yêu cầu</span><div className='flex items-center gap-2'><Button variant='outline' size='sm' disabled={pageData.pageNumber === 0 || loading} onClick={() => onPageChange(pageData.pageNumber - 1)}>Trước</Button><span>Trang {(pageData.pageNumber || 0) + 1}/{Math.max(pageData.totalPages || 1, 1)}</span><Button variant='outline' size='sm' disabled={pageData.last || loading || !pageData.totalPages} onClick={() => onPageChange(pageData.pageNumber + 1)}>Sau</Button></div></div>
    </Card>
  );
}
export default ConsultationRequestTable;
