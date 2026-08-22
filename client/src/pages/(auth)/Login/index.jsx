import AuthCard from '../components/AuthCard/AuthCard';
import SocialAuth from '../components/SocialAuth/SocialAuth';
import LoginFooter from './components/LoginFooter/LoginFooter';
import LoginForm from './components/LoginForm/LoginForm';

const Login = () => (
  <AuthCard>
    <div className='text-center'>
      <h1 className='text-[22px] font-bold text-gray-900'>Chào mừng trở lại!</h1>
      <p className='mt-2 text-[13.5px] text-(--text-secondary)'>
        Đăng nhập để tiếp tục trò chuyện với chatbot
      </p>
    </div>

    <LoginForm />
    <SocialAuth label='hoặc đăng nhập với' />
    <LoginFooter />
  </AuthCard>
);

export default Login;
