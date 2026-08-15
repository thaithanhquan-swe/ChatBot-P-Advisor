import { Outlet } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar/AdminSidebar';
import AdminFooter from './components/AdminFooter/AdminFooter';
import AdminHeader from './components/AdminHeader/AdminHeader';

function AdminLayout() {
  const userRole = 'ADMIN';

  return (
    <div className='min-h-screen bg-[#FAFAFA]'>
      <AdminSidebar />

      <div className='min-h-screen pl-67.5'>
        <AdminHeader role={userRole} />

        <main className='min-h-[calc(100vh-134px)] px-8 py-6'>
          <Outlet />
        </main>

        <AdminFooter />
      </div>
    </div>
  );
}

export default AdminLayout;
