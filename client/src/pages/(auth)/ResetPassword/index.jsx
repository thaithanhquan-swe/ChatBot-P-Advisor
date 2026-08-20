import { useMemo, useState } from 'react';
import {Eye, EyeOff, Lock, ShieldCheck } from 'lucide-react';

import RecoveryShell from '../components/RecoveryShell/RecoveryShell';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] =
    useState('');

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [success, setSuccess] = useState(false);

  const strength = useMemo(() => {
    if (!password) return 0;

    const rules = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /\d/.test(password),
      /[^A-Za-z0-9]/.test(password),
    ];

    return rules.filter(Boolean).length;
  }, [password]);

  const strengthText = [
    'Chưa có mật khẩu',
    'Rất yếu',
    'Yếu',
    'Trung bình',
    'Khá mạnh',
    'Mạnh',
  ][strength];

  const passwordsMatch =
    !confirmPassword ||
    password === confirmPassword;

  const canSubmit =
    strength === 5 &&
    password === confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!canSubmit) return;

    // TODO:
    // Gọi API reset-password ở đây
    // Gửi token + password mới

    setSuccess(true);
  };

  return (
    <RecoveryShell
      icon={ShieldCheck}
      title='Đặt lại mật khẩu'
      description='Vui lòng nhập mật khẩu mới cho tài khoản của bạn.'
    >
      <form
        onSubmit={handleSubmit}
        className='space-y-5'
      >
        {/* Mật khẩu mới */}

        <div>
          <label
            htmlFor='new-password'
            className='mb-2 block text-[14px] font-semibold text-[#202020]'
          >
            Mật khẩu mới{' '}
            <span className='text-[#d71920]'>
              *
            </span>
          </label>

          <div className='flex h-[54px] items-center gap-3 rounded-[8px] border border-[#dedede] bg-white px-4 transition focus-within:border-[#d71920] focus-within:ring-3 focus-within:ring-[#d71920]/10'>
            <Lock
              size={19}
              className='shrink-0 text-[#9ca3af]'
            />

            <input
              id='new-password'
              type={
                showPassword
                  ? 'text'
                  : 'password'
              }
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder='Nhập mật khẩu mới'
              required
              className='h-full min-w-0 flex-1 bg-transparent text-[14px] text-[#222] outline-none placeholder:text-[#a3a3a3]'
            />

            <button
              type='button'
              onClick={() =>
                setShowPassword((value) => !value)
              }
              className='cursor-pointer text-[#8b8b8b] transition hover:text-[#d71920]'
            >
              {showPassword ? (
                <EyeOff size={19} />
              ) : (
                <Eye size={19} />
              )}
            </button>
          </div>

          <p className='mt-2 text-[12px] leading-5 text-[#777]'>
            Mật khẩu phải có ít nhất 8 ký tự,
            bao gồm chữ hoa, chữ thường, số và
            ký tự đặc biệt.
          </p>
        </div>

        {/* Xác nhận mật khẩu */}

        <div>
          <label
            htmlFor='confirm-password'
            className='mb-2 block text-[14px] font-semibold text-[#202020]'
          >
            Xác nhận mật khẩu mới{' '}
            <span className='text-[#d71920]'>
              *
            </span>
          </label>

          <div
            className={`flex h-[54px] items-center gap-3 rounded-[8px] border bg-white px-4 transition focus-within:ring-3 ${
              passwordsMatch
                ? 'border-[#dedede] focus-within:border-[#d71920] focus-within:ring-[#d71920]/10'
                : 'border-red-400 focus-within:ring-red-100'
            }`}
          >
            <Lock
              size={19}
              className='shrink-0 text-[#9ca3af]'
            />

            <input
              id='confirm-password'
              type={
                showConfirm
                  ? 'text'
                  : 'password'
              }
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              placeholder='Nhập lại mật khẩu mới'
              required
              className='h-full min-w-0 flex-1 bg-transparent text-[14px] text-[#222] outline-none placeholder:text-[#a3a3a3]'
            />

            <button
              type='button'
              onClick={() =>
                setShowConfirm((value) => !value)
              }
              className='cursor-pointer text-[#8b8b8b] transition hover:text-[#d71920]'
            >
              {showConfirm ? (
                <EyeOff size={19} />
              ) : (
                <Eye size={19} />
              )}
            </button>
          </div>

          {!passwordsMatch && (
            <p className='mt-2 text-[12px] text-red-600'>
              Mật khẩu xác nhận chưa khớp.
            </p>
          )}
        </div>

        {/* Độ mạnh mật khẩu */}

        <div className='pt-1'>
          <div className='mb-3 flex items-center justify-between gap-3 text-[13px] text-[#666]'>
            <span>Độ mạnh mật khẩu:</span>

            <span>{strengthText}</span>
          </div>

          <div className='grid grid-cols-5 gap-2'>
            {[1, 2, 3, 4, 5].map((item) => (
              <span
                key={item}
                className={`h-[5px] rounded-full transition-all ${
                  strength >= item
                    ? 'bg-[#d71920]'
                    : 'bg-[#e5e7eb]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Thông báo */}

        <div className='flex gap-3 rounded-[8px] bg-[#fff2f2] px-4 py-4 text-[#4b4b4b]'>
          <Lock
            size={21}
            className='mt-0.5 shrink-0 text-[#d71920]'
          />

          <div className='text-[13px] leading-6'>
            <p>
              Vì lý do bảo mật, liên kết đặt lại
              mật khẩu sẽ hết hạn sau 15 phút.
            </p>

            <p>
              Vui lòng thực hiện lại nếu liên kết
              đã hết hạn.
            </p>
          </div>
        </div>

        {success && (
          <div className='rounded-[8px] border border-green-200 bg-green-50 px-4 py-3 text-[13px] text-green-700'>
            Đặt lại mật khẩu thành công. Bạn có
            thể quay lại trang đăng nhập.
          </div>
        )}

        <button
          type='submit'
          disabled={!canSubmit}
          className='flex h-[54px] w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] bg-[#d71920] text-[15px] font-semibold text-white shadow-[0_8px_18px_rgba(215,25,32,0.16)] transition hover:bg-[#bd1118] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50'
        >
          <Lock size={18} />

          Đặt lại mật khẩu
        </button>
      </form>
    </RecoveryShell>
  );
};

export default ResetPassword;
