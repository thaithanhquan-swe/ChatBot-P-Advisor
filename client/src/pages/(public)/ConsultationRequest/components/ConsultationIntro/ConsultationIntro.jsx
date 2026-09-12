import { motion, useReducedMotion } from 'framer-motion';
import { HelpCircle, Mail } from 'lucide-react';

import ptitLineArt from '../../../../../assets/images/store/truong_ptit_lineart.png';

const ConsultationIntro = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      initial={
        prefersReducedMotion
          ? false
          : {
              opacity: 0,
              x: -28,
            }
      }
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      className='relative flex h-full flex-col pt-4 lg:col-span-3'
    >
      <div className='relative z-10'>
        <motion.div
          initial={
            prefersReducedMotion
              ? false
              : {
                  opacity: 0,
                  scale: 0.85,
                  rotate: -4,
                }
          }
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          transition={{
            delay: 0.12,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className='relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 text-[#c8102e]'
        >
          <Mail size={40} />

          <motion.div
            initial={
              prefersReducedMotion
                ? false
                : {
                    scale: 0,
                    opacity: 0,
                  }
            }
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              delay: 0.32,
              type: 'spring',
              stiffness: 260,
              damping: 18,
            }}
            className='absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#c8102e] text-white shadow-md'
          >
            <HelpCircle size={18} />
          </motion.div>
        </motion.div>

        <motion.h1
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
            delay: 0.16,
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className='mb-6 text-4xl font-extrabold leading-tight tracking-tight text-gray-900'
        >
          Gửi yêu cầu <br />
          <span className='text-[#c8102e]'>tư vấn</span>
        </motion.h1>

        <motion.div
          initial={
            prefersReducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 12,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.25,
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className='space-y-4 text-sm leading-relaxed text-gray-600'
        >
          <p className='font-medium text-gray-800'>
            Rất tiếc, Chatbot chưa thể trả lời đầy đủ câu hỏi của bạn.
          </p>

          <p>
            Vui lòng để lại thông tin, Cán bộ tuyển sinh của PTIT sẽ liên hệ và hỗ trợ bạn trong
            thời gian sớm nhất (dưới 24h).
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={
          prefersReducedMotion
            ? false
            : {
                opacity: 0,
                y: 20,
              }
        }
        animate={{
          opacity: 0.25,
          y: 0,
        }}
        transition={{
          delay: 0.4,
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className='pointer-events-none absolute bottom-10 left-1/2 z-0 hidden w-[160%] -translate-x-1/2 select-none lg:flex lg:justify-center'
      >
        <img
          src={ptitLineArt}
          alt='Tòa nhà PTIT'
          className='h-auto w-full object-contain object-bottom'
        />
      </motion.div>
    </motion.section>
  );
};

export default ConsultationIntro;
