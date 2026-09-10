import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FAQControls from './components/FAQControls/FAQControls';
import FAQHeader from './components/FAQHeader/FAQHeader';
import FAQList from './components/FAQList/FAQList';

import { getFaqs } from '../../../services/faq-service';
import { getFaqCategories } from '../../../services/faq-category-service';

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const [activeCategory, setActiveCategory] = useState('ALL');

  const [categories, setCategories] = useState([]);

  const [expandedId, setExpandedId] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    async function loadFaqs() {
      try {
        const faqResult = await getFaqs({
          keyword: debouncedSearchTerm || undefined,

          faqCategoryId: activeCategory === 'ALL' ? undefined : activeCategory,

          page: 0,
          size: 20,
        });

        if (!cancelled) {
          setFaqs(faqResult.content ?? []);
        }
      } catch (error) {
        if (!cancelled) {
          console.error('Lỗi tải FAQ public:', error);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadFaqs();

    return () => {
      cancelled = true;
    };
  }, [debouncedSearchTerm, activeCategory]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    let cancelled = false;

    async function loadCategories() {
      try {
        const categoryResult = await getFaqCategories({
          page: 0,
          size: 100,
        });

        if (!cancelled) {
          setCategories(categoryResult.content ?? []);
        }
      } catch (error) {
        if (!cancelled) {
          console.error('Lỗi tải danh mục FAQ:', error);
        }
      }
    }

    loadCategories();

    return () => {
      cancelled = true;
    };
  }, []);

  /*
   * Khi user quay trở lại tab FAQ,
   * lấy dữ liệu mới nhất.
   */
  useEffect(() => {
    async function handleFocus() {
      try {
        const [faqResult, categoryResult] = await Promise.all([
          getFaqs({
            keyword: debouncedSearchTerm || undefined,

            faqCategoryId: activeCategory === 'ALL' ? undefined : activeCategory,

            page: 0,
            size: 20,
          }),

          getFaqCategories({
            page: 0,
            size: 100,
          }),
        ]);

        setFaqs(faqResult.content ?? []);

        setCategories(categoryResult.content ?? []);
      } catch (error) {
        console.error('Lỗi refresh FAQ:', error);
      }
    }

    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [debouncedSearchTerm, activeCategory]);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(String(categoryId));

    setExpandedId(null);
  };

  const handleToggle = (id) => {
    setExpandedId((currentId) => (currentId === id ? null : id));
  };

  const handleAskInChat = (question) => {
    navigate('/chatai', {
      state: {
        initialQuestion: question,
        autoSend: true,
      },
    });
  };

  return (
    <main className='mx-auto max-w-225 px-5 py-10'>
      <FAQHeader />

      <FAQControls
        categories={categories}
        searchTerm={searchTerm}
        activeCategory={activeCategory}
        onSearch={setSearchTerm}
        onCategoryChange={handleCategoryChange}
      />

      <FAQList
        faqs={faqs}
        isLoading={isLoading}
        expandedId={expandedId}
        searchTerm={searchTerm}
        onToggle={handleToggle}
        onAskInChat={handleAskInChat}
      />
    </main>
  );
};

export default FAQ;
