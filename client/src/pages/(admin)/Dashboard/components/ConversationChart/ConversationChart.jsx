import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

function ConversationChart({ sessions = [] }) {
  const chartRef = useRef(null);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();

    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - (6 - index));

    return date;
  });

  const values = days.map(
    (day) =>
      sessions.filter((session) => {
        const createdAt = new Date(session.createdAt);

        return createdAt.toDateString() === day.toDateString();
      }).length
  );

  const maxValue = Math.max(...values, 1);
  const total = values.reduce((sum, value) => sum + value, 0);
  const average = Math.round(total / values.length);
  const peakIndex = values.indexOf(Math.max(...values));

  const points = values.map((value, index) => [20 + index * 65, 145 - (value / maxValue) * 110]);

  const path = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point[0]} ${point[1]}`)
    .join(' ');

  const handleMouseMove = (event) => {
    if (!chartRef.current) return;

    const rect = chartRef.current.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;

    const progress = Math.min(1, Math.max(0, mouseX / rect.width));

    const nextIndex = Math.round(progress * (days.length - 1));

    setHoveredPoint((current) => (current === nextIndex ? current : nextIndex));
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  const hoverX = hoveredPoint !== null ? (hoveredPoint / (days.length - 1)) * 100 : 0;

  const hoverY = hoveredPoint !== null ? 18 + (1 - values[hoveredPoint] / maxValue) * 55 : 0;

  return (
    <div>
      <div className='mb-5 flex items-center justify-between'>
        <h2 className='text-[15px] font-bold text-slate-900'>Lượt trò chuyện theo ngày</h2>

        <button
          type='button'
          className='rounded-lg border border-slate-200 px-3 py-2 text-[11px] text-slate-600'
        >
          7 ngày qua
        </button>
      </div>

      <div className='mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4'>
        {[
          { label: 'Tổng 7 ngày', value: total, accent: true },
          { label: 'Hôm nay', value: values.at(-1) },
          { label: 'Trung bình/ngày', value: average },
          {
            label: 'Cao nhất',
            value: maxValue,
            detail: days[peakIndex].toLocaleDateString('vi-VN', {
              day: '2-digit',
              month: '2-digit',
            }),
          },
        ].map((item) => (
          <div
            key={item.label}
            className={`rounded-lg border px-3 py-2.5 ${
              item.accent ? 'border-red-100 bg-red-50/70' : 'border-slate-100 bg-slate-50/70'
            }`}
          >
            <p className='text-[10px] font-medium text-slate-400'>{item.label}</p>
            <div className='mt-1 flex items-baseline gap-1.5'>
              <p className='text-lg font-bold leading-none text-slate-900'>{item.value}</p>
              {item.detail ? (
                <span className='text-[10px] text-slate-400'>{item.detail}</span>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <div className='relative h-[260px] w-full'>
        <div className='absolute inset-y-0 left-0 flex w-8 flex-col justify-between py-2 text-[10px] text-slate-400'>
          <span>{maxValue}</span>
          <span>{Math.ceil(maxValue / 2)}</span>
          <span>0</span>
        </div>

        <div
          ref={chartRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className='absolute inset-y-0 left-10 right-0 cursor-crosshair'
        >
          <div className='pointer-events-none absolute inset-0 flex flex-col justify-between py-2'>
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className='border-t border-slate-100' />
            ))}
          </div>

          {hoveredPoint !== null && (
            <motion.div
              animate={{
                left: `${hoverX}%`,
                opacity: 1,
              }}
              initial={false}
              transition={{
                type: 'spring',
                stiffness: 320,
                damping: 30,
                mass: 0.6,
              }}
              className='pointer-events-none absolute bottom-6 top-2 z-10 w-px border-l border-dashed border-red-200'
            />
          )}

          <svg
            viewBox='0 0 430 150'
            preserveAspectRatio='none'
            className='pointer-events-none absolute inset-2 h-[calc(100%-28px)] w-[calc(100%-8px)] overflow-visible'
          >
            <defs>
              <linearGradient id='chartFill' x1='0' x2='0' y1='0' y2='1'>
                <stop offset='0%' stopColor='#D71920' stopOpacity='0.13' />

                <stop offset='100%' stopColor='#D71920' stopOpacity='0' />
              </linearGradient>
            </defs>

            <motion.path
              d={`${path} L 410 150 L 20 150 Z`}
              fill='url(#chartFill)'
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.65,
                duration: 0.6,
              }}
            />

            <motion.path
              d={path}
              fill='none'
              stroke='#D71920'
              strokeWidth='2.5'
              strokeLinecap='round'
              strokeLinejoin='round'
              initial={{
                pathLength: 0,
                opacity: 0,
              }}
              animate={{
                pathLength: 1,
                opacity: 1,
              }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            />

            {points.map(([x, y], index) => {
              const isHovered = hoveredPoint === index;

              return (
                <motion.circle
                  key={index}
                  cx={x}
                  cy={y}
                  fill='white'
                  stroke='#D71920'
                  strokeWidth={isHovered ? 2.5 : 2}
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    opacity: 1,
                    scale: isHovered ? 1.35 : 1,
                  }}
                  transition={{
                    opacity: {
                      delay: 0.15 + index * 0.1,
                      duration: 0.3,
                    },
                    scale: {
                      type: 'spring',
                      stiffness: 320,
                      damping: 24,
                    },
                  }}
                  r='3.5'
                />
              );
            })}
          </svg>

          {hoveredPoint !== null && (
            <motion.div
              initial={false}
              animate={{
                left: `${hoverX}%`,
                top: `${hoverY}%`,
                opacity: 1,
                scale: 1,
              }}
              transition={{
                left: {
                  type: 'spring',
                  stiffness: 320,
                  damping: 30,
                  mass: 0.6,
                },
                top: {
                  type: 'spring',
                  stiffness: 320,
                  damping: 30,
                  mass: 0.6,
                },
                opacity: {
                  duration: 0.15,
                },
                scale: {
                  duration: 0.15,
                },
              }}
              className='pointer-events-none absolute z-30 min-w-32 -translate-x-1/2 -translate-y-full rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-[0_8px_24px_rgba(15,23,42,0.12)]'
            >
              <p className='text-[10px] font-medium text-slate-400'>
                {days[hoveredPoint].toLocaleDateString('vi-VN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              </p>

              <div className='mt-1.5 flex items-center gap-2'>
                <span className='h-2 w-2 rounded-full bg-[#D71920]' />

                <p className='text-[12px] font-semibold text-slate-900'>
                  {values[hoveredPoint]} lượt trò chuyện
                </p>
              </div>
            </motion.div>
          )}

          <div className='pointer-events-none absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-slate-400'>
            {days.map((day, index) => (
              <motion.span
                key={day.toISOString()}
                animate={{
                  color: hoveredPoint === index ? '#D71920' : '#94A3B8',
                  scale: hoveredPoint === index ? 1.08 : 1,
                }}
                transition={{
                  duration: 0.18,
                }}
                className={hoveredPoint === index ? 'font-semibold' : ''}
              >
                {day.toLocaleDateString('vi-VN', {
                  day: '2-digit',
                  month: '2-digit',
                })}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConversationChart;
