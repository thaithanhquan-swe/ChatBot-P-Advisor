import { motion, useReducedMotion } from 'framer-motion';
import { FileText } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { formatDate, getFileTypeLabel } from '../../constants/documents';

const typeColor = {
  PDF: 'text-red-600 bg-red-50',
  DOCX: 'text-blue-600 bg-blue-50',
  TXT: 'text-slate-600 bg-slate-100',
};

const LatestDocuments = ({ documents = [], onSelect }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Card className='rounded-xl border-gray-200 bg-white shadow-none'>
      <CardHeader className='p-4 pb-2'>
        <CardTitle className='flex items-center gap-2 text-[14px] font-bold text-gray-950'>
          <FileText size={17} className='text-(--primary-color)' />
          Tài liệu mới nhất
        </CardTitle>
      </CardHeader>

      <CardContent className='divide-y divide-gray-100 p-4 pt-0'>
        {documents.length > 0 ? (
          documents.slice(0, 5).map((document, index) => {
            const typeLabel = document.type || getFileTypeLabel(document.fileType);

            const formattedDate =
              document.date || formatDate(document.updatedAt || document.createdAt);

            return (
              <motion.button
                key={document.id}
                type='button'
                onClick={() => onSelect(document)}
                initial={
                  prefersReducedMotion
                    ? false
                    : {
                        opacity: 0,
                        x: 14,
                      }
                }
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: index * 0.07,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        x: 3,
                      }
                }
                className='group flex w-full items-start gap-3 py-3 text-left'
              >
                <motion.span
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : {
                          scale: 1.08,
                          rotate: -3,
                        }
                  }
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                  }}
                  className={`mt-0.5 flex h-8 w-7 shrink-0 items-center justify-center rounded ${
                    typeColor[typeLabel] || typeColor.TXT
                  }`}
                >
                  <FileText size={16} />
                </motion.span>

                <span className='min-w-0'>
                  <span className='block line-clamp-2 text-[12px] font-medium leading-4.5 text-gray-900 transition-colors duration-200 group-hover:text-(--primary-color)'>
                    {document.title}
                  </span>

                  <span className='mt-0.5 block text-[10.5px] text-gray-500'>{formattedDate}</span>
                </span>
              </motion.button>
            );
          })
        ) : (
          <div className='py-6 text-center text-[12px] text-gray-400'>Chưa có tài liệu mới</div>
        )}
      </CardContent>
    </Card>
  );
};

export default LatestDocuments;
