import { useEffect, useRef } from 'react';

function DeleteChatModal({ open, deleting, onClose, onConfirm }) {
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    cancelButtonRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !deleting) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [deleting, onClose, open]);

  if (!open) return null;

  return (
    <div
      className='fixed inset-0 z-100 flex items-center justify-center bg-gray-950/45 p-4'
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !deleting) onClose();
      }}
    >
      <div
        role='dialog'
        aria-modal='true'
        aria-labelledby='delete-chat-title'
        aria-describedby='delete-chat-description'
        className='w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-xl'
      >
        <h2 id='delete-chat-title' className='text-lg font-semibold text-gray-900'>
          Xóa đoạn chat?
        </h2>
        <p id='delete-chat-description' className='mt-2 text-sm leading-6 text-gray-600'>
          Đoạn chat và toàn bộ tin nhắn bên trong sẽ bị xóa vĩnh viễn. Bạn không thể hoàn tác thao
          tác này.
        </p>

        <div className='mt-6 flex justify-end gap-3'>
          <button
            ref={cancelButtonRef}
            type='button'
            onClick={onClose}
            disabled={deleting}
            className='h-10 rounded-lg border border-gray-300 px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
          >
            Hủy
          </button>
          <button
            type='button'
            onClick={onConfirm}
            disabled={deleting}
            className='h-10 min-w-20 rounded-lg bg-(--primary-color) px-4 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60'
          >
            {deleting ? 'Đang xóa...' : 'Xóa'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteChatModal;
