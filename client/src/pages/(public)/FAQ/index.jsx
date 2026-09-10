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
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      try {
        setIsLoading(true);

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

        if (cancelled) return;

        const activeCategories = (categoryResult.content ?? []).filter(
          (category) => category.status === 'ACTIVE'
        );

        const activeCategoryIds = new Set(activeCategories.map((category) => String(category.id)));

        const visibleFaqs = (faqResult.content ?? []).filter((faq) =>
          activeCategoryIds.has(String(faq.faqCategoryId))
        );

        setCategories(activeCategories);
        setFaqs(visibleFaqs);

        if (activeCategory !== 'ALL' && !activeCategoryIds.has(String(activeCategory))) {
          setActiveCategory('ALL');
          setExpandedId(null);
        }
      } catch (error) {
        if (!cancelled) {
          console.error('Lỗi tải FAQ public:', error);

          setFaqs([]);
          setCategories([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadData();

    return () => {
      cancelled = true;
    };
  }, [debouncedSearchTerm, activeCategory]);

  useEffect(() => {
    const handleFocus = async () => {
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

        const activeCategories = (categoryResult.content ?? []).filter(
          (category) => category.status === 'ACTIVE'
        );

        const activeCategoryIds = new Set(activeCategories.map((category) => String(category.id)));

        const visibleFaqs = (faqResult.content ?? []).filter((faq) =>
          activeCategoryIds.has(String(faq.faqCategoryId))
        );

        setCategories(activeCategories);
        setFaqs(visibleFaqs);

        if (activeCategory !== 'ALL' && !activeCategoryIds.has(String(activeCategory))) {
          setActiveCategory('ALL');
          setExpandedId(null);
        }
      } catch (error) {
        console.error('Lỗi refresh FAQ:', error);
      }
    };

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
