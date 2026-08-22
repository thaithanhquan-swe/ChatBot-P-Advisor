import { Link } from 'react-router-dom';

const RegisterFooter = () => (
  <p className='mt-7 text-center text-[13.5px] text-(--text-secondary)'>
    Đã có tài khoản?{' '}
    <Link to='/login' className='font-semibold text-(--primary-color) hover:underline'>
      Đăng nhập ngay
    </Link>
  </p>
);

export default RegisterFooter;
