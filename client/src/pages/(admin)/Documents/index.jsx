import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import DocumentHeader from './components/DocumentHeader/DocumentHeader';
import DocumentStatistics from './components/DocumentStatistics/DocumentStatistics';
import DocumentFilter from './components/DocumentFilter/DocumentFilter';
import DocumentTable from './components/DocumentTable/DocumentTable';
import DocumentFormModal from './components/DocumentFormModal/DocumentFormModal';
import DocumentDetailModal from './components/DocumentDetailModal/DocumentDetailModal';
import DeleteDocumentModal from './components/DeleteDocumentModal/DeleteDocumentModal';

import {
  createDocument,
  deleteDocument,
  getDocumentById,
  getDocuments,
  updateDocument,
} from '@/services/document-service';

const PAGE_SIZE = 10;

const EMPTY_FILTERS = {
  search: '',
  status: 'ALL',
  fileType: 'ALL',
  sortBy: 'updatedAt',
  sortOrder: 'DESC',
};

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [page, setPage] = useState(1);

  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [formModal, setFormModal] = useState({
    open: false,
    item: null,
  });

  const [detailDocument, setDetailDocument] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const loadDocuments = async () => {
      try {
        setLoading(true);

        const result = await getDocuments({
          keyword: filters.search.trim() || undefined,
          status: filters.status === 'ALL' ? undefined : filters.status,
          fileType: filters.fileType === 'ALL' ? undefined : filters.fileType,
          sortBy: filters.sortBy,
          sortDirection: filters.sortOrder,
          page: page - 1,
          size: PAGE_SIZE,
        });

        if (cancelled) return;

        const items = result?.data ?? result?.content ?? result?.items ?? [];

        const total = result?.totalElements ?? result?.totalItems ?? result?.total ?? items.length;

        const pages = result?.totalPages ?? Math.ceil(total / PAGE_SIZE);

        setDocuments(items);
        setTotalItems(total);
        setTotalPages(pages);
      } catch (error) {
        if (cancelled) return;

        console.error(error);
        toast.error('Không thể tải danh sách tài liệu');
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadDocuments();

    return () => {
      cancelled = true;
    };
  }, [filters, page]);

  const reloadDocuments = async () => {
    try {
      const result = await getDocuments({
        keyword: filters.search.trim() || undefined,
        status: filters.status === 'ALL' ? undefined : filters.status,
        fileType: filters.fileType === 'ALL' ? undefined : filters.fileType,
        sortBy: filters.sortBy,
        sortDirection: filters.sortOrder,
        page: page - 1,
        size: PAGE_SIZE,
      });

      const items = result?.data ?? result?.content ?? result?.items ?? [];

      const total = result?.totalElements ?? result?.totalItems ?? result?.total ?? items.length;

      const pages = result?.totalPages ?? Math.ceil(total / PAGE_SIZE);

      setDocuments(items);
      setTotalItems(total);
      setTotalPages(pages);
    } catch (error) {
      console.error(error);
      toast.error('Không thể tải lại danh sách tài liệu');
    }
  };

  const handleFilterChange = (updater) => {
    setFilters((current) => (typeof updater === 'function' ? updater(current) : updater));

    setPage(1);
  };

  const handleResetFilter = () => {
    setFilters(EMPTY_FILTERS);
    setPage(1);
  };

  const handleViewDocument = async (document) => {
    try {
      const result = await getDocumentById(document.id);
      setDetailDocument(result);
    } catch (error) {
      console.error(error);
      toast.error('Không thể tải chi tiết tài liệu');
    }
  };

  const handleSaveDocument = async (payload) => {
    try {
      setSaving(true);

      if (payload.id) {
        await updateDocument(payload.id, {
          title: payload.title,
          description: payload.description,
          status: payload.status,
        });

        toast.success('Cập nhật tài liệu thành công');
      } else {
        await createDocument(payload.file, {
          title: payload.title,
          description: payload.description,
          status: payload.status,
        });

        toast.success('Thêm tài liệu thành công');
      }

      setFormModal({
        open: false,
        item: null,
      });

      await reloadDocuments();
    } catch (error) {
      console.error(error);

      toast.error(payload.id ? 'Cập nhật tài liệu thất bại' : 'Thêm tài liệu thất bại');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteDocument = async (document) => {
    try {
      setDeleting(true);

      await deleteDocument(document.id);

      toast.success('Xóa tài liệu thành công');
      setDeleteTarget(null);

      if (documents.length === 1 && page > 1) {
        setPage((current) => current - 1);
      } else {
        await reloadDocuments();
      }
    } catch (error) {
      console.error(error);
      toast.error('Xóa tài liệu thất bại');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className='mx-auto max-w-[1600px]'>
      <DocumentHeader
        onCreate={() =>
          setFormModal({
            open: true,
            item: null,
          })
        }
      />

      <DocumentStatistics documents={documents} totalItems={totalItems} />

      <DocumentFilter filters={filters} onChange={handleFilterChange} onReset={handleResetFilter} />

      <div className='mt-5'>
        <DocumentTable
          documents={documents}
          totalItems={totalItems}
          page={page}
          totalPages={totalPages}
          pageSize={PAGE_SIZE}
          loading={loading}
          onPageChange={setPage}
          onView={handleViewDocument}
          onEdit={(item) =>
            setFormModal({
              open: true,
              item,
            })
          }
          onDelete={setDeleteTarget}
        />
      </div>

      {formModal.open && (
        <DocumentFormModal
          key={formModal.item?.id ?? 'create'}
          open={formModal.open}
          document={formModal.item}
          loading={saving}
          onClose={() =>
            setFormModal({
              open: false,
              item: null,
            })
          }
          onSubmit={handleSaveDocument}
        />
      )}

      <DocumentDetailModal document={detailDocument} onClose={() => setDetailDocument(null)} />

      <DeleteDocumentModal
        document={deleteTarget}
        loading={deleting}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteDocument}
      />
    </div>
  );
}

export default Documents;
