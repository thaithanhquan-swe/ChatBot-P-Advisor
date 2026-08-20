import { FileText, Mail, User } from 'lucide-react';

const steps = [
  {
    icon: FileText,
    title: '1. Tiếp nhận yêu cầu',
    description: 'Hệ thống ghi nhận câu hỏi và thông tin của bạn.',
  },
  {
    icon: User,
    title: '2. Cán bộ tư vấn',
    description: 'Cán bộ tuyển sinh sẽ xem xét và phản hồi yêu cầu của bạn.',
  },
  {
    icon: Mail,
    title: '3. Liên hệ trong 24h',
    description: 'Chúng tôi sẽ liên hệ qua SĐT/Email mà bạn cung cấp.',
  },
];

const ConsultationProcess = () => (
  <section className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm'>
    <h2 className='mb-5 text-base font-bold text-gray-900'>Quy trình xử lý yêu cầu</h2>
    <div className='relative space-y-6 pl-2'>
      <div className='absolute left-5.25 top-3 h-[calc(100%-24px)] w-px border-l-2 border-dashed border-red-200' />
      {steps.map(({ icon: Icon, title, description }) => (
        <div key={title} className='relative flex items-start gap-3.5'>
          <div className='z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-50 text-[#c8102e]'>
            <Icon size={16} />
          </div>
          <div>
            <h3 className='text-sm font-bold text-gray-900'>{title}</h3>
            <p className='mt-0.5 text-xs leading-normal text-gray-500'>{description}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default ConsultationProcess;
