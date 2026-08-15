import { UserRound } from 'lucide-react';

const pendingQuestions = [
  {
    question: 'Điểm chuẩn ngành CNTT năm 2025 là bao nhiêu?',
    category: 'Tuyển sinh',
    time: '10 phút trước',
  },
  {
    question: 'Học phí chương trình chất lượng cao là bao nhiêu?',
    category: 'Học phí – Học bổng',
    time: '35 phút trước',
  },
  {
    question: 'Các phương thức xét tuyển năm 2025?',
    category: 'Tuyển sinh',
    time: '1 giờ trước',
  },
  {
    question: 'Ngành An toàn thông tin học chương trình gì?',
    category: 'Ngành học',
    time: '2 giờ trước',
  },
  {
    question: 'Có ký túc xá cho sinh viên không?',
    category: 'Khác',
    time: '3 giờ trước',
  },
];

function PendingQuestionList() {
  return (
    <div>
      <div className='mb-5 flex items-center justify-between'>
        <h2 className='text-[15px] font-bold text-slate-900'>Câu hỏi tồn đọng mới nhất</h2>

        <button type='button' className='text-[12px] font-medium text-[#D71920] hover:underline'>
          Xem tất cả →
        </button>
      </div>

      <div className='space-y-1'>
        {pendingQuestions.map((item, index) => (
          <div
            key={index}
            className='flex items-center gap-3 rounded-lg px-2 py-3 hover:bg-slate-50'
          >
            <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-[#D71920]'>
              <UserRound size={18} strokeWidth={1.7} />
            </div>

            <div className='min-w-0 flex-1'>
              <p className='truncate text-[12px] font-medium text-slate-700'>{item.question}</p>

              <span className='mt-1 inline-flex rounded-md bg-red-50 px-2 py-0.5 text-[9px] font-medium text-[#D71920]'>
                {item.category}
              </span>
            </div>

            <span className='hidden shrink-0 text-[10px] text-slate-400 sm:block'>{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PendingQuestionList;
