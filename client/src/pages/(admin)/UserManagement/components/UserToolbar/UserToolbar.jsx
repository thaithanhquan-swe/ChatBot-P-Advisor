import { ChevronDown, Search } from 'lucide-react';

const UserToolbar = () => {
  return (
    <div className='mb-4'>
      <h2 className='mb-4 text-[15px] font-bold text-slate-900'>Danh sách người dùng</h2>
      <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4'>
        <div className='relative sm:col-span-2'>
          <Search size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' />
        <input
          type='text'
            className='h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-[11px] outline-none transition focus:border-red-300 focus:ring-2 focus:ring-red-50'
          placeholder='Tìm kiếm theo họ tên hoặc email...'
        />
        </div>
        <ToolbarSelect label='Tất cả vai trò' />
        <ToolbarSelect label='Mới nhất' />
      </div>
    </div>
  );
};

function ToolbarSelect({ label }) {
  return (
    <button
      type='button'
      className='flex h-10 items-center justify-between rounded-lg border border-slate-200 px-3 text-[11px] text-slate-600'
    >
      <span>{label}</span>
      <ChevronDown size={15} />
    </button>
  );
}

export default UserToolbar;
