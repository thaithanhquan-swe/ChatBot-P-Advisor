import { Bot } from 'lucide-react';

const TypingIndicator = () => (
  <div className='flex animate-fade-in-up items-start gap-3'>
    <div className='mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--primary-color-soft)'>
      <Bot size={16} className='text-(--primary-color)' strokeWidth={2} />
    </div>
    <div className='flex items-center gap-1.5 rounded-(--radius-card) rounded-tl-sm border border-(--border-subtle) bg-white px-4 py-3.5 shadow-(--shadow-card)'>
      <span className='h-1.5 w-1.5 animate-bounce rounded-full bg-gray-300 [animation-delay:-0.3s]' />
      <span className='h-1.5 w-1.5 animate-bounce rounded-full bg-gray-300 [animation-delay:-0.15s]' />
      <span className='h-1.5 w-1.5 animate-bounce rounded-full bg-gray-300' />
    </div>
  </div>
);

export default TypingIndicator;
