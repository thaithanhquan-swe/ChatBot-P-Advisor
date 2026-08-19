import { Outlet } from 'react-router-dom';

import HeroPanel from '@/layouts/AuthLayout/components/HeroPanel/HeroPanel';

function AuthLayout() {
  return (
    <div className='min-h-screen bg-[#fffafb] p-3 sm:p-6 lg:p-10'>
      <div className='mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-335 overflow-hidden rounded-[26px] border border-white bg-white shadow-[0_12px_40px_rgba(143,37,49,0.08)] sm:min-h-[calc(100vh-3rem)] lg:min-h-[calc(100vh-5rem)]'>
        <HeroPanel />

        <main className='flex flex-1 items-center justify-center bg-[#fffefe] px-4 py-8 sm:px-8 lg:px-10'>
          <div className='w-full max-w-162.5'>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AuthLayout;
