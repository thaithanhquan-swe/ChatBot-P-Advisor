import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faqCategories, faqData } from '../../../data/data';
import FAQControls from './components/FAQControls/FAQControls';
import FAQHeader from './components/FAQHeader/FAQHeader';
import FAQList from './components/FAQList/FAQList';

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [expandedId, setExpandedId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Thay thế bằng API thật khi backend FAQ sẵn sàng.
    const timer = setTimeout(() => {
      setFaqs(faqData);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const filteredFaqs = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLocaleLowerCase('vi');

    return faqs.filter((faq) => {
      const matchesCategory = activeCategory === 'Tất cả' || faq.category === activeCategory;
      const matchesSearch =
        faq.question.toLocaleLowerCase('vi').includes(normalizedSearch) ||
        faq.answer.toLocaleLowerCase('vi').includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, faqs, searchTerm]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
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
        categories={faqCategories}
        searchTerm={searchTerm}
        activeCategory={activeCategory}
        onSearch={setSearchTerm}
        onCategoryChange={handleCategoryChange}
      />
      <FAQList
        faqs={filteredFaqs}
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
