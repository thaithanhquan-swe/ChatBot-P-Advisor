import { Phone, Mail, MapPin } from 'lucide-react';
import { useSystemConfig } from '@/contexts/system-config-context';

const FooterContact = () => {
  const { config } = useSystemConfig();
  if (!config) return null;
  const phoneHref = config.footerPhone.replace(/[^+\d]/g, '');
  return (
    <div>
      <h3 className='mb-4 text-[15px] font-bold uppercase'>Liên hệ</h3>

      <div className='space-y-3'>
        {/* Phone */}
        <a
          href={`tel:${phoneHref}`}
          className='flex items-start gap-3 text-[13px] text-white/90 transition hover:text-white'
        >
          <Phone size={16} className='mt-0.5 shrink-0' />

          <span>{config.footerPhone}</span>
        </a>

        {/* Email */}
        <a
          href={`mailto:${config.footerEmail}`}
          className='flex items-start gap-3 text-[13px] text-white/90 transition hover:text-white'
        >
          <Mail size={16} className='mt-0.5 shrink-0' />

          <span>{config.footerEmail}</span>
        </a>

        {/* Address */}
        <div className='flex items-start gap-3 text-[13px] leading-[1.6] text-white/90'>
          <MapPin size={17} className='mt-0.5 shrink-0' />

          <span>{config.footerAddress}</span>
        </div>
      </div>
    </div>
  );
};

export default FooterContact;
