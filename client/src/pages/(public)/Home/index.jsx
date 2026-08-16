import { Link } from 'react-router-dom';
import Hero from './components/Hero';
import FaqSection from './components/FaqSection';
import WhyUseSection from './components/WhyUseSection';
import FloatingChatPromo from './components/FloatingChatPromo';

function Home() {
  return (
    <div className=''>
      <Hero />
      <FaqSection />
      <WhyUseSection />
      <FloatingChatPromo />
    </div>
  );
}

export default Home;
