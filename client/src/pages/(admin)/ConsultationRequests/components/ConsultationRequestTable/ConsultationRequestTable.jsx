import { CheckCircle2, LoaderCircle, UserCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const statusMeta = {
  PENDING: ['Chờ tiếp nhận', 'bg-orange-50 text-orange-600 border-orange-200'],
  IN_PROGRESS: ['Đang xử lý', 'bg-blue-50 text-blue-600 border-blue-200'],
  RESOLVED: ['Đã hoàn thành', 'bg-emerald-50 text-emerald-600 border-emerald-200'],
  CANCELLED: ['Đã hủy', 'bg-slate-100 text-slate-600 border-slate-200'],
};

const formatDate = (value) =>
  value
    ? new Intl.DateTimeFormat('vi-VN', { dateStyle: 'short', timeStyle: 'short' }).format(
        new Date(value)
      )
    : '—';

function ConsultationRequestTable({
  pageData = {},
  loading,
  actionId,
  currentUser,
  onAssign,
  onResolve,
  onPageChange,
}) {
  const items = pageData.content || [];
  const roles = currentUser?.roles || [];
  const isAdvisorOrAdmin = roles.some(
    (role) =>
      role === 'ADMIN' ||
      role === 'ADVISOR' ||
      role?.name === 'ADMIN' ||
      role?.name === 'ADVISOR'
  );

  return (
    <Card className='overflow-hidden rounded-xl border-slate-200 bg-white shadow-none'>
      <div className='overflow-x-auto'>
        <Table className='w-full min-w-[1000px]'>
          <TableHeader>
            <TableRow className='border-b border-slate-200 bg-slate-50/70 text-[10px] font-semibold text-slate-600'>
              <TableHead className='w-[36%] px-5 py-3'>Nội dung yêu cầu</TableHead>
              <TableHead className='w-[20%] px-3 py-3'>Thông tin liên hệ</TableHead>
              <TableHead className='w-[14%] px-3 py-3'>Trạng thái</TableHead>
              <TableHead className='w-[16%] px-3 py-3'>Thời gian</TableHead>
              <TableHead className='w-[14%] px-3 py-3 text-center'>Thao tác</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className='py-16 text-center text-xs text-slate-500'>
                  <LoaderCircle className='mx-auto mb-2 animate-spin' size={20} />
                  Đang tải yêu cầu...
                </TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className='py-16 text-center text-xs text-slate-500'>
                  Không tìm thấy yêu cầu tư vấn nào.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => {
                const [label, tone] = statusMeta[item.status] || [
                  item.status,
                  'bg-slate-100 text-slate-600 border-slate-200',
                ];
                const canAssign = isAdvisorOrAdmin && item.status === 'PENDING';
                const canResolve =
                  isAdvisorOrAdmin &&
                  item.status === 'IN_PROGRESS' &&
                  (item.assignedStaffId === currentUser?.id ||
                    item.assignedStaffId === currentUser?.userId);

                return (
                  <TableRow
                    key={item.id}
                    className='border-b border-slate-100 text-[11px] hover:bg-slate-50/70'
                  >
                    <TableCell className='px-5 py-4 align-top'>
                      <p className='font-medium leading-5 text-slate-800'>{item.question}</p>
                      <p className='mt-1 text-[9px] text-slate-400'>#{item.id}</p>
                    </TableCell>

                    <TableCell className='px-3 py-4 align-top'>
                      <p className='font-medium text-slate-700'>{item.email || 'Không có email'}</p>
                      <p className='mt-1 text-slate-500'>{item.phone || 'Không có SĐT'}</p>
                    </TableCell>

                    <TableCell className='px-3 py-4 align-top'>
                      <Badge variant='outline' className={`${tone} text-[10px] font-semibold px-2 py-0.5`}>
                        <span className='mr-1.5 h-1.5 w-1.5 rounded-full bg-current' />
                        {label}
                      </Badge>
                      {item.assignedStaffId && (
                        <p className='mt-1 text-[9px] text-slate-400'>
                          {item.assignedStaffId === currentUser?.id || item.assignedStaffId === currentUser?.userId
                            ? 'Bạn đang phụ trách'
                            : 'Đã có người phụ trách'}
                        </p>
                      )}
                    </TableCell>

                    <TableCell className='px-3 py-4 align-top'>
                      <p className='text-slate-700'>{formatDate(item.createdAt)}</p>
                      {item.resolvedAt && (
                        <p className='mt-1 text-emerald-600'>Xong: {formatDate(item.resolvedAt)}</p>
                      )}
                    </TableCell>

                    <TableCell className='px-3 py-4 text-center align-top'>
                      {canAssign && (
                        <Button
                          size='sm'
                          disabled={actionId === item.id}
                          onClick={() => onAssign(item)}
                          className='h-8 gap-1 text-[11px] font-medium bg-[#D71920] hover:bg-[#b9151b]'
                        >
                          <UserCheck size={14} />
                          Nhận tư vấn
                        </Button>
                      )}
                      {canResolve && (
                        <Button
                          size='sm'
                          disabled={actionId === item.id}
                          onClick={() => onResolve(item)}
                          className='h-8 gap-1 text-[11px] font-medium bg-emerald-600 hover:bg-emerald-700'
                        >
                          <CheckCircle2 size={14} />
                          Hoàn thành
                        </Button>
                      )}
                      {!canAssign && !canResolve && (
                        <span className='text-[10px] text-slate-400'>Không có thao tác</span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex items-center justify-between border-t border-slate-100 p-4 text-[10px] text-slate-500'>
        <span>{pageData.totalElements || 0} yêu cầu</span>
        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            disabled={pageData.pageNumber === 0 || loading}
            onClick={() => onPageChange(pageData.pageNumber - 1)}
            className='h-8 text-[11px]'
          >
            Trước
          </Button>
          <span>
            Trang {(pageData.pageNumber || 0) + 1}/{Math.max(pageData.totalPages || 1, 1)}
          </span>
          <Button
            variant='outline'
            size='sm'
            disabled={pageData.last || loading || !pageData.totalPages || pageData.pageNumber + 1 >= pageData.totalPages}
            onClick={() => onPageChange(pageData.pageNumber + 1)}
            className='h-8 text-[11px]'
          >
            Sau
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default ConsultationRequestTable;

