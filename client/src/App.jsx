import { Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/(public)/Home';
import ChatAI from './pages/(public)/ChatAI';

function App() {
  return (
    <Routes>
      <Route path='/' element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path='chatai' element={<ChatAI />} />
      </Route>
    </Routes>
  );
}

export default App;
