import { images } from '@/assets/images';
import { Bell, ChevronDown } from 'lucide-react';

function AdminHeader({ role }) {
  const roleName = role === 'ADMIN' ? 'Quản trị viên' : 'Cán bộ tuyển sinh';

  return (
    <header className='sticky top-0 z-30 h-18 border-b border-slate-200 bg-white/95 backdrop-blur'>
      <div className='flex h-full items-center justify-between px-6 lg:px-8'>
        {/* Left: Logo */}
        <div className='flex items-center gap-3'>
          <img
            src={images.Logo_PTIT_University}
            alt='Học viện Công nghệ Bưu chính Viễn thông'
            className='h-12 w-auto object-contain'
          />

          <div className='h-8 w-px bg-slate-200' />

          <div className='leading-tight'>
            <p className='text-[14px] font-bold text-slate-900'>Chatbot tư vấn tuyển sinh</p>
            <p className='mt-0.5 text-[11px] font-medium text-slate-400'>
              Học viện Công nghệ Bưu chính Viễn thông
            </p>
          </div>
        </div>

        {/* Right */}
        <div className='flex items-center gap-3'>
          {/* Notification */}
          <button
            type='button'
            aria-label='Thông báo'
            className='relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-red-50 hover:text-[#D71920]'
          >
            <Bell size={19} strokeWidth={1.8} />

            <span className='absolute right-2.25 top-2 h-2 w-2 rounded-full bg-[#D71920] ring-2 ring-white' />
          </button>

          {/* Divider */}
          <div className='mx-1 h-8 w-px bg-slate-200' />

          {/* Account */}
          <button
            type='button'
            className='flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition-colors hover:bg-slate-50'
          >
            {/* Avatar */}
            <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-[#D71920]'>
              <span className='text-[11px] font-bold'>PT</span>
            </div>

            {/* User info */}
            <div className='hidden text-left sm:block'>
              <p className='text-[13px] font-semibold leading-4 text-slate-800'>Admin PTIT</p>

              <p className='mt-0.5 text-[11px] font-medium leading-4 text-slate-400'>{roleName}</p>
            </div>

            <ChevronDown size={16} strokeWidth={1.8} className='text-slate-400' />
          </button>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
