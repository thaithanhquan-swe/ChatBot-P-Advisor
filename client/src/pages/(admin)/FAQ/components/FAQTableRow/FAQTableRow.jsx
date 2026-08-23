import { Eye, Pencil, Trash2 } from 'lucide-react';

const statusClass = { PUBLISHED: 'bg-emerald-50 text-emerald-700', DRAFT: 'bg-amber-50 text-amber-700', HIDDEN: 'bg-slate-100 text-slate-600' };

function FAQTableRow({ faq, category, onView, onEdit, onDelete, onStatusChange }) {
  return (
    <tr className='border-b border-slate-100 last:border-0 hover:bg-slate-50/60'>
      <td className='max-w-[360px] px-4 py-4'><button type='button' onClick={() => onView(faq)} className='text-left text-[11px] font-semibold leading-5 text-slate-800 hover:text-[#D71920]'>{faq.question}</button><p className='mt-1 line-clamp-1 text-[9px] text-slate-400'>{faq.answer}</p></td>
      <td className='px-4 py-4'><span className='inline-flex rounded-md bg-red-50 px-2 py-1 text-[9px] font-medium text-[#D71920]'>{category?.name ?? '—'}</span></td>
      <td className='px-4 py-4'>
        <select
          aria-label={`Đổi trạng thái FAQ: ${faq.question}`}
          value={faq.status}
          onChange={(event) => onStatusChange(faq.id, event.target.value)}
          className={`h-7 rounded-md border-0 px-2 py-1 text-[9px] font-semibold outline-none ring-1 ring-inset ring-current/10 ${statusClass[faq.status]}`}
        >
          <option value='DRAFT'>DRAFT</option>
          <option value='HIDDEN'>HIDDEN</option>
          <option value='PUBLISHED'>PUBLISHED</option>
        </select>
      </td>
      <td className='px-4 py-4 text-[10px] text-slate-600'>{faq.creator}</td>
      <td className='px-4 py-4 text-[10px] text-slate-600'>{faq.createdAt}</td>
      <td className='px-4 py-4 text-[10px] text-slate-600'>{faq.updatedAt}</td>
      <td className='px-4 py-4'><div className='flex justify-end gap-1'><Action title='Xem chi tiết' onClick={() => onView(faq)}><Eye size={14}/></Action><Action title='Chỉnh sửa' onClick={() => onEdit(faq)}><Pencil size={14}/></Action><Action title='Xóa' danger onClick={() => onDelete(faq)}><Trash2 size={14}/></Action></div></td>
    </tr>
  );
}
function Action({ children, onClick, danger, title }) { return <button type='button' title={title} onClick={onClick} className={`flex h-8 w-8 items-center justify-center rounded-md border transition ${danger ? 'border-slate-200 text-slate-400 hover:border-red-200 hover:bg-red-50 hover:text-red-600' : 'border-slate-200 text-slate-500 hover:border-red-200 hover:text-[#D71920]'}`}>{children}</button>; }
export default FAQTableRow;
