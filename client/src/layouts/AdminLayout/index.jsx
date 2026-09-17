import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Outlet, useMatch } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar/AdminSidebar';

function AdminLayout() {
  const isMessagesPage = useMatch('/admin/messages');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className={
        isMessagesPage
          ? 'flex h-dvh flex-col overflow-hidden bg-[#FAFAFA]'
          : 'flex min-h-screen flex-col bg-[#FAFAFA]'
      }
    >
      <div className='relative flex min-h-0 flex-1'>
        <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div
          className={
            isMessagesPage
              ? 'flex min-h-0 flex-1 flex-col overflow-hidden lg:pl-67.5'
              : 'min-h-full flex-1 lg:pl-67.5'
          }
        >
          <main
            className={
              isMessagesPage
                ? 'flex min-h-0 flex-1 flex-col px-4 py-3 sm:px-6 lg:px-8 lg:py-2'
                : 'min-h-screen px-4 py-5 sm:px-6 lg:px-8 lg:py-7'
            }
          >
            <div className='mb-4 flex lg:hidden'>
              <button
                type='button'
                onClick={() => setSidebarOpen(true)}
                className='inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-red-200 hover:text-[#D71920]'
                aria-label='Mở menu quản trị'
              >
                <Menu size={19} />
                Menu
              </button>
            </div>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
