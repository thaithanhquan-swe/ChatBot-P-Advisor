import { RotateCcw, SlidersHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';

const roleLabels = {
  ALL: 'Tất cả vai trò',
  USER: 'Người dùng',
  ADVISOR: 'Tư vấn viên',
  ADMIN: 'Quản trị viên',
};

const verificationLabels = {
  ALL: 'Tất cả trạng thái',
  true: 'Đã xác thực',
  false: 'Chưa xác thực',
};

const sortLabels = {
  createdAt: 'Ngày tạo',
  updatedAt: 'Ngày cập nhật',
  username: 'Tên đăng nhập',
  email: 'Email',
};

const directionLabels = {
  DESC: 'Giảm dần',
  ASC: 'Tăng dần',
};

function UserFilter({ filters, statistics, onChange, onReset, loading }) {
  return (
    <Card className='mt-5'>
      <CardHeader className='pb-4'>
        <CardTitle className='flex items-center justify-between text-base'>
          Bộ lọc
          <SlidersHorizontal className='h-4 w-4 text-muted-foreground' />
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
          <FilterSelect
            label='Vai trò'
            value={filters.role}
            displayValue={roleLabels[filters.role]}
            onChange={(value) => onChange('role', value)}
          >
            <SelectItem value='ALL'>Tất cả vai trò</SelectItem>

            <SelectItem value='USER'>Người dùng</SelectItem>

            <SelectItem value='ADVISOR'>Tư vấn viên</SelectItem>

            <SelectItem value='ADMIN'>Quản trị viên</SelectItem>
          </FilterSelect>

          <FilterSelect
            label='Xác thực email'
            value={filters.emailVerified}
            displayValue={verificationLabels[filters.emailVerified]}
            onChange={(value) => onChange('emailVerified', value)}
          >
            <SelectItem value='ALL'>Tất cả trạng thái</SelectItem>

            <SelectItem value='true'>Đã xác thực</SelectItem>

            <SelectItem value='false'>Chưa xác thực</SelectItem>
          </FilterSelect>

          <div className='space-y-2'>
            <Label>Ngày tạo từ</Label>

            <Input
              type='date'
              value={filters.createdFrom}
              onChange={(event) => onChange('createdFrom', event.target.value)}
            />
          </div>

          <div className='space-y-2'>
            <Label>Ngày tạo đến</Label>

            <Input
              type='date'
              value={filters.createdTo}
              onChange={(event) => onChange('createdTo', event.target.value)}
            />
          </div>

          <FilterSelect
            label='Sắp xếp theo'
            value={filters.sortBy}
            displayValue={sortLabels[filters.sortBy]}
            onChange={(value) => onChange('sortBy', value)}
          >
            <SelectItem value='createdAt'>Ngày tạo</SelectItem>

            <SelectItem value='updatedAt'>Ngày cập nhật</SelectItem>

            <SelectItem value='username'>Tên đăng nhập</SelectItem>

            <SelectItem value='email'>Email</SelectItem>
          </FilterSelect>

          <FilterSelect
            label='Thứ tự'
            value={filters.sortDirection}
            displayValue={directionLabels[filters.sortDirection]}
            onChange={(value) => onChange('sortDirection', value)}
          >
            <SelectItem value='DESC'>Giảm dần</SelectItem>

            <SelectItem value='ASC'>Tăng dần</SelectItem>
          </FilterSelect>
        </div>

        <div className='mt-4'>
          <Button
            type='button'
            variant='outline'
            className='w-full'
            onClick={onReset}
            disabled={loading}
          >
            <RotateCcw className='mr-2 h-4 w-4' />
            Xóa bộ lọc
          </Button>
        </div>

        <Separator className='my-5' />

        <div>
          <h3 className='mb-3 text-sm font-semibold'>Phân bổ vai trò</h3>

          <div className='grid gap-3 sm:grid-cols-3'>
            <RoleItem label='Người dùng' value={statistics?.userCount} dotClassName='bg-blue-500' />

            <RoleItem
              label='Tư vấn viên'
              value={statistics?.advisorCount}
              dotClassName='bg-orange-500'
            />

            <RoleItem
              label='Quản trị viên'
              value={statistics?.adminCount}
              dotClassName='bg-red-500'
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function FilterSelect({ label, value, displayValue, onChange, children }) {
  return (
    <div className='space-y-2'>
      <Label>{label}</Label>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className='w-full'>
          <span className='truncate'>{displayValue ?? value}</span>
        </SelectTrigger>

        <SelectContent>{children}</SelectContent>
      </Select>
    </div>
  );
}

function RoleItem({ label, value = 0, dotClassName }) {
  return (
    <div className='flex items-center gap-2 rounded-lg border px-3 py-2'>
      <span className={`h-2 w-2 rounded-full ${dotClassName}`} />

      <span className='flex-1 text-sm text-muted-foreground'>{label}</span>

      <span className='text-sm font-medium'>{Number(value || 0).toLocaleString('vi-VN')}</span>
    </div>
  );
}

export default UserFilter;
