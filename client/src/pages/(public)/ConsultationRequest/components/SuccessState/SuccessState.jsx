import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const SuccessState = ({ onClose }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        prefersReducedMotion
          ? false
          : {
              opacity: 0,
              y: 16,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className='flex flex-col items-center justify-center py-8 text-center'
    >
      <motion.div
        initial={
          prefersReducedMotion
            ? false
            : {
                opacity: 0,
                scale: 0.5,
              }
        }
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 240,
          damping: 17,
        }}
        className='mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-50'
      >
        <CheckCircle2 size={52} className='text-green-500' />
      </motion.div>

      <motion.h3
        initial={
          prefersReducedMotion
            ? false
            : {
                opacity: 0,
                y: 8,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.12,
          duration: 0.4,
        }}
        className='mb-2 text-2xl font-bold text-gray-800'
      >
        Gửi yêu cầu thành công!
      </motion.h3>

      <motion.p
        initial={
          prefersReducedMotion
            ? false
            : {
                opacity: 0,
                y: 8,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.2,
          duration: 0.4,
        }}
        className='text-gray-600'
      >
        Cán bộ tuyển sinh đã nhận được câu hỏi của bạn
        <br />
        Chúng tôi sẽ liên hệ lại trong vòng 24h tới
      </motion.p>

      <motion.button
        type='button'
        onClick={onClose}
        whileHover={
          prefersReducedMotion
            ? undefined
            : {
                y: -2,
                scale: 1.02,
              }
        }
        whileTap={{
          scale: 0.97,
        }}
        transition={{
          type: 'spring',
          stiffness: 280,
          damping: 22,
        }}
        className='mt-6 rounded-xl bg-[#b30000] px-6 py-2.5 font-semibold text-white transition-colors hover:bg-red-800'
      >
        Gửi yêu cầu khác
      </motion.button>
    </motion.div>
  );
};

export default SuccessState;
