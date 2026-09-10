import { RotateCcw, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';

const STATUS_LABEL = {
  ALL: 'Tất cả trạng thái',
  PUBLISHED: 'Đã xuất bản',
  DRAFT: 'Bản nháp',
  HIDDEN: 'Đang ẩn',
};

const SORT_LABEL = {
  updatedAt: 'Ngày cập nhật',
  createdAt: 'Ngày tạo',
  question: 'Câu hỏi',
  status: 'Trạng thái',
};

const DIRECTION_LABEL = {
  DESC: 'Giảm dần',
  ASC: 'Tăng dần',
};

function FaqFilters({ filters, categories, onChange, onReset }) {
  const selectedCategory =
    filters.faqCategoryId === 'ALL'
      ? null
      : categories.find((category) => String(category.id) === String(filters.faqCategoryId));

  const selectedCategoryName = selectedCategory?.name ?? 'Tất cả danh mục';

  return (
    <Card>
      <CardContent className='space-y-3 p-4'>
        <div className='grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr]'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />

            <Input
              value={filters.keyword}
              aria-label='Tìm kiếm FAQ'
              onChange={(event) => onChange('keyword', event.target.value)}
              placeholder='Tìm kiếm câu hỏi...'
              className='pl-9'
            />
          </div>

          <Select value={filters.status} onValueChange={(value) => onChange('status', value)}>
            <SelectTrigger className='w-full' aria-label='Lọc trạng thái'>
              <span className='truncate'>{STATUS_LABEL[filters.status]}</span>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value='ALL'>Tất cả trạng thái</SelectItem>

              <SelectItem value='PUBLISHED'>Đã xuất bản</SelectItem>

              <SelectItem value='DRAFT'>Bản nháp</SelectItem>

              <SelectItem value='HIDDEN'>Đang ẩn</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={String(filters.faqCategoryId)}
            onValueChange={(value) => onChange('faqCategoryId', value)}
          >
            <SelectTrigger className='w-full' aria-label='Lọc danh mục'>
              <span className='truncate'>{selectedCategoryName}</span>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value='ALL'>Tất cả danh mục</SelectItem>

              {categories.map((category) => (
                <SelectItem key={category.id} value={String(category.id)}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-[1fr_1fr_1fr_1fr_auto]'>
          <Input
            type='date'
            aria-label='Cập nhật từ ngày'
            value={filters.updatedFrom}
            onChange={(event) => onChange('updatedFrom', event.target.value)}
          />

          <Input
            type='date'
            aria-label='Cập nhật đến ngày'
            value={filters.updatedTo}
            onChange={(event) => onChange('updatedTo', event.target.value)}
          />

          <Select value={filters.sortBy} onValueChange={(value) => onChange('sortBy', value)}>
            <SelectTrigger className='w-full' aria-label='Sắp xếp theo'>
              <span className='truncate'>{SORT_LABEL[filters.sortBy]}</span>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value='updatedAt'>Ngày cập nhật</SelectItem>

              <SelectItem value='createdAt'>Ngày tạo</SelectItem>

              <SelectItem value='question'>Câu hỏi</SelectItem>

              <SelectItem value='status'>Trạng thái</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.sortDirection}
            onValueChange={(value) => onChange('sortDirection', value)}
          >
            <SelectTrigger className='w-full' aria-label='Thứ tự sắp xếp'>
              <span className='truncate'>{DIRECTION_LABEL[filters.sortDirection]}</span>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value='DESC'>Giảm dần</SelectItem>

              <SelectItem value='ASC'>Tăng dần</SelectItem>
            </SelectContent>
          </Select>

          <Button type='button' variant='outline' onClick={onReset} className='gap-2'>
            <RotateCcw className='size-4' />
            Đặt lại
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default FaqFilters;
