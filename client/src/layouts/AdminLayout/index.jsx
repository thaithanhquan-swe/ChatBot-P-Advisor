import { Outlet, useMatch } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar/AdminSidebar';
import AdminHeader from './components/AdminHeader/AdminHeader';

function AdminLayout() {
  const isMessagesPage = useMatch('/admin/messages');

  return (
    <div
      className={
        isMessagesPage
          ? 'flex h-dvh flex-col overflow-hidden bg-[#FAFAFA]'
          : 'flex min-h-screen flex-col bg-[#FAFAFA]'
      }
    >
      <div className='relative flex min-h-0 flex-1'>
        <AdminSidebar />

        <div
          className={
            isMessagesPage
              ? 'flex min-h-0 flex-1 flex-col overflow-hidden pl-67.5'
              : 'min-h-full flex-1 pl-67.5'
          }
        >
          <div className='shrink-0'>
            <AdminHeader />
          </div>

          <main
            className={
              isMessagesPage
                ? 'flex min-h-0 flex-1 flex-col px-8 pt-2 pb-2'
                : 'min-h-[calc(100vh-134px)] px-8 py-6'
            }
          >
            <Outlet />
          </main>
        </div>
      </div>

    </div>
  );
}

export default AdminLayout;
