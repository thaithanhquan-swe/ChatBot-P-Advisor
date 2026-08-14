import { Phone, Mail, MapPin } from 'lucide-react';

const FooterContact = () => {
  return (
    <div>
      <h3 className='mb-4 text-[15px] font-bold uppercase'>Liên hệ</h3>

      <div className='space-y-3'>
        {/* Phone */}
        <a
          href='tel:02437562468'
          className='flex items-start gap-3 text-[13px] text-white/90 transition hover:text-white'
        >
          <Phone size={16} className='mt-0.5 shrink-0' />

          <span>(024) 3756 2468</span>
        </a>

        {/* Email */}
        <a
          href='mailto:tuyensinh@ptit.edu.vn'
          className='flex items-start gap-3 text-[13px] text-white/90 transition hover:text-white'
        >
          <Mail size={16} className='mt-0.5 shrink-0' />

          <span>tuyensinh@ptit.edu.vn</span>
        </a>

        {/* Address */}
        <div className='flex items-start gap-3 text-[13px] leading-[1.6] text-white/90'>
          <MapPin size={17} className='mt-0.5 shrink-0' />

          <span>11 Đường Nguyễn Đình Chiểu, Sài Gòn, Hồ Chí Minh, Việt Nam</span>
        </div>
      </div>
    </div>
  );
};

export default FooterContact;
