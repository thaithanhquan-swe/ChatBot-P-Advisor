import { useMemo, useState } from 'react';
import FAQHeader from './components/FAQHeader/FAQHeader';
import FAQStatistics from './components/FAQStatistics/FAQStatistics';
import FAQFilter from './components/FAQFilter/FAQFilter';
import FAQTable from './components/FAQTable/FAQTable';
import FAQFormModal from './components/FAQFormModal/FAQFormModal';
import FAQDetailModal from './components/FAQDetailModal/FAQDetailModal';
import CategoryManagementModal from './components/CategoryManagementModal/CategoryManagementModal';

const initialCategories = [
  { id: 1, name: 'Tuyển sinh', description: 'Thông tin tuyển sinh, phương thức xét tuyển và điểm chuẩn.', status: 'ACTIVE', createdAt: '01/05/2026 09:00', updatedAt: '15/08/2026 14:20' },
  { id: 2, name: 'Học phí - Học bổng', description: 'Thông tin học phí, chính sách miễn giảm và học bổng.', status: 'ACTIVE', createdAt: '02/05/2026 10:10', updatedAt: '14/08/2026 09:15' },
  { id: 3, name: 'Ngành học', description: 'Thông tin các ngành và chương trình đào tạo.', status: 'ACTIVE', createdAt: '03/05/2026 08:30', updatedAt: '12/08/2026 16:40' },
  { id: 4, name: 'Đời sống sinh viên', description: 'Ký túc xá, câu lạc bộ và hoạt động sinh viên.', status: 'INACTIVE', createdAt: '05/05/2026 11:00', updatedAt: '10/08/2026 13:05' },
];

const initialFaqs = [
  { id: 1, question: 'Năm 2026 Học viện có những phương thức xét tuyển nào?', answer: 'Học viện áp dụng các phương thức xét tuyển theo đề án tuyển sinh được công bố chính thức, bao gồm xét tuyển theo kết quả thi và các phương thức phù hợp khác.', categoryId: 1, status: 'PUBLISHED', creator: 'Admin PTIT', createdAt: '18/08/2026 09:30', updatedAt: '22/08/2026 15:10', updatedDate: '2026-08-22' },
  { id: 2, question: 'Học phí chương trình đại trà được tính như thế nào?', answer: 'Học phí được tính theo số tín chỉ đăng ký và mức thu áp dụng cho từng năm học, ngành học theo quy định của Học viện.', categoryId: 2, status: 'PUBLISHED', creator: 'Admin PTIT', createdAt: '17/08/2026 14:00', updatedAt: '21/08/2026 10:25', updatedDate: '2026-08-21' },
  { id: 3, question: 'Ngành Công nghệ thông tin đào tạo những chuyên ngành nào?', answer: 'Nội dung chuyên ngành được tổ chức theo chương trình đào tạo hiện hành của Học viện. Sinh viên được học kiến thức nền tảng và các học phần chuyên sâu theo định hướng.', categoryId: 3, status: 'DRAFT', creator: 'Cán bộ TS', createdAt: '16/08/2026 08:45', updatedAt: '20/08/2026 16:05', updatedDate: '2026-08-20' },
  { id: 4, question: 'Sinh viên có thể đăng ký ở ký túc xá không?', answer: 'Sinh viên có nhu cầu có thể đăng ký ký túc xá theo thông báo và chỉ tiêu từng năm của Học viện.', categoryId: 4, status: 'HIDDEN', creator: 'Admin PTIT', createdAt: '15/08/2026 11:20', updatedAt: '19/08/2026 09:00', updatedDate: '2026-08-19' },
  { id: 5, question: 'Có học bổng dành cho sinh viên có thành tích tốt không?', answer: 'Học viện có các chính sách học bổng khuyến khích học tập và các chương trình học bổng khác theo từng thời kỳ.', categoryId: 2, status: 'PUBLISHED', creator: 'Admin PTIT', createdAt: '14/08/2026 13:35', updatedAt: '18/08/2026 14:45', updatedDate: '2026-08-18' },
];

const emptyFilters = { search: '', status: 'ALL', categoryId: 'ALL', fromDate: '', toDate: '', sortBy: 'updatedAt', sortOrder: 'DESC' };

function FAQ() {
  const [categories, setCategories] = useState(initialCategories);
  const [faqs, setFaqs] = useState(initialFaqs);
  const [filters, setFilters] = useState(emptyFilters);
  const [faqModal, setFaqModal] = useState({ open: false, item: null });
  const [detailFaq, setDetailFaq] = useState(null);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const categoryMap = useMemo(
    () => Object.fromEntries(categories.map((category) => [category.id, category])),
    [categories],
  );

  const filteredFaqs = useMemo(() => {
    const search = filters.search.trim().toLowerCase();
    const result = faqs.filter((faq) => {
      const matchesSearch = !search || faq.question.toLowerCase().includes(search);
      const matchesStatus = filters.status === 'ALL' || faq.status === filters.status;
      const matchesCategory = filters.categoryId === 'ALL' || faq.categoryId === Number(filters.categoryId);
      const matchesFrom = !filters.fromDate || faq.updatedDate >= filters.fromDate;
      const matchesTo = !filters.toDate || faq.updatedDate <= filters.toDate;
      return matchesSearch && matchesStatus && matchesCategory && matchesFrom && matchesTo;
    });

    return [...result].sort((a, b) => {
      let left = a[filters.sortBy] ?? '';
      let right = b[filters.sortBy] ?? '';
      if (filters.sortBy === 'category') {
        left = categoryMap[a.categoryId]?.name ?? '';
        right = categoryMap[b.categoryId]?.name ?? '';
      }
      const comparison = String(left).localeCompare(String(right), 'vi', { numeric: true });
      return filters.sortOrder === 'ASC' ? comparison : -comparison;
    });
  }, [faqs, filters, categoryMap]);

  const handleSaveFaq = (payload) => {
    const now = '23/08/2026 19:54';
    if (payload.id) {
      setFaqs((items) => items.map((item) => item.id === payload.id ? { ...item, ...payload, updatedAt: now, updatedDate: '2026-08-23' } : item));
    } else {
      setFaqs((items) => [{ ...payload, id: Date.now(), creator: 'Admin PTIT', createdAt: now, updatedAt: now, updatedDate: '2026-08-23' }, ...items]);
    }
    setFaqModal({ open: false, item: null });
  };

  const handleDeleteFaq = (faq) => {
    if (window.confirm(`Bạn có chắc muốn xóa FAQ “${faq.question}”?`)) {
      setFaqs((items) => items.filter((item) => item.id !== faq.id));
    }
  };

  const handleStatusChange = (id, status) => {
    const now = '23/08/2026 19:54';
    setFaqs((items) => items.map((item) => (
      item.id === id ? { ...item, status, updatedAt: now, updatedDate: '2026-08-23' } : item
    )));
  };

  return (
    <div className='mx-auto max-w-[1600px]'>
      <FAQHeader
        onManageCategories={() => setCategoryModalOpen(true)}
        onCreateFaq={() => setFaqModal({ open: true, item: null })}
      />

      <FAQStatistics faqs={faqs} />

      <div className='mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_280px]'>
        <FAQTable
          faqs={filteredFaqs}
          categoryMap={categoryMap}
          onView={setDetailFaq}
          onEdit={(item) => setFaqModal({ open: true, item })}
          onDelete={handleDeleteFaq}
          onStatusChange={handleStatusChange}
        />

        <FAQFilter
          filters={filters}
          categories={categories}
          onChange={setFilters}
          onReset={() => setFilters(emptyFilters)}
        />
      </div>

      <FAQFormModal
        open={faqModal.open}
        faq={faqModal.item}
        categories={categories.filter((category) => category.status === 'ACTIVE')}
        onClose={() => setFaqModal({ open: false, item: null })}
        onSubmit={handleSaveFaq}
      />

      <FAQDetailModal
        faq={detailFaq}
        category={detailFaq ? categoryMap[detailFaq.categoryId] : null}
        onClose={() => setDetailFaq(null)}
      />

      <CategoryManagementModal
        open={categoryModalOpen}
        categories={categories}
        setCategories={setCategories}
        onClose={() => setCategoryModalOpen(false)}
      />
    </div>
  );
}

export default FAQ;
