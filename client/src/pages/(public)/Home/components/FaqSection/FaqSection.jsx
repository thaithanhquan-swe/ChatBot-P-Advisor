import { Link } from 'react-router-dom';
import { popularQuestions } from '../../../../../data/data';
import {
  Award,
  Building2,
  CalendarClock,
  ChevronRight,
  ClipboardList,
  GraduationCap,
  MessageCircle,
  Wallet,
} from 'lucide-react';

const ICONS = {
  ClipboardList,
  Wallet,
  GraduationCap,
  CalendarClock,
  Award,
  Building2,
};

const FaqSection = () => {
  return (
    <section className='bg-(--surface-muted) py-16 lg:py-20'>
      <div className='container'>
        <div className='mx-auto max-w-140 text-center'>
          <div className='mx-auto flex h-11 w-11 items-center justify-center rounded-(--radius-card) bg-(--primary-color-soft)'>
            <MessageCircle size={20} className='text-(--primary-color)' />
          </div>
          <h2 className='mt-4 text-[24px] font-bold text-gray-900 sm:text-[28px]'>
            Câu hỏi phổ biến
          </h2>
          <p className='mt-2 text-[14.5px] text-(--text-secondary)'>
            Nhấn vào câu hỏi để nhận câu trả lời ngay từ Chatbot
          </p>
        </div>

        <div className='mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {popularQuestions.map(({ number, iconKey, question }) => {
            const Icon = ICONS[iconKey];
            return (
            <Link
              key={number}
              to='/chatai'
              state={{ prefill: question }}
              className='group flex items-start gap-4 rounded-(--radius-card) border border-(--border-subtle) bg-white p-5 shadow-(--shadow-card) transition-all hover:-translate-y-0.5 hover:border-(--primary-color-border) hover:shadow-(--shadow-card-hover)'
            >
              <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-(--primary-color-soft)'>
                <Icon size={20} className='text-(--primary-color)' strokeWidth={1.8} />
              </div>

              <div className='min-w-0 flex-1'>
                <span className='text-[12px] font-semibold text-gray-300'>{number}</span>
                <p className='mt-0.5 text-[14.5px] leading-snug font-semibold text-gray-800'>
                  {question}
                </p>
              </div>

              <ChevronRight
                size={18}
                className='mt-1 shrink-0 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:text-(--primary-color)'
              />
            </Link>
            );
          })}
        </div>

        <div className='mt-9 text-center'>
          <Link
            to='/chatai'
            className='inline-flex items-center gap-2 rounded-xl border border-(--primary-color) px-6 py-3 text-[13.5px] font-semibold text-(--primary-color) transition-colors hover:bg-(--primary-color-soft)'
          >
            Xem tất cả câu hỏi thường gặp
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
