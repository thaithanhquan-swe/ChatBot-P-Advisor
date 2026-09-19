import AuthCard from '../components/AuthCard/AuthCard';
import SocialAuth from '../components/SocialAuth/SocialAuth';
import RegisterFooter from './components/RegisterFooter/RegisterFooter';
import RegisterForm from './components/RegisterForm/RegisterForm';

const Register = () => (
  <AuthCard>
    <div className='text-center'>
      <h1 className='text-[22px] font-bold text-gray-900'>Tạo tài khoản mới</h1>
      <p className='mt-2 text-[13.5px] text-(--text-secondary)'>
        Điền thông tin để đăng ký tài khoản
      </p>
    </div>

    <RegisterForm />
    <SocialAuth label='hoặc đăng ký với' />
    <RegisterFooter />
  </AuthCard>
);

export default Register;
