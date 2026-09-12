import { motion, useReducedMotion } from 'framer-motion';
import { Globe, Mail, Phone } from 'lucide-react';

import { FacebookIcon } from '../../../../../assets/icons';
import { useSystemConfig } from '@/contexts/system-config-context';

const SupportChannels = () => {
  const prefersReducedMotion = useReducedMotion();
  const { config, loading } = useSystemConfig();
  if (loading) return <section className='h-64 animate-pulse rounded-2xl bg-slate-100' aria-label='Đang tải kênh hỗ trợ' />;
  if (!config) return null;
  const channels = [
    { icon: Phone, label: 'Hotline tuyển sinh', value: config.admissionHotline },
    { icon: Mail, label: 'Email', value: config.admissionEmail },
    { icon: Globe, label: 'Website', value: config.websiteUrl },
  ];

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
      <h2 className='mb-4 text-base font-bold text-gray-900'>Các kênh hỗ trợ khác</h2>

      <motion.div
        initial='hidden'
        animate='visible'
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.09,
              delayChildren: 0.1,
            },
          },
        }}
        className='space-y-4 text-xs'
      >
        {channels.map(({ icon: Icon, label, value }) => (
          <motion.div
            key={label}
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
            whileHover={
              prefersReducedMotion
                ? undefined
                : {
                    x: 3,
                  }
            }
            className='group flex items-start gap-3'
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
              className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-50 text-[#c8102e]'
            >
              <Icon size={14} />
            </motion.div>

            <div>
              <p className='font-semibold text-gray-800 transition-colors group-hover:text-[#c8102e]'>
                {label}
              </p>

              <p className='text-gray-900'>{value}</p>
            </div>
          </motion.div>
        ))}

        <motion.div
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
          whileHover={
            prefersReducedMotion
              ? undefined
              : {
                  x: 3,
                }
          }
          className='group flex items-start gap-3'
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
            className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white'
          >
            <FacebookIcon size={14} aria-hidden='true' />
          </motion.div>

          <div>
            <p className='font-semibold text-gray-800 transition-colors group-hover:text-blue-600'>
              Facebook
            </p>

            <a href={config.facebookUrl} target='_blank' rel='noreferrer' className='font-medium text-gray-900'>
              {config.facebookUrl.replace(/^https?:\/\//, '')}
            </a>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default SupportChannels;
