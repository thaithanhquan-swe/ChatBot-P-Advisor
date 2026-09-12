import { motion, useReducedMotion } from 'framer-motion';
import { FileText, FolderOpen, Search } from 'lucide-react';

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
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(215,25,32,0.12),transparent_42%)]' />
        <div className='absolute top-1/2 right-[16%] flex h-42 w-34 -translate-y-1/2 rotate-6 flex-col rounded-2xl border border-red-100 bg-white p-4 shadow-[0_18px_40px_-20px_rgba(215,25,32,0.35)]'>
          <FileText size={28} className='text-[#D71920]' />
          <span className='mt-5 h-2 w-18 rounded-full bg-slate-200' />
          <span className='mt-2 h-2 w-12 rounded-full bg-slate-100' />
          <span className='mt-auto text-[10px] font-bold tracking-wider text-slate-400'>PDF</span>
        </div>
        <div className='absolute top-[18%] right-[38%] flex h-18 w-18 -rotate-12 items-center justify-center rounded-2xl border border-amber-100 bg-amber-50 text-amber-500 shadow-sm'>
          <FolderOpen size={29} />
        </div>
        <div className='absolute right-[8%] bottom-[18%] flex h-14 w-14 rotate-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-400 shadow-sm'>
          <Search size={22} />
        </div>
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
