import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';

function PublicLayout() {
  return (
    <div className=''>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PublicLayout;
