import { Eye, Pencil, Trash2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const STATUS_LABEL = {
  PUBLISHED: 'Đã xuất bản',
  DRAFT: 'Bản nháp',
  HIDDEN: 'Đang ẩn',
};

function FaqTable({
  faqs,
  categoryMap,
  loading,
  page,
  size,
  totalElements,
  totalPages,
  onPageChange,
  onSizeChange,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  const from = totalElements === 0 ? 0 : page * size + 1;

  const to = Math.min((page + 1) * size, totalElements);

  return (
    <Card className='overflow-hidden'>
      <CardHeader className='border-b px-4 py-4 sm:px-6'>
        <div className='flex items-center justify-between gap-3'>
          <CardTitle className='text-base'>Danh sách FAQ</CardTitle>

          <span className='text-sm text-muted-foreground'>{totalElements} kết quả</span>
        </div>
      </CardHeader>

      <CardContent className='p-0'>
        <div className='w-full overflow-x-auto'>
          <Table className='table-fixed'>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[72%] sm:w-[32%]'>Câu hỏi</TableHead>

                <TableHead className='hidden w-[14%] sm:table-cell'>Danh mục</TableHead>

                <TableHead className='hidden w-[14%] sm:table-cell'>Trạng thái</TableHead>

                <TableHead className='hidden w-[12%] sm:table-cell'>Ngày tạo</TableHead>

                <TableHead className='hidden w-[12%] sm:table-cell'>Cập nhật</TableHead>

                <TableHead className='w-[28%] text-right sm:w-[16%]'>Thao tác</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={6} className='h-32 text-center text-muted-foreground'>
                    Đang tải dữ liệu...
                  </TableCell>
                </TableRow>
              )}

              {!loading && faqs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className='h-32 text-center text-muted-foreground'>
                    Không tìm thấy FAQ.
                  </TableCell>
                </TableRow>
              )}

              {!loading &&
                faqs.map((faq) => {
                  const category = categoryMap[String(faq.faqCategoryId)];

                  return (
                    <TableRow key={faq.id}>
                      <TableCell className='align-top'>
                        <button
                          type='button'
                          className='block w-full min-w-0 text-left'
                          onClick={() => onView(faq)}
                        >
                          <p className='truncate text-sm font-medium text-foreground'>
                            {faq.question}
                          </p>

                          <p className='mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground'>
                            {faq.answer}
                          </p>
                          <div className='mt-2 flex flex-wrap items-center gap-1.5 sm:hidden'>
                            <Badge variant='secondary' className='max-w-full truncate text-[10px]'>
                              {faq.categoryName || category?.name || 'Chưa có danh mục'}
                            </Badge>
                            <Badge className='text-[10px]'>{STATUS_LABEL[faq.status] || faq.status}</Badge>
                            <span className='text-[10px] text-muted-foreground'>
                              Cập nhật {formatDate(faq.updatedAt)}
                            </span>
                          </div>
                        </button>
                      </TableCell>

                      <TableCell className='hidden sm:table-cell'>
                        <Badge variant='outline' className='max-w-full'>
                          <span className='truncate'>
                            {faq.categoryName || category?.name || '—'}
                          </span>
                        </Badge>
                      </TableCell>

                      <TableCell className='hidden sm:table-cell'>
                        <Select
                          value={faq.status}
                          disabled={loading}
                          onValueChange={(status) => onStatusChange(faq, status)}
                        >
                          <SelectTrigger className='w-full'>
                            <span className='truncate text-xs'>{STATUS_LABEL[faq.status]}</span>
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value='PUBLISHED'>Đã xuất bản</SelectItem>

                            <SelectItem value='DRAFT'>Bản nháp</SelectItem>

                            <SelectItem value='HIDDEN'>Đang ẩn</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>

                      <TableCell className='hidden whitespace-nowrap text-xs text-muted-foreground sm:table-cell'>
                        {formatDate(faq.createdAt)}
                      </TableCell>

                      <TableCell className='hidden whitespace-nowrap text-xs text-muted-foreground sm:table-cell'>
                        {formatDate(faq.updatedAt)}
                      </TableCell>

                      <TableCell>
                        <div className='flex justify-end gap-1'>
                          <Button
                            type='button'
                            variant='ghost'
                            size='icon'
                            aria-label={`Xem FAQ ${faq.question}`}
                            onClick={() => onView(faq)}
                          >
                            <Eye className='size-4' />
                          </Button>

                          <Button
                            type='button'
                            variant='ghost'
                            size='icon'
                            aria-label={`Sửa FAQ ${faq.question}`}
                            onClick={() => onEdit(faq)}
                          >
                            <Pencil className='size-4' />
                          </Button>

                          <AlertDialog>
                            <AlertDialogTrigger
                              render={
                                <Button
                                  type='button'
                                  variant='ghost'
                                  size='icon'
                                  aria-label={`Xóa FAQ ${faq.question}`}
                                  className='text-destructive hover:text-destructive'
                                />
                              }
                            >
                              <Trash2 className='size-4' />
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Xóa FAQ?</AlertDialogTitle>

                                <AlertDialogDescription>
                                  FAQ &quot;
                                  {faq.question}
                                  &quot; sẽ bị xóa khỏi hệ thống. Thao tác này không thể hoàn tác.
                                </AlertDialogDescription>
                              </AlertDialogHeader>

                              <AlertDialogFooter>
                                <AlertDialogCancel>Hủy</AlertDialogCancel>

                                <AlertDialogAction onClick={() => onDelete(faq.id)}>
                                  Xóa
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <CardFooter className='flex flex-col gap-3 border-t px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6'>
        <p className='text-sm text-muted-foreground'>
          Hiển thị {from} - {to} / {totalElements} FAQ
        </p>

        <div className='flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center'>
          <Select value={String(size)} onValueChange={(value) => onSizeChange(Number(value))}>
            <SelectTrigger className='w-full sm:w-[120px]'>
              <span>{size} / trang</span>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value='10'>10 / trang</SelectItem>

              <SelectItem value='20'>20 / trang</SelectItem>

              <SelectItem value='50'>50 / trang</SelectItem>
            </SelectContent>
          </Select>

          <div className='flex items-center justify-between gap-2 sm:justify-start'>
            <Button
              variant='outline'
              size='sm'
              disabled={page === 0}
              onClick={() => onPageChange(page - 1)}
            >
              Trước
            </Button>

            <span className='min-w-14 text-center text-sm'>
              {totalPages === 0 ? 0 : page + 1} / {totalPages}
            </span>

            <Button
              variant='outline'
              size='sm'
              disabled={totalPages === 0 || page >= totalPages - 1}
              onClick={() => onPageChange(page + 1)}
            >
              Sau
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

function formatDate(value) {
  if (!value) {
    return '—';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

export default FaqTable;
