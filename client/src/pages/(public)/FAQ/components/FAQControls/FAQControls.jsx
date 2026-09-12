import { motion, useReducedMotion } from 'framer-motion';
import { Search } from 'lucide-react';

const FAQControls = ({ categories, searchTerm, activeCategory, onSearch, onCategoryChange }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.08,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className='mb-8 flex flex-col gap-4'
    >
      <div className='relative'>
        <Search
          aria-hidden='true'
          size={18}
          className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500'
        />

        <input
          type='search'
          aria-label='Tìm kiếm câu hỏi'
          placeholder='Tìm kiếm câu hỏi, từ khóa...'
          value={searchTerm}
          onChange={(event) => onSearch(event.target.value)}
          className='h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-[14px] text-gray-800 shadow-sm outline-none transition-all duration-300 placeholder:text-gray-400 hover:border-gray-300 focus:border-(--primary-color) focus:ring-3 focus:ring-red-50'
        />
      </div>

      <motion.div
        initial='hidden'
        animate='visible'
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.05,
              delayChildren: 0.1,
            },
          },
        }}
        className='flex flex-wrap justify-center gap-2'
      >
        <CategoryButton active={activeCategory === 'ALL'} onClick={() => onCategoryChange('ALL')}>
          Tất cả
        </CategoryButton>

        {categories.map((category) => {
          const categoryId = String(category.id);
          const isActive = activeCategory === categoryId;

          return (
            <CategoryButton
              key={category.id}
              active={isActive}
              onClick={() => onCategoryChange(categoryId)}
            >
              {category.name}
            </CategoryButton>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

const CategoryButton = ({ active, onClick, children }) => (
  <motion.button
    type='button'
    aria-pressed={active}
    onClick={onClick}
    variants={{
      hidden: {
        opacity: 0,
        y: 8,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    }}
    whileHover={{ y: -1 }}
    whileTap={{ scale: 0.97 }}
    className={`cursor-pointer rounded-full border px-4 py-2 text-[13px] font-semibold transition-all duration-200 ${
      active
        ? 'border-(--primary-color) bg-(--primary-color) text-white shadow-sm'
        : 'border-gray-200 bg-white text-gray-700 hover:border-(--primary-color) hover:text-(--primary-color)'
    }`}
  >
    {children}
  </motion.button>
);

export default FAQControls;
