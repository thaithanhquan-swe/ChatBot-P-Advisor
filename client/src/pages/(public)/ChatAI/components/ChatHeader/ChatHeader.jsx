import { useState } from 'react';
import { Bot, Headset, Menu, SquarePen, Trash2, UserRound } from 'lucide-react';
import DeleteChatModal from '../DeleteChatModal/DeleteChatModal';

const ChatHeader = ({
  onOpenSidebar,
  onNewChat,
  onClearChat,
  hasSession,
  status,
  onRequestAdvisor,
  disabled,
}) => {
  const [confirmingClear, setConfirmingClear] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const isStaff = status === 'STAFF_HANDLING';
  const statusLabel =
    {
      BOT_HANDLING: 'Đang trò chuyện với trợ lý AI',
      WAITING_FOR_STAFF: 'Đang chờ cán bộ · Chatbot vẫn hỗ trợ',
      STAFF_HANDLING: 'Đang tư vấn trực tiếp',
    }[status] || 'Bắt đầu cuộc trò chuyện mới';

  const handleClearClick = () => {
    if (!hasSession || disabled) return;
    setConfirmingClear(true);
  };

  const handleConfirm = async () => {
    setDeleting(true);
    try {
      if (await onClearChat()) setConfirmingClear(false);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div className='flex items-center justify-between gap-2 border-b border-(--border-subtle) px-3 py-2.5 md:gap-3 md:px-6 md:py-3'>
        <div className='flex min-w-0 items-center gap-2 sm:gap-3'>
          <button
            type='button'
            onClick={onOpenSidebar}
            className='shrink-0 rounded-(--radius-card) p-2 text-gray-500 hover:bg-gray-50 lg:hidden'
            aria-label='Mở lịch sử hội thoại'
          >
            <Menu size={19} />
          </button>

          <div className='relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--primary-color-soft)'>
            {isStaff ? (
              <UserRound size={19} className='text-(--primary-color)' strokeWidth={1.8} />
            ) : (
              <Bot size={19} className='text-(--primary-color)' strokeWidth={1.8} />
            )}
          </div>

          <div className='hidden min-w-0 md:block'>
            <p className='truncate text-[14px] font-semibold text-gray-900'>
              {isStaff ? 'Cán bộ tư vấn PTIT' : 'PTIT Admission Assistant'}
            </p>
            <p role='status' className='truncate text-[11px] text-(--text-tertiary) sm:text-[12px]'>
              {statusLabel}
            </p>
          </div>
        </div>

        <div className='flex shrink-0 items-center gap-1 md:gap-2'>
          {(!status || status === 'BOT_HANDLING') && (
            <button
              type='button'
              onClick={onRequestAdvisor}
              disabled={disabled}
              className='flex h-10 w-10 items-center justify-center rounded-full border border-red-200 bg-red-50 text-(--primary-color) transition-colors hover:bg-red-100 disabled:opacity-40 min-[430px]:w-auto min-[430px]:gap-1.5 min-[430px]:rounded-(--radius-card) min-[430px]:px-3 min-[430px]:text-[12.5px] min-[430px]:font-semibold md:h-auto md:py-2'
              aria-label='Gặp cán bộ tư vấn'
            >
              <Headset size={15} />
              <span className='hidden min-[430px]:inline md:hidden'>Gặp cán bộ tuyển sinh</span>
              <span className='hidden md:inline'>Gặp cán bộ tư vấn</span>
            </button>
          )}
          <button
            type='button'
            onClick={handleClearClick}
            disabled={disabled || !hasSession}
            className='flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-50 hover:text-(--primary-color) disabled:cursor-not-allowed disabled:opacity-40 md:h-auto md:w-auto md:gap-1.5 md:rounded-(--radius-card) md:px-3 md:py-2 md:text-[12.5px] md:font-medium'
            aria-label='Xóa đoạn chat'
          >
            <Trash2 size={14} />
            <span className='hidden md:inline'>Xóa đoạn chat</span>
          </button>

          <button
            type='button'
            onClick={onNewChat}
            disabled={disabled}
            className='flex h-10 w-10 items-center justify-center rounded-full border border-(--border-subtle) text-gray-600 transition-colors hover:border-(--primary-color) hover:text-(--primary-color) md:h-auto md:w-auto md:gap-1.5 md:rounded-(--radius-card) md:px-3 md:py-2 md:text-[12.5px] md:font-medium'
            aria-label='Trò chuyện mới'
          >
            <SquarePen size={14} />
            <span className='hidden md:inline'>Trò chuyện mới</span>
          </button>
        </div>
      </div>
      <DeleteChatModal
        open={confirmingClear}
        deleting={deleting}
        onClose={() => setConfirmingClear(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default ChatHeader;
