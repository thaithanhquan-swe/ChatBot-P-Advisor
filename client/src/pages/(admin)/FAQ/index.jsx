import { useEffect, useMemo, useState } from 'react';
import FAQHeader from './components/FAQHeader/FAQHeader';
import FAQStatistics from './components/FAQStatistics/FAQStatistics';
import FAQFilter from './components/FAQFilter/FAQFilter';
import FAQTable from './components/FAQTable/FAQTable';
import FAQFormModal from './components/FAQFormModal/FAQFormModal';
import FAQDetailModal from './components/FAQDetailModal/FAQDetailModal';
import CategoryManagementModal from './components/CategoryManagementModal/CategoryManagementModal';
import {
  getFaqsForManagement,
  createFaq,
  updateFaq,
  deleteFaq,
} from '../../../services/faq-service';

import {
  getFaqCategories,
  createFaqCategory,
  updateFaqCategory,
  deleteFaqCategory,
} from '../../../services/faq-category-service';

const initialCategories = [
  {
    id: 1,
    name: 'Tuyển sinh',
    description: 'Thông tin tuyển sinh, phương thức xét tuyển và điểm chuẩn.',
    status: 'ACTIVE',
    createdAt: '01/05/2026 09:00',
    updatedAt: '15/08/2026 14:20',
  },
  {
    id: 2,
    name: 'Học phí - Học bổng',
    description: 'Thông tin học phí, chính sách miễn giảm và học bổng.',
    status: 'ACTIVE',
    createdAt: '02/05/2026 10:10',
    updatedAt: '14/08/2026 09:15',
  },
  {
    id: 3,
    name: 'Ngành học',
    description: 'Thông tin các ngành và chương trình đào tạo.',
    status: 'ACTIVE',
    createdAt: '03/05/2026 08:30',
    updatedAt: '12/08/2026 16:40',
  },
  {
    id: 4,
    name: 'Đời sống sinh viên',
    description: 'Ký túc xá, câu lạc bộ và hoạt động sinh viên.',
    status: 'INACTIVE',
    createdAt: '05/05/2026 11:00',
    updatedAt: '10/08/2026 13:05',
  },
];

const initialFaqs = [
  {
    id: 1,
    question: 'Năm 2026 Học viện có những phương thức xét tuyển nào?',
    answer:
      'Học viện áp dụng các phương thức xét tuyển theo đề án tuyển sinh được công bố chính thức, bao gồm xét tuyển theo kết quả thi và các phương thức phù hợp khác.',
    categoryId: 1,
    status: 'PUBLISHED',
    creator: 'Admin PTIT',
    createdAt: '18/08/2026 09:30',
    updatedAt: '22/08/2026 15:10',
    updatedDate: '2026-08-22',
  },
  {
    id: 2,
    question: 'Học phí chương trình đại trà được tính như thế nào?',
    answer:
      'Học phí được tính theo số tín chỉ đăng ký và mức thu áp dụng cho từng năm học, ngành học theo quy định của Học viện.',
    categoryId: 2,
    status: 'PUBLISHED',
    creator: 'Admin PTIT',
    createdAt: '17/08/2026 14:00',
    updatedAt: '21/08/2026 10:25',
    updatedDate: '2026-08-21',
  },
  {
    id: 3,
    question: 'Ngành Công nghệ thông tin đào tạo những chuyên ngành nào?',
    answer:
      'Nội dung chuyên ngành được tổ chức theo chương trình đào tạo hiện hành của Học viện. Sinh viên được học kiến thức nền tảng và các học phần chuyên sâu theo định hướng.',
    categoryId: 3,
    status: 'DRAFT',
    creator: 'Cán bộ TS',
    createdAt: '16/08/2026 08:45',
    updatedAt: '20/08/2026 16:05',
    updatedDate: '2026-08-20',
  },
  {
    id: 4,
    question: 'Sinh viên có thể đăng ký ở ký túc xá không?',
    answer:
      'Sinh viên có nhu cầu có thể đăng ký ký túc xá theo thông báo và chỉ tiêu từng năm của Học viện.',
    categoryId: 4,
    status: 'HIDDEN',
    creator: 'Admin PTIT',
    createdAt: '15/08/2026 11:20',
    updatedAt: '19/08/2026 09:00',
    updatedDate: '2026-08-19',
  },
  {
    id: 5,
    question: 'Có học bổng dành cho sinh viên có thành tích tốt không?',
    answer:
      'Học viện có các chính sách học bổng khuyến khích học tập và các chương trình học bổng khác theo từng thời kỳ.',
    categoryId: 2,
    status: 'PUBLISHED',
    creator: 'Admin PTIT',
    createdAt: '14/08/2026 13:35',
    updatedAt: '18/08/2026 14:45',
    updatedDate: '2026-08-18',
  },
];

const emptyFilters = {
  search: '',
  status: 'ALL',
  faqCategoryId: 'ALL',
  fromDate: '',
  toDate: '',
  sortBy: 'updatedAt',
  sortOrder: 'DESC',
};

function FAQ() {
  // const [categories, setCategories] = useState(initialCategories);
  // const [faqs, setFaqs] = useState(initialFaqs);
  const [categories, setCategories] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [faqStats, setFaqStats] = useState({ total: 0, published: 0, draft: 0, hidden: 0,});
  const [totalFaqs, setTotalFaqs] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState(emptyFilters);
  const [faqModal, setFaqModal] = useState({ open: false, item: null });
  const [detailFaq, setDetailFaq] = useState(null);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const loadFaqs = async () => {
    try {
      const data = await getFaqsForManagement({
        keyword: debouncedSearch || undefined,
        status: filters.status === 'ALL' ? undefined : filters.status,
        faqCategoryId:
          filters.faqCategoryId === 'ALL' ? undefined : filters.faqCategoryId,
        updatedFrom: filters.fromDate || undefined,
        updatedTo: filters.toDate || undefined,
        sortBy: filters.sortBy,
        sortDirection: filters.sortOrder,
        page: page,
        size: pageSize,
      });

      setFaqs(data.content || []);
      setTotalFaqs(data.totalElements || 0);
      setTotalPages(data.totalPages || 1);
    }catch (error) {
        console.error('Lỗi tải FAQ:', error);
      }
  };

  const loadFaqStats = async () => {
    try {
      const [allData, publishedData, draftData, hiddenData] = await Promise.all([
        getFaqsForManagement({
          page: 0,
          size: 1,
        }),

        getFaqsForManagement({
          status: 'PUBLISHED',
          page: 0,
          size: 1,
        }),

        getFaqsForManagement({
          status: 'DRAFT',
          page: 0,
          size: 1,
        }),

        getFaqsForManagement({
          status: 'HIDDEN',
          page: 0,
          size: 1,
        }),
      ]);

      setFaqStats({
        total: allData.totalElements || 0,
        published: publishedData.totalElements || 0,
        draft: draftData.totalElements || 0,
        hidden: hiddenData.totalElements || 0,
      });
    } catch (error) {
      console.error('Lỗi tải thống kê FAQ:', error);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await getFaqCategories({
        page: 0,
        size: 100,
      });

      // console.log('CATEGORY API:', data);
      // console.log('CATEGORIES:', data.content);
      
      // console.log(
      //   'CATEGORY STATUS:',
      //   data.content.map((item) => ({
      //     name: item.name,
      //     status: item.status,
      //   }))
      // );

      setCategories(data.content || []);
    } catch (error) {
        console.error('Lỗi tải danh mục FAQ:', error);
      }
  };

  useEffect(() => {
    loadFaqs();
  }, [
    debouncedSearch,
    filters.status,
    filters.faqCategoryId,
    filters.fromDate,
    filters.toDate,
    filters.sortBy,
    filters.sortOrder,
    page,
    pageSize,
  ]);

  useEffect(() => {
    loadCategories();
    loadFaqStats();
  }, []);

  useEffect(() => {
    setPage(0);
  }, [
    debouncedSearch,
    filters.status,
    filters.faqCategoryId,
    filters.fromDate,
    filters.toDate,
    filters.sortBy,
    filters.sortOrder,
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 400);

    return () => clearTimeout(timer);
  }, [filters.search]);

  const categoryMap = useMemo(
    () => Object.fromEntries(categories.map((category) => [category.id, category])),
    [categories]
  );

  

  const handleSaveFaq = async (payload) => {
    try {
      if (payload.id) {
        await updateFaq(payload.id, {
          question: payload.question,
          answer: payload.answer,
          faqCategoryId: payload.faqCategoryId,
          status: payload.status,
        });
      } else {
          await createFaq({
            question: payload.question,
            answer: payload.answer,
            faqCategoryId: payload.faqCategoryId,
            status: payload.status,
          });
        }

      setFaqModal({ open: false, item: null });

      await loadFaqs();
      await loadFaqStats();
    } catch (error) {
      console.error('Lỗi lưu FAQ:', error);
    }
  };

  const handleDeleteFaq = async (faq) => {
    if (!window.confirm(`Bạn có chắc muốn xóa FAQ “${faq.question}”?`)) {
      return;
    }

    try {
      await deleteFaq(faq.id);

      await loadFaqs();
      await loadFaqStats();
    } catch (error) {
        console.error('Lỗi xóa FAQ:', error);
      }
  };

  const handleStatusChange = async (id, status) => {
    const faq = faqs.find((item) => item.id === id);

    if (!faq) return;

    try {
      await updateFaq(id, {
        question: faq.question,
        answer: faq.answer,
        faqCategoryId: faq.faqCategoryId,
        status,
      });

      await loadFaqs();
      await loadFaqStats();
    } catch (error) {
      console.error('Lỗi cập nhật trạng thái FAQ:', error);
    }
  };

  return (
    <div className='mx-auto max-w-[1600px]'>
      <FAQHeader
        onManageCategories={() => setCategoryModalOpen(true)}
        onCreateFaq={() => setFaqModal({ open: true, item: null })}
      />

      <FAQStatistics stats={faqStats} />
      <FAQFilter
        filters={filters}
        categories={categories}
        onChange={setFilters}
        onReset={() => setFilters(emptyFilters)}
      />
      <div className='mt-5'>
        <FAQTable
          faqs={faqs}
          categoryMap={categoryMap}
          onView={setDetailFaq}
          onEdit={(item) => setFaqModal({ open: true, item })}
          onDelete={handleDeleteFaq}
          onStatusChange={handleStatusChange}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          totalFaqs={totalFaqs}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      </div>

      <FAQFormModal
        open={faqModal.open}
        faq={faqModal.item}
        // categories={categories.filter((category) => category.status === 'ACTIVE')}
        categories={categories}
        onClose={() => setFaqModal({ open: false, item: null })}
        onSubmit={handleSaveFaq}
      />

      <FAQDetailModal
        faq={detailFaq}
        category={detailFaq ? categoryMap[detailFaq.faqCategoryId] : null}
        onClose={() => setDetailFaq(null)}
      />

      <CategoryManagementModal
        open={categoryModalOpen}
        categories={categories}
        loadCategories={loadCategories}
        onClose={() => setCategoryModalOpen(false)}
      />
    </div>
  );
}

export default FAQ;
