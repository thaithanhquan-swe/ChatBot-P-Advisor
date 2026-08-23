import { CalendarDays, ChevronDown, RotateCcw, SlidersHorizontal } from 'lucide-react';

function UserFilter() {
  return (
    <aside className='h-fit rounded-xl border border-slate-200 bg-white p-4'>
      <div className='mb-5 flex items-center justify-between'>
        <h2 className='text-[15px] font-bold text-slate-900'>Bộ lọc</h2>
        <SlidersHorizontal size={18} className='text-slate-500' />
      </div>
      <FilterSelect label='Vai trò' value='Tất cả vai trò' />
      <FilterSelect label='Trạng thái' value='Tất cả trạng thái' />
      <p className='mb-2 text-[11px] font-medium text-slate-700'>Ngày tạo</p>
      <div className='mb-4 grid grid-cols-2 gap-2'>
        <DateInput placeholder='Từ ngày' />
        <DateInput placeholder='Đến ngày' />
      </div>
      <FilterSelect label='Sắp xếp theo' value='Ngày tạo' />
      <FilterSelect label='Thứ tự' value='Mới nhất trước' />
      <button type='button' className='flex h-9 w-full items-center justify-center rounded-lg bg-[#D71920] text-[11px] font-semibold text-white transition hover:bg-[#b9151b]'>
        Áp dụng bộ lọc
      </button>
      <button type='button' className='mt-2 flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-slate-200 text-[11px] text-slate-600 transition hover:border-red-200 hover:text-[#D71920]'>
        <RotateCcw size={13} /> Xóa bộ lọc
      </button>
      <div className='mt-5 border-t border-slate-100 pt-4'>
        <h3 className='mb-4 text-[13px] font-bold text-slate-900'>Phân bổ vai trò</h3>
        <div className='space-y-3 text-[10px]'>
          <RoleItem color='bg-blue-500' label='Người dùng' value='1,186' />
          <RoleItem color='bg-orange-500' label='Tư vấn viên' value='46' />
          <RoleItem color='bg-[#D71920]' label='Quản trị viên' value='16' />
        </div>
      </div>
    </aside>
  );
}

function FilterSelect({ label, value }) {
  return <div className='mb-4'>
    <label className='mb-2 block text-[11px] font-medium text-slate-700'>{label}</label>
    <button type='button' className='flex h-9 w-full items-center justify-between rounded-lg border border-slate-200 px-3 text-[10px] text-slate-600'>
      <span>{value}</span><ChevronDown size={14} />
    </button>
  </div>;
}

function DateInput({ placeholder }) {
  return <div className='relative'>
    <input type='text' placeholder={placeholder} className='h-9 w-full rounded-lg border border-slate-200 px-2 pr-7 text-[9px] outline-none focus:border-red-300' />
    <CalendarDays size={13} className='absolute right-2 top-1/2 -translate-y-1/2 text-slate-400' />
  </div>;
}

function RoleItem({ color, label, value }) {
  return <div className='flex items-center gap-2'>
    <span className={`h-2 w-2 rounded-full ${color}`} />
    <span className='flex-1 text-slate-600'>{label}</span>
    <span className='font-medium text-slate-500'>{value}</span>
  </div>;
}

export default UserFilter;
