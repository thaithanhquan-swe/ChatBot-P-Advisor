import { GoogleIcon } from '@/assets/icons';

const SocialAuth = ({ label }) => {
  return (
    <div>
      <div className='relative my-6 text-center text-[12.5px] text-gray-400'>
        <span className='relative z-10 bg-white px-3'>{label}</span>
        <div className='absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-gray-200' />
      </div>

      <div className='grid grid-cols-2 gap-3'>
        <button
          type='button'
          className='flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 text-[13.5px] font-medium text-gray-700 transition hover:bg-gray-50'
        >
          <GoogleIcon size={18} />
          Google
        </button>
        <button
          type='button'
          className='flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 text-[13.5px] font-medium text-gray-700 transition hover:bg-gray-50'
        >
          <span className='grid h-[18px] w-[18px] grid-cols-2 gap-px' aria-hidden='true'>
            <i className='bg-[#f25022]' />
            <i className='bg-[#7fba00]' />
            <i className='bg-[#00a4ef]' />
            <i className='bg-[#ffb900]' />
          </span>
          Microsoft
        </button>
      </div>
    </div>
  );
};

export default SocialAuth;
