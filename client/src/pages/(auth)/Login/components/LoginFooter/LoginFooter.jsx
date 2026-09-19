import { Link } from 'react-router-dom';

const LoginFooter = () => (
  <p className='mt-7 text-center text-[13.5px] text-(--text-secondary)'>
    Chưa có tài khoản?{' '}
    <Link to='/register' className='font-semibold text-(--primary-color) hover:underline'>
      Đăng ký ngay
    </Link>
  </p>
);

export default LoginFooter;
