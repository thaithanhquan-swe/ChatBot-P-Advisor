import { Link } from 'react-router-dom';
import { BotMessageSquare, HandMetal } from 'lucide-react';

const FloatingChatPromo = () => {
  return (
    <div className='fixed right-6 bottom-6 z-40 flex items-center gap-3'>
      <div className='relative animate-in fade-in slide-in-from-right-4 duration-500'>
        <button
          type='button'
          className='hidden items-center gap-1.5 rounded-(--radius-card) bg-white px-4 py-3 text-[13px] font-semibold text-gray-700 shadow-(--shadow-card-hover) ring-1 ring-(--border-subtle) transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:flex'
        >
          <span>Chat với chúng tôi</span>

          <span className='inline-block origin-bottom-right text-xl animate-[wiggle_1.8s_ease-in-out_infinite]'>
            <HandMetal />
          </span>
        </button>
      </div>

      <Link
        to='/chatai'
        aria-label='Đi tới trang chatbot tư vấn tuyển sinh'
        className='group relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-(--primary-color) text-white shadow-(--shadow-card-hover) transition-all duration-300 hover:-translate-y-1 hover:scale-105'
      >
        <span className='absolute inset-0 rounded-full bg-(--primary-color) opacity-20 group-hover:animate-ping' />

        <BotMessageSquare
          size={25}
          className='relative z-10 transition-transform duration-300 group-hover:scale-110'
        />
      </Link>

      <style>
        {`
          @keyframes wiggle {
            0%,
            60%,
            100% {
              transform: rotate(0deg);
            }

            10% {
              transform: rotate(14deg);
            }

            20% {
              transform: rotate(-8deg);
            }

            30% {
              transform: rotate(14deg);
            }

            40% {
              transform: rotate(-4deg);
            }

            50% {
              transform: rotate(10deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default FloatingChatPromo;
