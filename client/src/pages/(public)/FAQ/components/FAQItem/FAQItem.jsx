import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MessageCircle, Plus } from 'lucide-react';

const FAQItem = ({ faq, isExpanded, onToggle, onAskInChat }) => {
  const prefersReducedMotion = useReducedMotion();

  const answerId = `faq-answer-${faq.id}`;

  const handleAskAI = (event) => {
    event.stopPropagation();

    onAskInChat(faq.question);
  };

  return (
    <motion.article
      layout
      variants={{
        hidden: {
          opacity: 0,
          y: 14,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className={`overflow-hidden rounded-xl border bg-white transition-all duration-300 ${
        isExpanded
          ? 'border-(--primary-color-border) shadow-[0_6px_20px_rgba(179,0,0,0.07)]'
          : 'border-gray-200 shadow-sm hover:border-gray-300 hover:shadow-md'
      }`}
    >
      <button
        type='button'
        aria-expanded={isExpanded}
        aria-controls={answerId}
        onClick={onToggle}
        className='flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left'
      >
        <span
          className={`text-[15px] font-semibold leading-6 transition-colors duration-200 ${
            isExpanded ? 'text-(--primary-color)' : 'text-gray-800'
          }`}
        >
          {faq.question}
        </span>

        <motion.span
          animate={{
            rotate: isExpanded ? 45 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 320,
            damping: 22,
          }}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
            isExpanded ? 'bg-(--primary-color) text-white' : 'bg-gray-100 text-gray-600'
          }`}
        >
          <Plus aria-hidden='true' size={17} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={answerId}
            initial={
              prefersReducedMotion
                ? false
                : {
                    height: 0,
                    opacity: 0,
                  }
            }
            animate={{
              height: 'auto',
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              height: {
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              },
              opacity: {
                duration: 0.25,
              },
            }}
            className='overflow-hidden'
          >
            <div className='px-5 pb-5'>
              <div className='border-t border-gray-100 pt-4'>
                <p className='whitespace-pre-wrap text-[14px] leading-6 text-gray-700'>
                  {faq.answer}
                </p>

                <div className='mt-4 flex justify-end border-t border-dashed border-gray-200 pt-4'>
                  <motion.button
                    type='button'
                    onClick={handleAskAI}
                    whileHover={
                      prefersReducedMotion
                        ? undefined
                        : {
                            y: -1,
                          }
                    }
                    whileTap={{ scale: 0.97 }}
                    className='flex cursor-pointer items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2 text-[13px] font-semibold text-(--primary-color) transition-colors duration-200 hover:border-(--primary-color) hover:bg-(--primary-color) hover:text-white'
                  >
                    <MessageCircle aria-hidden='true' size={16} />
                    Hỏi AI chi tiết hơn
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

export default FAQItem;
