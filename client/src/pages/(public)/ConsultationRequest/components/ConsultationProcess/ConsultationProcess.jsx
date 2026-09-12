import { motion, useReducedMotion } from 'framer-motion';
import { FileText, Mail, User } from 'lucide-react';

const steps = [
  {
    icon: FileText,
    title: '1. Tiếp nhận yêu cầu',
    description: 'Hệ thống ghi nhận câu hỏi và thông tin của bạn.',
  },
  {
    icon: User,
    title: '2. Cán bộ tư vấn',
    description: 'Cán bộ tuyển sinh sẽ xem xét và phản hồi yêu cầu của bạn.',
  },
  {
    icon: Mail,
    title: '3. Liên hệ trong 24h',
    description: 'Chúng tôi sẽ liên hệ qua SĐT/Email mà bạn cung cấp.',
  },
];

const ConsultationProcess = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
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
      className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm'
    >
      <h2 className='mb-5 text-base font-bold text-gray-900'>Quy trình xử lý yêu cầu</h2>

      <motion.div
        initial='hidden'
        animate='visible'
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.12,
              delayChildren: 0.15,
            },
          },
        }}
        className='relative space-y-6 pl-2'
      >
        <motion.div
          initial={
            prefersReducedMotion
              ? false
              : {
                  scaleY: 0,
                }
          }
          animate={{
            scaleY: 1,
          }}
          transition={{
            delay: 0.2,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className='absolute left-5.25 top-3 h-[calc(100%-24px)] w-px origin-top border-l-2 border-dashed border-red-200'
        />

        {steps.map(({ icon: Icon, title, description }) => (
          <motion.div
            key={title}
            variants={{
              hidden: {
                opacity: 0,
                x: 12,
              },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
            className='group relative flex items-start gap-3.5'
          >
            <motion.div
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : {
                      scale: 1.1,
                      rotate: -4,
                    }
              }
              className='z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-50 text-[#c8102e]'
            >
              <Icon size={16} />
            </motion.div>

            <div>
              <h3 className='text-sm font-bold text-gray-900 transition-colors group-hover:text-[#c8102e]'>
                {title}
              </h3>

              <p className='mt-0.5 text-xs leading-normal text-gray-500'>{description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default ConsultationProcess;
