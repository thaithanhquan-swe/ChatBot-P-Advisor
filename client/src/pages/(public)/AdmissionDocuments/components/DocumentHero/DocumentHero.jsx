import { motion, useReducedMotion } from 'framer-motion';

import { images } from '@/assets/images';

const DocumentHero = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className='relative overflow-hidden border-b border-gray-100 bg-[#f8fafc]'>
      <motion.div
        initial={
          prefersReducedMotion
            ? false
            : {
                opacity: 0,
                scale: 1.04,
              }
        }
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className='absolute inset-y-0 right-0 hidden w-[55%] lg:block'
      >
        <img
          src={images.truong_ptit}
          alt=''
          className='h-full w-full object-cover object-center opacity-30'
        />

        <div className='absolute inset-0 bg-gradient-to-r from-[#f8fafc] via-[#f8fafc]/45 to-white/20' />
      </motion.div>

      <div className='container relative py-10 sm:py-12 lg:py-11'>
        <motion.div
          initial={
            prefersReducedMotion
              ? false
              : {
                  opacity: 0,
                  x: -22,
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
          className='max-w-2xl'
        >
          <motion.h1
            initial={
              prefersReducedMotion
                ? false
                : {
                    opacity: 0,
                    y: 10,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.08,
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className='text-[34px] font-extrabold leading-tight tracking-[-0.02em] text-gray-950 sm:text-[42px]'
          >
            Tài liệu <span className='text-(--primary-color)'>tuyển sinh</span>
          </motion.h1>

          <motion.p
            initial={
              prefersReducedMotion
                ? false
                : {
                    opacity: 0,
                    y: 10,
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
            className='mt-3 max-w-xl text-[14.5px] leading-6 text-gray-600 sm:text-[15px]'
          >
            Cung cấp các tài liệu chính thức về tuyển sinh, đào tạo và các thông tin hữu ích của Học
            viện Công nghệ Bưu chính Viễn thông.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default DocumentHero;
