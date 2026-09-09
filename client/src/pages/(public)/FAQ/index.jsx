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
    const loadData = async () => {
      try {
        setIsLoading(true);

        const faqResult = await getFaqs({
          keyword: debouncedSearchTerm || undefined,
          faqCategoryId:
            activeCategory === 'ALL' ? undefined : activeCategory,
          page: 0,
          size: 20,
        });

        setFaqs(faqResult.content || []);
      } catch (error) {
        console.error('Lỗi tải FAQ public:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [debouncedSearchTerm, activeCategory]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoryResult = await getFaqCategories({
          page: 0,
          size: 100,
        });

        setCategories(categoryResult.content || []);
      } catch (error) {
        console.error('Lỗi tải danh mục FAQ:', error);
      }
    };

    loadCategories();
  }, []);

  

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setExpandedId(null);
  };

  const handleToggle = (id) => {
    setExpandedId((currentId) => (currentId === id ? null : id));
  };

  const handleAskInChat = (question) => {
    navigate('/chatai', { state: { initialQuestion: question } });
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
