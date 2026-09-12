import { motion } from 'framer-motion';
import { FileText, MessageCircle } from 'lucide-react';

const formatTime = (value) =>
  value
    ? new Date(value).toLocaleString('vi-VN', {
        dateStyle: 'short',
        timeStyle: 'short',
      })
    : '-';

function ActivityList({ faqs = [], consultations = [] }) {
  const activities = [
    ...faqs.slice(0, 3).map((faq) => ({
      title: `FAQ được cập nhật: ${faq.question}`,
      time: faq.updatedAt || faq.createdAt,
      icon: FileText,
    })),
    ...consultations.slice(0, 2).map((request) => ({
      title: `Yêu cầu tư vấn: ${request.question}`,
      time: request.createdAt,
      icon: MessageCircle,
    })),
  ].sort((first, second) => new Date(second.time || 0) - new Date(first.time || 0));

  return (
    <div>
      <div className='mb-5 flex items-center justify-between'>
        <h2 className='text-[15px] font-bold text-slate-900'>Hoạt động hệ thống gần đây</h2>
      </div>

      <motion.div
        initial='hidden'
        animate='visible'
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.09,
            },
          },
        }}
        className='space-y-1'
      >
        {activities.slice(0, 5).map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={index}
              variants={{
                hidden: {
                  opacity: 0,
                  x: 14,
                },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              whileHover={{
                x: 4,
              }}
              className='group flex items-center gap-3 rounded-lg px-2 py-3 transition-colors hover:bg-slate-50'
            >
              <motion.div
                whileHover={{
                  scale: 1.1,
                  rotate: -4,
                }}
                className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-[#D71920]'
              >
                <Icon size={17} strokeWidth={1.7} />
              </motion.div>

              <div className='min-w-0 flex-1'>
                <p className='truncate text-[12px] font-medium text-slate-700 transition-colors group-hover:text-[#D71920]'>
                  {item.title}
                </p>

                <p className='mt-1 text-[10px] text-slate-400'>{formatTime(item.time)}</p>
              </div>
            </motion.div>
          );
        })}

        {!activities.length ? (
          <p className='py-8 text-center text-sm text-muted-foreground'>
            Chưa có hoạt động gần đây.
          </p>
        ) : null}
      </motion.div>
    </div>
  );
}

export default ActivityList;
