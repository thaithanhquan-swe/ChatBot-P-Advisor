import { Outlet } from 'react-router-dom';
import GoToTop from '@/components/GoToTop';
import Footer from '@/layouts/PublicLayout/components/Footer';
import Header from '@/layouts/PublicLayout/components/Header';
import { SystemConfigProvider } from '@/contexts/system-config-context';

function PublicLayout() {
  return (
    <SystemConfigProvider>
      <div className='flex min-h-screen flex-col overflow-x-hidden'>
        <Header />
        <main className='flex-1'>
          <Outlet />
        </main>
        <Footer />
        <GoToTop />
      </div>
    </SystemConfigProvider>
  );
}

export default PublicLayout;
