import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

const DocumentPagination = ({ page, totalPages, onChange }) => {
  const prefersReducedMotion = useReducedMotion();

  if (!totalPages || totalPages < 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1).filter(
    (item) => item === 1 || item === totalPages || Math.abs(item - page) <= 1
  );

  return (
    <motion.div
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
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      className='mt-8 flex items-center justify-center gap-1.5'
    >
      <motion.div
        whileTap={{
          scale: 0.94,
        }}
      >
        <Button
          type='button'
          variant='outline'
          size='icon'
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
          className='h-9 w-9 rounded-xl border-gray-200 text-gray-700'
        >
          <ChevronLeft size={16} />
        </Button>
      </motion.div>

      {pages.map((item, index) => {
        const previous = pages[index - 1];

        return (
          <div key={item} className='flex items-center gap-1.5'>
            {previous && item - previous > 1 && (
              <span className='px-1 text-xs font-medium text-gray-400'>...</span>
            )}

            <motion.div
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : {
                      y: -2,
                    }
              }
              whileTap={{
                scale: 0.94,
              }}
            >
              <Button
                type='button'
                variant={page === item ? 'default' : 'outline'}
                onClick={() => onChange(item)}
                className={`h-9 min-w-9 rounded-xl text-[12.5px] font-semibold ${
                  page === item
                    ? 'bg-(--primary-color) text-white shadow-sm hover:bg-[#b10e28]'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item}
              </Button>
            </motion.div>
          </div>
        );
      })}

      <motion.div
        whileTap={{
          scale: 0.94,
        }}
      >
        <Button
          type='button'
          variant='outline'
          size='icon'
          disabled={page >= totalPages}
          onClick={() => onChange(page + 1)}
          className='h-9 w-9 rounded-xl border-gray-200 text-gray-700'
        >
          <ChevronRight size={16} />
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default DocumentPagination;
