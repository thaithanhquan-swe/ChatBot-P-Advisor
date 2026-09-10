import { useState } from 'react';

import { Pencil, Plus, Trash2 } from 'lucide-react';

import { toast } from 'sonner';

import {
  createFaqCategory,
  deleteFaqCategory,
  updateFaqCategory,
} from '@/services/faq-category-service';

import { getApiErrorMessage } from '@/lib/http';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Textarea } from '@/components/ui/textarea';

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

const EMPTY_CATEGORY = {
  name: '',
  description: '',
  status: 'ACTIVE',
};

function CategoryManagementDialog({ open, categories, onOpenChange, onChanged }) {
  const [formOpen, setFormOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [form, setForm] = useState(EMPTY_CATEGORY);

  const [saving, setSaving] = useState(false);

  const openCreate = () => {
    setSelectedCategory(null);

    setForm({
      ...EMPTY_CATEGORY,
    });

    setFormOpen(true);
  };

  const openEdit = (category) => {
    setSelectedCategory(category);

    setForm({
      name: category.name ?? '',
      description: category.description ?? '',
      status: category.status ?? 'ACTIVE',
    });

    setFormOpen(true);
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      toast.error('Vui lòng nhập tên danh mục.');

      return;
    }

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      status: form.status,
    };

    try {
      setSaving(true);

      if (selectedCategory) {
        await updateFaqCategory(selectedCategory.id, payload);

        toast.success('Đã cập nhật danh mục.');
      } else {
        await createFaqCategory(payload);

        toast.success('Đã thêm danh mục.');
      }

      setFormOpen(false);

      setSelectedCategory(null);

      setForm({
        ...EMPTY_CATEGORY,
      });

      await onChanged();
    } catch (error) {
      console.error('Failed to save FAQ category:', error);

      toast.error(getApiErrorMessage(error, 'Không thể lưu danh mục FAQ.'));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFaqCategory(id);

      toast.success('Đã xóa danh mục.');

      await onChanged();
    } catch (error) {
      console.error('Failed to delete FAQ category:', error);

      toast.error(getApiErrorMessage(error, 'Không thể xóa danh mục đang được sử dụng.'));
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          onOpenChange(nextOpen);

          if (!nextOpen) {
            setFormOpen(false);
          }
        }}
      >
        <DialogContent className='max-h-[85vh] overflow-hidden sm:max-w-4xl'>
          <DialogHeader>
            <DialogTitle className='text-xl'>Quản lý danh mục FAQ</DialogTitle>

            <DialogDescription>Tạo và quản lý các danh mục được sử dụng cho FAQ.</DialogDescription>
          </DialogHeader>

          <div className='flex justify-end py-2'>
            <Button onClick={openCreate}>
              <Plus className='size-4' />
              Thêm danh mục
            </Button>
          </div>

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
                          onClick={() => openEdit(category)}
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

                              <AlertDialogAction onClick={() => handleDelete(category.id)}>
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
        </DialogContent>
      </Dialog>

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className='sm:max-w-lg'>
          <form onSubmit={handleSave}>
            <DialogHeader>
              <DialogTitle>
                {selectedCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục FAQ'}
              </DialogTitle>

              <DialogDescription>Nhập thông tin danh mục FAQ.</DialogDescription>
            </DialogHeader>

            <div className='space-y-5 py-6'>
              <div className='space-y-2'>
                <Label htmlFor='category-name'>Tên danh mục</Label>

                <Input
                  id='category-name'
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  placeholder='Ví dụ: Tuyển sinh'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='category-description'>Mô tả</Label>

                <Textarea
                  id='category-description'
                  rows={4}
                  value={form.description}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                  placeholder='Nhập mô tả ngắn về danh mục...'
                />
              </div>

              <div className='space-y-2'>
                <Label>Trạng thái</Label>

                <Select
                  value={form.status}
                  onValueChange={(value) =>
                    setForm((current) => ({
                      ...current,
                      status: value,
                    }))
                  }
                >
                  <SelectTrigger className='w-full'>
                    <span>{form.status === 'ACTIVE' ? 'Đang sử dụng' : 'Ngừng sử dụng'}</span>
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value='ACTIVE'>Đang sử dụng</SelectItem>

                    <SelectItem value='INACTIVE'>Ngừng sử dụng</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter className='border-t pt-4'>
              <Button
                type='button'
                variant='outline'
                disabled={saving}
                onClick={() => setFormOpen(false)}
              >
                Hủy
              </Button>

              <Button type='submit' disabled={saving}>
                {saving ? 'Đang lưu...' : selectedCategory ? 'Lưu thay đổi' : 'Thêm danh mục'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CategoryManagementDialog;
