import { Outlet } from 'react-router-dom';
import GoToTop from '@/components/GoToTop';
import Footer from '@/layouts/PublicLayout/components/Footer';
import Header from '@/layouts/PublicLayout/components/Header';
import { SystemConfigProvider } from '@/contexts/system-config-context';

function PublicLayout() {
  return (
    <SystemConfigProvider>
      <div className=''>
        <Header />
        <main><Outlet /></main>
        <Footer />
        <GoToTop />
      </div>
    </SystemConfigProvider>
  );
}

export default PublicLayout;
