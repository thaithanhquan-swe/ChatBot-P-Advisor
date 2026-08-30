import { RotateCcw, Search, SlidersHorizontal } from 'lucide-react';

function ConsultationRequestFilter({ filters, onChange, onApply, onReset }) {
  const set = (field) => (event) => onChange((current) => ({ ...current, [field]: event.target.value }));
  return (
    <aside className='mt-5 rounded-xl border border-slate-200 bg-white p-4'>
      <div className='mb-4 flex items-center justify-between'><h2 className='text-[15px] font-bold text-slate-900'>Bộ lọc</h2><SlidersHorizontal size={18} /></div>
      <form onSubmit={onApply} className='grid grid-cols-1 items-end gap-3 md:grid-cols-2 xl:grid-cols-7'>
        <FilterLabel label='Tìm kiếm'><div className='relative'><input value={filters.keyword} onChange={set('keyword')} placeholder='Câu hỏi, email, SĐT...' className='h-9 w-full rounded-lg border border-slate-200 px-3 pr-8 text-[10px] outline-none focus:border-red-300' /><Search size={14} className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400' /></div></FilterLabel>
        <FilterLabel label='Trạng thái'><select value={filters.status} onChange={set('status')} className='h-9 w-full rounded-lg border border-slate-200 px-3 text-[10px]'><option value=''>Tất cả trạng thái</option><option value='PENDING'>Chờ tiếp nhận</option><option value='IN_PROGRESS'>Đang xử lý</option><option value='RESOLVED'>Đã hoàn thành</option><option value='CANCELLED'>Đã hủy</option></select></FilterLabel>
        <FilterLabel label='Từ ngày'><input type='date' value={filters.createdFrom} onChange={set('createdFrom')} className='h-9 w-full rounded-lg border border-slate-200 px-2 text-[10px]' /></FilterLabel>
        <FilterLabel label='Đến ngày'><input type='date' value={filters.createdTo} onChange={set('createdTo')} className='h-9 w-full rounded-lg border border-slate-200 px-2 text-[10px]' /></FilterLabel>
        <FilterLabel label='Sắp xếp theo'><select value={filters.sortBy} onChange={set('sortBy')} className='h-9 w-full rounded-lg border border-slate-200 px-3 text-[10px]'><option value='createdAt'>Ngày tạo</option><option value='updatedAt'>Ngày cập nhật</option><option value='status'>Trạng thái</option><option value='resolvedAt'>Ngày hoàn thành</option></select></FilterLabel>
        <FilterLabel label='Thứ tự'><select value={filters.sortDirection} onChange={set('sortDirection')} className='h-9 w-full rounded-lg border border-slate-200 px-3 text-[10px]'><option value='DESC'>Mới nhất</option><option value='ASC'>Cũ nhất</option></select></FilterLabel>
        <div className='flex gap-2'><button className='h-9 flex-1 rounded-lg bg-[#D71920] px-3 text-[11px] font-semibold text-white'>Áp dụng</button><button type='button' onClick={onReset} title='Xóa bộ lọc' className='flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500'><RotateCcw size={14} /></button></div>
      </form>
    </aside>
  );
}
function FilterLabel({ label, children }) { return <label><span className='mb-2 block text-[11px] font-medium text-slate-700'>{label}</span>{children}</label>; }
export default ConsultationRequestFilter;
