import { useState } from 'react';
import { AlertCircle, Bot, Check, Copy, ExternalLink, Headset } from 'lucide-react';
import AnswerBlock from './AnswerBlock';

const MessageBubble = ({ message, onFollowUp }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  if (message.role === 'system') {
    return (
      <div className='flex animate-fade-in-up justify-center'>
        <div className='flex items-center gap-2 rounded-(--radius-card) border border-amber-200 bg-amber-50 px-3.5 py-2 text-center text-[12px] font-medium text-amber-800'>
          <Headset size={15} />
          <span>{message.content}</span>
          {message.time && <span className='text-amber-600'>{message.time}</span>}
        </div>
      </div>
    );
  }

  const handleCopy = async () => {
    const plainText = message.blocks
      ? message.blocks.map((b) => b.content ?? b.label ?? b.items?.join(', ') ?? '').join('\n')
      : message.content;
    try {
      await navigator.clipboard.writeText(plainText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable — fail silently, non-critical action.
    }
  };

  if (isUser) {
    return (
      <div className='flex animate-fade-in-up flex-col items-end gap-1'>
        <div className='max-w-115 rounded-(--radius-card) rounded-tr-sm bg-(--primary-color) px-4 py-2.5 text-[14.5px] leading-relaxed text-white'>
          {message.content}
        </div>
        {message.time && (
          <span className='px-1 text-[11px] text-(--text-tertiary)'>{message.time}</span>
        )}
      </div>
    );
  }

  return (
    <div className='flex animate-fade-in-up items-start gap-3'>
      <div className='mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-(--primary-color-soft)'>
        {message.role === 'advisor' ? <Headset size={16} className='text-(--primary-color)' strokeWidth={2} /> : <Bot size={16} className='text-(--primary-color)' strokeWidth={2} />}
      </div>

      <div className='flex max-w-135 flex-col gap-2'>
        <div
          className={`flex flex-col gap-3 rounded-(--radius-card) rounded-tl-sm border bg-white px-4 py-3 shadow-(--shadow-card) ${
            message.isFallback ? 'border-dashed border-gray-200' : 'border-(--border-subtle)'
          }`}
        >
          {message.isFallback && (
            <div className='flex items-center gap-1.5 text-[12px] font-medium text-(--text-tertiary)'>
              <AlertCircle size={13} />
              Chưa tìm thấy câu trả lời chính xác
            </div>
          )}
          {message.role === 'advisor' ? <p className='text-[14.5px] leading-relaxed text-gray-800'>{message.content}</p> : message.blocks.map((block, i) => (
              <AnswerBlock key={i} block={block} />
            ))}
        </div>

        <div className='flex items-center gap-3 px-1'>
          {message.time && (
            <span className='text-[11px] text-(--text-tertiary)'>{message.role === 'advisor' ? `${message.advisorName || 'Cán bộ tư vấn'} · ` : ''}{message.time}</span>
          )}
          {message.role !== 'advisor' && <button
            type='button'
            onClick={handleCopy}
            className='flex items-center gap-1 text-[12px] font-medium text-(--text-tertiary) transition-colors hover:text-(--primary-color)'
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? 'Đã sao chép' : 'Sao chép'}
          </button>}
        </div>

        {message.source && (
          <div className='flex items-start gap-2 rounded-(--radius-card) border border-(--border-subtle) bg-(--surface-muted) px-3.5 py-2.5'>
            <ExternalLink size={13} className='mt-0.5 shrink-0 text-(--text-tertiary)' />
            <p className='text-[12px] leading-relaxed text-(--text-secondary)'>
              Nguồn tham khảo: <span className='font-medium text-gray-600'>{message.source}</span>
            </p>
          </div>
        )}

        {message.followUps?.length > 0 && (
          <div className='flex flex-wrap gap-2 pt-0.5'>
            {message.followUps.map((q) => (
              <button
                key={q}
                type='button'
                onClick={() => onFollowUp(q)}
                className='rounded-(--radius-pill) border border-(--border-subtle) bg-white px-3.5 py-1.5 text-[12.5px] font-medium text-gray-600 transition-colors hover:border-(--primary-color) hover:text-(--primary-color)'
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
