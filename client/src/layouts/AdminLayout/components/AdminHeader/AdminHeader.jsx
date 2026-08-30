import { useEffect, useRef, useState } from 'react';
import { ChevronDown, House, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { images } from '@/assets/images';
import { getCurrentUser, logout } from '@/services/auth-service';

const roleLabels = {
  ADMIN: 'Quản trị viên',
  ADVISOR: 'Cán bộ tuyển sinh',
};

function AdminHeader() {
  const navigate = useNavigate();
  const accountRef = useRef(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [accountOpen, setAccountOpen] = useState(false);

  useEffect(() => {
    let active = true;

    const fetchCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        if (active) setCurrentUser(user);
      } catch {
        if (active) navigate('/login', { replace: true });
      }
    };

    fetchCurrentUser();

    return () => {
      active = false;
    };
  }, [navigate]);

  useEffect(() => {
    const closeAccountMenu = (event) => {
      if (!accountRef.current?.contains(event.target)) setAccountOpen(false);
    };

    document.addEventListener('mousedown', closeAccountMenu);
    return () => document.removeEventListener('mousedown', closeAccountMenu);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      navigate('/login', { replace: true });
    }
  };

  const primaryRole = currentUser?.roles?.find((role) => role.name === 'ADMIN')?.name
    || currentUser?.roles?.[0]?.name;
  const roleName = roleLabels[primaryRole] || primaryRole || 'Người dùng';
  const username = currentUser?.username || 'Đang tải...';
  const initials = currentUser?.username?.slice(0, 2).toUpperCase() || 'PT';

  return (
    <header className='sticky top-0 z-30 h-18 border-b border-slate-200 bg-white/95 backdrop-blur'>
      <div className='flex h-full items-center justify-between px-6 lg:px-8'>
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

        <div className='flex items-center gap-3'>
          <Link
            to='/'
            aria-label='Về trang chủ'
            title='Về trang chủ'
            className='flex h-10 items-center gap-2 rounded-lg px-3 text-[13px] font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-[#D71920]'
          >
            <House size={18} strokeWidth={1.8} />
            <span className='hidden md:inline'>Trang chủ</span>
          </Link>

          <div className='mx-1 h-8 w-px bg-slate-200' />

          <div ref={accountRef} className='relative'>
            <button
              type='button'
              aria-expanded={accountOpen}
              aria-haspopup='menu'
              onClick={() => setAccountOpen((open) => !open)}
              className='flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition-colors hover:bg-slate-50'
            >
              <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-[#D71920]'>
                <span className='text-[11px] font-bold'>{initials}</span>
              </div>

              <div className='hidden text-left sm:block'>
                <p className='max-w-40 truncate text-[13px] font-semibold leading-4 text-slate-800'>
                  {username}
                </p>
                <p className='mt-0.5 text-[11px] font-medium leading-4 text-slate-400'>{roleName}</p>
              </div>

              <ChevronDown
                size={16}
                strokeWidth={1.8}
                className={`text-slate-400 transition-transform ${accountOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {accountOpen && (
              <div
                role='menu'
                className='absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg'
              >
                <div className='border-b border-slate-100 px-3 py-2 sm:hidden'>
                  <p className='truncate text-[13px] font-semibold text-slate-800'>{username}</p>
                  <p className='mt-0.5 text-[11px] text-slate-400'>{roleName}</p>
                </div>
                <button
                  type='button'
                  role='menuitem'
                  onClick={handleLogout}
                  className='flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[13px] font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-[#D71920]'
                >
                  <LogOut size={17} strokeWidth={1.8} />
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
