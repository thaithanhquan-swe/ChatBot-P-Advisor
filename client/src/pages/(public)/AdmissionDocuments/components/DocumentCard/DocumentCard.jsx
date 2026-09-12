import { motion, useReducedMotion } from 'framer-motion';
import { CalendarDays, Download, FileText } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { formatDate, formatFileSize, getFileTypeLabel } from '../../constants/documents';

const typeStyle = {
  PDF: 'bg-red-50 text-red-600 border-red-100',
  DOCX: 'bg-blue-50 text-blue-600 border-blue-100',
  TXT: 'bg-slate-100 text-slate-600 border-slate-200',
};

const DocumentCard = ({ document, onPreview, onDownload }) => {
  const prefersReducedMotion = useReducedMotion();

  const typeLabel = document.type || getFileTypeLabel(document.fileType);

  const formattedDate = document.date || formatDate(document.updatedAt || document.createdAt);

  const formattedSize = document.size || formatFileSize(document.fileSize);

  return (
    <motion.article
      variants={{
        hidden: {
          opacity: 0,
          y: 18,
          scale: 0.985,
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              y: -4,
              scale: 1.006,
            }
      }
      transition={{
        type: 'spring',
        stiffness: 230,
        damping: 24,
      }}
      className='group flex min-h-[164px] flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-[0_3px_14px_rgba(15,23,42,0.025)] transition-[border-color,box-shadow] duration-300 hover:border-gray-300 hover:shadow-[0_10px_28px_rgba(15,23,42,0.07)]'
    >
      <div className='flex cursor-pointer gap-4' onClick={() => onPreview?.(document)}>
        <motion.div
          whileHover={
            prefersReducedMotion
              ? undefined
              : {
                  rotate: -3,
                  scale: 1.05,
                }
          }
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          className={`flex h-14 w-12 shrink-0 flex-col items-center justify-center rounded-lg border ${
            typeStyle[typeLabel] || typeStyle.TXT
          }`}
        >
          <FileText size={24} strokeWidth={1.8} />

          <span className='mt-0.5 text-[9px] font-extrabold'>{typeLabel}</span>
        </motion.div>

        <div className='min-w-0'>
          <h3 className='line-clamp-2 text-[15px] font-bold leading-5 text-gray-950 transition-colors duration-200 group-hover:text-(--primary-color)'>
            {document.title}
          </h3>

          <p className='mt-1.5 line-clamp-2 text-[12.5px] leading-5 text-gray-600'>
            {document.description || 'Không có mô tả.'}
          </p>
        </div>
      </div>

      <div className='mt-5 flex flex-wrap items-center justify-between gap-3'>
        <div className='flex items-center gap-2 text-[11.5px] text-gray-500'>
          <span className='inline-flex items-center gap-1.5'>
            <CalendarDays size={14} />
            {formattedDate}
          </span>

          <span>•</span>

          <Badge variant='outline' className='px-1.5 py-0 text-[10px] font-semibold'>
            {typeLabel}
          </Badge>

          <span>•</span>

          <span>{formattedSize}</span>
        </div>

        <motion.div
          whileHover={
            prefersReducedMotion
              ? undefined
              : {
                  scale: 1.03,
                }
          }
          whileTap={{
            scale: 0.97,
          }}
        >
          <Button
            type='button'
            onClick={(event) => {
              event.stopPropagation();
              onDownload(document);
            }}
            variant='outline'
            size='sm'
            className='h-9 gap-1.5 rounded-lg border-[#e6b6be] text-[12px] font-semibold text-(--primary-color) hover:bg-red-50 hover:text-(--primary-color)'
          >
            <Download size={15} />
            Tải xuống
          </Button>
        </motion.div>
      </div>
    </motion.article>
  );
};

export default DocumentCard;
