import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, Lock, User } from 'lucide-react';

import AuthCard from '../components/AuthCard/AuthCard';
import AuthField from '../components/AuthField/AuthField';
import AuthInput from '../components/AuthInput/AuthInput';
import SocialAuth from '../components/SocialAuth/SocialAuth';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: xử lý đăng nhập
  };

  return (
    <AuthCard>
      <div className='text-center'>
        <h1 className='text-[22px] font-bold text-gray-900'>Chào mừng trở lại!</h1>
        <p className='mt-2 text-[13.5px] text-(--text-secondary)'>
          Đăng nhập để tiếp tục trò chuyện với chatbot
        </p>
      </div>

      <form className='mt-8 space-y-5' onSubmit={handleSubmit}>
        <AuthField label='Email hoặc số điện thoại'>
          <AuthInput icon={User} type='text' placeholder='Nhập email hoặc số điện thoại' />
        </AuthField>

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

        <div className='flex justify-end'>
          <Link to='#' className='text-[13px] font-medium text-(--primary-color) hover:underline'>
            Quên mật khẩu?
          </Link>
        </div>

        <button
          type='submit'
          className='flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-(--primary-color) text-[14.5px] font-semibold text-white shadow-(--shadow-card) transition-all hover:-translate-y-0.5 hover:shadow-(--shadow-card-hover)'
        >
          Đăng nhập
          <ArrowRight size={17} />
        </button>
      </form>

      <SocialAuth label='hoặc đăng nhập với' />

      <p className='mt-7 text-center text-[13.5px] text-(--text-secondary)'>
        Chưa có tài khoản?{' '}
        <Link to='/register' className='font-semibold text-(--primary-color) hover:underline'>
          Đăng ký ngay
        </Link>
      </p>
    </AuthCard>
  );
};

export default Login;
