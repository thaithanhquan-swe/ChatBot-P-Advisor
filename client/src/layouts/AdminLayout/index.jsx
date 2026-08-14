import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import AdminHeader from '@/layouts/AdminLayout/components/AdminHeader';
import AdminSidebar from '@/layouts/AdminLayout/components/AdminSidebar';

import '@/styles/admin.css';
import { Toaster } from '@/components/ui/sonner';

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='fixed inset-0 flex overflow-hidden admin-font bg-background text-foreground'>
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className='flex flex-col flex-1 min-w-0 min-h-0 overflow-hidden'>
        <AdminHeader onMenuToggle={() => setSidebarOpen((prev) => !prev)} />

        <main className='flex-1 min-h-0 p-4 overflow-y-auto md:p-5 lg:p-6'>
          <Outlet />
        </main>
        <Toaster />
      </div>
    </div>
  );
}

export default AdminLayout;
