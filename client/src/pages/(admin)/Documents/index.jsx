import { useEffect, useMemo, useState } from 'react';
import DocumentHeader from './components/DocumentHeader/DocumentHeader';
import DocumentStatistics from './components/DocumentStatistics/DocumentStatistics';
import DocumentFilter from './components/DocumentFilter/DocumentFilter';
import DocumentTable from './components/DocumentTable/DocumentTable';
import DocumentFormModal from './components/DocumentFormModal/DocumentFormModal';
import DocumentDetailModal from './components/DocumentDetailModal/DocumentDetailModal';
import DeleteDocumentModal from './components/DeleteDocumentModal/DeleteDocumentModal';
import DocumentToast from './components/DocumentToast/DocumentToast';

const PAGE_SIZE = 10;

const initialDocuments = [
  {
    id: 1,
    title: 'Đề án tuyển sinh năm 2026',
    description: 'Thông tin phương thức tuyển sinh, chỉ tiêu và nguyên tắc xét tuyển năm 2026.',
    fileName: 'de-an-tuyen-sinh-2026.pdf',
    fileType: 'PDF',
    status: 'ACTIVE',
    createdAt: '12/08/2026 09:10',
    updatedAt: '22/08/2026 15:30',
    createdDate: '2026-08-12T09:10:00',
    updatedDate: '2026-08-22T15:30:00',
  },
  {
    id: 2,
    title: 'Quy định học phí và học bổng',
    description: 'Tổng hợp mức học phí và các chính sách học bổng dành cho sinh viên.',
    fileName: 'hoc-phi-hoc-bong.docx',
    fileType: 'DOCX',
    status: 'ACTIVE',
    createdAt: '11/08/2026 14:20',
    updatedAt: '21/08/2026 10:05',
    createdDate: '2026-08-11T14:20:00',
    updatedDate: '2026-08-21T10:05:00',
  },
  {
    id: 3,
    title: 'Danh sách ngành đào tạo',
    description: 'Danh sách ngành, mã ngành và thông tin chương trình đào tạo.',
    fileName: 'danh-sach-nganh.txt',
    fileType: 'TXT',
    status: 'ACTIVE',
    createdAt: '10/08/2026 08:30',
    updatedAt: '20/08/2026 16:40',
    createdDate: '2026-08-10T08:30:00',
    updatedDate: '2026-08-20T16:40:00',
  },
  {
    id: 4,
    title: 'Quy chế đào tạo đại học',
    description: 'Quy định liên quan đến học tập, tín chỉ, kiểm tra và đánh giá.',
    fileName: 'quy-che-dao-tao.pdf',
    fileType: 'PDF',
    status: 'PROCESSING',
    createdAt: '09/08/2026 11:25',
    updatedAt: '20/08/2026 09:15',
    createdDate: '2026-08-09T11:25:00',
    updatedDate: '2026-08-20T09:15:00',
  },
  {
    id: 5,
    title: 'Hướng dẫn đăng ký ký túc xá',
    description: 'Hướng dẫn thủ tục và điều kiện đăng ký ký túc xá.',
    fileName: 'huong-dan-ky-tuc-xa.pdf',
    fileType: 'PDF',
    status: 'INACTIVE',
    createdAt: '08/08/2026 15:00',
    updatedAt: '19/08/2026 13:20',
    createdDate: '2026-08-08T15:00:00',
    updatedDate: '2026-08-19T13:20:00',
  },
  {
    id: 6,
    title: 'Cẩm nang sinh viên 2026',
    description: 'Thông tin cần biết dành cho sinh viên trong năm học 2026.',
    fileName: 'cam-nang-sinh-vien-2026.pdf',
    fileType: 'PDF',
    status: 'ACTIVE',
    createdAt: '07/08/2026 10:10',
    updatedAt: '18/08/2026 17:25',
    createdDate: '2026-08-07T10:10:00',
    updatedDate: '2026-08-18T17:25:00',
  },
  {
    id: 7,
    title: 'Thông tin chương trình chất lượng cao',
    description: 'Giới thiệu chương trình, điều kiện học tập và học phí.',
    fileName: 'chuong-trinh-clc.docx',
    fileType: 'DOCX',
    status: 'FAILED',
    createdAt: '06/08/2026 13:45',
    updatedAt: '18/08/2026 08:45',
    createdDate: '2026-08-06T13:45:00',
    updatedDate: '2026-08-18T08:45:00',
  },
  {
    id: 8,
    title: 'Quy định xét tốt nghiệp',
    description: 'Điều kiện, thủ tục và tiêu chí xét công nhận tốt nghiệp.',
    fileName: 'quy-dinh-tot-nghiep.pdf',
    fileType: 'PDF',
    status: 'ACTIVE',
    createdAt: '05/08/2026 09:50',
    updatedAt: '17/08/2026 16:10',
    createdDate: '2026-08-05T09:50:00',
    updatedDate: '2026-08-17T16:10:00',
  },
  {
    id: 9,
    title: 'Thông tin liên hệ các khoa',
    description: 'Danh sách thông tin liên hệ của các khoa và đơn vị hỗ trợ.',
    fileName: 'lien-he-cac-khoa.txt',
    fileType: 'TXT',
    status: 'ACTIVE',
    createdAt: '04/08/2026 14:15',
    updatedAt: '16/08/2026 11:30',
    createdDate: '2026-08-04T14:15:00',
    updatedDate: '2026-08-16T11:30:00',
  },
  {
    id: 10,
    title: 'Quy trình đăng ký học phần',
    description: 'Hướng dẫn đăng ký, hủy và điều chỉnh học phần.',
    fileName: 'dang-ky-hoc-phan.docx',
    fileType: 'DOCX',
    status: 'ACTIVE',
    createdAt: '03/08/2026 08:20',
    updatedAt: '15/08/2026 14:50',
    createdDate: '2026-08-03T08:20:00',
    updatedDate: '2026-08-15T14:50:00',
  },
  {
    id: 11,
    title: 'Hướng dẫn sử dụng thư viện',
    description: 'Quy định mượn trả và sử dụng các dịch vụ thư viện.',
    fileName: 'huong-dan-thu-vien.pdf',
    fileType: 'PDF',
    status: 'INACTIVE',
    createdAt: '02/08/2026 10:35',
    updatedAt: '14/08/2026 09:20',
    createdDate: '2026-08-02T10:35:00',
    updatedDate: '2026-08-14T09:20:00',
  },
  {
    id: 12,
    title: 'Các câu hỏi tuyển sinh thường gặp',
    description: 'Nguồn dữ liệu văn bản bổ sung cho chatbot tư vấn tuyển sinh.',
    fileName: 'faq-tuyen-sinh.txt',
    fileType: 'TXT',
    status: 'PROCESSING',
    createdAt: '01/08/2026 16:00',
    updatedAt: '13/08/2026 12:10',
    createdDate: '2026-08-01T16:00:00',
    updatedDate: '2026-08-13T12:10:00',
  },
];

const emptyFilters = {
  search: '',
  status: 'ALL',
  fileType: 'ALL',
  sortBy: 'updatedAt',
  sortOrder: 'DESC',
};

function Documents() {
  const [documents, setDocuments] = useState(initialDocuments);
  const [filters, setFilters] = useState(emptyFilters);
  const [page, setPage] = useState(1);
  const [formModal, setFormModal] = useState({ open: false, item: null });
  const [detailDocument, setDetailDocument] = useState(null);
  const [deleteDocument, setDeleteDocument] = useState(null);
  const [toast, setToast] = useState('');

  const filteredDocuments = useMemo(() => {
    const search = filters.search.trim().toLowerCase();
    const result = documents.filter((document) => {
      const matchesSearch =
        !search ||
        document.title.toLowerCase().includes(search) ||
        document.fileName.toLowerCase().includes(search) ||
        document.description.toLowerCase().includes(search);
      const matchesStatus = filters.status === 'ALL' || document.status === filters.status;
      const matchesFileType = filters.fileType === 'ALL' || document.fileType === filters.fileType;
      return matchesSearch && matchesStatus && matchesFileType;
    });

    return [...result].sort((a, b) => {
      const fieldMap = {
        updatedAt: 'updatedDate',
        createdAt: 'createdDate',
      };
      const field = fieldMap[filters.sortBy] || filters.sortBy;
      const left = a[field] ?? '';
      const right = b[field] ?? '';
      const comparison = String(left).localeCompare(String(right), 'vi', { numeric: true });
      return filters.sortOrder === 'ASC' ? comparison : -comparison;
    });
  }, [documents, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredDocuments.length / PAGE_SIZE));

  const paginatedDocuments = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredDocuments.slice(start, start + PAGE_SIZE);
  }, [filteredDocuments, page]);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(''), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleSaveDocument = (payload) => {
    const nowText = '24/08/2026 23:40';
    const nowValue = '2026-08-24T23:40:00';

    if (payload.id) {
      setDocuments((items) =>
        items.map((item) =>
          item.id === payload.id
            ? {
                ...item,
                title: payload.title,
                description: payload.description,
                status: payload.status,
                updatedAt: nowText,
                updatedDate: nowValue,
              }
            : item
        )
      );
      setToast('Update document successfully');
    } else {
      const extension = payload.file?.name?.split('.').pop()?.toUpperCase() || 'FILE';
      setDocuments((items) => [
        {
          id: Date.now(),
          title: payload.title,
          description: payload.description,
          fileName: payload.file.name,
          fileType: extension,
          status: payload.status,
          createdAt: nowText,
          updatedAt: nowText,
          createdDate: nowValue,
          updatedDate: nowValue,
        },
        ...items,
      ]);
      setToast('Create document successfully');
      setPage(1);
    }

    setFormModal({ open: false, item: null });
  };

  const handleDeleteDocument = (document) => {
    setDocuments((items) => items.filter((item) => item.id !== document.id));
    setDeleteDocument(null);
    setToast('Delete document successfully');
  };

  return (
    <div className='mx-auto max-w-[1600px]'>
      <DocumentHeader onCreate={() => setFormModal({ open: true, item: null })} />

      <DocumentStatistics documents={documents} />
      <DocumentFilter
        filters={filters}
        onChange={setFilters}
        onReset={() => setFilters(emptyFilters)}
      />
      <div className='mt-5'>
        <DocumentTable
          documents={paginatedDocuments}
          totalItems={filteredDocuments.length}
          page={page}
          totalPages={totalPages}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
          onView={setDetailDocument}
          onEdit={(item) => setFormModal({ open: true, item })}
          onDelete={setDeleteDocument}
        />
      </div>

      <DocumentFormModal
        open={formModal.open}
        document={formModal.item}
        onClose={() => setFormModal({ open: false, item: null })}
        onSubmit={handleSaveDocument}
      />

      <DocumentDetailModal document={detailDocument} onClose={() => setDetailDocument(null)} />

      <DeleteDocumentModal
        document={deleteDocument}
        onClose={() => setDeleteDocument(null)}
        onConfirm={handleDeleteDocument}
      />

      <DocumentToast message={toast} onClose={() => setToast('')} />
    </div>
  );
}

export default Documents;
