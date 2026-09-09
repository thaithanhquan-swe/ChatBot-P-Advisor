import { useState } from 'react';
import { FileUp, Loader2 } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { DOCUMENT_STATUS_OPTIONS } from '../../constants/document';

function DocumentFormModal({ open, document, loading, onClose, onSubmit }) {
  const isEdit = Boolean(document);

  const [form, setForm] = useState(() => ({
    title: document?.title || '',
    description: document?.description || '',
    status: document?.status || 'DRAFT',
  }));

  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  const set = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};

    if (!isEdit && !file) {
      nextErrors.file = 'Vui lòng chọn file tài liệu.';
    }

    if (!form.title.trim()) {
      nextErrors.title = 'Tiêu đề là bắt buộc.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSubmit({
      id: document?.id,
      title: form.title.trim(),
      description: form.description.trim(),
      status: form.status,
      file,
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen && !loading) {
          onClose();
        }
      }}
    >
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Chỉnh sửa tài liệu' : 'Thêm tài liệu mới'}</DialogTitle>

          <DialogDescription>
            {isEdit
              ? 'Cập nhật tiêu đề, mô tả và trạng thái tài liệu.'
              : 'Tải file lên và nhập thông tin tài liệu dùng cho hệ thống.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-5'>
          {!isEdit && (
            <div className='space-y-2'>
              <Label>
                File tài liệu <span className='text-[#D71920]'>*</span>
              </Label>

              <label className='flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-center transition hover:border-red-300 hover:bg-red-50/30'>
                <FileUp size={24} className='mb-2 text-slate-400' />

                <span className='text-xs font-semibold text-slate-700'>
                  {file ? file.name : 'Chọn file tài liệu'}
                </span>

                <span className='mt-1 text-[10px] text-slate-400'>PDF, DOC, DOCX, TXT</span>

                <input
                  type='file'
                  className='hidden'
                  accept='.pdf,.doc,.docx,.txt'
                  disabled={loading}
                  onChange={(event) => {
                    setFile(event.target.files?.[0] || null);

                    setErrors((current) => ({
                      ...current,
                      file: undefined,
                    }));
                  }}
                />
              </label>

              {errors.file && <p className='text-[10px] text-red-600'>{errors.file}</p>}
            </div>
          )}

          <div className='space-y-2'>
            <Label>
              Tiêu đề <span className='text-[#D71920]'>*</span>
            </Label>

            <Input
              value={form.title}
              disabled={loading}
              onChange={(event) => {
                set('title', event.target.value);

                setErrors((current) => ({
                  ...current,
                  title: undefined,
                }));
              }}
              placeholder='Nhập tiêu đề tài liệu'
            />

            {errors.title && <p className='text-[10px] text-red-600'>{errors.title}</p>}
          </div>

          <div className='space-y-2'>
            <Label>Mô tả</Label>

            <Textarea
              value={form.description}
              disabled={loading}
              onChange={(event) => set('description', event.target.value)}
              rows={4}
              placeholder='Nhập mô tả ngắn về nội dung tài liệu'
            />
          </div>

          <div className='space-y-2'>
            <Label>
              Trạng thái <span className='text-[#D71920]'>*</span>
            </Label>

            <Select
              value={form.status}
              disabled={loading}
              onValueChange={(value) => set('status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder='Chọn trạng thái' />
              </SelectTrigger>

              <SelectContent>
                {DOCUMENT_STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status} value={status}>
                    {getStatusLabel(status)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type='button' variant='outline' disabled={loading} onClick={onClose}>
              Hủy
            </Button>

            <Button type='submit' disabled={loading} className='bg-[#D71920] hover:bg-[#b9151b]'>
              {loading && <Loader2 size={15} className='animate-spin' />}

              {isEdit ? 'Lưu thay đổi' : 'Thêm tài liệu'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function getStatusLabel(status) {
  switch (status) {
    case 'DRAFT':
      return 'Bản nháp';

    case 'PUBLISHED':
      return 'Đã xuất bản';

    case 'ARCHIVED':
      return 'Đã lưu trữ';

    default:
      return status;
  }
}

export default DocumentFormModal;
