import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

function GoToTop({ visibleAfter = 300 }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.scrollY > visibleAfter);

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });

    return () => window.removeEventListener('scroll', updateVisibility);
  }, [visibleAfter]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      type='button'
      aria-label='Cuộn lên đầu trang'
      onClick={scrollToTop}
      className={`
      group fixed right-10 bottom-20 z-50
      flex size-13 items-center justify-center
      rounded-full
      border-2 border-white
      bg-[#c8102e]
      text-white
      shadow-[0_6px_20px_rgba(200,16,46,0.28)]
      ring-4 ring-[#c8102e]/10
      transition-all duration-300 ease-out
      hover:-translate-y-1
      hover:bg-[#a90d27]
      hover:ring-8 hover:ring-[#c8102e]/10
      hover:shadow-[0_10px_28px_rgba(200,16,46,0.38)]
      active:scale-90 cursor-pointer
      ${
        isVisible
          ? 'translate-y-0 scale-100 opacity-100'
          : 'pointer-events-none translate-y-4 scale-75 opacity-0'
      }
    `}
    >
      <ArrowUp
        size={19}
        strokeWidth={2.5}
        aria-hidden='true'
        className='transition-transform duration-300 group-hover:-translate-y-0.5'
      />
    </button>
  );
}

export default GoToTop;
