import { useEffect, useState } from 'react';
import { FileUp } from 'lucide-react';
import ModalShell from '../ModalShell/ModalShell';
import { DOCUMENT_STATUS_OPTIONS } from '../../constants/document';

const EMPTY_FORM = {
  title: '',
  description: '',
  status: 'ACTIVE',
};

function DocumentFormModal({ open, document, onClose, onSubmit }) {
  const isEdit = Boolean(document);
  const [form, setForm] = useState(EMPTY_FORM);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) return;
    setForm(
      document
        ? {
            title: document.title,
            description: document.description || '',
            status: document.status,
          }
        : EMPTY_FORM
    );
    setFile(null);
    setErrors({});
  }, [open, document]);

  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!isEdit && !file) nextErrors.file = 'Vui lòng chọn file tài liệu.';
    if (!form.title.trim()) nextErrors.title = 'Tiêu đề là bắt buộc.';

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSubmit({
      id: document?.id,
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      file,
    });
  };

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title={isEdit ? 'Chỉnh sửa tài liệu' : 'Thêm tài liệu mới'}
      description={
        isEdit
          ? 'Cập nhật tiêu đề, mô tả và trạng thái tài liệu.'
          : 'Tải file lên và nhập thông tin tài liệu dùng cho hệ thống.'
      }
    >
      <form onSubmit={handleSubmit} className='space-y-5 p-6'>
        {!isEdit && (
          <div>
            <label className='mb-2 block text-xs font-semibold text-slate-700'>
              File tài liệu <span className='text-[#D71920]'>*</span>
            </label>
            <label className='flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-center transition hover:border-red-300 hover:bg-red-50/30'>
              <FileUp size={24} className='mb-2 text-slate-400' />
              <span className='text-xs font-semibold text-slate-700'>
                {file ? file.name : 'Chọn file tài liệu'}
              </span>
              <span className='mt-1 text-[10px] text-slate-400'>PDF, DOCX, TXT,...</span>
              <input
                type='file'
                className='hidden'
                accept='.pdf,.doc,.docx,.txt'
                onChange={(event) => {
                  setFile(event.target.files?.[0] || null);
                  setErrors((current) => ({ ...current, file: undefined }));
                }}
              />
            </label>
            {errors.file && <p className='mt-1 text-[10px] text-red-600'>{errors.file}</p>}
          </div>
        )}

        <Field label='Tiêu đề' required error={errors.title}>
          <input
            value={form.title}
            onChange={(event) => {
              set('title', event.target.value);
              setErrors((current) => ({ ...current, title: undefined }));
            }}
            placeholder='Nhập tiêu đề tài liệu'
            className='h-11 w-full rounded-lg border border-slate-200 px-3 text-xs text-slate-700 outline-none focus:border-red-300 focus:ring-2 focus:ring-red-50'
          />
        </Field>

        <Field label='Mô tả'>
          <textarea
            value={form.description}
            onChange={(event) => set('description', event.target.value)}
            rows={4}
            placeholder='Nhập mô tả ngắn về nội dung tài liệu'
            className='w-full resize-none rounded-lg border border-slate-200 px-3 py-3 text-xs text-slate-700 outline-none focus:border-red-300 focus:ring-2 focus:ring-red-50'
          />
        </Field>

        <Field label='Trạng thái' required>
          <select
            value={form.status}
            onChange={(event) => set('status', event.target.value)}
            className='h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-red-300'
          >
            {DOCUMENT_STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </Field>

        <div className='flex justify-end gap-2 border-t border-slate-100 pt-5'>
          <button
            type='button'
            onClick={onClose}
            className='h-10 rounded-lg border border-slate-200 px-4 text-xs font-semibold text-slate-600 hover:bg-slate-50'
          >
            Hủy
          </button>
          <button
            type='submit'
            className='h-10 rounded-lg bg-[#D71920] px-5 text-xs font-semibold text-white hover:bg-[#b9151b]'
          >
            {isEdit ? 'Lưu thay đổi' : 'Thêm tài liệu'}
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

function Field({ label, required = false, error, children }) {
  return (
    <div>
      <label className='mb-2 block text-xs font-semibold text-slate-700'>
        {label} {required && <span className='text-[#D71920]'>*</span>}
      </label>
      {children}
      {error && <p className='mt-1 text-[10px] text-red-600'>{error}</p>}
    </div>
  );
}

export default DocumentFormModal;
