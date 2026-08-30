import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFaqCategories } from '@/services/faq-category-service';
import { ChevronRight, MessageCircle } from 'lucide-react';

const FaqSection = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let active = true;

    const fetchCategories = async () => {
      try {
        const page = await getFaqCategories(0, 6);
        if (active) setCategories(page.content || []);
      } catch {
        if (active) setCategories([]);
      }
    };

    fetchCategories();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className='bg-(--surface-muted) py-16 lg:py-20'>
      <div className='container'>
        <div className='mx-auto max-w-140 text-center'>
          <div className='mx-auto flex h-11 w-11 items-center justify-center rounded-(--radius-card) bg-(--primary-color-soft)'>
            <MessageCircle size={20} className='text-(--primary-color)' />
          </div>
          <h2 className='mt-4 text-[24px] font-bold text-gray-900 sm:text-[28px]'>
            Danh mục câu hỏi phổ biến
          </h2>
          <p className='mt-2 text-[14.5px] text-(--text-secondary)'>
            Khám phá các chủ đề thường được quan tâm
          </p>
        </div>

        <div className='mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {categories.map((category, index) => {
            const number = String(index + 1).padStart(2, '0');

            return (
              <Link
                key={category.id}
                to='/faq'
                className='group relative flex min-h-42 overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_4px_18px_rgba(31,24,25,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-(--primary-color-border) hover:shadow-[0_14px_32px_rgba(179,0,0,0.10)]'
              >
                <span className='absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-(--primary-color) transition-transform duration-300 group-hover:scale-x-100' />
                <span className='pointer-events-none absolute top-4 right-4 text-[64px] leading-none font-black text-gray-50 transition-colors duration-300 group-hover:text-(--primary-color-soft)'>
                  {number}
                </span>

                <div className='relative z-10 flex min-w-0 flex-1 flex-col'>
                  <span className='text-[11px] font-bold tracking-[0.16em] text-(--primary-color)'>
                    CHỦ ĐỀ {number}
                  </span>
                  <h3 className='mt-3 max-w-[85%] text-[17px] leading-snug font-bold text-gray-900 transition-colors group-hover:text-(--primary-color)'>
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className='mt-2 line-clamp-2 text-[13px] leading-relaxed text-(--text-secondary)'>
                      {category.description}
                    </p>
                  )}

                  <span className='mt-auto flex items-center gap-1 pt-4 text-[12px] font-semibold text-gray-400 transition-colors group-hover:text-(--primary-color)'>
                    Xem câu hỏi
                    <ChevronRight
                      size={15}
                      className='transition-transform duration-300 group-hover:translate-x-1'
                    />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className='mt-9 text-center'>
          <Link
            to='/faq'
            className='inline-flex items-center gap-2 rounded-xl border border-(--primary-color) px-6 py-3 text-[13.5px] font-semibold text-(--primary-color) transition-colors hover:bg-(--primary-color-soft)'
          >
            Xem tất cả câu hỏi thường gặp
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
