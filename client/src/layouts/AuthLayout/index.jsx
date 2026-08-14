import { Outlet } from 'react-router-dom';

import Footer from '@/layouts/AuthLayout/components/Footer';
import Header from '@/layouts/AuthLayout/components/Header';

function AuthLayout() {
  return (
    <div className='relative flex min-h-screen flex-col overflow-hidden bg-(--background-color) text-(--text-primary) antialiased'>
      <div className='pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-(--primary-color)/15 blur-3xl' />
      <div className='pointer-events-none absolute bottom-20 right-0 h-96 w-96 rounded-full bg-(--primary-color)/10 blur-3xl' />

      <Header />

      <main className='relative z-10 flex flex-1 items-center justify-center px-4 py-12'>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default AuthLayout;
