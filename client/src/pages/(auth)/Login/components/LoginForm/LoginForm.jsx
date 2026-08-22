import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, Lock, User } from 'lucide-react';

import AuthField from '../../../components/AuthField/AuthField';
import AuthInput from '../../../components/AuthInput/AuthInput';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: xử lý đăng nhập
  };

  return (
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
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              className='text-gray-400 transition hover:text-gray-600'
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          }
        />
      </AuthField>

      <div className='flex justify-end'>
        <Link
          to='/forgot-password'
          className='text-[13px] font-medium text-(--primary-color) hover:underline'
        >
          Quên mật khẩu?
        </Link>
      </div>

      <button
        type='submit'
        className='flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-(--primary-color) text-[14.5px] font-semibold text-white shadow-(--shadow-card) transition-all hover:-translate-y-0.5 hover:shadow-(--shadow-card-hover)'
      >
        Đăng nhập
        <ArrowRight size={17} />
      </button>
    </form>
  );
};

export default LoginForm;
