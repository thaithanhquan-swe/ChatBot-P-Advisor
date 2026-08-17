import { useState } from 'react';
import { Bot, Check, Menu, SquarePen, Trash2, X } from 'lucide-react';

const ChatHeader = ({ onOpenSidebar, onNewChat, onClearChat, hasMessages }) => {
  const [confirmingClear, setConfirmingClear] = useState(false);

  const handleClearClick = () => {
    if (!hasMessages) return;
    setConfirmingClear(true);
  };

  const handleConfirm = () => {
    onClearChat();
    setConfirmingClear(false);
  };

  return (
    <div className='flex items-center justify-between gap-3 border-b border-(--border-subtle) px-4 py-3 sm:px-6'>
      <div className='flex min-w-0 items-center gap-3'>
        <button
          type='button'
          onClick={onOpenSidebar}
          className='shrink-0 rounded-(--radius-card) p-2 text-gray-500 hover:bg-gray-50 lg:hidden'
          aria-label='Mở lịch sử hội thoại'
        >
          <Menu size={19} />
        </button>

        <div className='relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--primary-color-soft)'>
          <Bot size={19} className='text-(--primary-color)' strokeWidth={1.8} />
          <span className='absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500' />
        </div>

        <div className='min-w-0'>
          <p className='truncate text-[14px] font-semibold text-gray-900'>
            PTIT Admission Assistant
          </p>
          <p className='text-[12px] text-(--text-tertiary)'>Online · Sẵn sàng hỗ trợ</p>
        </div>
      </div>

      <div className='flex shrink-0 items-center gap-2'>
        {confirmingClear ? (
          <div className='flex animate-fade-in-up items-center gap-1.5 rounded-(--radius-card) bg-gray-50 py-1 pr-1 pl-2.5'>
            <span className='hidden text-[12px] font-medium text-gray-600 sm:inline'>Xoá đoạn chat?</span>
            <button
              type='button'
              onClick={handleConfirm}
              aria-label='Xác nhận xoá'
              className='flex h-7 w-7 items-center justify-center rounded-lg bg-(--primary-color) text-white'
            >
              <Check size={14} />
            </button>
            <button
              type='button'
              onClick={() => setConfirmingClear(false)}
              aria-label='Huỷ'
              className='flex h-7 w-7 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100'
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <button
            type='button'
            onClick={handleClearClick}
            disabled={!hasMessages}
            className='hidden items-center gap-1.5 rounded-(--radius-card) px-3 py-2 text-[12.5px] font-medium text-gray-500 transition-colors hover:text-(--primary-color) disabled:cursor-not-allowed disabled:opacity-40 sm:flex'
          >
            <Trash2 size={14} />
            Xoá đoạn chat
          </button>
        )}

        <button
          type='button'
          onClick={onNewChat}
          className='flex items-center gap-1.5 rounded-(--radius-card) border border-(--border-subtle) px-3 py-2 text-[12.5px] font-medium text-gray-600 transition-colors hover:border-(--primary-color) hover:text-(--primary-color)'
        >
          <SquarePen size={14} />
          <span className='hidden sm:inline'>Trò chuyện mới</span>
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
