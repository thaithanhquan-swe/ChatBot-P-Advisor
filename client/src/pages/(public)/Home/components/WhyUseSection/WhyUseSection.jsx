import { HeartHandshakeIcon, ShieldCheckIcon, UsersIcon, ZapIcon } from '@/assets/icons';

const reasons = [
  {
    icon: ZapIcon,
    title: 'Trả lời nhanh chóng',
    desc: 'Chatbot hoạt động 24/7, trả lời tức thì mọi thắc mắc của bạn.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Thông tin chính xác',
    desc: 'Nguồn thông tin được cập nhật từ Học viện Công nghệ Bưu chính Viễn thông.',
  },
  {
    icon: UsersIcon,
    title: 'Dành cho tất cả',
    desc: 'Hỗ trợ thí sinh, phụ huynh và mọi người quan tâm đến tuyển sinh PTIT.',
  },
  {
    icon: HeartHandshakeIcon,
    title: 'Tư vấn tận tâm',
    desc: 'Chatbot đồng hành, giải đáp và hướng dẫn bạn trong suốt quá trình tìm hiểu.',
  },
];

const WhyUseSection = () => {
  return (
    <section className='py-16 lg:py-20'>
      <div className='container'>
        <div className='rounded-(--radius-panel) border border-(--border-subtle) bg-white p-8 shadow-(--shadow-card) lg:p-12'>
          <h2 className='text-center text-[22px] font-bold text-gray-900 sm:text-[24px]'>
            Vì sao nên sử dụng Chatbot tư vấn tuyển sinh PTIT?
          </h2>

          <div className='mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
            {reasons.map(({ icon: Icon, title, desc }) => (
              <div key={title} className='flex items-start gap-3.5'>
                <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--primary-color-soft)'>
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
      </div>
    </section>
  );
};

export default WhyUseSection;
