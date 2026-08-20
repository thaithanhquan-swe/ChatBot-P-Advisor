import { HelpCircle, Mail } from 'lucide-react';
import ptitLineArt from '../../../../../assets/images/store/truong_ptit_lineart.png';

const ConsultationIntro = () => (
  <section className='relative flex h-full flex-col pt-4 lg:col-span-3'>
    <div className='relative z-10'>
      <div className='relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 text-[#c8102e]'>
        <Mail size={40} />
        <div className='absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#c8102e] text-white shadow-md'>
          <HelpCircle size={18} />
        </div>
      </div>
      <h1 className='mb-6 text-4xl font-extrabold leading-tight tracking-tight text-gray-900'>
        Gửi yêu cầu <br />
        <span className='text-[#c8102e]'>tư vấn</span>
      </h1>
      <div className='space-y-4 text-sm leading-relaxed text-gray-600'>
        <p className='font-medium text-gray-800'>
          Rất tiếc, Chatbot chưa thể trả lời đầy đủ câu hỏi của bạn.
        </p>
        <p>
          Vui lòng để lại thông tin, Cán bộ tuyển sinh của PTIT sẽ liên hệ và hỗ trợ bạn trong thời
          gian sớm nhất (dưới 24h).
        </p>
      </div>
    </div>
    <div className='pointer-events-none absolute bottom-10 left-1/2 z-0 hidden w-[160%] -translate-x-1/2 select-none opacity-25 lg:flex lg:justify-center'>
      <img
        src={ptitLineArt}
        alt='Tòa nhà PTIT'
        className='h-auto w-full object-contain object-bottom'
      />
    </div>
  </section>
);

export default ConsultationIntro;
