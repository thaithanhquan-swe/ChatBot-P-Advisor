import { useEffect, useState } from 'react';
import ModalShell from '../ModalShell/ModalShell';
function CategoryFormModal({ open, category, onClose, onSubmit }) {
  const [form, setForm] = useState({ name: '', description: '', status: 'ACTIVE' });
  const [error, setError] = useState('');
  useEffect(() => {
    if (open) setForm(category ? { ...category } : { name: '', description: '', status: 'ACTIVE' });
    setError('');
  }, [open, category]);
  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return setError('Tên danh mục là bắt buộc.');
    onSubmit({ ...form, name: form.name.trim(), description: form.description.trim() });
  };
  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title={category ? 'Chỉnh sửa danh mục' : 'Thêm danh mục FAQ'}
      size='max-w-lg'
    >
      <form onSubmit={submit} className='space-y-4 p-6'>
        <div>
          <label className='mb-2 block text-[11px] font-semibold text-slate-700'>
            Tên danh mục <span className='text-red-500'>*</span>
          </label>
          <input
            value={form.name}
            onChange={(e) => setForm((v) => ({ ...v, name: e.target.value }))}
            className='h-10 w-full rounded-lg border border-slate-200 px-3 text-xs outline-none focus:border-red-300'
            placeholder='Ví dụ: Tuyển sinh'
          />
          {error && <p className='mt-1 text-[10px] text-red-500'>{error}</p>}
        </div>
        <div>
          <label className='mb-2 block text-[11px] font-semibold text-slate-700'>Mô tả</label>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => setForm((v) => ({ ...v, description: e.target.value }))}
            className='w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-xs outline-none focus:border-red-300'
            placeholder='Mô tả ngắn về danh mục...'
          />
        </div>
        <div>
          <label className='mb-2 block text-[11px] font-semibold text-slate-700'>Trạng thái</label>
          <select
            value={form.status}
            onChange={(e) => setForm((v) => ({ ...v, status: e.target.value }))}
            className='h-10 w-full rounded-lg border border-slate-200 px-3 text-xs'
          >
            <option value='ACTIVE'>ACTIVE</option>
            <option value='INACTIVE'>INACTIVE</option>
          </select>
        </div>
        <div className='flex justify-end gap-2 border-t border-slate-100 pt-5'>
          <button
            type='button'
            onClick={onClose}
            className='h-10 rounded-lg border border-slate-200 px-5 text-xs font-semibold text-slate-600'
          >
            Hủy
          </button>
          <button
            type='submit'
            className='h-10 rounded-lg bg-[#D71920] px-5 text-xs font-semibold text-white'
          >
            {category ? 'Lưu thay đổi' : 'Thêm danh mục'}
          </button>
        </div>
      </form>
    </ModalShell>
  );
}
export default CategoryFormModal;
