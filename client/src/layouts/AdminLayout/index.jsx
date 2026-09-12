import { Outlet, useMatch } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar/AdminSidebar';

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
          <main
            className={
              isMessagesPage ? 'flex min-h-0 flex-1 flex-col px-8 py-2' : 'min-h-screen px-8 py-7'
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
