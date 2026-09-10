import { Search } from 'lucide-react';

const FAQControls = ({ categories, searchTerm, activeCategory, onSearch, onCategoryChange }) => {
  return (
    <div className='mb-10 flex flex-col gap-5'>
      <div className='relative'>
        <Search
          aria-hidden='true'
          className='absolute left-5 top-1/2 -translate-y-1/2 text-gray-400'
          size={19}
        />

        <input
          type='search'
          aria-label='Tìm kiếm câu hỏi'
          placeholder='Tìm kiếm câu hỏi, từ khóa ...'
          value={searchTerm}
          onChange={(event) => onSearch(event.target.value)}
          className='w-full rounded-full border border-gray-200 bg-white py-3.5 pl-12 pr-5 text-base shadow-[0_4px_6px_rgba(0,0,0,0.02)] outline-none transition-all focus:border-(--primary-color)'
        />
      </div>

      <div className='flex flex-wrap justify-center gap-2.5'>
        <button
          type='button'
          aria-pressed={activeCategory === 'ALL'}
          onClick={() => onCategoryChange('ALL')}
          className={`cursor-pointer rounded-full border px-5 py-2 font-medium transition-colors ${
            activeCategory === 'ALL'
              ? 'border-(--primary-color) bg-(--primary-color) text-white'
              : 'border-gray-300 bg-white text-gray-600 hover:border-(--primary-color) hover:text-(--primary-color)'
          }`}
        >
          Tất cả
        </button>

        {categories.map((category) => {
          const categoryId = String(category.id);

          const isActive = activeCategory === categoryId;

          return (
            <button
              key={category.id}
              type='button'
              aria-pressed={isActive}
              onClick={() => onCategoryChange(categoryId)}
              className={`cursor-pointer rounded-full border px-5 py-2 font-medium transition-colors ${
                isActive
                  ? 'border-(--primary-color) bg-(--primary-color) text-white'
                  : 'border-gray-300 bg-white text-gray-600 hover:border-(--primary-color) hover:text-(--primary-color)'
              }`}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FAQControls;
