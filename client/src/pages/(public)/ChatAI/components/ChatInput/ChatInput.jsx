import { useRef } from 'react';
import { Paperclip, SendHorizontal } from 'lucide-react';

const ChatInput = ({ value, onChange, onSubmit, disabled }) => {
  const textareaRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  const handleChange = (e) => {
    onChange(e.target.value);
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${Math.min(el.scrollHeight, 112)}px`;
    }
  };

  return (
    <div className='border-t border-(--border-subtle) bg-white/95 px-4 py-3 backdrop-blur sm:px-6 sm:py-4'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className='mx-auto flex max-w-160 items-end gap-1.5 rounded-(--radius-pill) border border-(--border-subtle) bg-white px-3 py-2 shadow-(--shadow-card) transition-colors focus-within:border-(--primary-color) sm:px-4'
      >
        <button
          type='button'
          aria-label='Đính kèm / trợ giúp'
          className='hidden h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-50 hover:text-(--primary-color) sm:flex'
        >
          <Paperclip size={17} />
        </button>

        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder='Nhập câu hỏi về tuyển sinh PTIT...'
          className='max-h-28 flex-1 resize-none bg-transparent py-2 text-[14.5px] leading-relaxed text-gray-800 placeholder:text-(--text-tertiary) focus:outline-none'
        />

        <button
          type='submit'
          disabled={disabled}
          aria-label='Gửi câu hỏi'
          className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--primary-color) text-white transition-all enabled:hover:shadow-(--shadow-card-hover) disabled:cursor-not-allowed disabled:opacity-40'
        >
          <SendHorizontal size={17} strokeWidth={2.2} />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
