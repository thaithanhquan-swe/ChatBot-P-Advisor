import { Lock, Mail, MessageSquareText, Phone, Send, ShieldCheck } from 'lucide-react';

const ConsultationForm = ({ formData, errors, isSubmitting, handleChange, handleSubmit }) => {
  return (
    <div>
      {/* Header Form */}
      <div className='mb-6 flex items-start gap-3'>
        <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#c8102e]'>
          <MessageSquareText size={22} />
        </div>
        <div>
          <h2 className='text-xl font-bold text-gray-900'>Thông tin yêu cầu tư vấn</h2>
          <p className='text-sm text-gray-500'>
            Vui lòng cung cấp thông tin để chúng tôi hỗ trợ bạn tốt hơn
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        {/* Câu hỏi của bạn */}
        <div>
          <label className='mb-1.5 block text-sm font-semibold text-gray-800'>
            Câu hỏi của bạn
          </label>
          <textarea
            name='question'
            value={formData.question}
            onChange={handleChange}
            rows='4'
            maxLength={5000}
            placeholder='Nhập nội dung bạn cần cán bộ tuyển sinh tư vấn'
            className={`w-full resize-y rounded-xl border p-3 text-sm text-gray-700 outline-none transition-all focus:border-[#c8102e] focus:ring-1 focus:ring-[#c8102e] ${
              errors.question ? 'border-red-500 bg-red-50/20' : 'border-gray-200'
            }`}
          />
          {errors.question && <p className='mt-1 text-xs text-red-500'>{errors.question}</p>}
        </div>

        {/* Số điện thoại */}
        <div>
          <label className='mb-1.5 block text-sm font-semibold text-gray-800'>Số điện thoại</label>
          <div className='relative'>
            <Phone size={18} className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400' />
            <input
              type='text'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              placeholder='Nhập số điện thoại của bạn'
              className={`w-full rounded-xl border py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-[#c8102e] focus:ring-1 focus:ring-[#c8102e] ${
                errors.phone ? 'border-red-500 bg-red-50/20' : 'border-gray-200'
              }`}
            />
          </div>
          <p className='mt-1 text-xs text-gray-400'>
            Nhập số điện thoại hoặc email để cán bộ liên hệ lại
          </p>
          {errors.phone && <p className='mt-1 text-xs text-red-500'>{errors.phone}</p>}
        </div>

        {/* Divider hoặc */}
        <div className='relative my-1 flex items-center justify-center'>
          <div className='w-full border-t border-gray-200'></div>
          <span className='absolute bg-white px-3 text-xs text-gray-400'>hoặc</span>
        </div>

        {/* Email */}
        <div>
          <label className='mb-1.5 block text-sm font-semibold text-gray-800'>Email</label>
          <div className='relative'>
            <Mail size={18} className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400' />
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Nhập email của bạn (nếu có)'
              className={`w-full rounded-xl border py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-[#c8102e] focus:ring-1 focus:ring-[#c8102e] ${
                errors.email ? 'border-red-500 bg-red-50/20' : 'border-gray-200'
              }`}
            />
          </div>
          <p className='mt-1 text-xs text-gray-400'>Vui lòng nhập địa chỉ email hợp lệ</p>
          {errors.email && <p className='mt-1 text-xs text-red-500'>{errors.email}</p>}
        </div>

        {errors.contact && <p className='text-xs text-red-500'>{errors.contact}</p>}
        {errors.submit && (
          <p role='alert' className='text-sm text-red-600'>
            {errors.submit}
          </p>
        )}

        {/* Thông báo bảo mật */}
        <div className='flex items-center gap-2.5 rounded-xl bg-red-50/80 p-3 text-xs text-gray-700'>
          <ShieldCheck size={18} className='shrink-0 text-[#c8102e]' />
          <span>Thông tin của bạn được bảo mật và chỉ dùng để hỗ trợ tư vấn tuyển sinh.</span>
        </div>

        {/* Nút gửi */}
        <button
          type='submit'
          disabled={isSubmitting}
          className='mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#c8102e] py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-red-800 disabled:opacity-60'
        >
          <Send size={16} />
          {isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu tư vấn'}
        </button>

        {/* Đồng ý điều khoản */}
        <p className='mt-2 flex items-center justify-center gap-1 text-center text-xs text-gray-500'>
          <Lock size={12} className='text-gray-400' />
          Bằng việc gửi thông tin, bạn đồng ý với{' '}
          <a href='#' className='font-medium text-red-600 underline hover:text-red-700'>
            Chính sách bảo mật
          </a>{' '}
          của PTIT.
        </p>
      </form>
    </div>
  );
};

export default ConsultationForm;
