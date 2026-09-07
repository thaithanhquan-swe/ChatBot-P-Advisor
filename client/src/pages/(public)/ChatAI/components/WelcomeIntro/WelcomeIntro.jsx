import { Bot } from 'lucide-react';

const WelcomeIntro = () => (
  <div className='mx-auto flex max-w-140 flex-col items-center px-4 py-12 text-center sm:px-6'>
    <Bot size={24} className='mb-3 text-(--primary-color)' />
    <h1 className='text-[19px] font-bold text-gray-900 sm:text-[21px]'>
      Trợ lý tư vấn tuyển sinh PTIT
    </h1>
    <p className='mt-2 text-sm leading-relaxed text-(--text-secondary)'>
      Nhập câu hỏi để bắt đầu cuộc trò chuyện.
    </p>
  </div>
);

export default WelcomeIntro;
