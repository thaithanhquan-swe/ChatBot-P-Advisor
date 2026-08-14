import { Play } from 'lucide-react';
import { images } from '../../../../../../assets/images';
import { FacebookIcon, TikTokIcon } from '../../../../../../assets/icons';

const FooterAbout = () => {
  return (
    <div>
      {/* Logo */}
      <div className='mb-4'>
        <img
          src={images.logo_ptit}
          alt='Học viện Công nghệ Bưu chính Viễn thông'
          className='w-57.5 brightness-0 invert'
        />
      </div>

      {/* Description */}
      <p className='max-w-77.5 text-[13px] leading-[1.7] text-white/90'>
        Đơn vị sự nghiệp công lập trực thuộc Bộ Khoa học và Công nghệ, đào tạo nguồn nhân lực chất
        lượng cao trong lĩnh vực ICT, kinh tế số.
      </p>

      {/* Social */}
      <div className='mt-5 flex items-center gap-3'>
        {/* Facebook */}
        <a
          href='#'
          className='flex h-8 w-8 items-center justify-center rounded-full bg-white text-(--primary-color) transition hover:bg-white/80'
        >
          <FacebookIcon size={17} />
        </a>

        {/* Youtube */}
        <a
          href='#'
          className='flex h-8 w-8 items-center justify-center rounded-full bg-white text-(--primary-color) transition hover:bg-white/80'
        >
          <Play size={18} fill='currentColor' />
        </a>

        {/* TikTok */}
        <a
          href='#'
          className='flex h-8 w-8 items-center justify-center rounded-full bg-white text-(--primary-color) transition hover:bg-white/80'
        >
          <TikTokIcon size={17} />
        </a>

        {/* Zalo */}
        <a
          href='#'
          className='flex h-8 w-8 items-center justify-center rounded-full bg-white text-[10px] font-bold text-(--primary-color) transition hover:bg-white/80'
        >
          Zalo
        </a>
      </div>
    </div>
  );
};

export default FooterAbout;
