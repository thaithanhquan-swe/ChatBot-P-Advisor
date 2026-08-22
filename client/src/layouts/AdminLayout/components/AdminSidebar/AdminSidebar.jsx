import { NavLink } from 'react-router-dom';
import { BarChart3, BookOpen, CircleHelp, LayoutDashboard, Settings, Users } from 'lucide-react';
function AdminSidebar() {
  const menuItems = [
    {
      label: 'Dashboard',
      path: '/admin',
      icon: LayoutDashboard,
    },
    {
      label: 'Quản lý FAQ / Tài liệu',
      path: '/admin/faq',
      icon: BookOpen,
    },
    {
      label: 'Câu hỏi tồn đọng',
      path: '/admin/pending-questions',
      icon: CircleHelp,
    },
    {
      label: 'Quản lý người dùng',
      path: 'usermanagement',
      icon: Users,
    },
    {
      label: 'Cấu hình hệ thống',
      path: '/admin/settings',
      icon: Settings,
    },
    {
      label: 'Báo cáo & Thống kê',
      path: '/admin/reports',
      icon: BarChart3,
    },
  ];

  return (
    <aside className='fixed inset-y-0 left-0 z-50 flex w-67.5 flex-col border-r border-slate-200 bg-white'>
      {/* Menu */}
      <div className='flex-1 overflow-y-auto px-4 py-6'>
        <p className='mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400'>
          Quản lý hệ thống
        </p>

        <nav className='space-y-1.5'>
          {menuItems.map((item) => {
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
