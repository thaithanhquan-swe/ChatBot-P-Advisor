import { ShieldAlert } from 'lucide-react';

const TrustNote = () => (
  <div className='mx-auto flex max-w-160 flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 pt-2.5 text-center text-[11.5px] text-(--text-tertiary) sm:px-6'>
    <ShieldAlert size={12} className='shrink-0' />
    <span>
      Thông tin tư vấn mang tính tham khảo. Vui lòng kiểm tra thông tin chính thức từ PTIT trước
      khi đăng ký.
    </span>
    <a href='https://tuyensinh.ptit.edu.vn/' className='font-semibold text-(--primary-color) hover:underline'>
      Xem trang tuyển sinh chính thức
    </a>
  </div>
);

export default TrustNote;
