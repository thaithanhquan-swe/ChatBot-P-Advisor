import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  Bot,
  FileText,
  Info,
  MessageSquareText,
  MoreHorizontal,
  Paperclip,
  Send,
  UserRound,
  X,
} from 'lucide-react';
import { API_BASE_URL } from '@/lib/http';
import { STATUS_META } from '../../constants/inbox';

const MAX_FILE_SIZE = 20 * 1024 * 1024;

function SelectedAttachment({ file, disabled, onRemove }) {
  const [previewUrl] = useState(() =>
    file.type.startsWith('image/') ? window.URL.createObjectURL(file) : null
  );
  const revokeTimerRef = useRef(null);

  useEffect(() => {
    if (revokeTimerRef.current !== null) {
      window.clearTimeout(revokeTimerRef.current);
      revokeTimerRef.current = null;
    }

    return () => {
      if (previewUrl) {
        revokeTimerRef.current = window.setTimeout(() => {
          window.URL.revokeObjectURL(previewUrl);
        }, 0);
      }
    };
  }, [previewUrl]);

  if (previewUrl) {
    return (
      <div className='relative mb-2 w-fit max-w-full'>
        <img
          src={previewUrl}
          alt='Ảnh chuẩn bị gửi'
          className='h-44 w-64 max-w-full rounded-lg border border-slate-200 bg-slate-50 object-contain'
        />
        <button
          type='button'
          onClick={onRemove}
          disabled={disabled}
          aria-label='Bỏ ảnh đính kèm'
          className='absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900/80 text-white shadow-sm hover:bg-slate-900 disabled:opacity-50'
        >
          <X size={15} />
        </button>
      </div>
    );
  }

  return (
    <div className='relative mb-2 w-fit max-w-full rounded-lg border border-slate-200 bg-slate-50 p-2 pr-9'>
      <div className='flex max-w-72 items-center gap-2 text-xs text-slate-600'>
        <FileText size={18} className='shrink-0 text-slate-400' />
        <span className='truncate'>{file.name}</span>
      </div>
      <button
        type='button'
        onClick={onRemove}
        disabled={disabled}
        aria-label='Bỏ tệp đính kèm'
        className='absolute right-1.5 top-1.5 rounded-full p-1 text-slate-500 hover:bg-slate-200 disabled:opacity-50'
      >
        <X size={14} />
      </button>
    </div>
  );
}

function getAttachmentUrl(path) {
  if (!path) return null;
  try {
    const url = new URL(path, new URL(API_BASE_URL || '/', window.location.origin));
    return ['http:', 'https:'].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

function ConversationPanel({
  conversation,
  message,
  file,
  loadingMessages,
  action,
  onMessageChange,
  onFileChange,
  onSend,
  onAssign,
  onEndConsultation,
  onToggleDetails,
}) {
  const fileInputRef = useRef(null);
  const [fileError, setFileError] = useState('');

  return (
    <section className='flex min-h-0 min-w-0 flex-col bg-white'>
      <header className='flex h-[76px] shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6'>
        <div className='flex min-w-0 items-center gap-3'>
          <button type='button' className='text-slate-400 lg:hidden'>
            <ArrowLeft size={20} />
          </button>
          <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-sm font-bold text-[#D71920] ring-1 ring-red-100'>
            {conversation.initials}
          </div>
          <div className='min-w-0'>
            <p className='truncate text-[15px] font-semibold text-slate-900'>{conversation.name}</p>
            <div className='mt-1 flex items-center gap-2'>
              <span
                className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset ${STATUS_META[conversation.status].className}`}
              >
                {STATUS_META[conversation.status].label}
              </span>
              <span className='text-[11px] text-slate-400'>{conversation.topic}</span>
            </div>
          </div>
        </div>
        <div className='flex items-center gap-1'>
          {conversation.status === 'active' && (
            <button
              type='button'
              onClick={onEndConsultation}
              disabled={Boolean(action)}
              title='Chuyển cuộc trò chuyện lại cho chatbot'
              className='mr-1 flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-2 text-xs font-semibold text-slate-600 hover:border-red-200 hover:bg-red-50 hover:text-[#D71920] disabled:cursor-wait disabled:opacity-60'
            >
              <Bot size={16} />
              <span className='hidden sm:inline'>
                {action === 'close' ? 'Đang chuyển...' : 'Trả lại cho chatbot'}
              </span>
            </button>
          )}
          <button
            type='button'
            onClick={onToggleDetails}
            title='Thông tin người dùng'
            aria-label='Ẩn hoặc hiện thông tin người dùng'
            className='rounded-lg p-2 text-slate-500 hover:bg-slate-100'
          >
            <Info size={19} />
          </button>
          <button
            type='button'
            title='Tùy chọn'
            className='rounded-lg p-2 text-slate-500 hover:bg-slate-100'
          >
            <MoreHorizontal size={20} />
          </button>
        </div>
      </header>
      <div className='min-h-0 flex-1 space-y-5 overflow-y-auto bg-[#F8F9FB] p-5 sm:px-7 sm:py-6 xl:px-10'>
        <div className='flex justify-center'>
          <span className='rounded-full bg-white px-3 py-1 text-[11px] font-medium text-slate-400 ring-1 ring-slate-200'>
            Hôm nay
          </span>
        </div>
        {loadingMessages && conversation.messages.length === 0 && (
          <p className='py-12 text-center text-sm text-slate-400'>
            Đang tải nội dung trò chuyện...
          </p>
        )}
        {!loadingMessages && conversation.messages.length === 0 && (
          <p className='py-12 text-center text-sm text-slate-400'>
            Cuộc trò chuyện chưa có tin nhắn.
          </p>
        )}
        {conversation.messages.map((item) => {
          const attachmentUrl = getAttachmentUrl(item.fileUrl);
          return item.sender === 'system' ? (
            <div
              key={item.id}
              className='mx-auto flex max-w-lg items-center justify-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-center text-xs text-amber-800'
            >
              <MessageSquareText size={15} />
              <span>{item.text}</span>
              <span className='text-amber-600'>{item.time}</span>
            </div>
          ) : (
            <div
              key={item.id}
              className={`flex gap-2.5 ${item.sender === 'advisor' ? 'justify-end' : 'justify-start'}`}
            >
              {item.sender !== 'advisor' && (
                <div
                  className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${item.sender === 'bot' ? 'bg-slate-200 text-slate-500' : 'bg-white text-slate-500 ring-1 ring-slate-200'}`}
                >
                  {item.sender === 'bot' ? <Bot size={15} /> : <UserRound size={15} />}
                </div>
              )}
              <div className={`max-w-[74%] ${item.sender === 'advisor' ? 'text-right' : ''}`}>
                <div
                  className={`inline-block rounded-2xl px-4 py-3 text-left text-[14px] leading-6 shadow-sm ${item.sender === 'advisor' ? 'rounded-br-md bg-[#0A7CFF] text-white' : item.sender === 'bot' ? 'rounded-bl-md border border-slate-200 bg-white text-slate-600' : 'rounded-bl-md bg-[#E9EBEE] text-slate-900'}`}
                >
                  {item.text && <p className='whitespace-pre-wrap'>{item.text}</p>}
                  {attachmentUrl && item.fileType?.startsWith('image/') && (
                    <a href={attachmentUrl} target='_blank' rel='noreferrer' className='mt-2 block'>
                      <img
                        src={attachmentUrl}
                        alt={item.fileName || 'Ảnh đính kèm'}
                        loading='lazy'
                        className='max-h-64 max-w-full rounded-lg object-contain'
                      />
                    </a>
                  )}
                  {attachmentUrl && !item.fileType?.startsWith('image/') && (
                    <a
                      href={attachmentUrl}
                      target='_blank'
                      rel='noreferrer'
                      className={`mt-1 block text-xs font-medium underline ${item.sender === 'advisor' ? 'text-white' : 'text-blue-700'}`}
                    >
                      {item.fileName || 'Xem tệp đính kèm'}
                    </a>
                  )}
                </div>
                <p className='mt-1.5 px-1 text-[10px] text-slate-400'>
                  {item.sender === 'advisor' ? 'Bạn · ' : item.sender === 'bot' ? 'Chatbot · ' : ''}
                  {item.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <form
        onSubmit={onSend}
        className='shrink-0 border-t border-slate-200 bg-white px-4 py-2.5 sm:px-5'
      >
        <div className='mb-2 flex items-center justify-between gap-3'>
          <p className='min-w-0 truncate text-xs text-slate-500'>
            Trả lời <span className='font-semibold text-slate-700'>{conversation.name}</span>
          </p>
          {conversation.status === 'active' && (
            <span className='flex shrink-0 items-center gap-1.5 text-[11px] font-medium text-emerald-600'>
              <span className='h-1.5 w-1.5 rounded-full bg-emerald-500' /> Đang kết nối
            </span>
          )}
        </div>
        {conversation.status === 'waiting' || conversation.status === 'bot' ? (
          <div className='flex items-center justify-between gap-3 rounded-lg bg-amber-50 px-4 py-3'>
            <p className='text-sm text-amber-800'>
              {conversation.status === 'bot'
                ? 'Bắt đầu tư vấn để thay chatbot trả lời người dùng.'
                : 'Nhận phiên này trước khi trả lời người dùng.'}
            </p>
            <button
              type='button'
              onClick={onAssign}
              disabled={Boolean(action)}
              className='rounded-md bg-[#D71920] px-3 py-2 text-sm font-semibold text-white hover:bg-[#b9151b] disabled:cursor-wait disabled:opacity-60'
            >
              {action === 'assign'
                ? 'Đang nhận...'
                : conversation.status === 'bot'
                  ? 'Bắt đầu tư vấn'
                  : 'Nhận tư vấn'}
            </button>
          </div>
        ) : conversation.status !== 'active' ? (
          <div className='rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-600'>
            {conversation.status === 'bot'
              ? 'Phiên này đang được chatbot tự động xử lý. Bạn có thể theo dõi nội dung phía trên.'
              : 'Phiên này đang do cán bộ khác phụ trách. Bạn có thể theo dõi nội dung phía trên.'}
          </div>
        ) : (
          <>
            <input
              ref={fileInputRef}
              type='file'
              className='hidden'
              disabled={Boolean(action)}
              aria-label='Chọn tệp đính kèm'
              onChange={(event) => {
                const selectedFile = event.target.files?.[0];
                event.target.value = '';
                if (!selectedFile) return;
                if (selectedFile.size > MAX_FILE_SIZE) {
                  setFileError('Tệp đính kèm không được vượt quá 20 MB.');
                  return;
                }
                setFileError('');
                onFileChange(selectedFile);
              }}
            />
            {fileError && (
              <p role='alert' className='mb-2 text-xs text-red-600'>
                {fileError}
              </p>
            )}
            {file && (
              <SelectedAttachment
                key={`${file.name}-${file.size}-${file.lastModified}`}
                file={file}
                disabled={Boolean(action)}
                onRemove={() => onFileChange(null)}
              />
            )}
            <div className='flex items-end gap-2 rounded-lg border border-slate-300 bg-white p-1.5 focus-within:border-[#0A7CFF] focus-within:ring-2 focus-within:ring-blue-100'>
              <button
                type='button'
                onClick={() => fileInputRef.current?.click()}
                disabled={Boolean(action)}
                title='Đính kèm file hoặc ảnh'
                aria-label='Đính kèm file hoặc ảnh'
                className='flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 disabled:opacity-50'
              >
                <Paperclip size={16} />
              </button>
              <textarea
                value={message}
                onChange={(event) => onMessageChange(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
                    event.preventDefault();
                    onSend(event);
                  }
                }}
                rows={1}
                placeholder={`Nhập tin nhắn cho ${conversation.name}...`}
                aria-label={`Nhập tin nhắn cho ${conversation.name}`}
                className='max-h-28 min-h-8 min-w-0 flex-1 resize-none px-2 py-1.5 text-[13px] leading-5 outline-none placeholder:text-slate-400'
              />
              <button
                type='submit'
                disabled={(!message.trim() && !file) || Boolean(action)}
                aria-label='Gửi tin nhắn'
                className='flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-md bg-[#0A7CFF] px-3 text-xs font-semibold text-white transition hover:bg-[#086edc] disabled:cursor-not-allowed disabled:bg-slate-200'
              >
                <Send size={14} />
                <span className='hidden sm:inline'>
                  {action === 'send' ? 'Đang gửi...' : 'Gửi'}
                </span>
              </button>
            </div>
            <div className='mt-1.5'>
              <p className='text-[11px] text-slate-400'>
                Enter để gửi · Shift + Enter để xuống dòng
              </p>
            </div>
          </>
        )}
      </form>
    </section>
  );
}

export default ConversationPanel;
