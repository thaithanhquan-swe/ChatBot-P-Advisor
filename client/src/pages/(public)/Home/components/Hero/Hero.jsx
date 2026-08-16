import { Link } from 'react-router-dom';
import {
  ArrowRightIcon,
  BotIcon,
  MessageCircleIcon,
  ShieldCheckIcon,
  UserCheckIcon,
  ZapIcon,
} from '@/assets/icons';
import { images } from '@/assets/images';

const Hero = () => {
  return (
    <section className='relative overflow-hidden bg-white'>
      <div className='container relative py-14 lg:py-20'>
        <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-10'>
          {/* Left: copy */}
          <div>
            <span className='inline-flex items-center gap-2 rounded-(--radius-pill) border border-(--primary-color-border) bg-(--primary-color-soft) px-4 py-2 text-[13px] font-semibold text-(--primary-color)'>
              <BotIcon size={15} />
              Chatbot tư vấn tuyển sinh PTIT
            </span>

            <h1 className='mt-6 text-[32px] leading-[1.2] font-extrabold text-gray-900 sm:text-[38px] lg:text-[42px]'>
              Chào mừng bạn đến với
              <br />
              <span className='text-(--primary-color)'>Chatbot Tư vấn tuyển sinh PTIT</span>
            </h1>

            <p className='mt-5 max-w-125 text-[15px] leading-relaxed text-(--text-secondary)'>
              Trợ lý ảo của Học viện Công nghệ Bưu chính Viễn thông luôn sẵn sàng giải đáp mọi thắc
              mắc của bạn về ngành học, học phí, học bổng và quy trình tuyển sinh.
            </p>

            <Link
              to='/chatai'
              className='mt-8 inline-flex items-center gap-2.5 rounded-xl bg-(--primary-color) px-6 py-3.5 text-[14.5px] font-semibold text-white shadow-(--shadow-card) transition-all hover:-translate-y-0.5 hover:shadow-(--shadow-card-hover)'
            >
              <MessageCircleIcon size={18} />
              Bắt đầu trò chuyện ngay
              <ArrowRightIcon size={16} />
            </Link>

            <div className='mt-9 flex flex-wrap items-center gap-x-7 gap-y-3'>
              <div className='flex items-center gap-2 text-[13px] font-medium text-gray-600'>
                <ZapIcon size={16} className='text-(--primary-color)' />
                Trả lời nhanh 24/7
              </div>
              <div className='flex items-center gap-2 text-[13px] font-medium text-gray-600'>
                <ShieldCheckIcon size={16} className='text-(--primary-color)' />
                Thông tin chính xác
              </div>
              <div className='flex items-center gap-2 text-[13px] font-medium text-gray-600'>
                <UserCheckIcon size={16} className='text-(--primary-color)' />
                Hỗ trợ tận tình
              </div>
            </div>
          </div>

          <div className='relative aspect-4/3 w-full overflow-hidden rounded-(--radius-panel) bg-(--surface-muted) shadow-(--shadow-card)'>
            <img
              src={images.truong_ptit}
              alt='Trụ sở Học viện Công nghệ Bưu chính Viễn thông (PTIT)'
              className='h-full w-full object-cover'
            />
            <div className='absolute right-6 bottom-6 rounded-xl bg-(--primary-color) px-4 py-2.5 text-[12px] font-semibold text-white shadow-(--shadow-card-hover)'>
              Đổi mới · Sáng tạo · Chất lượng
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
