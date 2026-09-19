import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { toast } from 'sonner';

import { downloadDocumentFile, getDocuments } from '@/services/document-service';
import { FILE_TYPE_MAPPING } from './constants/documents';

import DocumentHero from './components/DocumentHero/DocumentHero';
import DocumentToolbar from './components/DocumentToolbar/DocumentToolbar';
import DocumentCard from './components/DocumentCard/DocumentCard';
import LatestDocuments from './components/LatestDocuments/LatestDocuments';
import HelpCard from './components/HelpCard/HelpCard';
import DocumentPagination from './components/DocumentPagination/DocumentPagination';
import DocumentPreviewModal from './components/DocumentPreviewModal/DocumentPreviewModal';

const ITEMS_PER_PAGE = 6;

const AdmissionDocuments = () => {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('Tất cả định dạng');
  const [sort, setSort] = useState('Mới nhất');
  const [page, setPage] = useState(1);

  const [documents, setDocuments] = useState([]);
  const [latestDocuments, setLatestDocuments] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [previewDocument, setPreviewDocument] = useState(null);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;

    const loadDocuments = async () => {
      try {
        setLoading(true);

        const fileTypeParam =
          type === 'Tất cả định dạng' ? undefined : FILE_TYPE_MAPPING[type] || type;

        let sortBy = 'updatedAt';
        let sortDirection = 'DESC';

        if (sort === 'Cũ nhất' || sort === 'oldest') {
          sortBy = 'createdAt';
          sortDirection = 'ASC';
        } else if (sort === 'Tên A - Z' || sort === 'name') {
          sortBy = 'title';
          sortDirection = 'ASC';
        }

        const result = await getDocuments({
          keyword: search.trim() || undefined,
          status: 'PUBLISHED',
          fileType: fileTypeParam,
          sortBy,
          sortDirection,
          page: page - 1,
          size: ITEMS_PER_PAGE,
        });

        if (cancelled) return;

        const items = result?.content ?? result?.data ?? result?.items ?? [];

        const total = result?.totalElements ?? result?.totalItems ?? result?.total ?? items.length;

        const pages = result?.totalPages ?? Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));

        setDocuments(items);
        setTotalItems(total);
        setTotalPages(pages);
      } catch (error) {
        if (cancelled) return;

        console.error(error);
        toast.error('Không thể tải danh sách tài liệu.');
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadDocuments();

    const handleFocus = () => {
      loadDocuments();
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleFocus);

    return () => {
      cancelled = true;

      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleFocus);
    };
  }, [search, type, sort, page]);

  useEffect(() => {
    let cancelled = false;

    const loadLatestDocuments = async () => {
      try {
        const result = await getDocuments({
          status: 'PUBLISHED',
          sortBy: 'updatedAt',
          sortDirection: 'DESC',
          page: 0,
          size: 5,
        });

        if (cancelled) return;

        const items = result?.content ?? result?.data ?? result?.items ?? [];

        setLatestDocuments(items);
      } catch (error) {
        if (!cancelled) {
          console.error(error);
        }
      }
    };

    loadLatestDocuments();

    const handleFocus = () => {
      loadLatestDocuments();
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleFocus);

    return () => {
      cancelled = true;

      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleFocus);
    };
  }, []);

  const changeSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const changeType = (value) => {
    setType(value);
    setPage(1);
  };

  const changeSort = (value) => {
    setSort(value);
    setPage(1);
  };

  const handleDownload = async (doc) => {
    if (!doc?.fileUrl) {
      toast.error('Tài liệu không có đường dẫn tải xuống');
      return;
    }

    let objectUrl;

    try {
      const fileBlob = await downloadDocumentFile(doc.fileUrl);

      objectUrl = window.URL.createObjectURL(fileBlob);

      const link = window.document.createElement('a');

      link.href = objectUrl;
      link.download = doc.fileName || doc.title || 'document';
      link.style.display = 'none';

      window.document.body.appendChild(link);

      link.click();
      link.remove();

      toast.success('Đang tải tài liệu xuống');
    } catch (error) {
      console.error(error);

      toast.error('Không thể tải tài liệu xuống');
    } finally {
      if (objectUrl) {
        window.setTimeout(() => window.URL.revokeObjectURL(objectUrl), 1000);
      }
    }
  };

  return (
    <div className='overflow-hidden bg-white'>
      <DocumentHero />

      <section className='container relative -mt-1 pb-12 pt-4 lg:pb-16'>
        <motion.div
          initial={
            prefersReducedMotion
              ? false
              : {
                  opacity: 0,
                  y: 18,
                  scale: 0.99,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            delay: 0.12,
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <DocumentToolbar
            search={search}
            onSearchChange={changeSearch}
            type={type}
            onTypeChange={changeType}
            sort={sort}
            onSortChange={changeSort}
          />
        </motion.div>

        <div className='mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_285px]'>
          <div>
            <motion.p
              initial={
                prefersReducedMotion
                  ? false
                  : {
                      opacity: 0,
                      x: -10,
                    }
              }
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.2,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className='mb-4 text-[13px] font-medium text-gray-700'
            >
              Tổng {totalItems} tài liệu
            </motion.p>

            {loading ? (
              <motion.div
                initial={
                  prefersReducedMotion
                    ? false
                    : {
                        opacity: 0,
                      }
                }
                animate={{
                  opacity: 1,
                }}
                className='rounded-xl border border-gray-100 py-16 text-center text-[13px] text-gray-500'
              >
                Đang tải dữ liệu...
              </motion.div>
            ) : documents.length > 0 ? (
              <motion.div
                key={`${page}-${search}-${type}-${sort}`}
                initial='hidden'
                animate='visible'
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.08,
                      delayChildren: 0.04,
                    },
                  },
                }}
                className='grid gap-4 md:grid-cols-2'
              >
                {documents.map((doc) => (
                  <DocumentCard
                    key={doc.id}
                    document={doc}
                    onPreview={setPreviewDocument}
                    onDownload={handleDownload}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={
                  prefersReducedMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 10,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className='rounded-xl border border-dashed border-gray-200 py-16 text-center text-[13px] text-gray-500'
              >
                Không tìm thấy tài liệu phù hợp.
              </motion.div>
            )}

            {!loading && documents.length > 0 && (
              <DocumentPagination page={page} totalPages={totalPages} onChange={setPage} />
            )}
          </div>

          <motion.div
            initial={
              prefersReducedMotion
                ? false
                : {
                    opacity: 0,
                    x: 20,
                  }
            }
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.28,
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className='space-y-4'
          >
            <LatestDocuments documents={latestDocuments} onSelect={setPreviewDocument} />

            <HelpCard />
          </motion.div>
        </div>
      </section>

      <DocumentPreviewModal
        document={previewDocument}
        onClose={() => setPreviewDocument(null)}
        onDownload={handleDownload}
      />
    </div>
  );
};

export default AdmissionDocuments;
