import { motion, useReducedMotion } from 'framer-motion';
import { CircleHelp } from 'lucide-react';

const FAQHeader = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.header
      initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className='mb-5 text-center sm:mb-6'
    >
      <div className='mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-(--primary-color-soft) sm:h-9 sm:w-9'>
        <CircleHelp size={18} className='text-(--primary-color)' />
      </div>

      <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-[1.9rem]'>
        Câu hỏi thường gặp
      </h1>

      <p className='mx-auto mt-1.5 max-w-lg px-2 text-[13px] leading-5 text-gray-600 sm:px-0 sm:text-[14px] sm:leading-6'>
        Tìm kiếm nhanh câu trả lời cho các thắc mắc về tuyển sinh PTIT
      </p>
    </motion.header>
  );
};

export default FAQHeader;
