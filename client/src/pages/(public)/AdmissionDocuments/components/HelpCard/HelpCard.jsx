import { ArrowRight, MessagesSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const HelpCard = () => {
  return (
    <aside className='rounded-xl border border-red-100 bg-[#fff5f5] p-5'>
      <h2 className='flex items-center gap-2 text-[15px] font-bold text-(--primary-color)'>
        <MessagesSquare size={20} /> Vẫn còn thắc mắc?
      </h2>
      <p className='mt-2 text-[12px] leading-5 text-gray-600'>
        Không tìm thấy tài liệu bạn cần? Hãy hỏi P-Advisor để được hỗ trợ nhanh chóng.
      </p>
      <Link to='/chatai' className='mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-(--primary-color) px-4 text-[12.5px] font-semibold text-white transition hover:bg-[#b10e28]'>
        Chat với P-Advisor <ArrowRight size={15} />
      </Link>
    </aside>
  );
};

export default HelpCard;
