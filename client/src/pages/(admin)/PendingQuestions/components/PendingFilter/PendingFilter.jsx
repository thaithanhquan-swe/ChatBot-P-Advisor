import { CalendarDays, ChevronDown, RotateCcw, Search, Send, SlidersHorizontal } from 'lucide-react';

function PendingFilter() {
  return (
    <aside className='h-fit overflow-hidden rounded-xl border border-slate-200 bg-white p-4'>
      <div className='mb-5 flex items-center justify-between'>
        <h2 className='text-[15px] font-bold text-slate-900'>Bộ lọc</h2>
        <SlidersHorizontal size={18} />
      </div>

      <FilterLabel label='Tìm kiếm'><SearchInput placeholder='Nhập từ khóa...' /></FilterLabel>
      <FilterLabel label='Danh mục'><Select text='Tất cả danh mục' /></FilterLabel>
      <FilterLabel label='Trạng thái'><Select text='Tất cả trạng thái' /></FilterLabel>
      <FilterLabel label='Độ ưu tiên'><Select text='Tất cả ưu tiên' /></FilterLabel>

      <p className='mb-2 text-[11px] font-medium text-slate-700'>Ngày tạo</p>
      <div className='mb-4 grid grid-cols-2 gap-2'><DateInput text='Từ ngày' /><DateInput text='Đến ngày' /></div>

      <button type='button' className='flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-[#D71920] text-[11px] font-semibold text-white'><Send size={13} />Áp dụng bộ lọc</button>
      <button type='button' className='mt-2 flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-slate-200 text-[11px] text-slate-600'>Xóa bộ lọc<RotateCcw size={13} /></button>

      <CategoryStatistics />
    </aside>
  );
}

function CategoryStatistics() {
  return (
    <div className='mt-5 border-t border-slate-100 pt-4'>
      <h3 className='mb-4 text-[13px] font-bold text-slate-900'>Thống kê theo danh mục</h3>
      <div className='flex items-center gap-3'>
        <div className='h-21 w-21 shrink-0 rounded-full p-4' style={{ background: 'conic-gradient(#d71920 0 44%, #ff9d20 44% 70%, #72a7e8 70% 86%, #cbd5e1 86% 100%)' }}><div className='h-13 w-13 rounded-full bg-white' /></div>
        <div className='flex-1 space-y-2 text-[9px]'>
          <Legend color='bg-[#D71920]' name='Tuyển sinh' value='38 (44%)' />
          <Legend color='bg-orange-400' name='Học phí - Học bổng' value='22 (26%)' />
          <Legend color='bg-blue-400' name='Ngành học' value='14 (16%)' />
          <Legend color='bg-slate-300' name='Khác' value='12 (14%)' />
        </div>
      </div>
    </div>
  );
}

function SearchInput({ placeholder }) { return <div className='relative'><input type='text' placeholder={placeholder} className='h-9 w-full rounded-lg border border-slate-200 px-3 pr-8 text-[10px] outline-none focus:border-red-300' /><Search size={15} className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-500' /></div>; }
function Select({ text }) { return <button type='button' className='flex h-9 w-full items-center justify-between rounded-lg border border-slate-200 px-3 text-[10px] text-slate-600'><span>{text}</span><ChevronDown size={14} /></button>; }
function FilterLabel({ label, children }) { return <div className='mb-4'><p className='mb-2 text-[11px] font-medium text-slate-700'>{label}</p>{children}</div>; }
function DateInput({ text }) { return <div className='relative'><input placeholder={text} className='h-9 w-full rounded-lg border border-slate-200 px-2 pr-6 text-[9px] outline-none' /><CalendarDays size={13} className='absolute right-2 top-1/2 -translate-y-1/2 text-slate-500' /></div>; }
function Legend({ color, name, value }) { return <div className='flex items-center gap-1.5'><span className={`h-2 w-2 rounded-sm ${color}`} /><span className='flex-1 text-slate-600'>{name}</span><span className='font-medium text-slate-500'>{value}</span></div>; }

export default PendingFilter;
