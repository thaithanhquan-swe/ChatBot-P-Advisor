import { GoogleIcon } from '@/assets/icons';

const SocialAuth = ({ label }) => {
  return (
    <div>
      <div className='relative my-6 text-center text-[12.5px] text-gray-400'>
        <span className='relative z-10 bg-white px-3'>{label}</span>
        <div className='absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-gray-200' />
      </div>

      <button
        type='button'
        className='flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 text-[13.5px] font-medium text-gray-700 transition hover:bg-gray-50'
      >
        <GoogleIcon size={18} />
        Google
      </button>
    </div>
  );
};

export default SocialAuth;
