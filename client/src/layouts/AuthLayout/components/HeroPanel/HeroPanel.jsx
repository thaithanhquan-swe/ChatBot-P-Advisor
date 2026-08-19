import { Link } from 'react-router-dom';
import { Clock, FileText, MessageCircleMore, ShieldCheck } from 'lucide-react';

import { images } from '@/assets/images';

const features = [
  {
    icon: MessageCircleMore,
    title: 'Tư vấn thông minh',
    desc: 'Chatbot AI hiểu rõ thông tin tuyển sinh của PTIT',
  },
  {
    icon: FileText,
    title: 'Thông tin đầy đủ',
    desc: 'Cung cấp toàn bộ thông tin tuyển sinh mới nhất',
  },
  {
    icon: Clock,
    title: 'Hỗ trợ 24/7',
    desc: 'Luôn sẵn sàng giải đáp mọi thắc mắc của bạn',
  },
  {
    icon: ShieldCheck,
    title: 'Bảo mật thông tin',
    desc: 'Cam kết bảo mật tuyệt đối thông tin cá nhân',
  },
];

const HeroPanel = () => {
  return (
    <aside className='relative hidden overflow-hidden bg-[#fffdfd] lg:block lg:w-[47%] lg:shrink-0 lg:px-12 xl:px-16'>
      {/* Decorative blobs */}
      <div className='pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#fdeef0] blur-3xl' />
      <div className='pointer-events-none absolute -right-16 -bottom-28 h-80 w-80 rounded-full bg-[#fdeef0] blur-3xl' />

      {/* Decorative building illustration */}
      <img
        src={images.truong_ptit_lineart}
        alt=''
        aria-hidden='true'
        className='pointer-events-none absolute -bottom-2 left-[-8%] w-[150%] max-w-none opacity-[0.22]'
      />

      <div className='relative z-10 flex mt-5 flex-col justify-center'>
        <Link to='/' className='inline-flex items-center gap-3'>
          <img
            src={images.Logo_PTIT_University}
            alt='PTIT'
            className='h-20.5 w-20.5 object-contain'
          />
        </Link>

        <h1 className='text-[27px] leading-snug font-bold text-gray-900 xl:text-[31px] mt-10'>
          Chào mừng bạn đến với
          <br />
          <span className='text-(--primary-color)'>PTIT Admission Chatbot</span>
        </h1>

        <div className='mt-4 h-0.5 w-18 bg-(--primary-color)' />

        <p className='mt-7 max-w-105 text-[14.5px] leading-relaxed text-(--text-secondary)'>
          Trợ lý tư vấn tuyển sinh thông minh của Học viện Công nghệ Bưu chính Viễn thông
        </p>

        <div className='mt-12 space-y-6'>
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className='flex items-start gap-3.5'>
              <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#f8e7e9] bg-white shadow-[0_3px_12px_rgba(102,28,37,0.08)]'>
                <Icon size={20} className='text-(--primary-color)' strokeWidth={1.8} />
              </div>
              <div>
                <h3 className='text-[14.5px] font-semibold text-gray-900'>{title}</h3>
                <p className='mt-1 text-[13px] leading-relaxed text-(--text-secondary)'>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default HeroPanel;
