import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

function AnimatedNumber({ value }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (typeof value !== 'number') return;

    let frameId;

    const duration = 700;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(Math.round(value * easedProgress));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [value]);

  if (typeof value !== 'number') {
    return value;
  }

  return displayValue;
}

function StatisticCard({ title, value, change, description, icon: Icon, positive = true }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 18,
          scale: 0.97,
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              y: -5,
              scale: 1.015,
            }
      }
      transition={{
        type: 'spring',
        stiffness: 240,
        damping: 23,
      }}
      className='group rounded-xl border border-slate-200 bg-white p-5 shadow-[0_2px_8px_rgba(15,23,42,0.02)] transition-[border-color,box-shadow] duration-300 hover:border-red-100 hover:shadow-[0_10px_28px_rgba(15,23,42,0.07)]'
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
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
        className='flex h-11 w-11 items-center justify-center rounded-full border border-red-100 bg-red-50 text-[#D71920]'
      >
        <Icon size={22} strokeWidth={1.8} />
      </motion.div>

      <div className='mt-5'>
        <p className='text-[28px] font-bold leading-none tracking-tight text-slate-900'>
          <AnimatedNumber value={value} />
        </p>

        <p className='mt-2 text-[13px] font-medium text-slate-700'>{title}</p>

        {change ? (
          <div className='mt-3 flex items-center gap-1.5 text-[11px]'>
            {positive ? (
              <ArrowUpRight size={13} className='text-emerald-600' />
            ) : (
              <ArrowDownRight size={13} className='text-red-600' />
            )}

            <span className={`font-semibold ${positive ? 'text-emerald-600' : 'text-red-600'}`}>
              {change}
            </span>

            <span className='text-slate-400'>{description}</span>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}

export default StatisticCard;
