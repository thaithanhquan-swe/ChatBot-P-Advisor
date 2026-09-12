import { images } from '../../../../../../assets/images';
import { useSystemConfig } from '@/contexts/system-config-context';

const FooterAbout = () => {
  const { config } = useSystemConfig();
  if (!config) return null;
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
        {config.footerAboutDescription}
      </p>
    </div>
  );
};

export default FooterAbout;
