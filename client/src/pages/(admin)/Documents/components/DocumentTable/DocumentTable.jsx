import { FileSearch } from 'lucide-react';
import DocumentPagination from '../DocumentPagination/DocumentPagination';
import DocumentTableRow from '../DocumentTableRow/DocumentTableRow';

function DocumentTable({
  documents,
  totalItems,
  page,
  totalPages,
  pageSize,
  onPageChange,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <section className='min-w-0 rounded-xl border border-slate-200 bg-white'>
      <div className='flex items-center justify-between border-b border-slate-100 px-5 py-4'>
        <div>
          <h2 className='text-[14px] font-bold text-slate-900'>Danh sách tài liệu</h2>
          <p className='mt-1 text-[10px] text-slate-400'>Tìm thấy {totalItems} tài liệu phù hợp</p>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full min-w-[1100px] border-collapse'>
          <thead>
            <tr className='border-b border-slate-200 bg-slate-50/80'>
              {[
                'Tên tài liệu',
                'Tên file',
                'Loại file',
                'Trạng thái',
                'Ngày tạo',
                'Cập nhật lần cuối',
                'Thao tác',
              ].map((item) => (
                <th
                  key={item}
                  className={`px-4 py-3 text-[10px] font-semibold text-slate-600 ${item === 'Thao tác' ? 'text-right' : 'text-left'}`}
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {documents.map((document) => (
              <DocumentTableRow
                key={document.id}
                document={document}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>

        {documents.length === 0 && (
          <div className='flex flex-col items-center justify-center px-6 py-16 text-center'>
            <FileSearch size={36} className='mb-3 text-slate-300' />
            <p className='text-sm font-semibold text-slate-600'>Không tìm thấy tài liệu</p>
            <p className='mt-1 text-xs text-slate-400'>
              Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.
            </p>
          </div>
        )}
      </div>

      <DocumentPagination
        page={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </section>
  );
}

export default DocumentTable;
