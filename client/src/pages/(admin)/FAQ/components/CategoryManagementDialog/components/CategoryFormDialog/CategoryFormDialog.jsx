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

import { Textarea } from '@/components/ui/textarea';

function CategoryFormDialog({
  open,
  onOpenChange,
  form,
  setForm,
  selectedCategory,
  saving,
  onSubmit,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg'>
        <form onSubmit={onSubmit}>
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
              onClick={() => onOpenChange(false)}
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
  );
}

export default CategoryFormDialog;
