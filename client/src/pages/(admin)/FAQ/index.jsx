import { useEffect, useMemo, useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { toast } from 'sonner';

import { Card, CardContent } from '@/components/ui/card';
import { getApiErrorMessage } from '@/lib/http';

import { createFaq, deleteFaq, getFaqsForManagement, updateFaq } from '@/services/faq-service';

import { getFaqCategories } from '@/services/faq-category-service';

import FAQHeader from './components/FAQHeader/FAQHeader';
import FaqFilters from './components/FAQFilter/FAQFilter';
import FaqTable from './components/FAQTable/FAQTable';
import FaqDetailDialog from './components/FaqDetailDialog/FaqDetailDialog';
import FaqFormDialog from './components/FaqFormDialog/FaqFormDialog';
import CategoryManagementDialog from './components/CategoryManagementDialog/CategoryManagementDialog';

const DEFAULT_FILTERS = {
  keyword: '',
  status: 'ALL',
  faqCategoryId: 'ALL',
  updatedFrom: '',
  updatedTo: '',
  sortBy: 'updatedAt',
  sortDirection: 'DESC',
};

function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [categories, setCategories] = useState([]);

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [debouncedKeyword, setDebouncedKeyword] = useState('');

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formDialog, setFormDialog] = useState({
    open: false,
    faq: null,
  });

  const [detailFaq, setDetailFaq] = useState(null);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);

  const categoryMap = useMemo(
    () => Object.fromEntries(categories.map((category) => [String(category.id), category])),
    [categories]
  );

  useEffect(() => {
    let cancelled = false;

    async function fetchCategories() {
      try {
        const data = await getFaqCategories({
          page: 0,
          size: 100,
        });

        if (!cancelled) {
          setCategories(data.content ?? []);
        }
      } catch (error) {
        if (!cancelled) {
          console.error('Failed to load FAQ categories:', error);

          toast.error(getApiErrorMessage(error, 'Không thể tải danh mục FAQ.'));
        }
      }
    }

    fetchCategories();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(filters.keyword.trim());
      setPage(0);
    }, 400);

    return () => clearTimeout(timer);
  }, [filters.keyword]);

  useEffect(() => {
    let cancelled = false;

    async function fetchFaqs() {
      try {
        setLoading(true);

        const data = await getFaqsForManagement({
          keyword: debouncedKeyword || undefined,
          status: filters.status === 'ALL' ? undefined : filters.status,
          faqCategoryId: filters.faqCategoryId === 'ALL' ? undefined : filters.faqCategoryId,
          updatedFrom: filters.updatedFrom || undefined,
          updatedTo: filters.updatedTo || undefined,
          sortBy: filters.sortBy,
          sortDirection: filters.sortDirection,
          page,
          size,
        });

        if (cancelled) return;

        setFaqs(data.content ?? []);
        setTotalElements(data.totalElements ?? 0);
        setTotalPages(data.totalPages ?? 0);
      } catch (error) {
        if (!cancelled) {
          console.error('Failed to load FAQs:', error);

          toast.error(getApiErrorMessage(error, 'Không thể tải danh sách FAQ.'));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchFaqs();

    return () => {
      cancelled = true;
    };
  }, [
    debouncedKeyword,
    filters.status,
    filters.faqCategoryId,
    filters.updatedFrom,
    filters.updatedTo,
    filters.sortBy,
    filters.sortDirection,
    page,
    size,
  ]);

  async function reloadFaqs() {
    try {
      setLoading(true);

      const data = await getFaqsForManagement({
        keyword: debouncedKeyword || undefined,
        status: filters.status === 'ALL' ? undefined : filters.status,
        faqCategoryId: filters.faqCategoryId === 'ALL' ? undefined : filters.faqCategoryId,
        updatedFrom: filters.updatedFrom || undefined,
        updatedTo: filters.updatedTo || undefined,
        sortBy: filters.sortBy,
        sortDirection: filters.sortDirection,
        page,
        size,
      });

      setFaqs(data.content ?? []);
      setTotalElements(data.totalElements ?? 0);
      setTotalPages(data.totalPages ?? 0);
    } catch (error) {
      console.error('Failed to reload FAQs:', error);

      toast.error(getApiErrorMessage(error, 'Không thể tải lại danh sách FAQ.'));
    } finally {
      setLoading(false);
    }
  }

  async function reloadCategories() {
    try {
      const data = await getFaqCategories({
        page: 0,
        size: 100,
      });

      setCategories(data.content ?? []);
    } catch (error) {
      console.error('Failed to reload FAQ categories:', error);

      toast.error(getApiErrorMessage(error, 'Không thể tải lại danh mục FAQ.'));
    }
  }

  const handleFilterChange = (name, value) => {
    setFilters((current) => ({
      ...current,
      [name]: value,
    }));

    if (name !== 'keyword') {
      setPage(0);
    }
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setDebouncedKeyword('');
    setPage(0);
  };

  const handleSaveFaq = async (payload) => {
    try {
      setSaving(true);

      if (formDialog.faq) {
        await updateFaq(formDialog.faq.id, payload);

        toast.success('Đã cập nhật FAQ.');
      } else {
        await createFaq(payload);

        toast.success('Đã tạo FAQ.');
      }

      setFormDialog({
        open: false,
        faq: null,
      });

      await reloadFaqs();
    } catch (error) {
      console.error('Failed to save FAQ:', error);

      toast.error(getApiErrorMessage(error, 'Không thể lưu FAQ.'));
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteFaq = async (id) => {
    try {
      await deleteFaq(id);

      toast.success('Đã xóa FAQ.');

      await reloadFaqs();
    } catch (error) {
      console.error('Failed to delete FAQ:', error);

      toast.error(getApiErrorMessage(error, 'Không thể xóa FAQ.'));
    }
  };

  const handleStatusChange = async (faq, status) => {
    try {
      await updateFaq(faq.id, {
        question: faq.question,
        answer: faq.answer,
        faqCategoryId: faq.faqCategoryId,
        status,
      });

      toast.success('Đã cập nhật trạng thái FAQ.');

      await reloadFaqs();
    } catch (error) {
      console.error('Failed to update FAQ status:', error);

      toast.error(getApiErrorMessage(error, 'Không thể cập nhật trạng thái FAQ.'));
    }
  };

  return (
    <div className='mx-auto max-w-[1600px] space-y-5'>
      <FAQHeader
        onManageCategories={() => setCategoryDialogOpen(true)}
        onCreateFaq={() =>
          setFormDialog({
            open: true,
            faq: null,
          })
        }
      />

      <Card>
        <CardContent className='flex items-center gap-4 p-5'>
          <div className='flex size-10 items-center justify-center rounded-lg bg-muted'>
            <HelpCircle className='size-5' />
          </div>

          <div>
            <p className='text-sm text-muted-foreground'>Kết quả phù hợp</p>

            <p className='text-2xl font-bold'>{totalElements}</p>
          </div>
        </CardContent>
      </Card>

      <FaqFilters
        filters={filters}
        categories={categories}
        onChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      <FaqTable
        faqs={faqs}
        categoryMap={categoryMap}
        loading={loading}
        page={page}
        size={size}
        totalElements={totalElements}
        totalPages={totalPages}
        onPageChange={setPage}
        onSizeChange={(value) => {
          setSize(value);
          setPage(0);
        }}
        onView={setDetailFaq}
        onEdit={(faq) =>
          setFormDialog({
            open: true,
            faq,
          })
        }
        onDelete={handleDeleteFaq}
        onStatusChange={handleStatusChange}
      />

      {formDialog.open && (
        <FaqFormDialog
          open
          faq={formDialog.faq}
          categories={categories}
          saving={saving}
          onOpenChange={(open) => {
            if (!open) {
              setFormDialog({
                open: false,
                faq: null,
              });
            }
          }}
          onSubmit={handleSaveFaq}
        />
      )}

      <FaqDetailDialog
        faq={detailFaq}
        category={detailFaq ? categoryMap[String(detailFaq.faqCategoryId)] : null}
        onOpenChange={(open) => {
          if (!open) {
            setDetailFaq(null);
          }
        }}
      />

      <CategoryManagementDialog
        open={categoryDialogOpen}
        categories={categories}
        onOpenChange={setCategoryDialogOpen}
        onChanged={reloadCategories}
      />
    </div>
  );
}

export default FAQ;
