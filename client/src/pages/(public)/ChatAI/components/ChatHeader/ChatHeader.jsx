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
      WAITING_FOR_STAFF: 'Đang chờ cán bộ tiếp nhận',
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
            {isStaff ? (
              <UserRound size={19} className='text-(--primary-color)' strokeWidth={1.8} />
            ) : (
              <Bot size={19} className='text-(--primary-color)' strokeWidth={1.8} />
            )}
          </div>

          <div className='min-w-0'>
            <p className='truncate text-[14px] font-semibold text-gray-900'>
              {isStaff ? 'Cán bộ tư vấn PTIT' : 'PTIT Admission Assistant'}
            </p>
            <p role='status' className='text-[12px] text-(--text-tertiary)'>
              {statusLabel}
            </p>
          </div>
        </div>

        <div className='flex shrink-0 items-center gap-2'>
          {(!status || status === 'BOT_HANDLING') && (
            <button
              type='button'
              onClick={onRequestAdvisor}
              disabled={disabled}
              className='flex items-center gap-1.5 rounded-(--radius-card) border border-red-200 bg-red-50 px-3 py-2 text-[12.5px] font-semibold text-(--primary-color) transition-colors hover:bg-red-100 disabled:opacity-40'
            >
              <Headset size={15} />
              <span className='hidden md:inline'>Gặp cán bộ tư vấn</span>
              <span className='md:hidden'>Tư vấn viên</span>
            </button>
          )}
          <button
            type='button'
            onClick={handleClearClick}
            disabled={disabled || !hasSession}
            className='flex items-center gap-1.5 rounded-(--radius-card) px-3 py-2 text-[12.5px] font-medium text-gray-500 transition-colors hover:text-(--primary-color) disabled:cursor-not-allowed disabled:opacity-40'
          >
            <Trash2 size={14} />
            <span className='hidden sm:inline'>Xóa đoạn chat</span>
          </button>

          <button
            type='button'
            onClick={onNewChat}
            disabled={disabled}
            className='flex items-center gap-1.5 rounded-(--radius-card) border border-(--border-subtle) px-3 py-2 text-[12.5px] font-medium text-gray-600 transition-colors hover:border-(--primary-color) hover:text-(--primary-color)'
          >
            <SquarePen size={14} />
            <span className='hidden sm:inline'>Trò chuyện mới</span>
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
