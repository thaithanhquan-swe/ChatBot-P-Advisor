import { MessageCircle, Minus, Plus } from 'lucide-react';

const FAQItem = ({ faq, isExpanded, onToggle, onAskInChat }) => {
  const answerId = `faq-answer-${faq.id}`;

  return (
    <article
      className={`overflow-hidden rounded-xl border bg-white transition-all duration-300 hover:border-red-200 ${isExpanded ? 'border-(--primary-color) shadow-[0_4px_15px_rgba(0,0,0,0.05)]' : 'border-gray-200'}`}
    >
      <button
        type='button'
        aria-expanded={isExpanded}
        aria-controls={answerId}
        onClick={onToggle}
        className={`flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-4.5 text-left text-[1.05rem] font-semibold transition-colors ${isExpanded ? 'text-(--primary-color)' : 'text-gray-800'}`}
      >
        <span>{faq.question}</span>
        {isExpanded ? (
          <Minus aria-hidden='true' className='shrink-0' size={23} />
        ) : (
          <Plus aria-hidden='true' className='shrink-0 text-gray-400' size={23} />
        )}
      </button>

      <div
        id={answerId}
        className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className='overflow-hidden'>
          <div className='px-6 pb-6 leading-relaxed text-gray-700'>
            <p>{faq.answer}</p>
            <div className='mt-4 flex items-center justify-end border-t border-dashed border-gray-200 pt-4'>
              <button
                type='button'
                onClick={() => onAskInChat(faq.question)}
                className='flex cursor-pointer items-center gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-(--primary-color) transition-colors hover:border-(--primary-color) hover:bg-(--primary-color) hover:text-white'
              >
                <MessageCircle aria-hidden='true' size={17} />
                Hỏi AI chi tiết hơn
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FAQItem;
