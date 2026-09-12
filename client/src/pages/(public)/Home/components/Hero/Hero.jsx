import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { images } from '@/assets/images';
import {
  ArrowRight,
  Bot,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ShieldCheck,
  UserCheck,
  Zap,
} from 'lucide-react';

const heroSlides = [
  {
    image: images.truong_ptit,
    alt: 'Trụ sở Học viện Công nghệ Bưu chính Viễn thông (PTIT)',
    label: 'HỌC VIỆN PTIT',
    caption: 'Đổi mới · Sáng tạo · Chất lượng',
  },
  {
    image: images.truong_ptit_lineart,
    alt: 'Minh họa khuôn viên Học viện Công nghệ Bưu chính Viễn thông',
    label: 'KHÔNG GIAN PTIT',
    caption: 'Nơi khởi đầu những lựa chọn tương lai',
  },
];

const Hero = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(null);

  const changeSlide = (direction) => {
    setSelectedIndex(
      (currentIndex) => (currentIndex + direction + heroSlides.length) % heroSlides.length
    );
    setDragOffset(0);
  };

  const handlePointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    dragStart.current = event.clientX;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (dragStart.current === null) return;

    setDragOffset(event.clientX - dragStart.current);
  };

  const handlePointerUp = () => {
    if (dragStart.current === null) return;

    if (Math.abs(dragOffset) > 70) {
      changeSlide(dragOffset > 0 ? -1 : 1);
    } else {
      setDragOffset(0);
    }

    dragStart.current = null;
    setIsDragging(false);
  };

  return (
    <section className='relative overflow-hidden bg-[linear-gradient(135deg,#fff_0%,#fff7f7_52%,#fdecee_100%)]'>
      <div className='pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-[#f7c9ce]/45 blur-3xl' />
      <div className='pointer-events-none absolute bottom-0 left-0 h-44 w-44 rounded-full bg-[#fff]/80 blur-2xl' />

      <div className='container relative py-12 lg:py-18'>
        <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16'>
          <div className='max-w-145'>
            <span className='inline-flex items-center gap-2 rounded-(--radius-pill) border border-(--primary-color-border) bg-white/80 px-4 py-2 text-[12px] font-bold tracking-[0.04em] text-(--primary-color) shadow-sm'>
              <Bot size={15} />
              TRỢ LÝ TUYỂN SINH PTIT
            </span>

            <h1 className='mt-6 text-[34px] leading-[1.15] font-extrabold tracking-[-0.02em] text-gray-950 sm:text-[44px] lg:text-[52px]'>
              Chọn đúng hướng đi,
              <span className='block text-(--primary-color)'>bắt đầu từ một câu hỏi.</span>
            </h1>

            <p className='mt-5 max-w-135 text-[15px] leading-7 text-(--text-secondary) sm:text-[16px]'>
              P-Advisor giúp thí sinh và phụ huynh tìm hiểu ngành học, học phí, học bổng và quy
              trình tuyển sinh PTIT bằng những câu trả lời dễ hiểu, nhanh chóng.
            </p>

            <div className='mt-8 flex flex-wrap items-center gap-3'>
              <Link
                to='/chatai'
                className='inline-flex items-center gap-2.5 rounded-xl bg-(--primary-color) px-5 py-3.5 text-[14px] font-bold text-white shadow-[0_12px_24px_-10px_rgba(200,16,46,0.7)] transition-all hover:-translate-y-0.5 hover:bg-[#a90d27]'
              >
                <MessageCircle size={18} />
                Bắt đầu trò chuyện
                <ArrowRight size={16} />
              </Link>
              <Link
                to='/documents'
                className='inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-5 py-3.5 text-[14px] font-bold text-gray-700 transition-colors hover:border-(--primary-color-border) hover:text-(--primary-color)'
              >
                Xem tài liệu tuyển sinh
              </Link>
            </div>

            <div className='mt-9 grid max-w-130 grid-cols-1 gap-3 sm:grid-cols-3'>
              {[
                { icon: Zap, label: 'Phản hồi tức thì' },
                { icon: ShieldCheck, label: 'Nguồn tin tin cậy' },
                { icon: UserCheck, label: 'Luôn có người đồng hành' },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className='flex items-center gap-2 text-[12px] font-semibold text-gray-600'
                >
                  <span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-(--primary-color) shadow-sm'>
                    <Icon size={14} />
                  </span>
                  {label}
                </div>
              ))}
            </div>
          </div>

          <div className='relative mx-auto w-full max-w-155 lg:pr-5'>
            <div
              className='relative aspect-[1.08/1] touch-none select-none perspective-distant'
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              <div className='absolute -inset-2 rounded-[1.75rem] bg-[#f7c9ce]/40 blur-xl' />
              <div className='relative h-full w-full'>
                {heroSlides.map((slide, index) => {
                  const position = (index - selectedIndex + heroSlides.length) % heroSlides.length;
                  const isFront = position === 0;
                  const transform = isFront
                    ? `translate3d(${dragOffset}px, ${Math.abs(dragOffset) * 0.04}px, 40px) rotateY(${dragOffset * -0.045}deg) rotateZ(${dragOffset * 0.012}deg)`
                    : 'translate3d(48px, 30px, -20px) rotateY(-16deg) rotateZ(5deg) scale(0.96)';

                  return (
                    <div
                      key={slide.image}
                      className={`absolute inset-0 cursor-grab overflow-hidden rounded-[1.75rem] border-8 border-white bg-(--surface-muted) shadow-[0_24px_60px_-24px_rgba(98,17,28,0.45)] [transform-style:preserve-3d] active:cursor-grabbing ${
                        isDragging ? '' : 'transition-transform duration-300 ease-out'
                      }`}
                      style={{ transform, zIndex: isFront ? 2 : 1 }}
                    >
                      <img
                        src={slide.image}
                        alt={slide.alt}
                        className='h-full w-full object-cover'
                      />
                      <div className='absolute inset-0 bg-linear-to-t from-[#2d0d12]/70 via-transparent to-transparent' />
                      <div className='absolute right-5 bottom-5 left-5 flex items-end justify-between gap-4 text-white'>
                        <div>
                          <p className='text-[11px] font-bold tracking-[0.16em] text-white/70'>
                            {slide.label}
                          </p>
                          <p className='mt-1 text-[16px] font-bold'>{slide.caption}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className='absolute top-5 right-5 z-10 flex gap-2'>
                <button
                  type='button'
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={() => changeSlide(-1)}
                  aria-label='Ảnh trước'
                  className='flex h-9 w-9 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur transition-colors hover:bg-(--primary-color)'
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type='button'
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={() => changeSlide(1)}
                  aria-label='Ảnh tiếp theo'
                  className='flex h-9 w-9 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur transition-colors hover:bg-(--primary-color)'
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <div className='absolute right-5 bottom-5 z-10 flex gap-1.5' aria-label='Chọn ảnh'>
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.image}
                    type='button'
                    onPointerDown={(event) => event.stopPropagation()}
                    onClick={() => {
                      setSelectedIndex(index);
                      setDragOffset(0);
                    }}
                    aria-label={`Xem ảnh ${index + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      selectedIndex === index ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
