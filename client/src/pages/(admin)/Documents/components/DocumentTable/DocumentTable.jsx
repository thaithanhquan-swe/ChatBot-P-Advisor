import { FileSearch } from 'lucide-react';

import DocumentPagination from '../DocumentPagination/DocumentPagination';
import DocumentTableRow from '../DocumentTableRow/DocumentTableRow';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';

import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { Skeleton } from '@/components/ui/skeleton';

function DocumentTable({
  documents,
  totalItems,
  page,
  totalPages,
  pageSize,
  loading,
  onPageChange,
  onEdit,
  onDelete,
  onDownload,
}) {
  return (
    <Card className='min-w-0 overflow-hidden'>
      <CardHeader className='flex-row items-center justify-between space-y-0 border-b border-slate-100 px-4 py-4 sm:px-5'>
        <div>
          <CardTitle>Danh sách tài liệu</CardTitle>

          <p className='mt-1 text-[10px] text-slate-400'>Tìm thấy {totalItems} tài liệu phù hợp</p>
        </div>
      </CardHeader>

      <div className='overflow-x-auto'>
        <Table className='table-fixed border-collapse [&_tr>*:first-child]:w-[72%] [&_tr>*:last-child]:w-[28%] [&_tr>*:nth-child(n+2):nth-child(-n+6)]:hidden 2xl:min-w-[1100px] 2xl:table-auto 2xl:[&_tr>*:first-child]:w-auto 2xl:[&_tr>*:last-child]:w-auto 2xl:[&_tr>*:nth-child(n+2):nth-child(-n+6)]:table-cell'>
          <TableHeader>
            <TableRow className='bg-slate-50/80 hover:bg-slate-50/80'>
              {[
                'Tên tài liệu',
                'Tên file',
                'Loại file',
                'Trạng thái',
                'Ngày tạo',
                'Cập nhật lần cuối',
                'Thao tác',
              ].map((item) => (
                <TableHead
                  key={item}
                  className={`px-4 py-3 text-[10px] font-semibold text-slate-600 ${
                    item === 'Thao tác' ? 'text-right' : 'text-left'
                  }`}
                >
                  {item}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({
                      length: 7,
                    }).map((__, cellIndex) => (
                      <TableHead key={cellIndex}>
                        <Skeleton className='h-5 w-full' />
                      </TableHead>
                    ))}
                  </TableRow>
                ))
              : documents.map((document) => (
                  <DocumentTableRow
                    key={document.id}
                    document={document}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onDownload={onDownload}
                  />
                ))}
          </TableBody>
        </Table>

        {!loading && documents.length === 0 && (
          <div className='flex flex-col items-center justify-center px-6 py-16 text-center'>
            <FileSearch size={36} className='mb-3 text-slate-300' />

            <p className='text-sm font-semibold text-slate-600'>Không tìm thấy tài liệu</p>

            <p className='mt-1 text-xs text-slate-400'>
              Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.
            </p>
          </div>
        )}
      </div>

      {!loading && (
        <DocumentPagination
          page={page}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      )}
    </Card>
  );
}

export default DocumentTable;
