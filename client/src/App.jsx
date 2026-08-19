import { Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AuthLayout from './layouts/AuthLayout';
import Home from './pages/(public)/Home';
import ChatAI from './pages/(public)/ChatAI';
import Login from './pages/(public)/Auth/Login';
import Register from './pages/(public)/Auth/Register';
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

      <Route path='/admin' element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path='faq' element={<FAQ />} />
        <Route path='pending-questions' element={<PendingQuestions />} />
      </Route>
    </Routes>
  );
}

export default App;
