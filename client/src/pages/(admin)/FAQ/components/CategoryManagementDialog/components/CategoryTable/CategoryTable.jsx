import { Pencil, Trash2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function CategoryTable({ categories, onEdit, onDelete }) {
  return (
    <div className='max-h-[55vh] overflow-y-auto rounded-lg border'>
      <Table className='table-fixed'>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[72%] sm:w-[24%]'>Tên danh mục</TableHead>

            <TableHead className='hidden w-[42%] sm:table-cell'>Mô tả</TableHead>

            <TableHead className='hidden w-[18%] sm:table-cell'>Trạng thái</TableHead>

            <TableHead className='w-[28%] text-right sm:w-[16%]'>Thao tác</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className='h-28 text-center text-muted-foreground'>
                Chưa có danh mục FAQ.
              </TableCell>
            </TableRow>
          )}

          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className='font-medium'>
                <p className='truncate'>{category.name}</p>
                <p className='mt-1 line-clamp-2 text-xs leading-4 font-normal text-muted-foreground sm:hidden'>
                  {category.description || 'Chưa có mô tả'}
                </p>
                <Badge
                  variant={category.status === 'ACTIVE' ? 'default' : 'secondary'}
                  className='mt-2 sm:hidden'
                >
                  {category.status === 'ACTIVE' ? 'Đang dùng' : 'Ngừng dùng'}
                </Badge>
              </TableCell>

              <TableCell className='hidden sm:table-cell'>
                <p className='line-clamp-2 text-sm leading-5 text-muted-foreground'>
                  {category.description || '—'}
                </p>
              </TableCell>

              <TableCell className='hidden sm:table-cell'>
                <Badge variant={category.status === 'ACTIVE' ? 'default' : 'secondary'}>
                  {category.status === 'ACTIVE' ? 'Đang dùng' : 'Ngừng dùng'}
                </Badge>
              </TableCell>

              <TableCell>
                <div className='flex justify-end gap-1'>
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    aria-label={`Sửa danh mục ${category.name}`}
                    onClick={() => onEdit(category)}
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
                          aria-label={`Xóa danh mục ${category.name}`}
                          className='text-destructive hover:text-destructive'
                        />
                      }
                    >
                      <Trash2 className='size-4' />
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Xóa danh mục?</AlertDialogTitle>

                        <AlertDialogDescription>
                          Bạn có chắc muốn xóa danh mục &quot;
                          {category.name}
                          &quot;?
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>

                        <AlertDialogAction onClick={() => onDelete(category.id)}>
                          Xóa
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default CategoryTable;
