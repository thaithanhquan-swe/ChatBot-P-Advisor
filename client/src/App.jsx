import { Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AuthLayout from './layouts/AuthLayout';
import Home from './pages/(public)/Home';
import ChatAI from './pages/(public)/ChatAI';
import Login from './pages/(auth)/Login';
import Register from './pages/(auth)/Register';
import ForgotPassword from './pages/(auth)/ForgotPassword';
import ResetPassword from './pages/(auth)/ResetPassword';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/(admin)/Dashboard';
import FAQ from './pages/(admin)/FAQ';
import PendingQuestions from './pages/(admin)/PendingQuestions';
import FAQPublic from './pages/(public)/FAQ';

function App() {
  return (
    <Routes>
      <Route path='/' element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path='chatai' element={<ChatAI />} />
        <Route path='/faq' element={<FAQPublic />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Route>
      
      <Route path='/forgot-password' element={<ForgotPassword />}/>
      <Route path='/reset-password' element={<ResetPassword />}/>

      <Route path='/admin' element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path='faq' element={<FAQ />} />
        <Route path='pending-questions' element={<PendingQuestions />} />
      </Route>
    </Routes>
  );
}

export default App;
