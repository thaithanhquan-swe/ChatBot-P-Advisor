import { ArrowRight } from 'lucide-react';
import { useSystemConfig } from '@/contexts/system-config-context';

const FooterAdmission = () => {
  const { config } = useSystemConfig();
  const admissionLinks = config?.admissionLinks ?? [];
  if (!admissionLinks.length) return null;
  return (
    <div>
      <h3 className='mb-4 text-[15px] font-bold uppercase'>Thông tin tuyển sinh</h3>

      <ul className='space-y-2.5'>
        {admissionLinks.map((item) => (
          <li key={`${item.url}-${item.displayOrder}`}>
            <a
              href={item.url}
              className='group flex items-center text-[13px] text-white/90 transition hover:text-white'
            >
              <ArrowRight
                size={11}
                className='mr-1 transition-transform group-hover:translate-x-1'
              />

              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterAdmission;
