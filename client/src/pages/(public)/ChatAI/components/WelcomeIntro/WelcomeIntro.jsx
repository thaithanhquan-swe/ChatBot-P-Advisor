import {
  Award,
  BookOpenCheck,
  Bot,
  CalendarClock,
  ClipboardList,
  GraduationCap,
  Sparkles,
  Wallet,
} from 'lucide-react';
import { capabilities, suggestedQuestions } from '@/data/data';

// data.js chỉ lưu "iconKey" (chữ), icon thật (component) nằm ở đây —
// nơi thực sự vẽ nó ra màn hình.
const ICONS = {
  BookOpenCheck,
  ClipboardList,
  GraduationCap,
  Award,
  Wallet,
  CalendarClock,
};

const WelcomeIntro = ({ onPickQuestion }) => {
  return (
    <div className='mx-auto flex h-full max-w-140 animate-fade-in-up flex-col items-center justify-center px-4 py-6 text-center sm:px-6'>
      <div className='mb-3 flex h-11 w-11 items-center justify-center rounded-(--radius-panel) bg-(--primary-color-soft)'>
        <Bot size={20} className='text-(--primary-color)' strokeWidth={1.8} />
      </div>

      <h1 className='text-[19px] font-bold text-gray-900 sm:text-[21px]'>
        Xin chào! Tôi là trợ lý tư vấn tuyển sinh PTIT.
      </h1>
      <p className='mt-1.5 max-w-110 text-[13px] leading-relaxed text-(--text-secondary)'>
        Mình có thể giúp bạn tìm hiểu về tuyển sinh, ngành học, điểm chuẩn, học phí và hơn thế nữa.
      </p>

      <div className='mt-4 flex w-full max-w-115 flex-wrap justify-center gap-1.5'>
        {capabilities.map(({ iconKey, label }) => {
          const Icon = ICONS[iconKey];
          return (
            <div
              key={label}
              className='flex items-center gap-1 rounded-(--radius-pill) border border-(--border-subtle) bg-white px-2.5 py-1 text-[11.5px] font-medium text-gray-600'
            >
              <Icon size={12} className='text-(--primary-color)' />
              {label}
            </div>
          );
        })}
      </div>

      <div className='mt-5 flex items-center gap-1.5 text-[11.5px] font-medium text-(--text-tertiary)'>
        <Sparkles size={12} />
        Thử một trong các câu hỏi gợi ý
      </div>

      <div className='mt-3 grid w-full max-w-115 grid-cols-1 gap-2 sm:grid-cols-2'>
        {suggestedQuestions.map((q) => (
          <button
            key={q}
            type='button'
            onClick={() => onPickQuestion(q)}
            className='w-full rounded-xl border border-(--border-subtle) bg-white px-3.5 py-2.5 text-left text-[13px] font-medium text-gray-700 shadow-(--shadow-card) transition-all hover:border-(--primary-color) hover:text-(--primary-color) hover:shadow-(--shadow-card-hover)'
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WelcomeIntro;
