import { useEffect, useRef, useState } from 'react';
import { Paperclip, SendHorizontal, X } from 'lucide-react';

const SelectedImagePreview = ({ file }) => {
  const [previewUrl] = useState(() => window.URL.createObjectURL(file));
  const revokeTimerRef = useRef(null);

  useEffect(() => {
    if (revokeTimerRef.current !== null) {
      window.clearTimeout(revokeTimerRef.current);
      revokeTimerRef.current = null;
    }

    return () => {
      revokeTimerRef.current = window.setTimeout(() => {
        window.URL.revokeObjectURL(previewUrl);
      }, 0);
    };
  }, [previewUrl]);

  return (
    <img
      src={previewUrl}
      alt='Ảnh chuẩn bị gửi'
      className='h-44 w-64 max-w-full rounded-lg border border-(--border-subtle) bg-gray-50 object-contain'
    />
  );
};

const ChatInput = ({
  value,
  onChange,
  onSubmit,
  disabled,
  file,
  onFileChange,
  placeholder = 'Nhập câu hỏi về tuyển sinh PTIT...',
}) => {
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const [fileError, setFileError] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      if (!disabled && value.trim()) onSubmit();
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
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        className='hidden'
        aria-label='Chọn ảnh đính kèm'
        disabled={disabled}
        onChange={(event) => {
          const selected = event.target.files?.[0];
          event.target.value = '';
          if (!selected) return;
          if (!selected.type.startsWith('image/')) {
            setFileError('Vui lòng chọn tệp hình ảnh.');
            return;
          }
          setFileError('');
          onFileChange(selected);
        }}
      />
      {fileError && (
        <p role='alert' className='mx-auto mb-2 max-w-160 text-xs text-red-700'>
          {fileError}
        </p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!disabled && value.trim()) onSubmit();
        }}
        className='mx-auto max-w-160 rounded-3xl border border-(--border-subtle) bg-white px-3 py-2 shadow-(--shadow-card) transition-colors focus-within:border-(--primary-color) sm:px-4'
      >
        {file && (
          <div className='relative mb-2 ml-10 w-fit max-w-[calc(100%-2.5rem)]'>
            <SelectedImagePreview
              key={`${file.name}-${file.size}-${file.lastModified}`}
              file={file}
            />
            <button
              type='button'
              onClick={() => onFileChange(null)}
              disabled={disabled}
              aria-label='Bỏ ảnh đính kèm'
              className='absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-gray-900/80 text-white shadow-sm transition-colors hover:bg-gray-900 disabled:opacity-40'
            >
              <X size={15} />
            </button>
          </div>
        )}
        <div className='flex items-end gap-1.5'>
          <button
            type='button'
            aria-label='Đính kèm ảnh'
            disabled={disabled}
            onClick={() => fileInputRef.current?.click()}
            className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-50 hover:text-(--primary-color) disabled:opacity-40'
          >
            <Paperclip size={17} />
          </button>

          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            disabled={disabled}
            aria-label='Nội dung tin nhắn'
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className='max-h-28 flex-1 resize-none bg-transparent py-2 text-[14.5px] leading-relaxed text-gray-800 placeholder:text-(--text-tertiary) focus:outline-none'
          />

          <button
            type='submit'
            disabled={disabled || !value.trim()}
            aria-label='Gửi câu hỏi'
            className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--primary-color) text-white transition-all enabled:hover:shadow-(--shadow-card-hover) disabled:cursor-not-allowed disabled:opacity-40'
          >
            <SendHorizontal size={17} strokeWidth={2.2} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
