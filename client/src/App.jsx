import { Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/(public)/Home';
import ChatAI from './pages/(public)/ChatAI';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/(admin)/Dashboard';
import FAQ from './pages/(admin)/FAQ';
import PendingQuestions from './pages/(admin)/PendingQuestions';

function App() {
  return (
    <Routes>
      <Route path='/' element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path='chatai' element={<ChatAI />} />
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
