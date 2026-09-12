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
      className='mb-6 text-center'
    >
      <div className='mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-(--primary-color-soft)'>
        <CircleHelp size={18} className='text-(--primary-color)' />
      </div>

      <h1 className='text-[1.75rem] font-bold tracking-tight text-gray-900 sm:text-[1.9rem]'>
        Câu hỏi thường gặp
      </h1>

      <p className='mx-auto mt-1.5 max-w-lg text-[14px] leading-6 text-gray-600'>
        Tìm kiếm nhanh câu trả lời cho các thắc mắc về tuyển sinh PTIT
      </p>
    </motion.header>
  );
};

export default FAQHeader;
