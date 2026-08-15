import FAQTableRow from '../FAQTableRow/FAQTableRow';

const documents = [
  {
    code: 'FAQ-TS-001',
    title: 'Điểm chuẩn tuyển sinh năm 2025',
    category: 'Tuyển sinh',
    status: 'Đã xuất bản',
    views: '1,248',
    updatedAt: '15/05/2025 10:30',
    updatedBy: 'Admin PTIT',
  },
  {
    code: 'FAQ-TS-002',
    title: 'Các phương thức xét tuyển 2025',
    category: 'Tuyển sinh',
    status: 'Đã xuất bản',
    views: '956',
    updatedAt: '15/05/2025 09:15',
    updatedBy: 'Admin PTIT',
  },
  {
    code: 'FAQ-HP-001',
    title: 'Học phí chương trình đại trà',
    category: 'Học phí – Học bổng',
    status: 'Đã xuất bản',
    views: '1,532',
    updatedAt: '14/05/2025 16:45',
    updatedBy: 'Admin PTIT',
  },
  {
    code: 'FAQ-HP-002',
    title: 'Học phí chương trình chất lượng cao',
    category: 'Học phí – Học bổng',
    status: 'Bản nháp',
    views: '-',
    updatedAt: '15/05/2025 11:20',
    updatedBy: 'Admin PTIT',
  },
  {
    code: 'FAQ-NH-001',
    title: 'Ngành Công nghệ thông tin',
    category: 'Ngành học',
    status: 'Đã xuất bản',
    views: '2,145',
    updatedAt: '13/05/2025 08:30',
    updatedBy: 'Admin PTIT',
  },
  {
    code: 'FAQ-NH-002',
    title: 'Ngành An toàn thông tin',
    category: 'Ngành học',
    status: 'Đã xuất bản',
    views: '1,789',
    updatedAt: '12/05/2025 14:20',
    updatedBy: 'Admin PTIT',
  },
  {
    code: 'FAQ-KH-001',
    title: 'Thông tin ký túc xá',
    category: 'Khác',
    status: 'Đã lưu trữ',
    views: '423',
    updatedAt: '10/05/2025 09:10',
    updatedBy: 'Admin PTIT',
  },
  {
    code: 'FAQ-HP-003',
    title: 'Chính sách học bổng 2025',
    category: 'Học phí – Học bổng',
    status: 'Đã xuất bản',
    views: '887',
    updatedAt: '09/05/2025 15:00',
    updatedBy: 'Admin PTIT',
  },
];

function FAQTable() {
  return (
    <div className='overflow-x-auto rounded-lg border border-slate-200'>
      <table className='w-full min-w-225 border-collapse'>
        <thead>
          <tr className='border-b border-slate-200 bg-slate-50/70'>
            <th className='px-3 py-3 text-left text-[10px] font-semibold text-slate-600'>
              Tiêu đề
            </th>

            <th className='px-3 py-3 text-left text-[10px] font-semibold text-slate-600'>
              Danh mục
            </th>

            <th className='px-3 py-3 text-left text-[10px] font-semibold text-slate-600'>
              Trạng thái
            </th>

            <th className='px-3 py-3 text-left text-[10px] font-semibold text-slate-600'>
              Lượt xem
            </th>

            <th className='px-3 py-3 text-left text-[10px] font-semibold text-slate-600'>
              Cập nhật lần cuối
            </th>

            <th className='px-3 py-3 text-right text-[10px] font-semibold text-slate-600'>
              Thao tác
            </th>
          </tr>
        </thead>

        <tbody>
          {documents.map((document) => (
            <FAQTableRow key={document.code} document={document} />
          ))}
        </tbody>
      </table>

      <div className='flex flex-col gap-3 border-t border-slate-200 px-3 py-3 sm:flex-row sm:items-center sm:justify-between'>
        <p className='text-[10px] text-slate-500'>Hiển thị 1 đến 8 trong tổng số 358 tài liệu</p>

        <div className='flex items-center gap-1'>
          {['‹', '1', '2', '3', '4', '5', '…', '36', '›'].map((item, index) => (
            <button
              key={index}
              type='button'
              className={`flex h-7 min-w-7 items-center justify-center rounded-md border px-2 text-[10px] ${
                item === '1'
                  ? 'border-[#D71920] bg-[#D71920] text-white'
                  : 'border-slate-200 text-slate-600 hover:border-red-200 hover:text-[#D71920]'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQTable;
