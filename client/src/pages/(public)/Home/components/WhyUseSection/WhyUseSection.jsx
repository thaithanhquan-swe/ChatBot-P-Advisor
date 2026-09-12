import { motion, useReducedMotion } from 'framer-motion';
import { HeartHandshake, ShieldCheck, Users, Zap } from 'lucide-react';

const reasons = [
  {
    icon: Zap,
    title: 'Trả lời nhanh chóng',
    desc: 'Chatbot hoạt động 24/7, trả lời tức thì mọi thắc mắc của bạn.',
  },
  {
    icon: ShieldCheck,
    title: 'Thông tin chính xác',
    desc: 'Nguồn thông tin được cập nhật từ Học viện Công nghệ Bưu chính Viễn thông.',
  },
  {
    icon: Users,
    title: 'Dành cho tất cả',
    desc: 'Hỗ trợ thí sinh, phụ huynh và mọi người quan tâm đến tuyển sinh PTIT.',
  },
  {
    icon: HeartHandshake,
    title: 'Tư vấn tận tâm',
    desc: 'Chatbot đồng hành, giải đáp và hướng dẫn bạn trong suốt quá trình tìm hiểu.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const WhyUseSection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className='py-16 lg:py-20'>
      <div className='container'>
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className='rounded-(--radius-panel) border border-(--border-subtle) bg-white p-8 shadow-(--shadow-card) lg:p-12'
        >
          <motion.h2
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.55,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className='text-center text-[22px] font-bold text-gray-900 sm:text-[24px]'
          >
            Vì sao nên sử dụng Chatbot tư vấn tuyển sinh PTIT?
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial={prefersReducedMotion ? false : 'hidden'}
            whileInView='visible'
            viewport={{ once: true, amount: 0.25 }}
            className='mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'
          >
            {reasons.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={itemVariants}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: -5,
                      }
                }
                transition={{
                  type: 'spring',
                  stiffness: 280,
                  damping: 22,
                }}
                className='group flex items-start gap-3.5'
              >
                <motion.div
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : {
                          scale: 1.08,
                          rotate: -3,
                        }
                  }
                  transition={{
                    type: 'spring',
                    stiffness: 320,
                    damping: 18,
                  }}
                  className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--primary-color-soft)'
                >
                  <Icon size={20} className='text-(--primary-color)' strokeWidth={1.8} />
                </motion.div>

                <div>
                  <h3 className='text-[14.5px] font-semibold text-gray-900 transition-colors duration-300 group-hover:text-(--primary-color)'>
                    {title}
                  </h3>

                  <p className='mt-1 text-[13px] leading-relaxed text-(--text-secondary)'>{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUseSection;
