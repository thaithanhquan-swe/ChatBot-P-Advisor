import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart3, BookOpen, CircleHelp, FileText, LayoutDashboard, Settings, Users } from 'lucide-react';
import { getCurrentUser } from '@/services/auth-service';

function AdminSidebar() {
  const [currentUser, setCurrentUser] = useState(null);
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
    {
      label: 'Báo cáo & Thống kê',
      path: '/admin/reports',
      icon: BarChart3,
      adminOnly: true,
    },
  ];
  const isAdmin = currentUser?.roles?.some((role) => role.name === 'ADMIN');
  const visibleMenuItems = menuItems.filter((item) => !item.adminOnly || isAdmin);

  useEffect(() => {
    let active = true;

    const fetchCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        if (active) setCurrentUser(user);
      } catch {
        if (active) setCurrentUser(null);
      }
    };

    fetchCurrentUser();

    return () => {
      active = false;
    };
  }, []);

  return (
    <aside className='fixed inset-y-0 left-0 z-50 flex w-67.5 flex-col border-r border-slate-200 bg-white'>
      {/* Menu */}
      <div className='flex-1 overflow-y-auto px-4 py-6'>
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
                    flex items-center gap-3
                    rounded-xl px-3.5 py-3
                    text-[14px] font-medium
                    transition-all
                    ${
                      isActive
                        ? 'bg-[#D71920] text-white'
                        : 'text-slate-600 hover:bg-red-50 hover:text-[#D71920]'
                    }
                    `
                }
              >
                <Icon size={19} />

                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

export default AdminSidebar;
