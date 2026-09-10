import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Label } from '@/components/ui/label';

import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';

import { Textarea } from '@/components/ui/textarea';

const EMPTY_FORM = {
  question: '',
  answer: '',
  faqCategoryId: '',
  status: 'PUBLISHED',
};

const STATUS_LABEL = {
  PUBLISHED: 'Đã xuất bản',
  DRAFT: 'Bản nháp',
  HIDDEN: 'Đang ẩn',
};

function FaqFormDialog({ open, faq, categories, saving, onOpenChange, onSubmit }) {
  const activeCategories = useMemo(
    () =>
      categories.filter(
        (category) =>
          category.status === 'ACTIVE' || String(category.id) === String(faq?.faqCategoryId)
      ),
    [categories, faq]
  );

  const [form, setForm] = useState(() => {
    if (faq) {
      return {
        question: faq.question ?? '',
        answer: faq.answer ?? '',
        faqCategoryId: String(faq.faqCategoryId ?? ''),
        status: faq.status ?? 'PUBLISHED',
      };
    }

    const firstCategory = activeCategories[0];

    return {
      ...EMPTY_FORM,
      faqCategoryId: firstCategory ? String(firstCategory.id) : '',
    };
  });

  const [errors, setErrors] = useState({});

  const selectedCategoryName =
    activeCategories.find((category) => String(category.id) === String(form.faqCategoryId))?.name ??
    'Chọn danh mục';

  const updateField = (name, value) => {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: undefined,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};

    if (!form.question.trim()) {
      nextErrors.question = 'Vui lòng nhập câu hỏi.';
    }

    if (!form.answer.trim()) {
      nextErrors.answer = 'Vui lòng nhập câu trả lời.';
    }

    if (!form.faqCategoryId) {
      nextErrors.faqCategoryId = 'Vui lòng chọn danh mục.';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSubmit({
      question: form.question.trim(),
      answer: form.answer.trim(),
      faqCategoryId: form.faqCategoryId,
      status: form.status,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-3xl'>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className='text-xl'>{faq ? 'Chỉnh sửa FAQ' : 'Thêm FAQ'}</DialogTitle>

            <DialogDescription>
              {faq
                ? 'Cập nhật thông tin câu hỏi và câu trả lời.'
                : 'Nhập nội dung câu hỏi và câu trả lời mới.'}
            </DialogDescription>
          </DialogHeader>

          <div className='space-y-6 py-6'>
            <div className='space-y-2'>
              <Label htmlFor='question'>Câu hỏi</Label>

              <Textarea
                id='question'
                rows={3}
                maxLength={500}
                value={form.question}
                onChange={(event) => updateField('question', event.target.value)}
                placeholder='Nhập nội dung câu hỏi...'
                className='min-h-24 resize-none'
              />

              <div className='flex justify-between gap-2'>
                {errors.question ? (
                  <p className='text-xs text-destructive'>{errors.question}</p>
                ) : (
                  <span />
                )}

                <span className='text-xs text-muted-foreground'>
                  {form.question.length}
                  /500
                </span>
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='answer'>Câu trả lời</Label>

              <Textarea
                id='answer'
                rows={6}
                value={form.answer}
                onChange={(event) => updateField('answer', event.target.value)}
                placeholder='Nhập nội dung câu trả lời...'
                className='min-h-36 resize-y'
              />

              {errors.answer && <p className='text-xs text-destructive'>{errors.answer}</p>}
            </div>

            <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
              <div className='min-w-0 space-y-2'>
                <Label>Danh mục</Label>

                <Select
                  value={String(form.faqCategoryId)}
                  onValueChange={(value) => updateField('faqCategoryId', value)}
                >
                  <SelectTrigger className='w-full'>
                    <span className='truncate'>{selectedCategoryName}</span>
                  </SelectTrigger>

                  <SelectContent>
                    {activeCategories.map((category) => (
                      <SelectItem key={category.id} value={String(category.id)}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {errors.faqCategoryId && (
                  <p className='text-xs text-destructive'>{errors.faqCategoryId}</p>
                )}
              </div>

              <div className='min-w-0 space-y-2'>
                <Label>Trạng thái</Label>

                <Select value={form.status} onValueChange={(value) => updateField('status', value)}>
                  <SelectTrigger className='w-full'>
                    <span className='truncate'>{STATUS_LABEL[form.status]}</span>
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value='PUBLISHED'>Đã xuất bản</SelectItem>

                    <SelectItem value='DRAFT'>Bản nháp</SelectItem>

                    <SelectItem value='HIDDEN'>Đang ẩn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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

            <Button type='submit' disabled={saving || activeCategories.length === 0}>
              {saving ? 'Đang lưu...' : faq ? 'Lưu thay đổi' : 'Thêm FAQ'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default FaqFormDialog;
