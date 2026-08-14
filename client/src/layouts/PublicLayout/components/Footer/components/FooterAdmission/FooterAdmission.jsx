import { ArrowRight } from 'lucide-react';

const admissionLinks = [
  'Tuyển sinh đại học 2025',
  'Phương thức tuyển sinh',
  'Ngành đào tạo',
  'Học phí - Học bổng',
  'Quy chế tuyển sinh',
  'Hướng dẫn đăng ký',
];

const FooterAdmission = () => {
  return (
    <div>
      <h3 className='mb-4 text-[15px] font-bold uppercase'>Thông tin tuyển sinh</h3>

      <ul className='space-y-2.5'>
        {admissionLinks.map((item) => (
          <li key={item}>
            <a
              href='#'
              className='group flex items-center text-[13px] text-white/90 transition hover:text-white'
            >
              <ArrowRight
                size={11}
                className='mr-1 transition-transform group-hover:translate-x-1'
              />

              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterAdmission;
