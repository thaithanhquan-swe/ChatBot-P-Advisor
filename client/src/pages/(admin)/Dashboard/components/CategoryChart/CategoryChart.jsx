import { useState } from 'react';
import { motion } from 'framer-motion';

const colors = ['#D71920', '#F97316', '#FBBF24', '#94A3B8'];

const statusLabels = {
  PENDING: 'Chờ xử lý',
  IN_PROGRESS: 'Đang xử lý',
  RESOLVED: 'Đã giải quyết',
};

function CategoryChart({ consultations = [], consultationStats = {} }) {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const grouped = Object.keys(consultationStats).length
    ? consultationStats
    : consultations.reduce((result, consultation) => {
        const category = consultation.status || 'UNKNOWN';

        return {
          ...result,
          [category]: (result[category] || 0) + 1,
        };
      }, {});

  const total = Object.values(grouped).reduce((sum, value) => sum + value, 0);

  const categories = Object.entries(grouped)
    .sort(([, first], [, second]) => second - first)
    .slice(0, 4)
    .map(([name, value], index) => ({
      name: statusLabels[name] || name,
      value,
      percent: total ? Math.round((value / total) * 100) : 0,
      color: colors[index % colors.length],
    }));

  const gradient = categories
    .reduce(
      (result, category) => {
        const end = result.offset + (category.percent / 100) * 360;

        return {
          offset: end,
          segments: [...result.segments, `${category.color} ${result.offset}deg ${end}deg`],
        };
      },
      {
        offset: 0,
        segments: [],
      }
    )
    .segments.join(', ');

  const selectedCategory = hoveredCategory !== null ? categories[hoveredCategory] : null;

  const handleDonutMove = (event) => {
    if (!categories.length) return;

    const rect = event.currentTarget.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = event.clientX - centerX;
    const y = event.clientY - centerY;

    let angle = (Math.atan2(y, x) * 180) / Math.PI + 90;

    if (angle < 0) {
      angle += 360;
    }

    let accumulated = 0;

    const index = categories.findIndex((category) => {
      accumulated += (category.percent / 100) * 360;

      return angle <= accumulated;
    });

    if (index >= 0) {
      setHoveredCategory((current) => (current === index ? current : index));
    }
  };

  const handleDonutLeave = () => {
    setHoveredCategory(null);
  };

  return (
    <div>
      <h2 className='mb-5 text-[15px] font-bold text-slate-900'>Phân loại yêu cầu tư vấn</h2>

      <div className='flex flex-col items-center justify-center gap-7 sm:flex-row'>
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.78,
            rotate: -35,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
          onMouseMove={handleDonutMove}
          onMouseLeave={handleDonutLeave}
          className='relative h-[170px] w-[170px] shrink-0 cursor-pointer rounded-full'
          style={{
            background: gradient ? `conic-gradient(${gradient})` : '#e2e8f0',
          }}
        >
          <motion.div
            animate={{
              inset: hoveredCategory !== null ? 40 : 38,
            }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 26,
            }}
            className='absolute flex items-center justify-center rounded-full bg-white'
          >
            <div className='text-center'>
              <motion.p
                animate={{
                  scale: hoveredCategory !== null ? 1.08 : 1,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 280,
                  damping: 22,
                }}
                className='text-2xl font-bold text-slate-900'
              >
                {selectedCategory ? selectedCategory.value : total}
              </motion.p>

              <motion.p
                animate={{
                  opacity: 1,
                }}
                className='mt-0.5 max-w-24 truncate text-[10px] text-slate-400'
              >
                {selectedCategory ? selectedCategory.name : 'yêu cầu'}
              </motion.p>

              <motion.p
                animate={{
                  opacity: selectedCategory ? 1 : 0,
                  y: selectedCategory ? 0 : 4,
                }}
                transition={{
                  duration: 0.18,
                }}
                className='mt-1 text-[10px] font-semibold text-[#D71920]'
              >
                {selectedCategory ? `${selectedCategory.percent}%` : ''}
              </motion.p>
            </div>
          </motion.div>

          {categories.map((category, index) => {
            if (hoveredCategory !== index) {
              return null;
            }

            return (
              <motion.div
                key={category.name}
                initial={{
                  opacity: 0,
                  scale: 0.96,
                  y: 4,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.16,
                }}
                className='pointer-events-none absolute left-1/2 top-[-44px] z-20 min-w-32 -translate-x-1/2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-center shadow-lg'
              >
                <p className='text-[11px] font-semibold text-slate-800'>{category.name}</p>

                <p className='mt-0.5 text-[10px] text-slate-500'>
                  {category.value} câu hỏi · {category.percent}%
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial='hidden'
          animate='visible'
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
              },
            },
          }}
          className='w-full max-w-[220px] space-y-2'
        >
          {categories.map((category, index) => {
            const isHovered = hoveredCategory === index;

            return (
              <motion.div
                key={category.name}
                variants={{
                  hidden: {
                    opacity: 0,
                    x: 12,
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
                animate={{
                  x: isHovered ? 4 : 0,
                  scale: isHovered ? 1.02 : 1,
                  backgroundColor: isHovered ? 'rgba(248,250,252,1)' : 'rgba(255,255,255,0)',
                }}
                transition={{
                  type: 'spring',
                  stiffness: 280,
                  damping: 24,
                }}
                onMouseEnter={() => setHoveredCategory(index)}
                onMouseLeave={() => setHoveredCategory(null)}
                className='flex cursor-default items-center gap-2 rounded-lg px-2 py-2'
              >
                <motion.span
                  animate={{
                    scale: isHovered ? 1.25 : 1,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 320,
                    damping: 22,
                  }}
                  className='h-3 w-3 rounded-sm'
                  style={{
                    backgroundColor: category.color,
                  }}
                />

                <span
                  className={`flex-1 text-[11px] transition-colors ${
                    isHovered ? 'font-semibold text-slate-800' : 'text-slate-600'
                  }`}
                >
                  {category.name}
                </span>

                <span className='text-[11px] font-semibold text-slate-700'>{category.value}</span>

                <span className='w-10 text-right text-[10px] text-slate-400'>
                  ({category.percent}%)
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

export default CategoryChart;
