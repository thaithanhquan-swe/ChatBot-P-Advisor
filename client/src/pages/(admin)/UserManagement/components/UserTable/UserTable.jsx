import { ChevronLeft, ChevronRight, Eye, Loader2 } from 'lucide-react';

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

const formatDate = (value) => {
  if (!value) {
    return '—';
  }

  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value));
};

function UserTable({ page, loading, onPageChange, onView }) {
  const users = page?.content ?? [];

  const currentPage = page?.pageNumber ?? 0;

  const pageSize = page?.pageSize ?? 20;

  const totalPages = page?.totalPages ?? 0;

  const totalElements = page?.totalElements ?? 0;

  const start = totalElements > 0 ? currentPage * pageSize + 1 : 0;

  const end = Math.min((currentPage + 1) * pageSize, totalElements);

  return (
    <div className='overflow-hidden rounded-md border'>
      <div className='overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Người dùng</TableHead>

              <TableHead>Liên hệ</TableHead>

              <TableHead>Vai trò</TableHead>

              <TableHead>Xác thực</TableHead>

              <TableHead>Phiên chat</TableHead>

              <TableHead>Ngày tạo</TableHead>

              <TableHead>Cập nhật</TableHead>

              <TableHead className='text-right'>Chi tiết</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className='h-32'>
                  <div className='flex items-center justify-center gap-2 text-sm text-muted-foreground'>
                    <Loader2 className='h-4 w-4 animate-spin' />
                    Đang tải dữ liệu người dùng...
                  </div>
                </TableCell>
              </TableRow>
            ) : users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <p className='font-medium'>{user.username || 'Chưa đặt tên'}</p>

                    <p
                      className='mt-1 max-w-40 truncate text-xs text-muted-foreground'
                      title={user.id}
                    >
                      {user.id}
                    </p>
                  </TableCell>

                  <TableCell>
                    <p>{user.email || '—'}</p>

                    <p className='mt-1 text-xs text-muted-foreground'>
                      {user.phone || 'Chưa có SĐT'}
                    </p>
                  </TableCell>

                  <TableCell>
                    <div className='flex flex-wrap gap-1'>
                      {user.roles?.length ? (
                        user.roles.map((role) => (
                          <Badge
                            key={role}
                            variant='outline'
                            className={roleClassNames[role] ?? ''}
                          >
                            {role}
                          </Badge>
                        ))
                      ) : (
                        <span className='text-muted-foreground'>—</span>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
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

                  <TableCell>{user.chatSessionCount ?? 0}</TableCell>

                  <TableCell>{formatDate(user.createdAt)}</TableCell>

                  <TableCell>{formatDate(user.updatedAt)}</TableCell>

                  <TableCell className='text-right'>
                    <Button
                      type='button'
                      variant='ghost'
                      size='icon'
                      title='Xem chi tiết'
                      onClick={() => onView(user.id)}
                    >
                      <Eye className='h-4 w-4' />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className='h-32 text-center text-muted-foreground'>
                  Không tìm thấy người dùng phù hợp.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex flex-col items-center justify-between gap-3 border-t px-4 py-3 sm:flex-row'>
        <p className='text-sm text-muted-foreground'>
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
