import { useMemo, useState } from 'react';
import { MOCK_DOCUMENTS } from './constants/documents';
import DocumentHero from './components/DocumentHero/DocumentHero';
import DocumentToolbar from './components/DocumentToolbar/DocumentToolbar';
import DocumentCard from './components/DocumentCard/DocumentCard';
import LatestDocuments from './components/LatestDocuments/LatestDocuments';
import HelpCard from './components/HelpCard/HelpCard';
import DocumentPagination from './components/DocumentPagination/DocumentPagination';
import DocumentPreviewModal from './components/DocumentPreviewModal/DocumentPreviewModal';

const ITEMS_PER_PAGE = 6;

const toDateNumber = (value) => {
  const [day, month, year] = value.split('/').map(Number);
  return new Date(year, month - 1, day).getTime();
};

const AdmissionDocuments = () => {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('Tất cả định dạng');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [previewDocument, setPreviewDocument] = useState(null);

  const filteredDocuments = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    const result = MOCK_DOCUMENTS.filter((document) => {
      const matchesSearch = !keyword || `${document.title} ${document.description}`.toLowerCase().includes(keyword);
      const matchesType = type === 'Tất cả định dạng' || document.type === type;
      return matchesSearch && matchesType;
    });

    return [...result].sort((a, b) => {
      if (sort === 'oldest') return toDateNumber(a.date) - toDateNumber(b.date);
      if (sort === 'name') return a.title.localeCompare(b.title, 'vi');
      return toDateNumber(b.date) - toDateNumber(a.date);
    });
  }, [search, type, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredDocuments.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginatedDocuments = filteredDocuments.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const changeSearch = (value) => { setSearch(value); setPage(1); };
  const changeType = (value) => { setType(value); setPage(1); };
  const changeSort = (value) => { setSort(value); setPage(1); };

  const handleDownload = (document) => {
    const content = `${document.title}\n\n${document.description}\n\nNgày cập nhật: ${document.date}\nĐịnh dạng dự kiến: ${document.type}\nDung lượng dự kiến: ${document.size}\n\nDữ liệu mẫu frontend - sẽ thay bằng file thật khi tích hợp API.`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = window.document.createElement('a');
    anchor.href = url;
    anchor.download = `${document.title.replace(/[^a-zA-Z0-9À-ỹ\s-]/g, '').replace(/\s+/g, '-')}-demo.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className='bg-white'>
      <DocumentHero />

      <section className='container relative -mt-1 pb-12 pt-4 lg:pb-16'>
        <DocumentToolbar search={search} onSearchChange={changeSearch} type={type} onTypeChange={changeType} sort={sort} onSortChange={changeSort} />

        <div className='mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_285px]'>
          <div>
            <p className='mb-4 text-[13px] font-medium text-gray-700'>Tổng {filteredDocuments.length} tài liệu</p>

            {paginatedDocuments.length > 0 ? (
              <div className='grid gap-4 md:grid-cols-2'>
                {paginatedDocuments.map((document) => (
                  <DocumentCard key={document.id} document={document} onPreview={setPreviewDocument} onDownload={handleDownload} />
                ))}
              </div>
            ) : (
              <div className='rounded-xl border border-dashed border-gray-200 py-16 text-center text-[13px] text-gray-500'>
                Không tìm thấy tài liệu phù hợp.
              </div>
            )}

            <DocumentPagination page={currentPage} totalPages={totalPages} onChange={setPage} />
          </div>

          <div className='space-y-4'>
            <LatestDocuments documents={MOCK_DOCUMENTS} onSelect={setPreviewDocument} />
            <HelpCard />
          </div>
        </div>
      </section>

      <DocumentPreviewModal document={previewDocument} onClose={() => setPreviewDocument(null)} />
    </div>
  );
};

export default AdmissionDocuments;
