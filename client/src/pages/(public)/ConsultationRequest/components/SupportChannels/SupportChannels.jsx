import { Globe, Mail, Phone } from 'lucide-react';
import { FacebookIcon } from '../../../../../assets/icons';

const channels = [
  {
    icon: Phone,
    label: 'Hotline tuyển sinh',
    value: '024 3773 1861',
  },
  { icon: Mail, label: 'Email', value: 'tuyensinh@ptit.edu.vn' },
  { icon: Globe, label: 'Website', value: 'https://ptit.edu.vn' },
];

const SupportChannels = () => (
  <section className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm'>
    <h2 className='mb-4 text-base font-bold text-gray-900'>Các kênh hỗ trợ khác</h2>
    <div className='space-y-4 text-xs'>
      {channels.map(({ icon: Icon, label, value }) => (
        <div key={label} className='flex items-start gap-3'>
          <div className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-50 text-[#c8102e]'>
            <Icon size={14} />
          </div>
          <div>
            <p className='font-semibold text-gray-800'>{label}</p>
            <p className='text-gray-900'>{value}</p>
          </div>
        </div>
      ))}
      <div className='flex items-start gap-3'>
        <div className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white'>
          <FacebookIcon size={14} aria-hidden='true' />
        </div>
        <div>
          <p className='font-semibold text-gray-800'>Facebook</p>
          <p className='font-medium text-gray-900'>fb.com/HocvienPTIT</p>
        </div>
      </div>
    </div>
  </section>
);

export default SupportChannels;
