import { ChevronDown, Download, Eye, MoreVertical, Reply, Search } from 'lucide-react';

const questions = [
  [
    'PQ-2025-0051',
    'Điểm chuẩn ngành CNTT năm 2025 là bao nhiêu?',
    'Tuyển sinh',
    'nguyenvan.a@gmail.com',
    'Sinh viên',
    'Cao',
    'Chưa xử lý',
    '15/05/2025 10:30',
    '10 phút trước',
    true,
  ],
  [
    'PQ-2025-0050',
    'Học phí chương trình chất lượng cao là bao nhiêu?',
    'Học phí - Học bổng',
    'tranhb@gmail.com',
    'Phụ huynh',
    'Trung bình',
    'Đang xử lý',
    '15/05/2025 09:45',
    '55 phút trước',
  ],
  [
    'PQ-2025-0049',
    'Có ký túc xá cho sinh viên không?',
    'Khác',
    'leminhduc2006@gmail.com',
    'Thí sinh',
    'Thấp',
    'Đang xử lý',
    '15/05/2025 09:20',
    '1 giờ trước',
  ],
  [
    'PQ-2025-0048',
    'Các phương thức xét tuyển năm 2025?',
    'Tuyển sinh',
    'phamngocthao@gmail.com',
    'Thí sinh',
    'Cao',
    'Chưa xử lý',
    '15/05/2025 08:15',
    '2 giờ trước',
  ],
  [
    'PQ-2025-0047',
    'Học bổng khuyến khích học tập được tính như thế nào?',
    'Học phí - Học bổng',
    'hoangminh012@gmail.com',
    'Sinh viên',
    'Trung bình',
    'Chưa xử lý',
    '14/05/2025 16:40',
    '18 giờ trước',
  ],
  [
    'PQ-2025-0046',
    'Hồ sơ nhập học gồm những giấy tờ gì?',
    'Tuyển sinh',
    'dangthanh.tung@gmail.com',
    'Thí sinh',
    'Trung bình',
    'Đã trả lời',
    '14/05/2025 15:30',
    '19 giờ trước',
  ],
  [
    'PQ-2025-0045',
    'Ngành An toàn thông tin học những gì?',
    'Ngành học',
    'vohongphuc03@gmail.com',
    'Thí sinh',
    'Thấp',
    'Đang xử lý',
    '14/05/2025 14:10',
    '21 giờ trước',
  ],
  [
    'PQ-2025-0044',
    'Lịch khai giảng năm học 2025 – 2026?',
    'Khác',
    'ngocanh.ph@gmail.com',
    'Phụ huynh',
    'Thấp',
    'Chưa xử lý',
    '14/05/2025 11:05',
    '1 ngày trước',
  ],
];

const styles = {
  category: {
    'Tuyển sinh': 'bg-red-50 text-[#D71920]',
    'Học phí - Học bổng': 'bg-orange-50 text-orange-600',
    'Ngành học': 'bg-violet-50 text-violet-600',
    Khác: 'bg-blue-50 text-blue-600',
  },
  priority: {
    Cao: 'bg-red-50 text-red-600',
    'Trung bình': 'bg-orange-50 text-orange-600',
    Thấp: 'bg-emerald-50 text-emerald-600',
  },
  status: {
    'Chưa xử lý': 'bg-orange-50 text-orange-600',
    'Đang xử lý': 'bg-blue-50 text-blue-600',
    'Đã trả lời': 'bg-emerald-50 text-emerald-600',
  },
};

function PendingQuestionTable() {
  return (
    <section className='overflow-hidden rounded-xl border border-slate-200 bg-white'>
      <div className='flex items-center gap-3 border-b border-slate-200 p-5'>
        <SearchInput className='w-65' placeholder='Tìm kiếm câu hỏi, email, từ khóa...' />
        <Select text='Tất cả danh mục' className='w-38' />
        <Select text='Tất cả trạng thái' className='w-38' />
        <Select text='Tất cả ưu tiên' className='w-38' />
        <button
          type='button'
          className='ml-auto flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-4 text-[11px] font-medium text-slate-700'
        >
          <Download size={15} />
          Xuất Excel
        </button>
      </div>

      <table className='w-full table-fixed border-collapse'>
        <thead>
          <tr className='border-b border-slate-200 bg-slate-50/70 text-left text-[10px] font-semibold text-slate-600'>
            <th className='w-9 px-4 py-3'>
              <input type='checkbox' className='accent-[#D71920]' />
            </th>
            <th className='w-[25%] py-3'>Nội dung câu hỏi</th>
            <th className='w-[12%] px-2 py-3'>Danh mục</th>
            <th className='w-[16%] px-2 py-3'>Người hỏi</th>
            <th className='w-[10%] px-2 py-3'>Độ ưu tiên</th>
            <th className='w-[11%] px-2 py-3'>Trạng thái</th>
            <th className='w-[14%] px-2 py-3'>Thời gian</th>
            <th className='w-24 px-2 py-3 text-center'>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {questions.map(
            ([id, question, category, email, userType, priority, status, time, ago, isNew]) => (
              <tr key={id} className='border-b border-slate-100 text-[10px] hover:bg-slate-50/70'>
                <td className='px-4 py-3 align-top'>
                  <input type='checkbox' className='mt-1 accent-[#D71920]' />
                </td>
                <td className='py-3 align-top'>
                  <p className='font-medium leading-4 text-slate-800'>{question}</p>
                  <div className='mt-1.5 flex gap-2 text-[9px] text-slate-400'>
                    <span>#{id}</span>
                    {isNew && (
                      <span className='rounded bg-red-50 px-1.5 py-0.5 font-semibold text-[#D71920]'>
                        NEW
                      </span>
                    )}
                  </div>
                </td>
                <td className='px-2 py-3 align-top'>
                  <Badge className={styles.category[category]}>{category}</Badge>
                </td>
                <td className='px-2 py-3 align-top'>
                  <p className='font-medium text-slate-700'>{email}</p>
                  <p className='mt-1 text-slate-400'>{userType}</p>
                </td>
                <td className='px-2 py-3 align-top'>
                  <Badge className={styles.priority[priority]}>{priority}</Badge>
                </td>
                <td className='px-2 py-3 align-top'>
                  <Badge className={styles.status[status]} dot>
                    {status}
                  </Badge>
                </td>
                <td className='px-2 py-3 align-top'>
                  <p className='font-medium text-slate-700'>{time}</p>
                  <p className='mt-1 text-slate-400'>{ago}</p>
                </td>
                <td className='px-2 py-3 align-top'>
                  <div className='flex justify-center gap-2 text-slate-500'>
                    <button type='button'>
                      <Eye size={15} />
                    </button>
                    <button type='button'>
                      <Reply size={15} />
                    </button>
                    <button type='button'>
                      <MoreVertical size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <Pagination />
    </section>
  );
}

function SearchInput({ className = '', placeholder }) {
  return (
    <div className={`relative ${className}`}>
      <input
        type='text'
        placeholder={placeholder}
        className='h-9 w-full rounded-lg border border-slate-200 px-3 pr-8 text-[10px] outline-none focus:border-red-300'
      />
      <Search size={15} className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-500' />
    </div>
  );
}
function Select({ text, className = '' }) {
  return (
    <button
      type='button'
      className={`flex h-9 w-full items-center justify-between rounded-lg border border-slate-200 px-3 text-[10px] text-slate-600 ${className}`}
    >
      <span>{text}</span>
      <ChevronDown size={14} />
    </button>
  );
}
function Badge({ children, className, dot = false }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-2 py-1 text-[9px] font-medium ${className}`}
    >
      {dot && <span className='h-1.5 w-1.5 rounded-full bg-current' />}
      {children}
    </span>
  );
}
function Pagination() {
  return (
    <div className='flex items-center justify-between p-4 text-[10px] text-slate-500'>
      <span>Hiển thị: 1 - 8 trong tổng số 86 câu hỏi</span>
      <div className='flex items-center gap-2'>
        <button className='h-9 w-9 rounded-lg border border-slate-200 text-lg'>‹</button>
        {['1', '2', '3', '4', '5', '…', '11'].map((page) => (
          <button
            key={page}
            className={`h-8 w-7 rounded-md ${page === '1' ? 'bg-[#D71920] text-white' : 'text-slate-700'}`}
          >
            {page}
          </button>
        ))}
        <button className='h-9 w-9 rounded-lg border border-slate-200 text-lg'>›</button>
      </div>
      <div>
        Hiển thị{' '}
        <button className='ml-1 rounded border border-slate-200 px-3 py-2 text-slate-700'>
          8⌄
        </button>{' '}
        mục/trang
      </div>
    </div>
  );
}

export default PendingQuestionTable;
