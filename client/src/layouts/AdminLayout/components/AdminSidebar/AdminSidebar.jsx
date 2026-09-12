import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  CircleHelp,
  FileText,
  House,
  LayoutDashboard,
  LogOut,
  MessageSquareText,
  Settings,
  Users,
} from 'lucide-react';

import { images } from '@/assets/images';
import { logout } from '@/services/auth-service';
import { getCurrentUser } from '@/services/user-service';

import AdminFooter from '../AdminFooter/AdminFooter';

function AdminSidebar() {
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  const menuItems = [
    {
      label: 'Dashboard',
      path: '/admin',
      icon: LayoutDashboard,
    },
    {
      label: 'Quản lý FAQ',
      path: '/admin/faq',
      icon: BookOpen,
    },
    {
      label: 'Quản lý tài liệu',
      path: '/admin/documents',
      icon: FileText,
    },
    {
      label: 'Yêu cầu tư vấn',
      path: '/admin/consultation-requests',
      icon: CircleHelp,
    },
    {
      label: 'Tin nhắn người dùng',
      path: '/admin/messages',
      icon: MessageSquareText,
    },
    {
      label: 'Quản lý người dùng',
      path: '/admin/users',
      icon: Users,
      adminOnly: true,
    },
    {
      label: 'Cấu hình hệ thống',
      path: '/admin/settings',
      icon: Settings,
      adminOnly: true,
    },
  ];

  const isAdmin = currentUser?.roles?.some((role) => role.name === 'ADMIN');

  const visibleMenuItems = menuItems.filter((item) => !item.adminOnly || isAdmin);

  const primaryRole =
    currentUser?.roles?.find((role) => role.name === 'ADMIN')?.name ||
    currentUser?.roles?.[0]?.name;

  const roleName =
    primaryRole === 'ADMIN'
      ? 'Quản trị viên'
      : primaryRole === 'ADVISOR'
        ? 'Cán bộ tuyển sinh'
        : 'Người dùng';

  const initials = currentUser?.username?.slice(0, 2).toUpperCase() || 'PT';

  useEffect(() => {
    let active = true;

    const fetchCurrentUser = async () => {
      try {
        const user = await getCurrentUser();

        if (active) {
          setCurrentUser(user);
        }
      } catch {
        if (active) {
          setCurrentUser(null);
        }
      }
    };

    fetchCurrentUser();

    return () => {
      active = false;
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      navigate('/login', {
        replace: true,
      });
    }
  };

  return (
    <aside className='absolute inset-y-0 left-0 z-50 flex w-67.5 flex-col border-r border-slate-200 bg-white shadow-[8px_0_30px_-24px_rgba(15,23,42,0.28)]'>
      {/* Brand */}
      <div className='border-b border-slate-100 px-5 py-4'>
        <div className='flex items-center gap-3'>
          <Link
            to='/'
            aria-label='Về trang chủ'
            title='Về trang chủ'
            className='flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-red-100 bg-red-50/70 p-2 transition-all duration-200 hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-50 hover:shadow-sm'
          >
            <img
              src={images.Logo_PTIT_University}
              alt='Học viện Công nghệ Bưu chính Viễn thông'
              className='h-full w-full object-contain'
            />
          </Link>

          <div className='min-w-0'>
            <p className='truncate text-[16px] font-extrabold tracking-tight text-slate-900'>
              P-Advisor Admin
            </p>

            <p className='mt-0.5 truncate text-[10.5px] font-medium text-slate-400'>
              Tư vấn tuyển sinh PTIT
            </p>
          </div>
        </div>
      </div>

      {/* User */}
      <div className='border-b border-slate-100 px-4 py-4'>
        <div className='rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5'>
          <div className='flex items-center gap-3'>
            <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100 text-[12px] font-bold text-[#D71920] ring-4 ring-white'>
              {initials}
            </div>

            <div className='min-w-0 flex-1'>
              <div className='flex items-center gap-2'>
                <p className='truncate text-[14px] font-bold text-slate-900'>
                  {currentUser?.username || 'Đang tải...'}
                </p>

                {isAdmin && (
                  <span className='shrink-0 rounded-full bg-red-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#D71920]'>
                    Admin
                  </span>
                )}
              </div>

              <p className='mt-0.5 truncate text-[10.5px] font-medium text-slate-400'>{roleName}</p>
            </div>
          </div>

          <div className='mt-3 grid grid-cols-2 gap-2'>
            <Link
              to='/'
              title='Về trang chủ'
              className='group flex h-9 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white text-[11px] font-semibold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-red-200 hover:text-[#D71920] hover:shadow-sm'
            >
              <House
                size={14}
                className='transition-transform duration-200 group-hover:-translate-y-0.5'
              />
              Trang chủ
            </Link>

            <button
              type='button'
              onClick={handleLogout}
              title='Đăng xuất'
              className='group flex h-9 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white text-[11px] font-semibold text-slate-500 transition-all duration-200 hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-50 hover:text-[#D71920] hover:shadow-sm'
            >
              <LogOut
                size={14}
                className='transition-transform duration-200 group-hover:translate-x-0.5'
              />
              Đăng xuất
            </button>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className='flex-1 overflow-y-auto px-4 py-5'>
        <p className='mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400'>
          Quản lý hệ thống
        </p>

        <nav className='space-y-1.5'>
          {visibleMenuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end
                className={({ isActive }) =>
                  `
                    group flex items-center gap-3
                    rounded-xl px-3.5 py-3
                    text-[14px] font-medium
                    transition-all duration-200
                    ${
                      isActive
                        ? 'bg-[#D71920] text-white shadow-[0_4px_12px_rgba(215,25,32,0.16)]'
                        : 'text-slate-600 hover:translate-x-0.5 hover:bg-red-50 hover:text-[#D71920]'
                    }
                  `
                }
              >
                <Icon size={19} strokeWidth={1.8} className='shrink-0' />

                <span className='truncate'>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <AdminFooter compact />
    </aside>
  );
}

export default AdminSidebar;
