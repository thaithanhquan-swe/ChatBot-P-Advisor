import { useState } from 'react';
import { Info, Mail, Send } from 'lucide-react';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email.trim()) return;

    const response = await fetch(
      `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/auth/forgot-password`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      }
    );

    if (response.ok) setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div>
        <label htmlFor='forgot-email' className='mb-2 block text-sm font-semibold text-[#202020]'>
          Email <span className='text-[#d71920]'>*</span>
        </label>
        <div className='flex h-13.5 items-center gap-3 rounded-lg border border-[#dedede] bg-white px-4 transition focus-within:border-[#d71920] focus-within:ring-3 focus-within:ring-[#d71920]/10'>
          <Mail size={19} className='shrink-0 text-[#9ca3af]' />
          <input
            id='forgot-email'
            type='email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder='Nhập email đã đăng ký'
            required
            className='h-full w-full bg-transparent text-sm text-[#222] outline-none placeholder:text-[#a3a3a3]'
          />
        </div>
      </div>

      <div className='flex gap-3 rounded-lg bg-[#fff2f2] px-4 py-4 text-[#4b4b4b]'>
        <Info size={21} className='mt-0.5 shrink-0 text-[#d71920]' />
        <div className='text-[13px] leading-6'>
          <p>Chúng tôi sẽ gửi cho bạn một liên kết đặt lại mật khẩu.</p>
          <p>Vui lòng kiểm tra cả thư mục Spam nếu không thấy email.</p>
        </div>
      </div>

      {sent && (
        <div className='rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-[13px] text-green-700'>
          Hướng dẫn đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra email của bạn.
        </div>
      )}

      <button
        type='submit'
        className='flex h-13.5 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#d71920] text-[15px] font-semibold text-white shadow-[0_8px_18px_rgba(215,25,32,0.16)] transition hover:bg-[#bd1118] active:translate-y-px'
      >
        <Send size={18} />
        Gửi hướng dẫn đặt lại mật khẩu
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
