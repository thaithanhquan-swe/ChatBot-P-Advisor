import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

const FloatingChatPromo = () => {
  const [dismissed, setDismissed] = useState(false);

  return (
    <div className='fixed right-6 bottom-6 z-40 flex items-center gap-3'>
      {!dismissed && (
        <button
          type='button'
          onClick={() => setDismissed(true)}
          className='hidden rounded-(--radius-card) bg-white px-4 py-3 text-[13px] font-semibold text-gray-700 shadow-(--shadow-card-hover) ring-1 ring-(--border-subtle) sm:block'
        >
          Chat với chúng tôi 👋
        </button>
      )}

      <Link
        to='/chatai'
        aria-label='Mở chatbot tư vấn tuyển sinh'
        className='flex h-14 w-14 items-center justify-center rounded-full bg-(--primary-color) text-white shadow-(--shadow-card-hover) transition-transform hover:scale-105'
      >
        <MessageCircle size={24} />
      </Link>
    </div>
  );
};

export default FloatingChatPromo;
