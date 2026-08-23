import { useEffect, useState } from 'react';
import ModalShell from '../ModalShell/ModalShell';

const emptyForm = { question: '', answer: '', categoryId: '', status: 'PUBLISHED' };
function FAQFormModal({ open, faq, categories, onClose, onSubmit }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (open) setForm(faq ? { id: faq.id, question: faq.question, answer: faq.answer, categoryId: String(faq.categoryId), status: faq.status } : { ...emptyForm, categoryId: categories[0] ? String(categories[0].id) : '' });
    setErrors({});
  }, [open, faq, categories]);
  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!form.question.trim()) nextErrors.question = 'Vui lòng nhập câu hỏi.';
    if (!form.answer.trim()) nextErrors.answer = 'Vui lòng nhập câu trả lời.';
    if (!form.categoryId) nextErrors.categoryId = 'Vui lòng chọn danh mục.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    onSubmit({ ...form, question: form.question.trim(), answer: form.answer.trim(), categoryId: Number(form.categoryId) });
  };
  return (
    <ModalShell open={open} onClose={onClose} title={faq ? 'Chỉnh sửa FAQ' : 'Tạo FAQ mới'} description='Nhập đầy đủ câu hỏi, câu trả lời, danh mục và trạng thái.'>
      <form onSubmit={handleSubmit} className='space-y-5 p-6'>
        <Field label='Câu hỏi' required error={errors.question}><textarea rows={3} value={form.question} onChange={(e) => set('question', e.target.value)} placeholder='Nhập nội dung câu hỏi...' className='w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-xs outline-none focus:border-red-300'/></Field>
        <Field label='Câu trả lời' required error={errors.answer}><textarea rows={7} value={form.answer} onChange={(e) => set('answer', e.target.value)} placeholder='Nhập nội dung câu trả lời...' className='w-full resize-y rounded-lg border border-slate-200 px-3 py-2.5 text-xs leading-5 outline-none focus:border-red-300'/></Field>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <Field label='Danh mục' required error={errors.categoryId}><select value={form.categoryId} onChange={(e) => set('categoryId', e.target.value)} className='h-10 w-full rounded-lg border border-slate-200 px-3 text-xs outline-none focus:border-red-300'><option value=''>Chọn danh mục</option>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></Field>
          <Field label='Trạng thái' required><select value={form.status} onChange={(e) => set('status', e.target.value)} className='h-10 w-full rounded-lg border border-slate-200 px-3 text-xs outline-none focus:border-red-300'><option value='PUBLISHED'>PUBLISHED</option><option value='DRAFT'>DRAFT</option><option value='HIDDEN'>HIDDEN</option></select></Field>
        </div>
        <div className='flex justify-end gap-2 border-t border-slate-100 pt-5'><button type='button' onClick={onClose} className='h-10 rounded-lg border border-slate-200 px-5 text-xs font-semibold text-slate-600 hover:bg-slate-50'>Hủy</button><button type='submit' className='h-10 rounded-lg bg-[#D71920] px-5 text-xs font-semibold text-white hover:bg-[#b9151b]'>{faq ? 'Lưu thay đổi' : 'Tạo FAQ'}</button></div>
      </form>
    </ModalShell>
  );
}
function Field({ label, required, error, children }) { return <div><label className='mb-2 block text-[11px] font-semibold text-slate-700'>{label}{required && <span className='ml-1 text-red-500'>*</span>}</label>{children}{error && <p className='mt-1 text-[10px] text-red-500'>{error}</p>}</div>; }
export default FAQFormModal;
