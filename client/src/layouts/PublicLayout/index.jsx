import { Outlet } from 'react-router-dom';
import GoToTop from '@/components/GoToTop';
import Footer from '@/layouts/PublicLayout/components/Footer';
import Header from '@/layouts/PublicLayout/components/Header';

function PublicLayout() {
  return (
    <div className=''>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <GoToTop />
    </div>
  );
}

export default PublicLayout;
