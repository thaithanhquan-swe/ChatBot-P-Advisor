import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { images } from '@/assets/images';

const RecoveryShell = ({ icon: Icon, title, description, children }) => {
  return (
    <div className='relative min-h-screen overflow-hidden bg-[#fffdfc] px-4 py-8 sm:px-6 lg:px-8'>
      <img
        src={images.truong_ptit_lineart}
        alt='PTIT'
        className='pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-20'
      />

      <div className='relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-180 flex-col items-center justify-center'>
        <div className='w-full rounded-[18px] border border-[#ececec] bg-white px-5 py-8 shadow-[0_12px_35px_rgba(0,0,0,0.06)] sm:px-10 sm:py-10 lg:px-12'>
          <div className='text-center'>
            <div className='mx-auto flex h-22 w-22 items-center justify-center rounded-full bg-[#fff1f2] text-[#d71920]'>
              <Icon size={45} strokeWidth={1.8} />
            </div>

            <h1 className='mt-6 text-[28px] font-bold tracking-[-0.02em] text-[#171717] sm:text-[34px]'>
              {title}
            </h1>

            <div className='mx-auto mt-4 h-0.75 w-11 rounded-full bg-[#d71920]' />

            <p className='mx-auto mt-5 max-w-130 text-sm leading-6 text-[#666] sm:text-[15px]'>
              {description}
            </p>
          </div>

          <div className='mt-8'>{children}</div>
        </div>

        <Link
          to='/login'
          className='mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#4b5563] transition hover:text-[#d71920]'
        >
          <ArrowLeft size={17} />
          Quay lại đăng nhập
        </Link>
      </div>
    </div>
  );
};

export default RecoveryShell;
