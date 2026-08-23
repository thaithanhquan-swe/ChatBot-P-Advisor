import { useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import ModalShell from '../ModalShell/ModalShell';
import CategoryFormModal from '../CategoryFormModal/CategoryFormModal';
function CategoryManagementModal({ open, categories, setCategories, onClose }) {
  const [formModal, setFormModal] = useState({ open: false, category: null });
  const save = (payload) => {
    const now = '23/08/2026 19:54';
    if (payload.id) setCategories((items) => items.map((item) => item.id === payload.id ? { ...item, ...payload, updatedAt: now } : item));
    else setCategories((items) => [...items, { ...payload, id: Date.now(), createdAt: now, updatedAt: now }]);
    setFormModal({ open: false, category: null });
  };
  const remove = (category) => { if (window.confirm(`Bạn có chắc muốn xóa danh mục “${category.name}”?`)) setCategories((items) => items.filter((item) => item.id !== category.id)); };
  return <>
    <ModalShell open={open} onClose={onClose} title='Quản lý danh mục FAQ' description='Danh mục ACTIVE có thể được chọn khi tạo hoặc chỉnh sửa FAQ.' size='max-w-5xl'>
      <div className='p-6'>
        <div className='mb-4 flex justify-end'><button onClick={() => setFormModal({ open: true, category: null })} className='flex h-9 items-center gap-2 rounded-lg bg-[#D71920] px-4 text-[11px] font-semibold text-white'><Plus size={15}/> Thêm danh mục</button></div>
        <div className='overflow-x-auto rounded-xl border border-slate-200'><table className='w-full min-w-[850px]'><thead><tr className='bg-slate-50'>{['Tên danh mục','Mô tả','Trạng thái','Ngày tạo','Cập nhật lần cuối','Thao tác'].map((item) => <th key={item} className={`px-4 py-3 text-[10px] font-semibold text-slate-600 ${item === 'Thao tác' ? 'text-right' : 'text-left'}`}>{item}</th>)}</tr></thead><tbody>{categories.map((item) => <tr key={item.id} className='border-t border-slate-100'><td className='px-4 py-3 text-[11px] font-semibold text-slate-800'>{item.name}</td><td className='max-w-[280px] px-4 py-3 text-[10px] leading-5 text-slate-500'>{item.description || '—'}</td><td className='px-4 py-3'><span className={`rounded-md px-2 py-1 text-[9px] font-semibold ${item.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{item.status}</span></td><td className='px-4 py-3 text-[10px] text-slate-500'>{item.createdAt}</td><td className='px-4 py-3 text-[10px] text-slate-500'>{item.updatedAt}</td><td className='px-4 py-3'><div className='flex justify-end gap-1'><button onClick={() => setFormModal({ open: true, category: item })} className='flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:text-[#D71920]'><Pencil size={14}/></button><button onClick={() => remove(item)} className='flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:border-red-200 hover:text-red-600'><Trash2 size={14}/></button></div></td></tr>)}</tbody></table></div>
      </div>
    </ModalShell>
    <CategoryFormModal open={formModal.open} category={formModal.category} onClose={() => setFormModal({ open: false, category: null })} onSubmit={save} />
  </>;
}
export default CategoryManagementModal;
