import { ChevronLeft, ChevronRight, Eye, Loader2, Mail, Pencil, Phone } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const roleClassNames = {
  ADMIN: 'border-transparent bg-red-50 text-red-600 hover:bg-red-50',
  ADVISOR: 'border-transparent bg-orange-50 text-orange-600 hover:bg-orange-50',
  USER: 'border-transparent bg-blue-50 text-blue-600 hover:bg-blue-50',
};

const roleLabels = {
  ADMIN: 'Quản trị viên',
  ADVISOR: 'Tư vấn viên',
  USER: 'Người dùng',
};

function MobileLabel({ children }) {
  return <span className='shrink-0 text-xs font-medium text-slate-500 lg:hidden'>{children}</span>;
}

function UserTable({ page, loading, onPageChange, onView, onEdit }) {
  const users = page?.content ?? [];
  const currentPage = page?.pageNumber ?? 0;
  const pageSize = page?.pageSize ?? 20;
  const totalPages = page?.totalPages ?? 0;
  const totalElements = page?.totalElements ?? 0;
  const start = totalElements > 0 ? currentPage * pageSize + 1 : 0;
  const end = Math.min((currentPage + 1) * pageSize, totalElements);

  return (
    <div className='overflow-hidden rounded-lg border border-slate-200'>
      <Table className='table-fixed lg:table-auto'>
        <TableHeader className='hidden lg:table-header-group'>
          <TableRow>
            <TableHead>Người dùng</TableHead>
            <TableHead>Liên hệ</TableHead>
            <TableHead>Vai trò</TableHead>
            <TableHead>Xác thực</TableHead>
            <TableHead className='text-right'>Thao tác</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className='block lg:table-row-group'>
          {loading ? (
            <TableRow className='block lg:table-row'>
              <TableCell
                colSpan={5}
                className='flex h-32 items-center justify-center lg:table-cell'
              >
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <Loader2 className='h-4 w-4 animate-spin' />
                  Đang tải dữ liệu người dùng...
                </div>
              </TableCell>
            </TableRow>
          ) : users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id} className='block p-3 last:border-b-0 lg:table-row lg:p-0'>
                <TableCell className='flex min-w-0 items-start justify-between gap-4 px-0 py-2 whitespace-normal lg:table-cell lg:px-2 lg:py-2 lg:whitespace-nowrap'>
                  <MobileLabel>Người dùng</MobileLabel>
                  <div className='min-w-0 text-right lg:text-left'>
                    <p className='truncate font-medium'>{user.username || 'Chưa đặt tên'}</p>
                    <p className='mt-1 truncate text-xs text-muted-foreground' title={user.id}>
                      {user.id}
                    </p>
                  </div>
                </TableCell>

                <TableCell className='flex min-w-0 items-start justify-between gap-4 px-0 py-2 whitespace-normal lg:table-cell lg:px-2 lg:py-2 lg:whitespace-nowrap'>
                  <MobileLabel>Liên hệ</MobileLabel>
                  <div className='min-w-0 text-right lg:text-left'>
                    <p
                      className='flex justify-end gap-1.5 truncate text-sm lg:justify-start'
                      title={user.email}
                    >
                      <Mail className='mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400' />
                      <span className='truncate'>{user.email || 'Chưa có email'}</span>
                    </p>
                    <p className='mt-1 flex justify-end gap-1.5 text-xs text-muted-foreground lg:justify-start'>
                      <Phone className='h-3.5 w-3.5 shrink-0 text-slate-400' />
                      {user.phone || 'Chưa có SĐT'}
                    </p>
                  </div>
                </TableCell>

                <TableCell className='flex items-center justify-between gap-4 px-0 py-2 whitespace-normal lg:table-cell lg:px-2 lg:py-2 lg:whitespace-nowrap'>
                  <MobileLabel>Vai trò</MobileLabel>
                  <div className='flex flex-wrap justify-end gap-1 lg:justify-start'>
                    {user.roles?.length ? (
                      user.roles.map((role) => (
                        <Badge key={role} variant='outline' className={roleClassNames[role] ?? ''}>
                          {roleLabels[role] ?? role}
                        </Badge>
                      ))
                    ) : (
                      <span className='text-muted-foreground'>—</span>
                    )}
                  </div>
                </TableCell>

                <TableCell className='flex items-center justify-between gap-4 px-0 py-2 whitespace-normal lg:table-cell lg:px-2 lg:py-2 lg:whitespace-nowrap'>
                  <MobileLabel>Xác thực</MobileLabel>
                  <Badge
                    variant='outline'
                    className={
                      user.emailVerified
                        ? 'border-transparent bg-emerald-50 text-emerald-600 hover:bg-emerald-50'
                        : 'border-transparent bg-amber-50 text-amber-700 hover:bg-amber-50'
                    }
                  >
                    {user.emailVerified ? 'Đã xác thực' : 'Chưa xác thực'}
                  </Badge>
                </TableCell>

                <TableCell className='flex items-center justify-between gap-4 border-t border-slate-100 px-0 pt-3 whitespace-normal lg:table-cell lg:border-0 lg:px-2 lg:py-2 lg:text-right lg:whitespace-nowrap'>
                  <MobileLabel>Thao tác</MobileLabel>
                  <div className='flex justify-end gap-1'>
                    <Button
                      type='button'
                      variant='ghost'
                      size='icon'
                      title='Chỉnh sửa người dùng'
                      onClick={() => onEdit(user)}
                    >
                      <Pencil className='h-4 w-4' />
                    </Button>
                    <Button
                      type='button'
                      variant='ghost'
                      size='icon'
                      title='Xem chi tiết'
                      onClick={() => onView(user.id)}
                    >
                      <Eye className='h-4 w-4' />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className='block lg:table-row'>
              <TableCell
                colSpan={5}
                className='block h-32 px-2 text-center text-muted-foreground lg:table-cell'
              >
                Không tìm thấy người dùng phù hợp.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className='flex flex-col items-center justify-between gap-3 border-t px-4 py-3 sm:flex-row'>
        <p className='text-center text-sm text-muted-foreground sm:text-left'>
          Hiển thị {start} - {end} trong tổng số {Number(totalElements).toLocaleString('vi-VN')}{' '}
          người dùng
        </p>
        <div className='flex items-center gap-2'>
          <Button
            type='button'
            variant='outline'
            size='icon'
            disabled={loading || currentPage <= 0}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <span className='px-2 text-sm text-muted-foreground'>
            Trang {totalPages ? currentPage + 1 : 0}/{totalPages}
          </span>
          <Button
            type='button'
            variant='outline'
            size='icon'
            disabled={loading || totalPages === 0 || currentPage + 1 >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserTable;
