import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';

function UserEditDialog({ open, onOpenChange, form, setForm, saving, onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg'>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Cập nhật người dùng</DialogTitle>
          </DialogHeader>

          <div className='space-y-5 py-6'>
            <div className='space-y-2'>
              <Label htmlFor='username'>Tên đăng nhập</Label>

              <Input
                id='username'
                value={form.username}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    username: event.target.value,
                  }))
                }
                placeholder='Nhập tên đăng nhập'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='phone'>Số điện thoại</Label>

              <Input
                id='phone'
                value={form.phone}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    phone: event.target.value,
                  }))
                }
                placeholder='Nhập số điện thoại'
              />
            </div>

            <div className='space-y-2'>
              <Label>Vai trò</Label>

              <Select
                value={form.role}
                onValueChange={(value) =>
                  setForm((current) => ({
                    ...current,
                    role: value,
                  }))
                }
              >
                <SelectTrigger className='w-full'>
                  <span>{form.role}</span>
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value='USER'>USER</SelectItem>

                  <SelectItem value='ADVISOR'>ADVISOR</SelectItem>

                  <SelectItem value='ADMIN'>ADMIN</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              disabled={saving}
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </Button>

            <Button type='submit' disabled={saving}>
              {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UserEditDialog;
