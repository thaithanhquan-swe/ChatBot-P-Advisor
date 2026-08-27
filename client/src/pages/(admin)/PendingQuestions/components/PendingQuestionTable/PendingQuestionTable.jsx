import { Download, Eye, MoreVertical, Reply, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

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
    <Card className='overflow-hidden'>
      <div className='flex items-center gap-3 border-b border-slate-200 p-5'>
        <SearchInput className='w-65' placeholder='Tìm kiếm câu hỏi, email, từ khóa...' />
        <FilterSelect label='Tất cả danh mục' className='w-38' />
        <FilterSelect label='Tất cả trạng thái' className='w-38' />
        <FilterSelect label='Tất cả ưu tiên' className='w-38' />
        <Button variant='outline' size='sm' className='ml-auto text-[11px]'>
          <Download size={15} />
          Xuất Excel
        </Button>
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
                  <Badge className={styles.status[status]}>
                    <span className='mr-1.5 h-1.5 w-1.5 rounded-full bg-current' />
                    {status}
                  </Badge>
                </td>
                <td className='px-2 py-3 align-top'>
                  <p className='font-medium text-slate-700'>{time}</p>
                  <p className='mt-1 text-slate-400'>{ago}</p>
                </td>
                <td className='px-2 py-3 align-top'>
                  <div className='flex justify-center gap-2 text-slate-500'>
                    <Button variant='ghost' size='icon' className='h-7 w-7'>
                      <Eye size={15} />
                    </Button>
                    <Button variant='ghost' size='icon' className='h-7 w-7'>
                      <Reply size={15} />
                    </Button>
                    <Button variant='ghost' size='icon' className='h-7 w-7'>
                      <MoreVertical size={15} />
                    </Button>
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <Pagination />
    </Card>
  );
}

function SearchInput({ className = '', placeholder }) {
  return (
    <div className={`relative ${className}`}>
      <Input
        placeholder={placeholder}
        className='h-9 pr-8 text-[10px]'
      />
      <Search size={15} className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-500' />
    </div>
  );
}
function FilterSelect({ label, className = '' }) {
  return (
    <Select aria-label={label} className={`h-9 text-[10px] ${className}`}>
      <option>{label}</option>
    </Select>
  );
}
function Pagination() {
  return (
    <div className='flex items-center justify-between p-4 text-[10px] text-slate-500'>
      <span>Hiển thị: 1 - 8 trong tổng số 86 câu hỏi</span>
      <div className='flex items-center gap-2'>
        <Button variant='outline' size='icon'>‹</Button>
        {['1', '2', '3', '4', '5', '…', '11'].map((page) => (
          <Button
            key={page}
            variant={page === '1' ? 'default' : 'ghost'}
            size='sm'
            className='h-8 min-w-7 px-2'
          >
            {page}
          </Button>
        ))}
        <Button variant='outline' size='icon'>›</Button>
      </div>
      <div>
        Hiển thị{' '}
        <Button variant='outline' size='sm' className='ml-1'>
          8⌄
        </Button>{' '}
        mục/trang
      </div>
    </div>
  );
}

export default PendingQuestionTable;
