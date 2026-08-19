import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, Lock, Mail, Phone, User } from 'lucide-react';

import AuthCard from '../components/AuthCard/AuthCard';
import AuthField from '../components/AuthField/AuthField';
import AuthInput from '../components/AuthInput/AuthInput';
import SocialAuth from '../components/SocialAuth/SocialAuth';

const passwordRules = ['8 ký tự', '1 chữ hoa', '1 chữ thường', '1 số', '1 ký tự đặc biệt'];

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: xử lý đăng ký
  };

  return (
    <AuthCard>
      <div className='text-center'>
        <h1 className='text-[22px] font-bold text-gray-900'>Tạo tài khoản mới</h1>
        <p className='mt-2 text-[13.5px] text-(--text-secondary)'>
          Điền thông tin để đăng ký tài khoản
        </p>
      </div>

      <form className='mt-8 space-y-5' onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
          <AuthField label='Họ và tên'>
            <AuthInput icon={User} type='text' placeholder='Nhập họ và tên' />
          </AuthField>

          <AuthField label='Email'>
            <AuthInput icon={Mail} type='email' placeholder='Nhập email của bạn' />
          </AuthField>
        </div>

        <AuthField label='Số điện thoại'>
          <AuthInput icon={Phone} type='tel' placeholder='Nhập số điện thoại' />
        </AuthField>

        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
          <AuthField label='Mật khẩu'>
            <AuthInput
              icon={Lock}
              type={showPassword ? 'text' : 'password'}
              placeholder='Nhập mật khẩu'
              rightElement={
                <button
                  type='button'
                  onClick={() => setShowPassword((v) => !v)}
                  className='text-gray-400 transition hover:text-gray-600'
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              }
            />
          </AuthField>

          <AuthField label='Xác nhận mật khẩu'>
            <AuthInput
              icon={Lock}
              type={showConfirm ? 'text' : 'password'}
              placeholder='Nhập lại mật khẩu'
              rightElement={
                <button
                  type='button'
                  onClick={() => setShowConfirm((v) => !v)}
                  className='text-gray-400 transition hover:text-gray-600'
                >
                  {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              }
            />
          </AuthField>
        </div>

        <div className='rounded-xl bg-(--surface-muted) p-4'>
          <p className='text-[12.5px] font-medium text-gray-700'>Mật khẩu phải có ít nhất:</p>
          <div className='mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5'>
            {passwordRules.map((rule) => (
              <span
                key={rule}
                className='flex items-center gap-1.5 text-[12px] text-(--text-secondary)'
              >
                <span className='h-1.5 w-1.5 rounded-full bg-(--primary-color)' />
                {rule}
              </span>
            ))}
          </div>
        </div>

        <label className='flex items-start gap-2.5 text-[13px] text-(--text-secondary)'>
          <input
            type='checkbox'
            className='mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-(--primary-color) focus:ring-(--primary-color-soft)'
          />
          <span>
            Tôi đồng ý với{' '}
            <Link to='#' className='font-medium text-(--primary-color) hover:underline'>
              Điều khoản sử dụng
            </Link>{' '}
            và{' '}
            <Link to='#' className='font-medium text-(--primary-color) hover:underline'>
              Chính sách bảo mật
            </Link>
          </span>
        </label>

        <button
          type='submit'
          className='flex cursor-pointer h-12 w-full items-center justify-center gap-2 rounded-xl bg-(--primary-color) text-[14.5px] font-semibold text-white shadow-(--shadow-card) transition-all hover:-translate-y-0.5 hover:shadow-(--shadow-card-hover)'
        >
          Đăng ký
          <ArrowRight size={17} />
        </button>
      </form>

      <SocialAuth label='hoặc đăng ký với' />

      <p className='mt-7 text-center text-[13.5px] text-(--text-secondary)'>
        Đã có tài khoản?{' '}
        <Link to='/login' className='font-semibold text-(--primary-color) hover:underline'>
          Đăng nhập ngay
        </Link>
      </p>
    </AuthCard>
  );
};

export default Register;
