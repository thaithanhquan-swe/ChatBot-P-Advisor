import { useEffect, useRef, useState } from 'react';
import { Bot, Check, Copy, Headset } from 'lucide-react';
import { API_BASE_URL } from '@/lib/http';

const WEB_URL_PATTERN = /(https?:\/\/[^\s)\]}>]+)/gi;
const SOURCE_LABEL_PATTERN = /(?:nguồn(?:\s+tham\s+khảo)?|source)\s*:/iu;

function attachmentUrl(path) {
  if (!path) return null;
  try {
    const url = new URL(path, new URL(API_BASE_URL || '/', window.location.origin));
    return ['http:', 'https:'].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

function MessageContent({ content }) {
  const sanitizedContent = (content || '')
    .split(/\r?\n/)
    .map((line) => {
      const sourceLabel = SOURCE_LABEL_PATTERN.exec(line);
      if (!sourceLabel) return line;

      const prefix = line
        .slice(0, sourceLabel.index)
        .replace(/[-\s*_(`>]+$/, '')
        .trim();
      const urls = (
        line.slice(sourceLabel.index + sourceLabel[0].length).match(WEB_URL_PATTERN) || []
      )
        .map((url) => url.replace(/[)\]}>.,;!*_]+$/, ''))
        .filter(Boolean);
      return [prefix, urls.length ? `Nguồn tham khảo: ${[...new Set(urls)].join(', ')}` : '']
        .filter(Boolean)
        .join('\n');
    })
    .filter((line) => line.trim())
    .join('\n');

  return sanitizedContent.split(WEB_URL_PATTERN).map((part, index) =>
    /^https?:\/\//i.test(part) ? (
      <a
        key={`${part}-${index}`}
        href={part}
        target='_blank'
        rel='noreferrer'
        className='underline underline-offset-2'
      >
        {part}
      </a>
    ) : (
      part
    )
  );
}

const MessageBubble = ({ message }) => {
  const [copied, setCopied] = useState(false);
  const revokeTimerRef = useRef(null);
  const isUser = ['USER', 'GUEST'].includes(message.sender);
  const isStaff = message.sender === 'STAFF';
  const date = message.createdAt ? new Date(message.createdAt) : null;
  const time =
    date && !Number.isNaN(date.getTime())
      ? date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      : '';
  const fileUrl = attachmentUrl(message.fileUrl);
  const imageUrl = message.previewUrl || fileUrl;

  useEffect(() => {
    const previewUrl = message.previewUrl;
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
  }, [message.previewUrl]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  if (message.messageType === 'SYSTEM') {
    return (
      <p className='whitespace-pre-wrap rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-center text-xs text-amber-800'>
        {message.content}
      </p>
    );
  }

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--primary-color-soft) text-(--primary-color)'>
          {isStaff ? <Headset size={16} /> : <Bot size={16} />}
        </div>
      )}
      <div className={`flex min-w-0 max-w-135 flex-col gap-2 ${isUser ? 'items-end' : ''}`}>
        <div
          className={`max-w-full rounded-(--radius-card) px-4 py-3 ${isUser ? 'bg-(--primary-color) text-white' : 'border border-(--border-subtle) bg-white text-gray-800'}`}
        >
          <p className='whitespace-pre-wrap wrap-anywhere text-[14.5px] leading-relaxed'>
            <MessageContent content={message.content} />
          </p>
          {imageUrl && message.fileType?.startsWith('image/') && (
            <a
              href={imageUrl}
              target={fileUrl ? '_blank' : undefined}
              rel='noreferrer'
              aria-label='Mở ảnh đính kèm'
              className='mt-2 block'
            >
              <img
                src={imageUrl}
                alt='Ảnh đính kèm'
                loading='lazy'
                className='max-h-72 max-w-full rounded-lg object-contain'
              />
            </a>
          )}
        </div>
        <div className='flex items-center gap-3 px-1 text-[11px] text-(--text-tertiary)'>
          {isStaff && <span>Cán bộ tư vấn</span>}
          {time && (
            <time dateTime={message.createdAt} title={date.toLocaleString('vi-VN')}>
              {time}
            </time>
          )}
          {message.pending && <span role='status'>Đang gửi...</span>}
          {message.failed && (
            <span role='alert' className='text-red-600'>
              Gửi thất bại
            </span>
          )}
          {!isUser && (
            <button
              type='button'
              onClick={handleCopy}
              className='flex items-center gap-1 hover:text-(--primary-color)'
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? 'Đã sao chép' : 'Sao chép'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
