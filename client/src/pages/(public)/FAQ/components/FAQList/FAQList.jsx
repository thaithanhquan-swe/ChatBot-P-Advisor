import { motion } from 'framer-motion';

import FAQItem from '../FAQItem/FAQItem';

const FAQList = ({ faqs, isLoading, expandedId, searchTerm, onToggle, onAskInChat }) => {
  if (isLoading) {
    return (
      <div className='px-4 py-8 text-center text-sm font-medium text-gray-600 sm:py-10'>
        Đang tải dữ liệu...
      </div>
    );
  }

  if (faqs.length === 0) {
    return (
      <div className='rounded-xl border border-dashed border-gray-300 bg-white px-4 py-8 text-center text-sm leading-6 font-medium text-gray-600 sm:py-10'>
        Không tìm thấy câu hỏi phù hợp
        {searchTerm ? ` với từ khóa "${searchTerm}".` : '.'}
      </div>
    );
  }

  return (
    <motion.div
      initial='hidden'
      animate='visible'
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.07,
          },
        },
      }}
      className='flex flex-col gap-2.5 sm:gap-3'
    >
      {faqs.map((faq) => (
        <FAQItem
          key={faq.id}
          faq={faq}
          isExpanded={expandedId === faq.id}
          onToggle={() => onToggle(faq.id)}
          onAskInChat={onAskInChat}
        />
      ))}
    </motion.div>
  );
};

export default FAQList;
