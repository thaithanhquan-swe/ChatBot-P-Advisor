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
            <TableHead className='w-[24%]'>Tên danh mục</TableHead>

            <TableHead className='w-[42%]'>Mô tả</TableHead>

            <TableHead className='w-[18%]'>Trạng thái</TableHead>

            <TableHead className='w-[16%] text-right'>Thao tác</TableHead>
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
              </TableCell>

              <TableCell>
                <p className='line-clamp-2 text-sm leading-5 text-muted-foreground'>
                  {category.description || '—'}
                </p>
              </TableCell>

              <TableCell>
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
