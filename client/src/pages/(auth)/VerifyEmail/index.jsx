import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { CircleCheck, CircleX, LoaderCircle, MailCheck } from 'lucide-react';

import { verifyEmail } from '@/services/auth-service';
import { getApiErrorMessage } from '@/lib/http';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const { state } = useLocation();
  const token = searchParams.get('token');
  const [status, setStatus] = useState(token ? 'verifying' : 'waiting');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;

    let active = true;
    const submitVerification = async () => {
      try {
        await verifyEmail(token);
        if (active) setStatus('success');
      } catch (requestError) {
        if (!active) return;
        setError(getApiErrorMessage(requestError, 'Không thể xác thực email.'));
        setStatus('error');
      }
    };

    submitVerification();

    return () => {
      active = false;
    };
  }, [token]);

  const content = {
    waiting: {
      icon: <MailCheck size={38} />,
      title: 'Đã gửi email xác thực',
      description: state?.email
        ? `Chúng tôi đã gửi liên kết xác thực đến ${state.email}.`
        : 'Chúng tôi đã gửi một liên kết xác thực đến email đăng ký của bạn.',
    },
    verifying: {
      icon: <LoaderCircle size={38} className='animate-spin' />,
      title: 'Đang xác thực email',
      description: 'Vui lòng chờ trong giây lát, chúng tôi đang kiểm tra liên kết của bạn.',
    },
    success: {
      icon: <CircleCheck size={38} />,
      title: 'Xác thực thành công',
      description: 'Tài khoản của bạn đã được kích hoạt. Bây giờ bạn có thể đăng nhập.',
    },
    error: {
      icon: <CircleX size={38} />,
      title: 'Xác thực không thành công',
      description: error || 'Liên kết xác thực không hợp lệ hoặc đã hết hạn.',
    },
  }[status];

  return (
    <div className='mx-auto w-full max-w-125 rounded-[20px] border border-[#f1eeee] bg-white p-8 text-center shadow-[0_6px_20px_rgba(31,24,25,0.10)]'>
      <div className='mx-auto flex h-18 w-18 items-center justify-center rounded-full bg-(--primary-color-soft) text-(--primary-color)'>
        {content.icon}
      </div>
      <h1 className='mt-6 text-[22px] font-bold text-gray-900'>{content.title}</h1>
      <p className='mx-auto mt-3 max-w-100 text-[14px] leading-6 text-(--text-secondary)'>
        {content.description}
      </p>

      {status === 'waiting' && (
        <p className='mt-5 rounded-xl bg-(--surface-muted) p-4 text-[13px] text-(--text-secondary)'>
          Chưa thấy email? Hãy kiểm tra cả thư mục spam hoặc thư rác.
        </p>
      )}

      {status === 'success' && (
        <Link
          to='/login'
          className='mt-7 flex h-12 w-full items-center justify-center rounded-xl bg-(--primary-color) text-[14.5px] font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg'
        >
          Về trang đăng nhập
        </Link>
      )}

      {status === 'error' && (
        <Link
          to='/register'
          className='mt-7 flex h-12 w-full items-center justify-center rounded-xl border border-(--primary-color) text-[14.5px] font-semibold text-(--primary-color) transition-colors hover:bg-(--primary-color-soft)'
        >
          Đăng ký lại
        </Link>
      )}
    </div>
  );
};

export default VerifyEmail;
