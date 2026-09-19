import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, MessagesSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const HelpCard = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.aside
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              y: -3,
            }
      }
      transition={{
        type: 'spring',
        stiffness: 220,
        damping: 24,
      }}
      className='group rounded-xl border border-red-100 bg-[#fff5f5] p-5'
    >
      <h2 className='flex items-center gap-2 text-[15px] font-bold text-(--primary-color)'>
        <motion.span
          whileHover={
            prefersReducedMotion
              ? undefined
              : {
                  rotate: -5,
                  scale: 1.08,
                }
          }
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 18,
          }}
        >
          <MessagesSquare size={20} />
        </motion.span>
        Vẫn còn thắc mắc?
      </h2>

      <p className='mt-2 text-[12px] leading-5 text-gray-600'>
        Không tìm thấy tài liệu bạn cần? Hãy hỏi P-Advisor để được hỗ trợ nhanh chóng.
      </p>

      <Link
        to='/chatai'
        className='mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-(--primary-color) px-4 text-[12.5px] font-semibold text-white transition-colors duration-300 hover:bg-[#b10e28]'
      >
        Chat với P-Advisor
        <ArrowRight
          size={15}
          className='transition-transform duration-300 group-hover:translate-x-1'
        />
      </Link>
    </motion.aside>
  );
};

export default HelpCard;
